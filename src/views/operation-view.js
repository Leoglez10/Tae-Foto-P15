import { icon } from "../icons.js";
let confirmTimeout = null;
const RESULT_SECONDS = 2;

// A corner toast was too easy to miss across the room, so a successful
// operation takes over the screen: big icon, big equipment number, one color
// per operation type (green = prestamo, blue = devolucion).
function showResult({ tone = "prestamo", title, studentName, equipo }) {
  document.querySelector(".op-result")?.remove();
  if (confirmTimeout) clearTimeout(confirmTimeout);

  const overlay = document.createElement("div");
  overlay.className = `op-result ${tone}`;
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "assertive");
  overlay.innerHTML = `
    <div class="op-result-card">
      <div class="op-result-icon">${icon("check")}</div>
      <h2 class="op-result-title">${title}</h2>
      ${equipo ? `
        <div class="op-result-equipo">
          <span class="op-result-equipo-label">Equipo</span>
          <span class="op-result-equipo-num">${equipo}</span>
        </div>
      ` : ""}
      ${studentName ? `<p class="op-result-student">${studentName}</p>` : ""}
      <p class="op-result-hint">Cierra en <b class="op-result-count">${RESULT_SECONDS}</b>s &middot; toque para continuar</p>
      <div class="op-result-bar"><span style="animation-duration:${RESULT_SECONDS}s"></span></div>
    </div>
  `;

  const dismiss = () => {
    clearInterval(countdown);
    overlay.classList.remove("show");
    setTimeout(() => overlay.remove(), 250);
  };

  let remaining = RESULT_SECONDS;
  const counter = overlay.querySelector(".op-result-count");
  const countdown = setInterval(() => {
    remaining -= 1;
    counter.textContent = Math.max(remaining, 0);
  }, 1000);

  overlay.addEventListener("click", dismiss);
  // The code field keeps focus underneath, so a scan or keypress must clear the
  // overlay instead of typing behind it.
  document.addEventListener("keydown", dismiss, { once: true });
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add("show"));
  confirmTimeout = setTimeout(dismiss, RESULT_SECONDS * 1000);
}

function bannerMarkup(flash) {
  if (!flash) return "";
  return `<div class="status-banner ${flash.tone}" role="alert" aria-live="polite">${flash.message}</div>`;
}

// First letter of the first two words: the student recognizes themselves by the
// initials before they finish reading the name.
function initials(name) {
  return (name || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] || "")
    .join("")
    .toUpperCase();
}

function infoTag(label, value) {
  if (!value) return "";
  return `
    <span class="info-tag">
      <span class="info-tag-label">${label}</span>
      <span class="info-tag-value">${value}</span>
    </span>
  `;
}

function studentCard(student) {
  if (!student) {
    return `
      <div class="student-hero empty">
        <div class="student-avatar empty">${icon("user")}</div>
        <div class="student-name-display">
          <h3 class="student-name-empty">Sin alumno seleccionado</h3>
          <p class="muted">Escriba el codigo y toque Buscar</p>
        </div>
        <span class="pill-tag neutral">Esperando codigo</span>
      </div>
    `;
  }

  const hasLoan = student.prestamo_activo;
  return `
    <div class="student-hero ${hasLoan ? "has-loan" : ""}">
      <div class="student-identity">
        <div class="student-avatar ${hasLoan ? "warning" : "success"}">
          <span class="student-initials">${initials(student.nombre)}</span>
          <span class="student-status-dot">${icon(hasLoan ? "alert" : "check")}</span>
        </div>
        <div class="student-name-display">
          <span class="student-eyebrow">Alumno identificado</span>
          <h3 class="student-name">${student.nombre}</h3>
        </div>
        <span class="pill-tag ${hasLoan ? "warn" : "success"}">
          ${hasLoan ? "CON PRESTAMO" : "Disponible"}
        </span>
      </div>
      <p class="student-info">
        ${infoTag("Materia", student.materia)}
        ${infoTag("Grupo", student.grupo)}
        ${infoTag("Profesor", student.profesor)}
      </p>
      ${hasLoan ? `
        <div class="loan-badge">
          <span class="loan-label">Equipo prestado:</span>
          <span class="loan-equipo-num">${student.prestamo_activo.equipo_numero}</span>
          <span class="loan-date">Desde: ${student.prestamo_activo.fecha_prestamo}</span>
        </div>
      ` : ""}
    </div>
  `;
}

function historyTable(history) {
  if (!history.length) {
    return `<div class="empty-state"><div class="empty-state-icon">${icon("empty")}</div><p>Sin historial para este alumno</p></div>`;
  }
  const rows = history
    .map(
      (item) => `
        <tr>
          <td>${item.fecha}</td>
          <td>${item.tipo === "prestamo" ? '<span class="badge badge-warning">Prestamo</span>' : '<span class="badge badge-success">Devolucion</span>'}</td>
          <td>${item.equipo_numero}</td>
          <td>${item.observaciones || "-"}</td>
        </tr>
      `
    )
    .join("");

  return `
    <div class="table-wrap">
      <table aria-label="Historial de operaciones del alumno">
        <thead>
          <tr><th scope="col">Fecha</th><th scope="col">Tipo</th><th scope="col">Equipo</th><th scope="col">Observaciones</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

export function renderOperationView(root, store) {
  const state = store.getState();
  const dashboard = state.dashboard || { alumnos_activos: 0, equipos_disponibles: 0, prestamos_activos: 0 };
  const sortByNumero = (arr) =>
    [...arr].sort((a, b) => {
      const aNum = parseFloat(a.numero) || 0;
      const bNum = parseFloat(b.numero) || 0;
      if (aNum !== bNum) return aNum - bNum;
      return String(a.numero).localeCompare(String(b.numero), "es");
    });

  const availableEquipment = sortByNumero(
    state.availableEquipment.length > 0
      ? state.availableEquipment
      : state.equipment.filter((item) => item.activo && item.estado === "disponible")
  );

  const hasLoan = state.selectedStudent?.prestamo_activo;
  const submitLabel = hasLoan ? `${icon("in")} Registrar devolución` : `${icon("out")} Registrar préstamo`;
  const submitClass = hasLoan ? "btn-danger" : "btn";

  root.innerHTML = `
    <div class="op-stats" aria-label="Estadisticas">
      <span class="op-stat"><b>${dashboard.alumnos_activos}</b> Alumnos</span>
      <span class="op-stat ok"><b>${dashboard.equipos_disponibles}</b> Disponibles</span>
      <span class="op-stat warn"><b>${dashboard.prestamos_activos}</b> Prestados</span>
    </div>

    ${bannerMarkup(state.flash)}

    <section class="operation-layout" id="operation-panel" role="tabpanel" aria-label="Operacion de prestamo">
      <div class="left-column">
        <article class="panel panel-code" data-step="1">
          <label for="student-code" class="step-title"><span class="step-num">1</span> Escanea tu codigo</label>
          <div class="code-row">
            <input
              id="student-code"
              name="codigo"
              autocomplete="off"
              class="big-input"
              placeholder="Escanear o escribir codigo..."
              value="${state.selectedStudent?.codigo || ""}"
              aria-describedby="code-hint"
            />
            <button type="button" class="btn btn-find" id="find-btn" aria-label="Buscar alumno por codigo">
              ${icon("search")} Buscar
            </button>
          </div>
          <span id="code-hint" class="kbd-hint">Presione <kbd>Enter</kbd> o toque <b>Buscar</b> &middot; <kbd>Esc</kbd> para limpiar</span>
        </article>

        ${!hasLoan ? `
        <article class="panel panel-equipment" data-step="2" aria-label="Seleccionar equipo">
          <h3 class="step-title">
            <span class="step-num">2</span> Elige el equipo
            ${availableEquipment.length > 12 ? `
              <input id="equipment-filter" class="eq-filter" type="search" autocomplete="off" placeholder="Buscar numero..." aria-label="Buscar equipo por numero o descripcion" />
            ` : ""}
          </h3>
          <div class="equipment-grid" role="listbox" aria-label="Equipos disponibles">
            ${availableEquipment.length === 0
              ? `<div class="no-equipment">No hay equipos disponibles</div>`
              : availableEquipment.map(item => `
                <button type="button" class="equipment-btn" data-equipment-id="${item.id}" data-search="${`${item.numero} ${item.descripcion || ""}`.toLowerCase()}" role="option" aria-selected="false">
                  <span class="eq-num">${item.numero}</span>
                  <span class="eq-desc">${item.descripcion || ""}</span>
                </button>
              `).join("")
            }
            <div class="no-equipment" id="equipment-no-match" hidden>Ningun equipo coincide</div>
          </div>
          <input type="hidden" name="equipo_id" id="selected-equipment-id" value="" />
        </article>
        ` : ""}

        <div class="op-actions" data-step="3">
          <input name="observaciones" id="observaciones" class="obs-input" placeholder="${hasLoan ? "Observaciones de la devolucion (opcional)" : "Observaciones (opcional)"}" aria-label="Observaciones adicionales" />
          <button class="btn btn-block btn-xl ${submitClass}" id="submit-btn" type="button" aria-label="${hasLoan ? "Registrar devolucion" : "Registrar prestamo"}">
            <span class="step-num">${hasLoan ? "2" : "3"}</span> ${submitLabel}
          </button>
        </div>
      </div>

      <div class="right-column">
        <article class="panel panel-student" aria-label="Informacion del alumno">
          ${studentCard(state.selectedStudent)}
        </article>

        <article class="panel panel-history" aria-label="Historial del alumno">
          <h3>Historial</h3>
          ${historyTable(state.studentHistory)}
        </article>
      </div>
    </section>
  `;

  const codeInput = root.querySelector("#student-code");
  const submitBtn = root.querySelector("#submit-btn");
  const equipmentInput = root.querySelector("#selected-equipment-id");
  const findBtn = root.querySelector("#find-btn");

  // Highlights the step the student has to act on right now, and marks the
  // previous ones as done. Equipment picking never re-renders the view, so the
  // sync runs locally instead of relying on store updates.
  const syncSteps = () => {
    const hasStudent = Boolean(state.selectedStudent);
    const needsEquipment = hasStudent && !hasLoan;
    const hasEquipment = Boolean(equipmentInput?.value);

    const current = !hasStudent ? 1 : needsEquipment && !hasEquipment ? 2 : 3;

    root.querySelectorAll("[data-step]").forEach((node) => {
      const step = Number(node.dataset.step);
      node.classList.toggle("step-active", step === current);
      node.classList.toggle("step-done", step < current);
    });

    submitBtn.disabled = !hasStudent || (needsEquipment && !hasEquipment);
  };

  const runSearch = async () => {
    const code = codeInput.value.trim();
    if (!code) {
      codeInput.focus();
      return;
    }
    await store.actions.findStudentByCode(code);
  };

  codeInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await runSearch();
    }
  });

  findBtn.addEventListener("click", runSearch);

  root.querySelectorAll(".equipment-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      root.querySelectorAll(".equipment-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      if (equipmentInput) equipmentInput.value = btn.dataset.equipmentId;
      syncSteps();
    });
    btn.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        submitBtn.click();
      }
    });
  });

  const filterInput = root.querySelector("#equipment-filter");
  filterInput?.addEventListener("input", () => {
    const query = filterInput.value.trim().toLowerCase();
    let visible = 0;
    root.querySelectorAll(".equipment-btn").forEach((btn) => {
      const match = !query || btn.dataset.search.includes(query);
      btn.hidden = !match;
      if (match) visible += 1;
    });
    root.querySelector("#equipment-no-match").hidden = visible > 0;
  });

  const resetForm = () => {
    if (equipmentInput) equipmentInput.value = "";
    root.querySelectorAll(".equipment-btn").forEach((btn) => {
      btn.classList.remove("selected");
      btn.hidden = false;
    });
    if (filterInput) filterInput.value = "";
    const noMatch = root.querySelector("#equipment-no-match");
    if (noMatch) noMatch.hidden = true;
    root.querySelector("#observaciones").value = "";
    codeInput.value = "";
    syncSteps();
    codeInput.focus();
  };

  const obsInput = root.querySelector("#observaciones");
  obsInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitBtn.click();
    }
  });

  submitBtn.addEventListener("click", async () => {
    console.log("[DEBUG] submitBtn clicked", { hasStudent: !!state.selectedStudent, prestamo_activo: state.selectedStudent?.prestamo_activo });
    const currentState = store.getState();
    const equipoId = equipmentInput?.value;
    const observaciones = root.querySelector("#observaciones")?.value?.trim() || "";
    const student = currentState.selectedStudent;

    if (!student) {
      console.log("[DEBUG] No student selected, returning");
      return;
    }

    console.log("[DEBUG] Student:", student.codigo, student.prestamo_activo ? "has loan" : "no loan");

    if (student.prestamo_activo) {
      const equipoIdDev = student.prestamo_activo.equipo_id;
      await store.actions.registerStudentOperation({
        codigo: student.codigo,
        tipo: "devolucion",
        equipo_id: equipoIdDev,
        observaciones: observaciones || null
      });
      showResult({
        tone: "devolucion",
        title: "EQUIPO DEVUELTO",
        studentName: student.nombre,
        equipo: student.prestamo_activo.equipo_numero
      });
    } else if (equipoId) {
      const equipo = availableEquipment.find((item) => String(item.id) === String(equipoId));
      await store.actions.registerStudentOperation({
        codigo: student.codigo,
        tipo: "prestamo",
        equipo_id: Number(equipoId),
        observaciones: observaciones || null
      });
      showResult({
        tone: "prestamo",
        title: "PRESTAMO REGISTRADO",
        studentName: student.nombre,
        equipo: equipo?.numero
      });
    }

    resetForm();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      resetForm();
    }
  });

  syncSteps();
  codeInput.focus();
}
