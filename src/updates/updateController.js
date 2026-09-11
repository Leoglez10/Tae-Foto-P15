export const UPDATE_INTERVAL_MS = 6 * 60 * 60 * 1000;

export const UPDATE_STATUSES = Object.freeze([
  "idle",
  "browser",
  "unsupported",
  "development",
  "checking",
  "current",
  "available",
  "deferred",
  "confirming",
  "downloading",
  "installing",
  "installed",
  "restarting",
  "error"
]);

export const isUpdateBusy = (state) =>
  ["checking", "confirming", "downloading", "installing", "restarting"].includes(state?.status);

export function createUpdateController(deps) {
  let state = { status: "idle", received: 0, notice: false };
  const listeners = new Set();
  const deferred = new Set();
  let resource = null;
  let flight = null;
  let manualRequest = false;
  let generation = 0;
  let owners = 0;
  let started = false;
  let stopTimer;
  let installed = false;
  let operation = false;
  const schedule = deps.schedule ?? ((callback, milliseconds) => {
    const timer = setInterval(callback, milliseconds);
    return () => clearInterval(timer);
  });

  const publish = (patch) => {
    state = { ...state, ...patch };
    listeners.forEach((listener) => {
      try {
        listener();
      } catch {
        // Listener failures must never escape the controller.
      }
    });
  };

  const close = (update) => {
    try {
      void update?.close?.().catch(() => {});
    } catch {
      // Releasing a stale native resource is best effort.
    }
  };

  function retire() {
    // Native installation cannot be cancelled by an unmount/redraw. Keep its lock
    // and resource until it settles, including across a real remount.
    if (owners !== 0 || operation) return;
    generation++;
    flight = null;
    started = false;
    close(resource);
    resource = null;
    publish({ status: installed ? "installed" : "idle", notice: false, error: undefined });
  }

  function check(manual = false) {
    try {
      if (flight) {
        manualRequest ||= manual;
        return flight;
      }
      if (isUpdateBusy(state) || installed) return Promise.resolve();
      if (!deps.isDesktop()) {
        publish({ status: "browser", notice: false });
        return Promise.resolve();
      }
      // Do not replace the resource while the user is reading an offered update.
      if (!manual && state.notice && resource) return Promise.resolve();
      const epoch = generation;
      manualRequest = manual;
      publish({ status: "checking", error: undefined });
      const task = async () => {
        try {
          const readiness = await deps.readiness();
          if (epoch !== generation) return;
          if (readiness !== "ready") {
            publish({ status: readiness, notice: false });
            return;
          }
          const next = await deps.check();
          if (epoch !== generation) {
            close(next);
            return;
          }
          close(resource);
          resource = next;
          if (next) {
            const hidden = !manualRequest && deferred.has(next.version);
            publish({
              status: hidden ? "deferred" : "available",
              version: next.version,
              notes: next.body,
              notice: !hidden,
              received: 0,
              total: undefined
            });
          } else {
            publish({ status: "current", version: undefined, notes: undefined, notice: false });
          }
        } catch {
          if (epoch === generation) publish({ status: "error", error: "check", notice: manualRequest });
        } finally {
          if (epoch === generation) flight = null;
        }
      };
      flight = task();
      return flight;
    } catch {
      publish({ status: "error", error: "check", notice: Boolean(manual) });
      return Promise.resolve();
    }
  }

  async function install(confirm) {
    try {
      if (!resource || installed || isUpdateBusy(state) || state.status === "deferred") return;
      const update = resource;
      const epoch = generation;
      operation = true;
      publish({ status: "confirming", error: undefined, notice: true });
      try {
        const consent = await confirm();
        if (epoch !== generation) return;
        if (!consent || (started && owners === 0)) {
          publish({ status: "available" });
          return;
        }
        // Windows kills the process inside the installer, so the note has to exist
        // before the download starts. Losing it must never abort a consented update.
        try {
          deps.onInstallConsent?.(update.version, update.body);
        } catch {
          // Nothing to recover: history is a courtesy, the update is the point.
        }
        publish({ status: "downloading", received: 0, total: undefined });
        await update.downloadAndInstall((event) => {
          if (epoch !== generation || state.status !== "downloading") return;
          if (event.event === "Started") {
            const length = event.data?.contentLength;
            publish({ total: length && length > 0 ? length : undefined, received: 0 });
          } else if (event.event === "Progress") {
            publish({ received: state.received + Math.max(0, event.data?.chunkLength ?? 0) });
          } else {
            publish({ status: "installing" });
          }
        });
        // Windows normally exits inside the plugin. If it returns, never install twice.
        installed = true;
        if (epoch === generation) {
          resource = null;
          publish({ status: "installed", error: undefined });
        }
        close(update);
      } catch {
        if (epoch === generation) publish({ status: "error", error: "install", notice: true });
      } finally {
        operation = false;
        if (started && owners === 0) retire();
      }
    } catch {
      publish({ status: "error", error: "install", notice: true });
      operation = false;
    }
  }

  async function restart(confirm) {
    try {
      if (!installed || isUpdateBusy(state)) return;
      operation = true;
      publish({ status: "confirming", error: undefined });
      try {
        if (!(await confirm()) || (started && owners === 0)) {
          publish({ status: "installed" });
          return;
        }
        publish({ status: "restarting" });
        await deps.relaunch();
        publish({ status: "installed" });
      } catch {
        publish({ status: "error", error: "restart", notice: true });
      } finally {
        operation = false;
        if (started && owners === 0) retire();
      }
    } catch {
      publish({ status: "error", error: "restart", notice: true });
      operation = false;
    }
  }

  return {
    getSnapshot: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    attach() {
      owners++;
      if (!started) {
        started = true;
        void check();
      }
      if (!stopTimer && deps.isDesktop()) stopTimer = schedule(() => { void check(); }, UPDATE_INTERVAL_MS);
      let detached = false;
      return () => {
        if (detached) return;
        detached = true;
        if (--owners !== 0) return;
        stopTimer?.();
        stopTimer = undefined;
        // Redraws/reattaches can be synchronous. Only a real unmount retires resources.
        queueMicrotask(retire);
      };
    },
    check,
    install,
    restart,
    defer() {
      try {
        if (isUpdateBusy(state) || installed) return;
        if (state.version) deferred.add(state.version);
        publish({ status: resource ? "deferred" : "idle", notice: false });
      } catch {
        // Deferring is a UI preference; it must never throw.
      }
    }
  };
}
