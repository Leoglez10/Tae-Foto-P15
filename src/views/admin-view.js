import { icon } from "../icons.js";
function bannerMarkup(flash) {
  if (!flash) return "";
  const glyph = { success: "check-circle", warn: "alert", danger: "close" }[flash.tone] || "alert";
  return `<div class="status-banner ${flash.tone}" role="alert" aria-live="polite">${icon(glyph)} ${flash.message}</div>`;
}

function studentRows(students) {
  if (!students.length) {
    return `<tr><td colspan="7"><div class="empty-state"><div class="empty-state-icon">${icon("empty")}</div><p>No hay alumnos registrados</p></div></td></tr>`;
  }
  return students
    .map(
      (student) => `
        <tr data-student-row data-codigo="${student.codigo}" data-nombre="${student.nombre}" data-materia="${student.materia}" data-profesor="${student.profesor}" data-grupo="${student.grupo}" data-activo="${student.activo ? "1" : "0"}">
          <td><input data-field="codigo" value="${student.codigo}" aria-label="Codigo del alumno" /></td>
          <td><input data-field="nombre" value="${student.nombre}" aria-label="Nombre" /></td>
          <td><input data-field="materia" value="${student.materia}" aria-label="Materia" /></td>
          <td><input data-field="profesor" value="${student.profesor}" aria-label="Profesor" /></td>
          <td><input data-field="grupo" value="${student.grupo}" aria-label="Grupo" /></td>
          <td>
            <select data-field="activo" aria-label="Estado">
              <option value="1" ${student.activo ? "selected" : ""}>Activo</option>
              <option value="0" ${student.activo ? "" : "selected"}>Inactivo</option>
            </select>
          </td>
          <td class="actions-cell">
            <button class="btn-secondary" type="button" data-save-student="${student.id}" aria-label="Guardar cambios del alumno">Guardar</button>
            <button class="btn-danger" type="button" data-delete-student="${student.id}" aria-label="Eliminar alumno">Eliminar</button>
          </td>
        </tr>
      `
    )
    .join("");
}

function equipmentRows(equipment) {
  if (!equipment.length) {
    return `<tr><td colspan="6"><div class="empty-state"><div class="empty-state-icon">${icon("empty")}</div><p>No hay equipos registrados</p></div></td></tr>`;
  }
  return equipment
    .map(
      (item) => `
        <tr data-equipment-row data-numero="${item.numero}" data-tipo="${item.tipo}" data-descripcion="${item.descripcion}" data-estado="${item.estado}" data-activo="${item.activo ? "1" : "0"}">
          <td><input data-field="numero" value="${item.numero}" aria-label="Numero de equipo" /></td>
          <td><input data-field="tipo" value="${item.tipo}" aria-label="Tipo" /></td>
          <td><input data-field="descripcion" value="${item.descripcion}" aria-label="Descripcion" /></td>
          <td>
            <select data-field="estado" aria-label="Estado">
              <option value="disponible" ${item.estado === "disponible" ? "selected" : ""}>disponible</option>
              <option value="prestado" ${item.estado === "prestado" ? "selected" : ""}>prestado</option>
            </select>
          </td>
          <td>
            <select data-field="activo" aria-label="Activo">
              <option value="1" ${item.activo ? "selected" : ""}>Activo</option>
              <option value="0" ${item.activo ? "" : "selected"}>Inactivo</option>
            </select>
          </td>
          <td class="actions-cell">
            <button class="btn-secondary" type="button" data-save-equipment="${item.id}" aria-label="Guardar cambios del equipo">Guardar</button>
            <button class="btn-danger" type="button" data-delete-equipment="${item.id}" aria-label="Eliminar equipo">Eliminar</button>
          </td>
        </tr>
      `
    )
    .join("");
}

function adminRows(admins) {
  if (!admins.length) {
    return `<tr><td colspan="5"><div class="empty-state"><div class="empty-state-icon">${icon("empty")}</div><p>No hay administradores registrados</p></div></td></tr>`;
  }
  return admins
    .map(
      (admin) => `
        <tr data-admin-row data-usuario="${admin.usuario}" data-nombre="${admin.nombre}" data-activo="${admin.activo ? "1" : "0"}">
          <td><input data-field="usuario" value="${admin.usuario}" aria-label="Usuario" /></td>
          <td><input data-field="nombre" value="${admin.nombre}" aria-label="Nombre" /></td>
          <td><input data-field="password" type="password" placeholder="Dejar en blanco para conservar" aria-label="Nueva contrasena" /></td>
          <td>
            <select data-field="activo" aria-label="Estado">
              <option value="1" ${admin.activo ? "selected" : ""}>Activo</option>
              <option value="0" ${admin.activo ? "" : "selected"}>Inactivo</option>
            </select>
          </td>
          <td class="actions-cell">
            <button class="btn-secondary" type="button" data-save-admin="${admin.id}" aria-label="Guardar cambios del administrador">Guardar</button>
            <button class="btn-danger" type="button" data-delete-admin="${admin.id}" aria-label="Eliminar administrador">Eliminar</button>
          </td>
        </tr>
      `
    )
    .join("");
}

function recordRows(records) {
  if (!records.length) {
    return `<tr><td colspan="9"><div class="empty-state"><div class="empty-state-icon">${icon("empty")}</div><p>No hay registros en el historial</p></div></td></tr>`;
  }
  return records
    .map(
      (item) => {
        const tipoBadge = item.tipo === "prestamo"
          ? '<span class="badge badge-warning">Prestamo</span>'
          : '<span class="badge badge-success">Devolucion</span>';
        return `
        <tr data-record-row data-tipo="${item.tipo}" data-codigo="${item.codigo}" data-nombre="${item.alumno_nombre}" data-materia="${item.materia}" data-profesor="${item.profesor}" data-grupo="${item.grupo}" data-equipo="${item.equipo_numero}" data-observaciones="${item.observaciones || ""}">
          <td>${item.fecha}</td>
          <td>${tipoBadge}</td>
          <td>${item.codigo}</td>
          <td>${item.alumno_nombre}</td>
          <td>${item.materia}</td>
          <td>${item.profesor}</td>
          <td>${item.grupo}</td>
          <td>${item.equipo_numero}</td>
          <td>${item.observaciones || "-"}</td>
        </tr>
      `;
      }
    )
    .join("");
}

function reportRows(reportData) {
  if (!reportData) {
    return `<tr><td colspan="3"><div class="empty-state"><div class="empty-state-icon">${icon("chart")}</div><p>Seleccione un reporte y presione consultar</p></div></td></tr>`;
  }
  if (!reportData.filas || !reportData.filas.length) {
    return `<tr><td colspan="3"><div class="empty-state"><div class="empty-state-icon">${icon("empty")}</div><p>Sin resultados para este reporte</p></div></td></tr>`;
  }
  return reportData.filas
    .map(
      (item) => `
        <tr>
          <td>${item.etiqueta}</td>
          <td><strong>${item.valor}</strong></td>
          <td>${item.detalle}</td>
        </tr>
      `
    )
    .join("");
}

function reportPreviewModal(state) {
  if (!state.reportPreviewOpen || !state.reportData) return "";

  const rows = state.reportData.filas
    .map(
      (item) => `
        <tr>
          <td>${item.etiqueta}</td>
          <td>${item.valor}</td>
          <td>${item.detalle}</td>
        </tr>
      `
    )
    .join("");

  return `
    <div class="modal-backdrop" data-close-report-preview="true">
      <div class="modal-card report-preview-modal" role="dialog" aria-modal="true" aria-labelledby="report-preview-title">
        <div class="report-preview-sheet">
          <div class="report-preview-head">
            <div>
              <p class="eyebrow">${icon("eye")} Vista previa antes de descargar</p>
              <h3 id="report-preview-title">${state.reportData.titulo}</h3>
            </div>
            <div class="report-preview-stamp">${icon("file")} PDF</div>
          </div>
          <p class="muted">${icon("calendar")} Generado: ${state.reportData.generado_en}</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>${icon("chart")} Concepto</th><th>${icon("hash")} Total</th><th>${icon("edit")} Detalle</th></tr></thead>
              <tbody>${rows || `<tr><td colspan="3">${icon("empty")} Sin resultados.</td></tr>`}</tbody>
            </table>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn-secondary" type="button" data-print-report-preview="true" ${state.generatingReport ? "disabled" : ""}>${icon("printer")} Imprimir vista</button>
          <button class="ghost-btn" type="button" data-close-report-preview="true" ${state.generatingReport ? "disabled" : ""}>${icon("close")} Cerrar</button>
          <button class="btn" type="button" data-generate-report-from-preview="true" ${state.generatingReport ? "disabled" : ""} style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%);">
            ${state.generatingReport ? `${icon("clock")} Generando...` : `${icon("file")} Generar PDF`}
          </button>
        </div>
      </div>
    </div>
  `;
}

function buildPrintableReportHtml(reportData) {
  const rows = reportData.filas
    .map(
      (item) => `
        <tr>
          <td>${item.etiqueta}</td>
          <td>${item.valor}</td>
          <td>${item.detalle}</td>
        </tr>
      `
    )
    .join("");

  return `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <title>${reportData.titulo}</title>
        <style>
          body {
            font-family: "Segoe UI", Tahoma, sans-serif;
            color: #1d2430;
            margin: 0;
            padding: 36px;
            background: #ffffff;
          }
          .sheet {
            border: 2px solid #243753;
            border-radius: 20px;
            padding: 28px;
          }
          .head {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            align-items: start;
            margin-bottom: 20px;
          }
          .badge {
            border: 1px solid #8ea6cb;
            padding: 10px 14px;
            border-radius: 12px;
            font-weight: 700;
            color: #243753;
            background: #edf2fa;
          }
          h1 {
            margin: 0 0 8px;
            color: #243753;
            font-size: 28px;
          }
          p {
            margin: 0;
            color: #596579;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #d4ddea;
            padding: 12px 14px;
            text-align: left;
          }
          th {
            background: #edf2fa;
            color: #243753;
          }
        </style>
      </head>
      <body>
        <div class="sheet">
          <div class="head">
            <div>
              <p>Preparatoria Quince</p>
              <h1>${reportData.titulo}</h1>
              <p>Generado: ${reportData.generado_en}</p>
            </div>
            <div class="badge">Vista previa</div>
          </div>
          <table>
            <thead>
              <tr><th>Concepto</th><th>Total</th><th>Detalle</th></tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </body>
    </html>
  `;
}

function printReportPreview(reportData) {
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);
  iframe.srcdoc = buildPrintableReportHtml(reportData);
  iframe.onload = () => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    setTimeout(() => iframe.remove(), 1000);
  };
}

function dashboardSummary(summary, activeAdmins) {
  if (!summary) return "";
  return `
    <div class="summary-grid">
      <article class="stat stat-alumnos"><span style="font-size: 1.5rem;">${icon("users")} </span> Alumnos<strong>${summary.alumnos_activos}</strong></article>
      <article class="stat stat-disponibles"><span style="font-size: 1.5rem;">${icon("check-circle")} </span> Disponibles<strong>${summary.equipos_disponibles}</strong></article>
      <article class="stat stat-prestados"><span style="font-size: 1.5rem;">${icon("package")} </span> Prestados<strong>${summary.prestamos_activos}</strong></article>
      <article class="stat stat-registros"><span style="font-size: 1.5rem;">${icon("clipboard")} </span> Registros<strong>${summary.registros_totales}</strong></article>
      <article class="stat stat-admins"><span style="font-size: 1.5rem;">${icon("user")} </span> Admins<strong>${activeAdmins}</strong></article>
    </div>
  `;
}

function updateVisibleCount(root, counterId, total, visible) {
  const node = root.querySelector(`#${counterId}`);
  if (node) {
    node.textContent = `${visible} de ${total} visibles`;
  }
}

function attachTableFilters(root) {
  const applyStudents = () => {
    const query = root.querySelector("#student-search")?.value.trim().toLowerCase() || "";
    const status = root.querySelector("#student-status-filter")?.value || "all";
    const rows = [...root.querySelectorAll("#students-table tbody tr[data-student-row]")];
    let visible = 0;
    rows.forEach((row) => {
      const haystack = `${row.dataset.codigo} ${row.dataset.nombre} ${row.dataset.materia} ${row.dataset.profesor} ${row.dataset.grupo}`.toLowerCase();
      const activo = row.dataset.activo === "1";
      const show = (!query || haystack.includes(query)) && (status === "all" || (status === "active" && activo) || (status === "inactive" && !activo));
      row.hidden = !show;
      if (show) visible += 1;
    });
    updateVisibleCount(root, "students-visible-count", rows.length, visible);
  };

  const applyEquipment = () => {
    const query = root.querySelector("#equipment-search")?.value.trim().toLowerCase() || "";
    const status = root.querySelector("#equipment-status-filter")?.value || "all";
    const active = root.querySelector("#equipment-active-filter")?.value || "all";
    const rows = [...root.querySelectorAll("#equipment-table tbody tr[data-equipment-row]")];
    let visible = 0;
    rows.forEach((row) => {
      const haystack = `${row.dataset.numero} ${row.dataset.tipo} ${row.dataset.descripcion}`.toLowerCase();
      const activo = row.dataset.activo === "1";
      const show =
        (!query || haystack.includes(query)) &&
        (status === "all" || row.dataset.estado === status) &&
        (active === "all" || (active === "active" && activo) || (active === "inactive" && !activo));
      row.hidden = !show;
      if (show) visible += 1;
    });
    updateVisibleCount(root, "equipment-visible-count", rows.length, visible);
  };

  const applyAdmins = () => {
    const query = root.querySelector("#admin-search")?.value.trim().toLowerCase() || "";
    const status = root.querySelector("#admin-status-filter")?.value || "all";
    const rows = [...root.querySelectorAll("#admins-table tbody tr[data-admin-row]")];
    let visible = 0;
    rows.forEach((row) => {
      const haystack = `${row.dataset.usuario} ${row.dataset.nombre}`.toLowerCase();
      const activo = row.dataset.activo === "1";
      const show = (!query || haystack.includes(query)) && (status === "all" || (status === "active" && activo) || (status === "inactive" && !activo));
      row.hidden = !show;
      if (show) visible += 1;
    });
    updateVisibleCount(root, "admins-visible-count", rows.length, visible);
  };

  const applyRecords = () => {
    const query = root.querySelector("#records-search")?.value.trim().toLowerCase() || "";
    const type = root.querySelector("#records-type-filter")?.value || "all";
    const rows = [...root.querySelectorAll("#records-table tbody tr[data-record-row]")];
    let visible = 0;
    rows.forEach((row) => {
      const haystack = `${row.dataset.codigo} ${row.dataset.nombre} ${row.dataset.materia} ${row.dataset.profesor} ${row.dataset.grupo} ${row.dataset.equipo} ${row.dataset.observaciones}`.toLowerCase();
      const show = (!query || haystack.includes(query)) && (type === "all" || row.dataset.tipo === type);
      row.hidden = !show;
      if (show) visible += 1;
    });
    updateVisibleCount(root, "records-visible-count", rows.length, visible);
  };

  root.querySelector("#student-search")?.addEventListener("input", applyStudents);
  root.querySelector("#student-status-filter")?.addEventListener("change", applyStudents);
  root.querySelector("#equipment-search")?.addEventListener("input", applyEquipment);
  root.querySelector("#equipment-status-filter")?.addEventListener("change", applyEquipment);
  root.querySelector("#equipment-active-filter")?.addEventListener("change", applyEquipment);
  root.querySelector("#admin-search")?.addEventListener("input", applyAdmins);
  root.querySelector("#admin-status-filter")?.addEventListener("change", applyAdmins);
  root.querySelector("#records-search")?.addEventListener("input", applyRecords);
  root.querySelector("#records-type-filter")?.addEventListener("change", applyRecords);

  root.querySelectorAll("[data-reset-filters]").forEach((button) => {
    button.addEventListener("click", () => {
      const section = button.dataset.resetFilters;
      if (section === "students") {
        root.querySelector("#student-search").value = "";
        root.querySelector("#student-status-filter").value = "all";
        applyStudents();
      }
      if (section === "equipment") {
        root.querySelector("#equipment-search").value = "";
        root.querySelector("#equipment-status-filter").value = "all";
        root.querySelector("#equipment-active-filter").value = "all";
        applyEquipment();
      }
      if (section === "admins") {
        root.querySelector("#admin-search").value = "";
        root.querySelector("#admin-status-filter").value = "all";
        applyAdmins();
      }
      if (section === "records") {
        root.querySelector("#records-search").value = "";
        root.querySelector("#records-type-filter").value = "all";
        applyRecords();
      }
    });
  });

  applyStudents();
  applyEquipment();
  applyAdmins();
  applyRecords();
}

function attachTableSorting(root) {
  const tableId = "equipment-table";
  const table = root.querySelector(`#${tableId}`);
  if (!table) return;

  let currentCol = null;
  let ascending = true;

  table.querySelectorAll("th[data-sort-col]").forEach((th) => {
    th.style.cursor = "pointer";
    th.addEventListener("click", () => {
      const col = th.dataset.sortCol;
      if (currentCol === col) {
        ascending = !ascending;
      } else {
        currentCol = col;
        ascending = true;
      }

      // Update arrow indicators
      table.querySelectorAll("th[data-sort-col] .sort-arrow").forEach((arrow) => {
        arrow.innerHTML = icon("sort");
        arrow.closest("th").classList.remove("sort-asc", "sort-desc");
      });
      const arrow = th.querySelector(".sort-arrow");
      arrow.innerHTML = icon(ascending ? "sort-asc" : "sort-desc");
      th.classList.add(ascending ? "sort-asc" : "sort-desc");

      // Sort visible rows
      const tbody = table.querySelector("tbody");
      const rows = [...tbody.querySelectorAll("tr[data-equipment-row]")];
      rows.sort((a, b) => {
        const aVal = (a.dataset[col] || "").toLowerCase();
        const bVal = (b.dataset[col] || "").toLowerCase();
        // Numeric sort for numero
        if (col === "numero") {
          const aNum = parseFloat(aVal) || 0;
          const bNum = parseFloat(bVal) || 0;
          return ascending ? aNum - bNum : bNum - aNum;
        }
        return ascending ? aVal.localeCompare(bVal, "es") : bVal.localeCompare(aVal, "es");
      });
      rows.forEach((row) => tbody.appendChild(row));
    });
  });
}

function importSection(state) {
  const backupRows =
    state.backups?.items?.length
      ? state.backups.items
          .map(
            (item) => `
              <tr>
                <td>${icon("file")} ${item.file_name}</td>
                <td>${icon("calendar")} ${item.modified_at}</td>
                <td>${icon("save")} ${Math.max(1, Math.round(item.size_bytes / 1024))} KB</td>
                <td><button class="ghost-btn" type="button" data-open-backup="${item.path}">${icon("folder")} Abrir</button></td>
              </tr>
            `
          )
          .join("")
      : `<tr><td colspan="4">${icon("empty")} Sin respaldos todavía.</td></tr>`;

  const summary = state.importSummary
    ? `
      <div class="import-summary">
        <div class="import-summary-head">
          <div>
            <p class="eyebrow">${icon("chart")} Archivo importado</p>
            <h3>${state.importSummary.archivo}</h3>
          </div>
          <div class="import-badge">${icon("file")} ${state.importSummary.formato || "-"}</div>
        </div>
        <div class="import-metrics">
          <article class="import-metric">
            <span>${icon("in")} Alumnos insertados</span>
            <strong>${state.importSummary.alumnos_insertados}</strong>
          </article>
          <article class="import-metric">
            <span>${icon("refresh")} Alumnos actualizados</span>
            <strong>${state.importSummary.alumnos_actualizados}</strong>
          </article>
          <article class="import-metric">
            <span>${icon("skip")} Alumnos omitidos</span>
            <strong>${state.importSummary.alumnos_omitidos}</strong>
          </article>
          <article class="import-metric">
            <span>${icon("in")} Grupos insertados</span>
            <strong>${state.importSummary.grupos_insertados ?? 0}</strong>
          </article>
          <article class="import-metric">
            <span>${icon("refresh")} Grupos actualizados</span>
            <strong>${state.importSummary.grupos_actualizados ?? 0}</strong>
          </article>
          <article class="import-metric">
            <span>${icon("skip")} Grupos omitidos</span>
            <strong>${state.importSummary.grupos_omitidos ?? 0}</strong>
          </article>
        </div>
        <div class="import-sheet-row">
          <span class="import-sheet-label">${icon("clipboard")} Hojas validadas</span>
          <div class="import-chip-row">
            ${
              Array.isArray(state.importSummary.hojas_validadas) && state.importSummary.hojas_validadas.length
                ? state.importSummary.hojas_validadas
                    .map((sheet) => `<span class="import-chip">${icon("file")} ${sheet}</span>`)
                    .join("")
                : `<span class="import-chip muted-chip">${icon("close")} -</span>`
            }
          </div>
        </div>
      </div>
    `
    : `<div class="import-summary soft"><p>${icon("clipboard")} La app acepta <strong>ALUMNOS</strong>, <strong>GRUPOS</strong> o ambas. Tambien conserva el formato legado <strong>GRUPOS + REGISTRO</strong>. Si cambian columnas, nombres o el orden esperado, el archivo se rechaza.</p></div>`;

  return `
    <div class="admin-stack">
      <div class="panel panel-import">
        <div class="panel-header-icon">
          <div class="icon-circle">${icon("in")} </div>
          <div>
            <h3>Importar Excel</h3>
            <p>Carga un archivo con hojas separadas o el formato legado, sin renombrar columnas ni hojas.</p>
          </div>
        </div>
        <div class="section-head">
          <div></div>
          <div class="hero-actions">
            <label class="file-picker">
              <input id="excel-file" type="file" accept=".xlsx,.xlsm" />
              <span class="btn">${icon("chart")} Seleccionar Excel</span>
            </label>
            <button class="btn-secondary" type="button" data-backup-database="true">${icon("save")} Respaldar base</button>
            <label class="file-picker">
              <input id="database-file" type="file" accept=".sqlite,.db" />
              <span class="ghost-btn">${icon("refresh")} Restaurar base</span>
            </label>
          </div>
        </div>
        ${summary}
      </div>
      <div class="spec-grid">
        <article class="panel">
          <div class="panel-header-icon">
            <div class="icon-circle">${icon("clipboard")} </div>
            <div>
              <h3>Especificaciones</h3>
              <p>Formatos y reglas de importación</p>
            </div>
          </div>
          <ul class="spec-list">
            <li>${icon("file")} Solo se aceptan archivos <strong>.xlsx</strong> y <strong>.xlsm</strong>.</li>
            <li>${icon("clipboard")} Puedes subir solo <strong>ALUMNOS</strong>, solo <strong>GRUPOS</strong> o ambas hojas en el mismo libro.</li>
            <li>${icon("file")} La hoja <strong>ALUMNOS</strong> debe tener: <strong>Código</strong>, <strong>Nombre</strong>, <strong>Materia</strong>, <strong>Profesor(a)</strong> y <strong>Grupo</strong>.</li>
            <li>${icon("file")} La hoja <strong>GRUPOS</strong> debe tener: <strong>Grupo</strong>, <strong>Turno</strong> y <strong>Ciclo escolar</strong>. El turno debe ser <strong>MAT</strong> o <strong>VES</strong>.</li>
            <li>${icon("clipboard")} Tambien se acepta el formato legado con <strong>GRUPOS</strong> y <strong>REGISTRO</strong>.</li>
            <li>${icon("refresh")} Si el codigo del alumno ya existe, se actualiza; si no, se crea. Si el grupo ya existe por grupo, turno y ciclo, se actualiza; si no, se crea.</li>
            <li>${icon("save")} <strong>Respaldar base</strong> crea una copia completa de la base actual en la carpeta de respaldos de la app.</li>
            <li>${icon("refresh")} <strong>Restaurar base</strong> reemplaza la base actual por un archivo <strong>.sqlite</strong> o <strong>.db</strong> válido y genera un respaldo automático antes.</li>
          </ul>
        </article>
        <article class="panel">
          <div class="section-head">
            <div>
              <h3>${icon("folder")} Historial de respaldos</h3>
              <p class="muted">${icon("folder")} Carpeta: ${state.backups?.directory || "No disponible"}</p>
            </div>
            <button class="ghost-btn" type="button" data-open-backups-folder="${state.backups?.directory || ""}">${icon("folder")} Abrir carpeta</button>
          </div>
          <div class="table-wrap compact-table">
            <table>
              <thead><tr><th>Archivo</th><th>Fecha</th><th>Tamaño</th><th>Acción</th></tr></thead>
              <tbody>${backupRows}</tbody>
            </table>
          </div>
        </article>
        <article class="panel">
          <div class="panel-header-icon">
            <div class="icon-circle">${icon("file")} </div>
            <div>
              <h3>Ejemplo ALUMNOS</h3>
              <p>Formato esperado para la hoja de alumnos</p>
            </div>
          </div>
          <div class="table-wrap compact-table">
            <table>
              <thead><tr><th>${icon("hash")} Código</th><th>${icon("user")} Nombre</th><th>${icon("book")} Materia</th><th>${icon("user")} Profesor(a)</th><th>${icon("school")} Grupo</th></tr></thead>
              <tbody>
                <tr><td>240145</td><td>María Pérez</td><td>Fotografía</td><td>Laura Soto</td><td>5AV</td></tr>
                <tr><td>240146</td><td>Diego Núñez</td><td>Iluminación</td><td>Rafael Cruz</td><td>5AV</td></tr>
                <tr><td>240147</td><td>Ana López</td><td>Edición</td><td>Mariana Vega</td><td>5BV</td></tr>
              </tbody>
            </table>
          </div>
          <h3 style="margin-top: 20px;">${icon("clipboard")} Ejemplo GRUPOS</h3>
          <div class="table-wrap compact-table">
            <table>
              <thead><tr><th>${icon("school")} Grupo</th><th>${icon("clock")} Turno</th><th>${icon("calendar")} Ciclo escolar</th></tr></thead>
              <tbody>
                <tr><td>5AV</td><td>MAT</td><td>2025-2026</td></tr>
                <tr><td>5BV</td><td>VES</td><td>2025-2026</td></tr>
                <tr><td>6AV</td><td>MAT</td><td>2025-2026</td></tr>
              </tbody>
            </table>
          </div>
          <p class="muted" style="margin-top: 12px;">${icon("clipboard")} Formato legado: si subes <strong>GRUPOS + REGISTRO</strong>, se sigue validando como antes.</p>
        </article>
      </div>
    </div>
  `;
}

function studentsSection(state) {
  return `
    <article class="panel">
      <div class="section-head">
        <div>
          <h3>Alumnos</h3>
          <p id="students-visible-count" class="muted">${state.students.length} de ${state.students.length} visibles</p>
        </div>
        <button class="ghost-btn" type="button" data-reset-filters="students">Limpiar filtros</button>
      </div>
      <details class="inline-form" id="student-create-panel">
        <summary>${icon("plus")} Agregar alumno</summary>
        <form id="student-create-form" class="form-grid" aria-label="Formulario para agregar alumno">
          <label for="new-student-codigo">Codigo<input id="new-student-codigo" name="codigo" required /></label>
          <label for="new-student-nombre">Nombre<input id="new-student-nombre" name="nombre" required /></label>
          <label for="new-student-materia">Materia<input id="new-student-materia" name="materia" required /></label>
          <label for="new-student-profesor">Profesor<input id="new-student-profesor" name="profesor" required /></label>
          <label for="new-student-grupo">Grupo<input id="new-student-grupo" name="grupo" required /></label>
          <button class="btn" type="submit">Agregar alumno</button>
        </form>
      </details>
      <div class="toolbar-filters">
        <div class="search-highlight" style="position:relative;">
          <input id="student-search" placeholder="Buscar alumno" aria-label="Buscar alumno por codigo, nombre, materia" />
        </div>
        <select id="student-status-filter" aria-label="Filtrar por estado">
          <option value="all">Todos</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
        </select>
      </div>
      <div class="table-wrap">
        <table id="students-table" role="grid" aria-label="Tabla de alumnos">
          <thead>
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Nombre</th>
              <th scope="col">Materia</th>
              <th scope="col">Profesor</th>
              <th scope="col">Grupo</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>${studentRows(state.students)}</tbody>
        </table>
      </div>
    </article>
  `;
}

function equipmentSection(state) {
  return `
    <article class="panel">
      <div class="section-head">
        <div>
          <h3>Equipos</h3>
          <p id="equipment-visible-count" class="muted">${state.equipment.length} de ${state.equipment.length} visibles</p>
        </div>
        <button class="ghost-btn" type="button" data-reset-filters="equipment">Limpiar filtros</button>
      </div>
      <details class="inline-form" id="equipment-create-panel">
        <summary>${icon("plus")} Agregar equipo</summary>
        <form id="equipment-create-form" class="form-grid" aria-label="Formulario para agregar equipo">
          <label for="new-equipment-numero">Numero<input id="new-equipment-numero" name="numero" required /></label>
          <label for="new-equipment-tipo">Tipo<input id="new-equipment-tipo" name="tipo" placeholder="Ej: Camara, Lente" required /></label>
          <label for="new-equipment-descripcion">Descripcion<input id="new-equipment-descripcion" name="descripcion" required /></label>
          <label for="new-equipment-estado">
            Estado
            <select id="new-equipment-estado" name="estado">
              <option value="disponible">disponible</option>
              <option value="prestado">prestado</option>
            </select>
          </label>
          <button class="btn" type="submit">Agregar equipo</button>
        </form>
      </details>
      <div class="toolbar-filters three-up">
        <div class="search-highlight" style="position:relative;">
          <input id="equipment-search" placeholder="Buscar equipo" aria-label="Buscar equipo por numero, tipo, descripcion" />
        </div>
        <select id="equipment-status-filter" aria-label="Filtrar por estado del equipo">
          <option value="all">Todos los estados</option>
          <option value="disponible">Disponibles</option>
          <option value="prestado">Prestados</option>
        </select>
        <select id="equipment-active-filter" aria-label="Filtrar por estado activo">
          <option value="all">Activos e inactivos</option>
          <option value="active">Solo activos</option>
          <option value="inactive">Solo inactivos</option>
        </select>
      </div>
      <div class="table-wrap">
        <table id="equipment-table" role="grid" aria-label="Tabla de equipos">
          <thead>
            <tr>
              <th scope="col" data-sort-col="numero" class="sortable-th">Numero <span class="sort-arrow">${icon("sort")}</span></th>
              <th scope="col" data-sort-col="tipo" class="sortable-th">Tipo <span class="sort-arrow">${icon("sort")}</span></th>
              <th scope="col" data-sort-col="descripcion" class="sortable-th">Descripcion <span class="sort-arrow">${icon("sort")}</span></th>
              <th scope="col" data-sort-col="estado" class="sortable-th">Estado <span class="sort-arrow">${icon("sort")}</span></th>
              <th scope="col" data-sort-col="activo" class="sortable-th">Activo <span class="sort-arrow">${icon("sort")}</span></th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>${equipmentRows(state.equipment)}</tbody>
        </table>
      </div>
    </article>
  `;
}

function adminsSection(state) {
  return `
    <article class="panel">
      <div class="section-head">
        <div>
          <h3>Administradores</h3>
          <p id="admins-visible-count" class="muted">${state.admins.length} de ${state.admins.length} visibles</p>
        </div>
        <button class="ghost-btn" type="button" data-reset-filters="admins">Limpiar filtros</button>
      </div>
      <details class="inline-form" id="admin-create-panel">
        <summary>${icon("plus")} Agregar administrador</summary>
        <form id="admin-create-form" class="form-grid" aria-label="Formulario para agregar administrador">
          <label for="new-admin-usuario">Usuario<input id="new-admin-usuario" name="usuario" required /></label>
          <label for="new-admin-nombre">Nombre<input id="new-admin-nombre" name="nombre" required /></label>
          <label for="new-admin-password">Contrasena<input id="new-admin-password" name="password" type="password" required /></label>
          <button class="btn" type="submit">Agregar administrador</button>
        </form>
      </details>
      <div class="toolbar-filters">
        <div class="search-highlight" style="position:relative;">
          <input id="admin-search" placeholder="Buscar administrador" aria-label="Buscar administrador por usuario o nombre" />
        </div>
        <select id="admin-status-filter" aria-label="Filtrar por estado">
          <option value="all">Todos</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
        </select>
      </div>
      <div class="table-wrap">
        <table id="admins-table" role="grid" aria-label="Tabla de administradores">
          <thead>
            <tr>
              <th scope="col">Usuario</th>
              <th scope="col">Nombre</th>
              <th scope="col">Nueva contrasena</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>${adminRows(state.admins)}</tbody>
        </table>
      </div>
    </article>
  `;
}

function recordsSection(state) {
  return `
    <article class="panel">
      <div class="section-head">
        <div>
          <h3>Historial de Registros</h3>
          <p id="records-visible-count" class="muted">${state.records.length} de ${state.records.length} visibles</p>
        </div>
        <div class="hero-actions">
          <button class="ghost-btn" type="button" data-reset-filters="records">Limpiar filtros</button>
          <button class="btn-secondary" type="button" data-export-records="true" aria-label="Exportar registros a CSV">Exportar CSV</button>
          <button class="btn-danger" type="button" data-clear-records="true" aria-label="Borrar todo el historial">Borrar historial</button>
        </div>
      </div>
      <details class="inline-form" id="records-filter-panel">
        <summary>${icon("search")} Buscar por alumno o rango de fechas</summary>
        <form id="records-filter-form" class="form-grid" aria-label="Formulario para filtrar registros">
          <label for="records-alumno">Alumno<input id="records-alumno" name="alumno_query" value="${state.recordFilters.alumno_query || ""}" placeholder="Codigo o nombre del alumno" /></label>
          <label for="records-fecha-inicio">Fecha inicio<input type="date" id="records-fecha-inicio" name="fecha_inicio" value="${state.recordFilters.fecha_inicio || ""}" /></label>
          <label for="records-fecha-fin">Fecha fin<input type="date" id="records-fecha-fin" name="fecha_fin" value="${state.recordFilters.fecha_fin || ""}" /></label>
          <button class="btn" type="submit">Filtrar</button>
        </form>
      </details>
      <div class="toolbar-filters">
        <div class="search-highlight" style="position:relative;">
          <input id="records-search" placeholder="Buscar en resultados" aria-label="Buscar en resultados cargados" />
        </div>
        <select id="records-type-filter" aria-label="Filtrar por tipo">
          <option value="all">Todos los tipos</option>
          <option value="prestamo">Prestamos</option>
          <option value="devolucion">Devoluciones</option>
        </select>
      </div>
      <div class="table-wrap">
        <table id="records-table" role="grid" aria-label="Tabla de registros">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Tipo</th>
              <th scope="col">Codigo</th>
              <th scope="col">Nombre</th>
              <th scope="col">Materia</th>
              <th scope="col">Profesor</th>
              <th scope="col">Grupo</th>
              <th scope="col">Equipo</th>
              <th scope="col">Obs.</th>
            </tr>
          </thead>
          <tbody>${recordRows(state.records)}</tbody>
        </table>
      </div>
    </article>
  `;
}

function reportsSection(state) {
  const studentOptions = state.students
    .map((student) => `<option value="${student.id}">${student.codigo} - ${student.nombre}</option>`)
    .join("");

  return `
    <article class="panel panel-reports">
      <div class="panel-header-icon">
        <div class="icon-circle">${icon("chart")}</div>
        <div>
          <h3>Generar Reportes</h3>
          <p>Selecciona el tipo de reporte y los filtros deseados</p>
        </div>
      </div>
      <form id="report-form" class="form-grid" aria-label="Formulario para generar reportes">
        <label for="report-type">
          Tipo de reporte
          <select id="report-type" name="report_type">
            <option value="prestamos_por_alumno">Prestamos por alumno</option>
            <option value="prestamos_por_fecha">Prestamos por fecha</option>
            <option value="equipos_mas_usados">Equipos mas usados</option>
          </select>
        </label>
        <label for="report-alumno">
          Alumno
          <select id="report-alumno" name="alumno_id">
            <option value="">Todos</option>
            ${studentOptions}
          </select>
        </label>
        <div class="two-col">
          <label for="report-fecha-inicio">Fecha inicio<input type="date" id="report-fecha-inicio" name="fecha_inicio" /></label>
          <label for="report-fecha-fin">Fecha fin<input type="date" id="report-fecha-fin" name="fecha_fin" /></label>
        </div>
        <div class="two-col">
          <button class="btn" type="submit" data-report-action="preview">Vista previa</button>
          <button class="btn-secondary" type="submit" data-report-action="table">Solo consultar</button>
        </div>
      </form>
      ${
        state.lastGeneratedPdfPath
          ? `<div class="report-quick-actions"><button class="ghost-btn" type="button" data-open-last-pdf="true" aria-label="Abrir ultimo PDF generado">Abrir ultimo PDF</button></div>`
          : ""
      }
    </article>
    <article class="panel">
      <div class="panel-header-icon">
        <div class="icon-circle">${icon("eye")}</div>
        <div>
          <h3>${state.reportData?.titulo || "Vista previa del reporte"}</h3>
          <p>Resultados de la consulta</p>
        </div>
      </div>
      <div class="table-wrap">
        <table aria-label="Tabla de resultados del reporte">
          <thead>
            <tr><th scope="col">Concepto</th><th scope="col">Total</th><th scope="col">Detalle</th></tr>
          </thead>
          <tbody>${reportRows(state.reportData)}</tbody>
        </table>
      </div>
    </article>
  `;
}

function currentSection(state) {
  switch (state.adminSection) {
    case "import":
      return importSection(state);
    case "students":
      return studentsSection(state);
    case "equipment":
      return equipmentSection(state);
    case "admins":
      return adminsSection(state);
    case "records":
      return recordsSection(state);
    case "reports":
      return reportsSection(state);
    default:
      return `
        <div class="panel">
          <div class="panel-header-icon">
            <div class="icon-circle">${icon("chart")} </div>
            <div>
              <h3>Resumen del Dashboard</h3>
              <p>Estadísticas generales del sistema</p>
            </div>
          </div>
          ${dashboardSummary(state.dashboard, state.admins.filter((admin) => admin.activo).length)}
        </div>
      `;
  }
}

function findRowValues(row) {
  const values = {};
  row.querySelectorAll("[data-field]").forEach((input) => {
    values[input.dataset.field] = input.value;
  });
  return values;
}

export function renderAdminView(root, store) {
  const state = store.getState();

  if (!state.adminAuthenticated) {
    root.innerHTML = `
      <section class="login-wrap" role="main">
        <article class="login-card">
          <header class="login-head">
            <div class="login-badge">${icon("lock")}</div>
            <span class="login-eyebrow">Acceso restringido</span>
            <h2>Panel Administrador</h2>
            <p>Ingresa tus credenciales para continuar</p>
          </header>
          ${bannerMarkup(state.flash)}
          <form id="admin-login-form" class="form-grid" autocomplete="off" aria-label="Formulario de inicio de sesion">
            <label for="login-usuario">Usuario<input id="login-usuario" name="usuario" autocomplete="off" required /></label>
            <label for="login-password">Contrasena<input id="login-password" type="password" name="password" autocomplete="new-password" required /></label>
            <button class="btn btn-block" type="submit">INGRESAR</button>
          </form>
          <p class="login-note">Solo personal autorizado de la Preparatoria Quince.</p>
        </article>
      </section>
    `;

    root.querySelector("#admin-login-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      await store.actions.adminLogin(String(data.get("usuario") || ""), String(data.get("password") || ""));
    });
    return;
  }

  root.innerHTML = `
    ${bannerMarkup(state.flash)}

    <div class="admin-layout">
    <nav class="admin-sidebar" aria-label="Secciones del administrador">
      <button class="dashboard-tile ${state.adminSection === "import" ? "active" : ""}" data-section="import" type="button" aria-pressed="${state.adminSection === "import"}">
        <span class="tile-icon">${icon("in")}</span>
        <strong>IMPORTAR</strong>
        <span>Especificaciones</span>
      </button>
      <button class="dashboard-tile ${state.adminSection === "students" ? "active" : ""}" data-section="students" type="button" aria-pressed="${state.adminSection === "students"}">
        <span class="tile-icon">${icon("users")}</span>
        <strong>ALUMNOS</strong>
        <span>Altas y edicion</span>
      </button>
      <button class="dashboard-tile ${state.adminSection === "equipment" ? "active" : ""}" data-section="equipment" type="button" aria-pressed="${state.adminSection === "equipment"}">
        <span class="tile-icon">${icon("package")}</span>
        <strong>EQUIPOS</strong>
        <span>Inventario</span>
      </button>
      <button class="dashboard-tile ${state.adminSection === "admins" ? "active" : ""}" data-section="admins" type="button" aria-pressed="${state.adminSection === "admins"}">
        <span class="tile-icon">${icon("user")}</span>
        <strong>ADMINS</strong>
        <span>Agregar y editar</span>
      </button>
      <button class="dashboard-tile ${state.adminSection === "records" ? "active" : ""}" data-section="records" type="button" aria-pressed="${state.adminSection === "records"}">
        <span class="tile-icon">${icon("clipboard")}</span>
        <strong>REGISTROS</strong>
        <span>Historial</span>
      </button>
      <button class="dashboard-tile ${state.adminSection === "reports" ? "active" : ""}" data-section="reports" type="button" aria-pressed="${state.adminSection === "reports"}">
        <span class="tile-icon">${icon("chart")}</span>
        <strong>REPORTES</strong>
        <span>Vista y PDF</span>
      </button>
    </nav>
      <div class="admin-main">
        ${currentSection(state)}
      </div>
    </div>

    ${reportPreviewModal(state)}
  `;

  root.querySelectorAll("[data-section]").forEach((button) => {
    button.addEventListener("click", () => store.actions.setAdminSection(button.dataset.section));
  });

  root.querySelector("#excel-file")?.addEventListener("change", async (event) => {
    const [file] = event.currentTarget.files || [];
    if (file) {
      await store.actions.importExcelFile(file);
      event.currentTarget.value = "";
    }
  });

  root.querySelector("[data-backup-database='true']")?.addEventListener("click", async () => {
    await store.actions.backupDatabase();
  });

  root.querySelector("[data-open-backups-folder]")?.addEventListener("click", async (event) => {
    const path = event.currentTarget.dataset.openBackupsFolder;
    if (path) {
      await store.actions.openPath(path);
    }
  });

  root.querySelectorAll("[data-open-backup]").forEach((button) => {
    button.addEventListener("click", async () => {
      await store.actions.openPath(button.dataset.openBackup);
    });
  });

  root.querySelector("#database-file")?.addEventListener("change", async (event) => {
    const [file] = event.currentTarget.files || [];
    if (!file) return;
    const confirmed = window.confirm("Se reemplazará la base de datos actual con el archivo seleccionado. Antes se creará un respaldo automático. ¿Deseas continuar?");
    if (confirmed) {
      await store.actions.restoreDatabase(file);
    }
    event.currentTarget.value = "";
  });

  root.querySelector("#student-create-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await store.actions.createStudent({
      codigo: String(data.get("codigo") || "").trim(),
      nombre: String(data.get("nombre") || "").trim(),
      materia: String(data.get("materia") || "").trim(),
      profesor: String(data.get("profesor") || "").trim(),
      grupo: String(data.get("grupo") || "").trim(),
      activo: true
    });
    event.currentTarget.reset();
  });

  root.querySelectorAll("[data-save-student]").forEach((button) => {
    button.addEventListener("click", async () => {
      const row = button.closest("tr");
      const values = findRowValues(row);
      await store.actions.updateStudent({
        id: Number(button.dataset.saveStudent),
        codigo: values.codigo.trim(),
        nombre: values.nombre.trim(),
        materia: values.materia.trim(),
        profesor: values.profesor.trim(),
        grupo: values.grupo.trim(),
        activo: values.activo === "1"
      });
    });
  });

  root.querySelectorAll("[data-delete-student]").forEach((button) => {
    button.addEventListener("click", async () => {
      await store.actions.deleteStudent(Number(button.dataset.deleteStudent));
    });
  });

  root.querySelector("#equipment-create-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await store.actions.createEquipment({
      numero: String(data.get("numero") || "").trim(),
      tipo: String(data.get("tipo") || "").trim(),
      descripcion: String(data.get("descripcion") || "").trim(),
      estado: String(data.get("estado") || "disponible"),
      activo: true
    });
    event.currentTarget.reset();
  });

  root.querySelectorAll("[data-save-equipment]").forEach((button) => {
    button.addEventListener("click", async () => {
      const row = button.closest("tr");
      const values = findRowValues(row);
      await store.actions.updateEquipment({
        id: Number(button.dataset.saveEquipment),
        numero: values.numero.trim(),
        tipo: values.tipo.trim(),
        descripcion: values.descripcion.trim(),
        estado: values.estado,
        activo: values.activo === "1"
      });
    });
  });

  root.querySelectorAll("[data-delete-equipment]").forEach((button) => {
    button.addEventListener("click", async () => {
      await store.actions.deleteEquipment(Number(button.dataset.deleteEquipment));
    });
  });

  root.querySelector("#admin-create-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await store.actions.createAdmin({
      usuario: String(data.get("usuario") || "").trim(),
      nombre: String(data.get("nombre") || "").trim(),
      password: String(data.get("password") || "").trim(),
      activo: true
    });
    event.currentTarget.reset();
  });

  root.querySelectorAll("[data-save-admin]").forEach((button) => {
    button.addEventListener("click", async () => {
      const row = button.closest("tr");
      const values = findRowValues(row);
      await store.actions.updateAdmin({
        id: Number(button.dataset.saveAdmin),
        usuario: values.usuario.trim(),
        nombre: values.nombre.trim(),
        password: values.password.trim() || null,
        activo: values.activo === "1"
      });
    });
  });

  root.querySelectorAll("[data-delete-admin]").forEach((button) => {
    button.addEventListener("click", async () => {
      await store.actions.deleteAdmin(Number(button.dataset.deleteAdmin));
    });
  });

  root.querySelector("#records-filter-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await store.actions.loadRecords({
      alumno_query: String(data.get("alumno_query") || "").trim() || null,
      fecha_inicio: String(data.get("fecha_inicio") || "").trim() || null,
      fecha_fin: String(data.get("fecha_fin") || "").trim() || null
    });
  });

  root.querySelector("[data-clear-records='true']")?.addEventListener("click", async () => {
    const confirmed = window.confirm("Se borrará todo el historial de préstamos y devoluciones. Esta acción no se puede deshacer.");
    if (!confirmed) return;
    await store.actions.clearRecords();
  });

  root.querySelector("[data-export-records='true']")?.addEventListener("click", async () => {
    await store.actions.exportRecordsCsv();
  });

  root.querySelector("#report-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const request = {
      report_type: String(data.get("report_type") || ""),
      alumno_id: data.get("alumno_id") ? Number(data.get("alumno_id")) : null,
      fecha_inicio: String(data.get("fecha_inicio") || "").trim() || null,
      fecha_fin: String(data.get("fecha_fin") || "").trim() || null
    };
    const submitterAction = event.submitter?.dataset.reportAction || "preview";
    if (submitterAction === "preview") {
      await store.actions.openReportPreview(request);
    } else {
      await store.actions.loadReportData(request);
    }
  });

  root.querySelectorAll("[data-close-report-preview]").forEach((button) => {
    button.addEventListener("click", () => {
      store.actions.closeReportPreview();
    });
  });

  root.querySelector("[data-generate-report-from-preview='true']")?.addEventListener("click", async () => {
    await store.actions.generateReportPdf();
  });

  root.querySelector("[data-print-report-preview='true']")?.addEventListener("click", () => {
    if (state.reportData) {
      printReportPreview(state.reportData);
    }
  });

  root.querySelector("[data-open-last-pdf='true']")?.addEventListener("click", async () => {
    await store.actions.openGeneratedPdf();
  });

  attachTableFilters(root);
  attachTableSorting(root);
}
