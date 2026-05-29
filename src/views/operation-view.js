let toastTimeout = null;
function showToast(message, type = "success") {
  const existing = document.querySelector(".op-toast");
  if (existing) existing.remove();
  if (toastTimeout) clearTimeout(toastTimeout);

  const toast = document.createElement("div");
  toast.className = `op-toast ${type}`;
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.innerHTML = `
    <span class="op-toast-icon">${type === "success" ? "OK" : "!"}</span>
    <span class="op-toast-msg">${message}</span>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("show"));

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function bannerMarkup(flash) {
  if (!flash) return "";
  return `<div class="status-banner ${flash.tone}" role="alert" aria-live="polite">${flash.message}</div>`;
}

function operationTypeButtons(currentType, student) {
  const hasActiveLoan = Boolean(student?.prestamo_activo);
  return `
    <div class="mode-toggle" role="tablist" aria-label="Tipo de movimiento">
      <button class="mode-pill ${currentType === "prestamo" ? "active" : ""}" type="button" data-operation-type="prestamo" role="tab" aria-selected="${currentType === "prestamo"}" aria-controls="operation-panel">
        <span>Prestamo</span>
        <small>${hasActiveLoan ? "Ya tiene uno activo" : "Registrar salida"}</small>
      </button>
      <button class="mode-pill ${currentType === "devolucion" ? "active" : ""}" type="button" data-operation-type="devolucion" role="tab" aria-selected="${currentType === "devolucion"}" aria-controls="operation-panel">
        <span>Devolucion</span>
        <small>${hasActiveLoan ? "Registrar regreso" : "Sin equipo por devolver"}</small>
      </button>
    </div>
  `;
}

function studentCard(student) {
  if (!student) {
    return `
      <div class="student-hero empty">
        <div class="student-avatar empty">?</div>
        <div class="student-name-display">
          <h3 class="student-name-empty">Sin alumno seleccionado</h3>
          <p class="muted">Capture el codigo y presione Enter</p>
        </div>
        <span class="pill-tag neutral">Esperando codigo</span>
      </div>
    `;
  }

  const hasLoan = student.prestamo_activo;
  return `
    <div class="student-hero ${hasLoan ? "has-loan" : ""}">
      <div class="student-avatar ${hasLoan ? "warning" : "success"}">
        ${hasLoan ? "!" : "OK"}
      </div>
      <div class="student-name-display">
        <h3 class="student-name">${student.nombre}</h3>
        <p class="student-info">
          <span class="info-tag">${student.materia}</span>
          <span class="info-tag">${student.grupo}</span>
          <span class="info-tag">${student.profesor}</span>
        </p>
      </div>
      <span class="pill-tag ${hasLoan ? "warn" : "success"}">
        ${hasLoan ? "CON PRESTAMO" : "Disponible"}
      </span>
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

function equipmentOptions(equipment) {
  if (!equipment.length) {
    return `<option value="">No hay equipos disponibles</option>`;
  }

  return equipment
    .map((item) => `<option value="${item.id}">${item.numero} · ${item.descripcion}</option>`)
    .join("");
}

function historyTable(history) {
  if (!history.length) {
    return `<div class="empty-state"><div class="empty-state-icon">-</div><p>Sin historial para este alumno</p></div>`;
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
  const currentType = state.operationType || "prestamo";
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
  const submitLabel = hasLoan ? "📥 Registrar devolución" : "📤 Registrar préstamo";
  const submitClass = hasLoan ? "btn-danger" : "btn";
  const equipmentDisabled = currentType === "devolucion" || !state.selectedStudent || availableEquipment.length === 0;
  const selectPlaceholder = currentType === "devolucion" ? "📥 Devolución automática" : "📦 Seleccione equipo";

  root.innerHTML = `
    <section class="hero-card" aria-label="Resumen del dashboard">
      <div>
        <h2>Prestamo de Equipos</h2>
        <p class="muted">Capture el codigo del alumno y presione Enter</p>
      </div>
      <div class="hero-stats" aria-label="Estadisticas">
        <article class="stat stat-alumnos">Alumnos<strong>${dashboard.alumnos_activos}</strong></article>
        <article class="stat stat-disponibles">Disponibles<strong>${dashboard.equipos_disponibles}</strong></article>
        <article class="stat stat-prestados">Prestados<strong>${dashboard.prestamos_activos}</strong></article>
      </div>
    </section>

    ${bannerMarkup(state.flash)}

    <section class="operation-layout" id="operation-panel" role="tabpanel" aria-label="Operacion de prestamo">
      <div class="left-column">
        <article class="panel panel-code">
          <div class="code-input-wrapper">
            <label for="student-code" class="big-label">Codigo del Alumno</label>
            <input 
              id="student-code" 
              name="codigo" 
              autocomplete="off" 
              class="big-input"
              placeholder="Escanear o escribir codigo..."
              value="${state.selectedStudent?.codigo || ""}"
              aria-describedby="code-hint"
            />
            <span id="code-hint" class="kbd-hint">Presione <kbd>Enter</kbd> para buscar</span>
          </div>
        </article>

        ${!hasLoan ? `
        <article class="panel panel-equipment" aria-label="Seleccionar equipo">
          <h3>Seleccionar Equipo</h3>
          <div class="equipment-grid" role="listbox" aria-label="Equipos disponibles">
            ${availableEquipment.length === 0 
              ? `<div class="no-equipment">No hay equipos disponibles</div>`
              : availableEquipment.map(item => `
                <button type="button" class="equipment-btn" data-equipment-id="${item.id}" role="option" aria-selected="false">
                  <span class="eq-num">${item.numero}</span>
                  <span class="eq-desc">${item.descripcion || ""}</span>
                </button>
              `).join("")
            }
          </div>
          <input type="hidden" name="equipo_id" id="selected-equipment-id" value="" />
        </article>
        ` : ""}

        <article class="panel" aria-label="Observaciones">
          <h3>Observaciones</h3>
          <input name="observaciones" id="observaciones" class="obs-input" placeholder="${hasLoan ? "Notas opcionales (devolucion)..." : "Notas opcionales..."}" aria-label="Observaciones adicionales" />
        </article>

        <button class="btn btn-block btn-xl ${submitClass}" id="submit-btn" type="button" aria-label="${hasLoan ? "Registrar devolucion" : "Registrar prestamo"}">
          ${submitLabel}
        </button>
        <p class="kbd-hint" style="text-align: center; margin-top: 8px;">Presione <kbd>Esc</kbd> para limpiar</p>
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

  codeInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const code = codeInput.value.trim();
      if (code) {
        await store.actions.findStudentByCode(code);
      }
    }
  });

  root.querySelectorAll(".equipment-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      root.querySelectorAll(".equipment-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      equipmentInput.value = btn.dataset.equipmentId;
    });
    btn.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        submitBtn.click();
      }
    });
  });

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
    const equipoId = equipmentInput.value;
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
      showToast("Equipo devuelto exitosamente", "success");
    } else if (equipoId) {
      await store.actions.registerStudentOperation({
        codigo: student.codigo,
        tipo: "prestamo",
        equipo_id: Number(equipoId),
        observaciones: observaciones || null
      });
      showToast("Prestamo registrado", "success");
    }

    equipmentInput.value = "";
    root.querySelectorAll(".equipment-btn").forEach(b => b.classList.remove("selected"));
    root.querySelector("#observaciones").value = "";
    codeInput.value = "";
    codeInput.focus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      equipmentInput.value = "";
      root.querySelectorAll(".equipment-btn").forEach(b => b.classList.remove("selected"));
      root.querySelector("#observaciones").value = "";
      codeInput.value = "";
      codeInput.focus();
    }
  });

  codeInput.focus();
}
