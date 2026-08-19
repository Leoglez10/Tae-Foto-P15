import { icon } from "../icons.js";
import { renderOperationView } from "../views/operation-view.js";
import { renderAdminView } from "../views/admin-view.js";

function getAdminFocusSnapshot(root) {
  const openDetails = [...root.querySelectorAll("details[id][open]")].map((node) => node.id);
  const active = document.activeElement;
  if (!active || !root.contains(active)) {
    return { scrollY: window.scrollY, openDetails };
  }

  const snapshot = { scrollY: window.scrollY, openDetails, focus: null };

  if (active.id) {
    snapshot.focus = { type: "id", id: active.id };
  } else if (active.name) {
    snapshot.focus = { type: "name", name: active.name };
  } else if (active.dataset.field) {
    const row = active.closest("tr");
    const studentButton = row?.querySelector("[data-save-student]");
    const equipmentButton = row?.querySelector("[data-save-equipment]");
    const adminButton = row?.querySelector("[data-save-admin]");

    if (studentButton) {
      snapshot.focus = { type: "student-row", id: studentButton.dataset.saveStudent, field: active.dataset.field };
    } else if (equipmentButton) {
      snapshot.focus = { type: "equipment-row", id: equipmentButton.dataset.saveEquipment, field: active.dataset.field };
    } else if (adminButton) {
      snapshot.focus = { type: "admin-row", id: adminButton.dataset.saveAdmin, field: active.dataset.field };
    }
  }

  if (snapshot.focus && typeof active.selectionStart === "number" && typeof active.selectionEnd === "number") {
    snapshot.focus.selectionStart = active.selectionStart;
    snapshot.focus.selectionEnd = active.selectionEnd;
  }

  return snapshot;
}

function restoreOpenDetails(root, snapshot) {
  snapshot?.openDetails?.forEach((id) => {
    const node = root.querySelector(`#${id}`);
    if (node) node.open = true;
  });
}

function restoreAdminFocus(root, snapshot) {
  if (!snapshot?.focus) return;

  let target = null;
  const focus = snapshot.focus;
  if (focus.type === "id") {
    target = root.querySelector(`#${focus.id}`);
  } else if (focus.type === "name") {
    target = root.querySelector(`[name="${focus.name}"]`);
  } else if (focus.type === "student-row") {
    target = root.querySelector(`[data-save-student="${focus.id}"]`)?.closest("tr")?.querySelector(`[data-field="${focus.field}"]`);
  } else if (focus.type === "equipment-row") {
    target = root.querySelector(`[data-save-equipment="${focus.id}"]`)?.closest("tr")?.querySelector(`[data-field="${focus.field}"]`);
  } else if (focus.type === "admin-row") {
    target = root.querySelector(`[data-save-admin="${focus.id}"]`)?.closest("tr")?.querySelector(`[data-field="${focus.field}"]`);
  }

  if (!target) return;
  target.focus();
  if (typeof target.setSelectionRange === "function" && typeof focus.selectionStart === "number" && typeof focus.selectionEnd === "number") {
    target.setSelectionRange(focus.selectionStart, focus.selectionEnd);
  }
}

export function createAppShell(root, store) {
  let initialized = false;

  const draw = () => {
    const state = store.getState();
    const adminUiSnapshot = state.role === "admin" ? getAdminFocusSnapshot(root) : null;

    root.innerHTML = `
      <a href="#main-content" class="sr-only" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;z-index:9999;">Saltar al contenido principal</a>
      <div class="app-shell ${state.role === "student" ? "fit" : ""}">
        <div class="ambient-orb orb-a"></div>
        <div class="ambient-orb orb-b"></div>
        <div class="ambient-grid"></div>
        <header class="topbar" role="banner">
          <div class="brand-lockup">
            <div class="logo-placeholder">
              <img src="./logo-p15.png" alt="Logo Preparatoria Quince" class="brand-logo" />
            </div>
            <div>
              <div class="brand-kicker">TAE Foto App</div>
              <h1>Control de Prestamos</h1>
              <p>Operacion rapida para estudio, laboratorio y resguardo de equipo.</p>
            </div>
          </div>
          <div class="topbar-actions">
            ${
              state.currentAdmin
                ? `<span class="topbar-session">${icon("user")} ${state.currentAdmin.nombre || state.currentAdmin.usuario}</span>`
                : ""
            }
            ${
              state.role
                ? `<button class="ghost-btn" type="button" data-action="go-home" aria-label="Volver al inicio">Inicio</button>`
                : ""
            }
            ${
              state.currentAdmin
                ? `<button class="btn-danger" type="button" data-action="logout-admin" aria-label="Cerrar sesion">${icon("out")} Cerrar sesion</button>`
                : ""
            }
          </div>
        </header>
        <main class="content" id="main-content" tabindex="-1"></main>
      </div>
    `;

    const content = root.querySelector(".content");
    if (!state.role) {
      content.innerHTML = `
        <section class="role-select" role="main">
          <h2 class="role-select-title">Seleccione modo de acceso</h2>
          <div class="role-grid">
            <button class="role-card student-role" data-role="student" type="button" aria-keyshortcuts="1">
              <span class="role-icon">${icon("package")}</span>
              <span class="role-eyebrow">Atencion rapida</span>
              <strong>ESTUDIANTE</strong>
              <small>Captura codigo, registra prestamo o devolucion y sigue con el siguiente.</small>
              <span class="role-key" aria-hidden="true">1</span>
            </button>
            <button class="role-card admin-role" data-role="admin" type="button" aria-keyshortcuts="2">
              <span class="role-icon">${icon("lock")}</span>
              <span class="role-eyebrow">Panel de control</span>
              <strong>ADMINISTRADOR</strong>
              <small>Gestiona Excel, alumnos, equipos y reportes. Requiere contrase\u00f1a.</small>
              <span class="role-key" aria-hidden="true">2</span>
            </button>
          </div>
        </section>
      `;

      content.querySelectorAll("[data-role]").forEach((button) => {
        button.addEventListener("click", () => store.actions.setRole(button.dataset.role));
      });
    } else if (state.role === "student") {
      renderOperationView(content, store);
    } else {
      renderAdminView(content, store);
      restoreOpenDetails(root, adminUiSnapshot);
      requestAnimationFrame(() => {
        window.scrollTo({ top: adminUiSnapshot?.scrollY || 0, behavior: "auto" });
        restoreAdminFocus(root, adminUiSnapshot);
      });
    }

    root.querySelector("[data-action='go-home']")?.addEventListener("click", () => {
      store.actions.setRole(null);
    });

    root.querySelector("[data-action='logout-admin']")?.addEventListener("click", () => {
      store.actions.logoutAdmin();
    });
    
    root.querySelector("#main-content")?.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && state.role) {
        store.actions.setRole(null);
      }
    });
  };

  store.actions.subscribe(draw);
  if (!initialized) {
    initialized = true;
    document.addEventListener("keydown", (e) => {
      if (store.getState().role) return;
      if (e.target?.closest?.("input, textarea, select")) return;
      if (e.key === "1") store.actions.setRole("student");
      if (e.key === "2") store.actions.setRole("admin");
    });
    store.actions.bootstrap();
  }
}
