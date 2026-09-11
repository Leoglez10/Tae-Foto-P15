// Windows installs in passive mode and the OS kills the process mid-install, so
// the next launch is a fresh process with no memory of the update. The only way
// to tell the user what happened is to leave a note before the app dies.
const LAST_SEEN_KEY = "taefoto.update.lastSeenVersion";
const PENDING_KEY = "taefoto.update.pendingNotes";

export function browserStorage() {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    // Some private modes throw on the property itself, not only on access.
    return null;
  }
}

const resolveStorage = (storage) => (storage === undefined ? browserStorage() : storage);

function read(storage, key) {
  try {
    const value = storage.getItem(key);
    return typeof value === "string" ? value : null;
  } catch {
    return null;
  }
}

function write(storage, key, value) {
  try {
    storage.setItem(key, value);
  } catch {
    // A full or blocked storage only costs the banner, never the app.
  }
}

function drop(storage, key) {
  try {
    storage.removeItem(key);
  } catch {
    // Same reasoning as write().
  }
}

function readPending(storage) {
  const raw = read(storage, PENDING_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (typeof parsed.version !== "string") return null;
    return {
      version: parsed.version,
      notes: typeof parsed.notes === "string" ? parsed.notes : undefined
    };
  } catch {
    return null;
  }
}

export function notePendingUpdate(storage, version, notes) {
  const store = resolveStorage(storage);
  if (!store || !version) return;
  // Without notes there is nothing to show later, and keeping an older entry
  // around would attach the wrong release notes to this version.
  if (!notes) {
    drop(store, PENDING_KEY);
    return;
  }
  write(store, PENDING_KEY, JSON.stringify({ version, notes }));
}

export function resolveVersionChange(storage, currentVersion) {
  const store = resolveStorage(storage);
  if (!store || !currentVersion) return null;
  const previous = read(store, LAST_SEEN_KEY);
  // Record the running version first: the banner is a one-shot courtesy, and a
  // failure to render it must not make it reappear on every launch.
  write(store, LAST_SEEN_KEY, currentVersion);
  // A first run is an install, not an update, and an unchanged version is news
  // to nobody. Neither case may consume the pending notes.
  if (previous === null || previous === currentVersion) return null;
  const pending = readPending(store);
  drop(store, PENDING_KEY);
  return {
    previous,
    current: currentVersion,
    notes: pending && pending.version === currentVersion ? pending.notes : undefined
  };
}
