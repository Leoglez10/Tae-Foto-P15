<div align="center">

<img src="img/logo-p15.png" alt="Logo Preparatoria 15" width="150"/>

# Préstamo de Equipos — TAE Foto

### Control de préstamos de equipo fotográfico y audiovisual para la Preparatoria Quince

[![CI — Build Windows Installer](https://github.com/Leoglez10/Tae-Foto-P15/actions/workflows/build-windows.yml/badge.svg)](https://github.com/Leoglez10/Tae-Foto-P15/actions/workflows/build-windows.yml)
[![Versión](https://img.shields.io/badge/versi%C3%B3n-0.1.0-blue)]()
[![Plataforma](https://img.shields.io/badge/plataforma-Windows%2010%2F11-blue)]()
[![Licencia](https://img.shields.io/badge/licencia-no%20definida-lightgrey)](#️-licencia-y-uso)
[![Autor](https://img.shields.io/badge/autor-Leonardo%20Gonzalez-purple)](https://github.com/Leoglez10)

![Tauri](https://img.shields.io/badge/Tauri-v2-24C8DB?logo=tauri&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-edition%202021-000000?logo=rust&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla%20ESM-F7DF1E?logo=javascript&logoColor=black)
![SQLite](https://img.shields.io/badge/SQLite-local-003B57?logo=sqlite&logoColor=white)
![Offline](https://img.shields.io/badge/100%25-offline-success)

[**⬇️ Descargar para Windows**](https://github.com/Leoglez10/Tae-Foto-P15/releases/tag/auto) ·
[**📂 Repositorio**](https://github.com/Leoglez10/Tae-Foto-P15) ·
[**🐞 Reportar un problema**](https://github.com/Leoglez10/Tae-Foto-P15/issues)

</div>

---

> **Este README está escrito para CUALQUIER persona**: profesor, administrador, becario o alguien que nunca programó. Si eres programador, salta a [Mantenimiento y desarrollo](#-mantenimiento-y-desarrollo).

> 🚀 **¿Tienes prisa?**
> 1. Instala la app → [Instalar en Windows](#instalar-en-windows)
> 2. Entra al panel y cambia la cuenta de fábrica `admin` / `1234` → [Acceso al panel](#acceso-al-panel)
> 3. Haz tu primer respaldo → [Respaldos y restauración](#respaldos-y-restauración)
>
> El resto es opcional: [prestar y devolver equipos](#cómo-prestar-un-equipo), [importar alumnos desde Excel](#importar-usuarios-desde-excel) o [entender la arquitectura](#-mantenimiento-y-desarrollo).

---

## 🎯 ¿Qué es esta app?

Es un **programa de escritorio para Windows** (se instala en una computadora, NO se abre en el navegador ni en el celular) que controla el préstamo de equipos —laptops, cámaras y otros activos— de la Preparatoria Quince.

Los alumnos escanean su código para registrar un préstamo o una devolución en segundos, mientras el personal administrativo gestiona alumnos, inventario, reportes y respaldos desde un panel protegido.

La app responde a 3 preguntas básicas:

1. **¿Qué equipo prestamos?**
2. **¿A quién se lo prestamos?**
3. **¿Cuándo nos lo devolvieron?**

> 💡 Piensa en ella como una **libreta digital de préstamos** que no se pierde, no se borra y no depende de internet: los datos viven en SQLite, dentro de esa computadora.

| Dato | Estado |
|---|---|
| Plataforma objetivo | Windows x64 |
| Versión de la aplicación | `0.1.0` |
| Tecnología | Tauri 2 + Rust + JavaScript + SQLite |
| Operación | Local, sin servidor externo |
| Créditos del proyecto | **Leonardo Gonzalez** |

> [!IMPORTANT]
> La instalación inicial crea el acceso `admin` / `1234` y la versión actual guarda las contraseñas administrativas en texto plano. Cambie esa contraseña en el primer uso, limite el acceso al equipo y nunca comparta la base de datos ni los Excel con datos de alumnos en repositorios o tickets públicos.

---

## 👥 ¿Para quién es?

| Rol | Qué hace en la app | Empiece aquí |
|---|---|---|
| 🎓 **Profesor / responsable de entrega** | Presta y recibe equipos en el modo ESTUDIANTE. **No necesita contraseña.** | [Guía para profesores](#-guía-para-profesores) |
| 🛡 **Administrador** | Entra con usuario + contraseña: alumnos, inventario, reportes, respaldos e importaciones. | [Guía para administradores](#-guía-para-administradores) |
| 🔧 **Soporte / mantenimiento** | Instala, actualiza, compila y depura la aplicación. | [Mantenimiento y desarrollo](#-mantenimiento-y-desarrollo) |
| 📥 **Encargado de listas** | Carga alumnos e historiales desde Excel. | [Importación de datos: dos rutas](#importación-de-datos-dos-rutas) |

> ⚠️ **Importante**: la app está pensada para **una computadora compartida** (la de la oficina o la coordinación). No es una app web ni un sistema en la nube: los datos viven **dentro de esa computadora**.

---

## ⚡ Inicio rápido

### Instalar en Windows

1. Abra la [release más reciente](https://github.com/Leoglez10/Tae-Foto-P15/releases/tag/auto).
2. Descargue el instalador `.exe` (NSIS) o el paquete `.msi` para Windows x64.
3. Si Windows bloquea el archivo, abra **Propiedades**, marque **Desbloquear**, aplique el cambio y vuelva a ejecutarlo.
4. Inicie la aplicación y cambie de inmediato la cuenta inicial `admin` / `1234` desde **Administrador → Admins**.
5. Haga un primer respaldo desde **Administrador → Importar → Respaldar base**.

WebView2 suele venir instalado en Windows 10 y 11. Si la aplicación no abre o muestra una ventana vacía, instale el [runtime WebView2](https://developer.microsoft.com/microsoft-edge/webview2/) y vuelva a intentarlo.

## 📑 Tabla de contenidos

1. [¿Qué es esta app?](#-qué-es-esta-app)
2. [¿Para quién es?](#-para-quién-es)
3. [Inicio rápido](#-inicio-rápido)
4. [Guía para profesores](#-guía-para-profesores)
   - [¿Qué hace la aplicación?](#qué-hace-la-aplicación)
   - [Cómo prestar un equipo](#cómo-prestar-un-equipo)
   - [Cómo registrar una devolución](#cómo-registrar-una-devolución)
   - [Si algo falla](#si-algo-falla)
5. [Guía para administradores](#-guía-para-administradores)
   - [Acceso al panel](#acceso-al-panel)
   - [Secciones del panel](#secciones-del-panel)
   - [Alumnos, equipos y administradores](#alumnos-equipos-y-administradores)
   - [Importar usuarios desde Excel](#importar-usuarios-desde-excel)
   - [Respaldos y restauración](#respaldos-y-restauración)
   - [Dónde viven los datos](#dónde-viven-los-datos)
6. [Mantenimiento y desarrollo](#-mantenimiento-y-desarrollo)
   - [Stack técnico](#stack-técnico)
   - [Arquitectura de carpetas](#arquitectura-de-carpetas)
   - [Esquema de base de datos](#esquema-de-base-de-datos)
   - [Comandos Rust expuestos al frontend](#comandos-rust-expuestos-al-frontend)
   - [Flujo de préstamo y devolución](#flujo-de-préstamo-y-devolución)
   - [Importación de datos: dos rutas](#importación-de-datos-dos-rutas)
   - [Script de importación PowerShell](#script-de-importación-powershell)
   - [Plantillas Excel incluidas](#plantillas-excel-incluidas)
   - [Build y release](#build-y-release)
   - [Desarrollo y depuración](#desarrollo-y-depuración)
   - [Respaldo y migración del esquema](#respaldo-y-migración-del-esquema)
   - [Problemas conocidos](#problemas-conocidos)
7. [Prompt de IA para importar usuarios](#-prompt-de-ia-para-importar-usuarios)
8. [Seguridad y privacidad](#-seguridad-y-privacidad)
9. [Soporte](#-soporte)
10. [Versionado](#-versionado)
11. [Cómo contribuir](#-cómo-contribuir)
12. [Licencia y uso](#️-licencia-y-uso)
13. [Créditos](#-créditos)

---

## 🎓 Guía para profesores

### ¿Qué hace la aplicación?

Registra qué alumno se lleva qué equipo, y cuándo lo devuelve. Reemplaza la lista manual del archivo `REGISTRO FOTO.xlsm`.

La pantalla inicial tiene dos botones grandes:

- **ESTUDIANTE** (o tecla `1`): para prestar y devolver equipos. Es el modo del día a día.
- **ADMINISTRADOR** (o tecla `2`): panel para dar de alta alumnos, equipos, reportes y respaldos. Pide contraseña.

Para el trabajo cotidiano solo necesita el modo **ESTUDIANTE**.

### Cómo prestar un equipo

1. En la pantalla de inicio, toque **ESTUDIANTE**.
2. Escanee (o escriba) el **código del alumno** en el campo grande y presione `Enter`. Aparecen el nombre, la materia y el grupo del alumno.
3. Toque el **equipo** que se lleva en la cuadrícula de disponibles (puede buscarlo por número si hay muchos).
4. Si quiere, escriba una **observación** (por ejemplo "funda raída").
5. Toque **Registrar préstamo**.
6. La pantalla muestra un aviso verde grande con el número de equipo. Se cierra solo a los 2 segundos; puede tocarla para continuar antes.

Listo. La app queda lista para el siguiente alumno: escanee otro código.

> El sistema permite **un solo préstamo activo por alumno** y **un solo préstamo activo por equipo**. Si el alumno ya tiene un equipo, la app pasa automáticamente al modo devolución.

### Cómo registrar una devolución

1. En modo ESTUDIANTE, escanee el **código del alumno**.
2. La app detecta que tiene un préstamo activo y cambia sola a modo devolución: muestra el equipo prestado y el botón rojo **Registrar devolución**.
3. No hace falta elegir equipo (ya sabe cuál es). Agregue observaciones si hubo algún detalle.
4. Toque **Registrar devolución**. El aviso azul confirma la devolución.

Atajos útiles:

| Tecla | Acción |
|---|---|
| `Enter` | Buscar el código capturado / confirmar registro desde observaciones o equipo elegido |
| `Esc` (en la operación) | Limpiar el formulario actual |
| `Esc` (fuera de la operación) | Volver a la pantalla de inicio |

### Si algo falla

| Problema | Causa probable | Qué hacer |
|---|---|---|
| El código no aparece / dice "Registro no encontrado" | El alumno no está dado de alta, o el código se capturó mal | Verifique el código; si sigue sin aparecer, pida a un administrador que lo dé de alta o lo importe desde Excel |
| Dice "El alumno ya tiene un préstamo activo" | Intenta llevarse otro equipo teniendo uno pendiente | Primero registre la devolución del equipo anterior |
| El equipo aparece como prestado o no disponible | Otro alumno lo tomó primero y la pantalla no se refrescó | Espere un momento y vuelva a elegir equipo; la lista solo muestra disponibles |
| El lector escribe pero no busca | El lector no envía `Enter` al final | Configure el lector para enviar `Enter`, o toque el botón **Buscar** |
| La ventana no abre o quedó congelada | La app se cerró mal o WebView2 no está disponible | Cierre y vuelva a abrir la app; si persiste, instale WebView2 y contacte a soporte. No borre la carpeta de datos |
| Ninguna pantalla responde y aparecen errores raros | Problema de instalación o de base de datos | No borre nada: llame a quien da soporte (ver abajo) |

**A quién pedir ayuda:** contacte al administrador del sistema de la Preparatoria Quince (quien instala y actualiza la aplicación). Para problemas de contraseñas del panel, también es la persona indicada.

---

## 🛡 Guía para administradores

### Acceso al panel

1. En la pantalla inicial, toque **ADMINISTRADOR** (o tecla `2`).
2. Escriba usuario y contraseña, y presione **INGRESAR**.

La primera vez existe una cuenta por defecto: usuario `admin`, contraseña `1234`.
**Cámbiela antes de operar con datos reales**: entre a la sección **Admins**, edite la fila del usuario `admin`, escriba una contraseña nueva y guarde.

Para salir, use **Cerrar sesión** (arriba a la derecha).

### Secciones del panel

| Sección | Para qué sirve |
|---|---|
| **Resumen** | Contadores rápidos: alumnos activos, equipos disponibles, préstamos activos, registros totales y administradores. Los botones llevan a cada sección. |
| **Registros** | Historial completo de préstamos y devoluciones. Permite buscar por alumno, filtrar por rango de fechas y tipo, **exportar a CSV** y borrar todo el historial (¡con confirmación!). |
| **Alumnos** | Alta, edición y baja de alumnos. Búsqueda y filtro por estado. |
| **Equipos** | Inventario de equipos: alta, edición, baja, filtros por estado/activo y ordenamiento por columna. |
| **Reportes** | Tres reportes: préstamos por alumno, préstamos por fecha y equipos más usados. Vista previa, impresión y generación de PDF. |
| **Importar** | Carga masiva de alumnos/grupos desde Excel, **respaldo de la base** y **restauración** desde un archivo `.sqlite`/`.db`. |
| **Admins** | Cuentas del panel: crear administradores, cambiar contraseñas, activar/desactivar. |

### Alumnos, equipos y administradores

**Dar de alta:** abra la sección correspondiente, toque **Agregar…** sobre la tabla, llene los campos y confirme.

**Editar:** modifique las celdas directamente en la tabla y toque **Guardar** en esa fila.

**Borrar:** toque **Eliminar** en la fila. Reglas de protección:

- No se puede eliminar un **alumno con préstamo activo** (primero registre la devolución).
- No se puede eliminar un **equipo con préstamo activo**.
- Al eliminar un alumno o equipo se borran también sus préstamos e historial asociados. Si desea conservar el historial, haga un **respaldo antes**.
- No se puede eliminar ni desactivar al **último administrador activo**.

Campos obligatorios: alumno → código, nombre, materia, profesor y grupo; equipo → número y descripción (el estado es `disponible` o `prestado` según los préstamos reales).

Sobre el estado de un equipo: se marca `prestado` automáticamente cuando se registra un préstamo, y vuelve a `disponible` con la devolución. Si en la tabla marca como *disponible* un equipo que sigue prestado, la app cierra ese préstamo y registra la devolución por usted.

### Importar usuarios desde Excel

El importador integrado acepta archivos `.xlsx` y `.xlsm` con estas hojas:

**Hoja ALUMNOS** (columnas exactas, en este orden):

| Columna | Contenido | Ejemplo |
|---|---|---|
| `Código` | Código del alumno (único) | `240145` |
| `Nombre` | Nombre completo | `María Pérez` |
| `Materia` | Materia | `Fotografía` |
| `Profesor(a)` | Nombre del profesor | `Laura Soto` |
| `Grupo` | Grupo (con turno si aplica) | `5AV` |

**Hoja GRUPOS** (opcional; columnas exactas, en este orden):

| Columna | Contenido | Ejemplo |
|---|---|---|
| `Grupo` | Nombre del grupo | `5AV` |
| `Turno` | `MAT` (matutino) o `VES` (vespertino) | `MAT` |
| `Ciclo escolar` | Ciclo en formato `AAAA-AAAA` | `2025-2026` |

Puede subir solo ALUMNOS, solo GRUPOS o ambas hojas en el mismo libro. Las plantillas listas para copiar están en la carpeta `templates/` (`solo_alumnos.xlsx`, `solo_grupos.xlsx`, `ambas.xlsx`).

Reglas que aplican:

- Si el **código** ya existe, el alumno se **actualiza** (y queda activo); si no existe, se crea. Filas sin código o sin nombre se omiten.
- Los grupos se identifican por **grupo + turno + ciclo escolar**; si ya existen se actualizan, si no se crean. Un turno distinto de `MAT`/`VES` rechaza toda la importación.
- Si un alumno menciona un grupo que no está en la hoja GRUPOS, se crea automático (turno inferido y ciclo escolar vigente).
- Los acentos y mayúsculas/minúsculas de los encabezados no importan (`CÓDIGO` = `Código`); el **orden** de las columnas sí.
- La importación es "todo o nada": si algo está mal formateado, no se guarda nada y la app explica el error.

Errores comunes:

| Mensaje / síntoma | Causa | Solución |
|---|---|---|
| "La hoja 'ALUMNOS' no tiene el formato correcto" | Encabezados cambiados, en otro orden o la hoja tiene otro nombre | Copie la plantilla de `templates/` y pegue sus datos respetando la primera fila |
| "Turno invalido para el grupo…" | Turno vacío o distinto de MAT/VES | Escriba `MAT` o `VES` en la hoja GRUPOS |
| "El archivo debe contener una hoja 'ALUMNOS'…" | El libro no trae ninguna hoja reconocible | Renombre las hojas exactamente a `ALUMNOS` y/o `GRUPOS` |
| Importé pero faltan materias en otro lado | El importador integrado solo llena alumnos y grupos | Es lo esperado; las tablas de materias/profesores son internas |

> **Nota:** el libro real `REGISTRO FOTO.xlsm` de la escuela usa hojas `GRUPOS` y `BDD` y **no** entra por esta vía; para ese formato use el script PowerShell descrito en [Importación de datos: dos rutas](#importación-de-datos-dos-rutas), o pida a quien mantiene la app que lo convierta.

### Respaldos y restauración

- **Respaldar base** (sección Importar): crea una copia completa en `%APPDATA%\com.institucion.prestamosequipos\backups\` con nombre `prestamos-backup-FECHA-HORA.sqlite`. Hágalo al menos una vez por semana y antes de importaciones grandes.
- **Restaurar base**: elige un archivo `.sqlite` o `.db` válido y reemplaza la base actual. La app valida tablas esenciales y crea un respaldo automático antes de reemplazar el archivo. Después de restaurar, confirme que alumnos, equipos y registros sean los esperados.
- **Historial de respaldos**: la misma sección lista los archivos con fecha y tamaño, y permite abrir la carpeta.
- También puede copiar el archivo de base manualmente (ver abajo). Con la aplicación cerrada.

### Dónde viven los datos

Todo se guarda en la carpeta de datos de la app en Windows:

```
%APPDATA%\com.institucion.prestamosequipos\
├── prestamos.sqlite        ← la base de datos (todo lo importante)
├── backups\                ← respaldos automáticos
└── reports\                ← CSV y PDF generados
```

Ruta completa típica: `C:\Users\<SU_USUARIO>\AppData\Roaming\com.institucion.prestamosequipos\prestamos.sqlite`.

---

## 🧰 Mantenimiento y desarrollo

### Stack técnico

| Capa | Tecnología |
|---|---|
| Shell de escritorio | Tauri 2 (`tauri = 2.1.1`, `@tauri-apps/cli ^2.1.0`) |
| Backend | Rust (edition 2021): `rusqlite 0.32` (bundled), `calamine 0.26` (lectura xlsx/xlsm), `chrono`, `serde`, `thiserror` |
| Frontend | JavaScript vanilla (ES modules), sin framework ni bundler; `frontendDist` apunta directo a `../src` |
| Base de datos | SQLite en `%APPDATA%\com.institucion.prestamosequipos\prestamos.sqlite`; esquema en `db/schema.sql` embebido con `include_str!` |
| Empaquetado Windows | MSI + NSIS (`bundle.targets`), icono `icons/icon.ico` |
| CI/CD | GitHub Actions (`windows-latest`, `tauri-apps/tauri-action@v0`, tag `auto`) |
| Identificador de app | `com.institucion.prestamosequipos` (ventana principal 1440×960, redimensionable, título "Prestamo de Equipos") |

Permisos Tauri: capability `default` con `core:default` únicamente; la ventana accede al backend por comandos IPC (`invoke`). Sin plugins externos: la selección de archivos usa `<input type="file">` nativo.

### Arquitectura de carpetas

```
taefoto/
├── db/
│   └── schema.sql                  # Esquema completo + índices + datos semilla
├── src/                            # Frontend (servido tal cual por Tauri)
│   ├── index.html                  # Entrada HTML
│   ├── main.js                     # Bootstrap: crea store + shell
│   ├── styles.css
│   ├── logo-p15.png
│   ├── icons.js                    # Iconos SVG inline
│   ├── store/
│   │   └── app-store.js            # Store único (estado global + acciones invoke)
│   ├── components/
│   │   └── app-shell.js            # Topbar, selección de rol, render por vista
│   └── views/
│       ├── operation-view.js       # Modo estudiante (préstamo/devolución)
│       └── admin-view.js           # Panel admin (7 secciones)
├── src-tauri/
│   ├── tauri.conf.json             # Identificador, ventana, bundle msi+nsis
│   ├── Cargo.toml
│   ├── capabilities/default.json   # core:default
│   └── src/
│       ├── main.rs                 # Punto de entrada (oculta consola en release)
│       ├── lib.rs                  # AppState, setup, migración de BD legada, handler
│       ├── commands/
│       │   ├── operation.rs        # 4 comandos de operación
│       │   └── admin.rs            # 24 comandos de administración
│       ├── services/
│       │   ├── mod.rs              # AppError/AppResult
│       │   ├── operation.rs        # Lógica préstamo/devolución
│       │   └── admin.rs            # CRUD, importación Excel, backups, reportes (+tests)
│       ├── db/mod.rs               # init_database + migraciones incrementales
│       └── models/mod.rs           # DTOs serde compartidos con el frontend
├── scripts/
│   ├── import_excel.ps1            # Importador PowerShell (Excel COM + Python)
│   ├── inspect-db-Cargo.toml       # Manifiesto auxiliar de inspección (sin comando integrado)
│   └── inspect_db.rs               # Fuente auxiliar para consultar una BD
├── templates/
│   ├── solo_alumnos.xlsx           # Hoja ALUMNOS de ejemplo
│   ├── solo_grupos.xlsx            # Hoja GRUPOS de ejemplo
│   └── ambas.xlsx                  # Ambas hojas
├── REGISTRO FOTO.xlsm              # Libro histórico local, NO versionado (.gitignore)
└── .github/workflows/build-windows.yml
```

Patrón general: **vista → store (acciones) → comando Tauri → servicio Rust → SQLite**, todo transaccional y con errores serializados como `String` hacia el frontend.

### Esquema de base de datos

Fuente: `db/schema.sql`. Nueve tablas:

| Tabla | Columnas clave | Notas |
|---|---|---|
| `grupos` | `nombre`, `turno` (`MAT`\|`VES`), `ciclo_escolar`, `activo` | `UNIQUE(nombre, turno, ciclo_escolar)` |
| `alumnos` | `codigo` UNIQUE, `nombre`, `materia`, `profesor`, `grupo`, `grupo_id` FK→`grupos.id`, `activo` | `grupo_id` opcional; `materia/profesor/grupo` son texto denormalizado para búsqueda rápida |
| `materias` | `nombre` UNIQUE, `activo` | Catálogo interno (legado) |
| `profesores` | `nombre` UNIQUE, `activo` | Catálogo interno (legado) |
| `alumno_materia` | `alumno_id`, `materia_id`, `profesor_id` | N:M legado; `UNIQUE(alumno_id, materia_id, profesor_id)` |
| `equipos` | `numero` UNIQUE, `tipo`, `descripcion`, `estado` (`disponible`\|`prestado`), `activo` | |
| `prestamos` | `alumno_id` FK, `equipo_id` FK, `fecha_prestamo`, `fecha_devolucion`, `estado` (`activo`\|`devuelto`\|`retrasado`) | |
| `historial_eventos` | `tipo_evento` (`prestamo`\|`devolucion`), `prestamo_id` FK, `fecha`, `observaciones` | Bitácora inmutable de eventos |
| `administradores` | `usuario` UNIQUE, `nombre`, `password`, `activo` | Contraseña en texto plano (ver Problemas conocidos) |

Relaciones: `alumnos.grupo_id → grupos.id`; `prestamos.alumno_id → alumnos.id`; `prestamos.equipo_id → equipos.id`; `historial_eventos.prestamo_id → prestamos.id`; `alumno_materia` une alumnos/materias/profesores.

Invariantes críticos (índices parciales únicos):

```sql
CREATE UNIQUE INDEX idx_prestamos_alumno_activo ON prestamos(alumno_id) WHERE estado = 'activo';
CREATE UNIQUE INDEX idx_prestamos_equipo_activo ON prestamos(equipo_id) WHERE estado = 'activo';
```

Garantizan a nivel de BD un préstamo activo máximo por alumno y por equipo.

Datos semilla (`INSERT OR IGNORE`, idempotentes): grupos `5A`(MAT)/`5B`(VES), alumnos `A001`/`A002`, equipos `EQ-101..103`, administrador `admin`/`1234`.

### Comandos Rust expuestos al frontend

Registrados en `lib.rs` (`invoke_handler`). Todos devuelven `Result<T, String>`.

**Operación** (`commands/operation.rs`):

| Comando | Firma | Función |
|---|---|---|
| `find_student_by_code` | `(codigo) -> StudentLookup` | Alumno + préstamo activo (o `NotFound`) |
| `list_available_equipment` | `() -> Vec<EquipmentItem>` | Equipos `activo=1 AND estado='disponible'` |
| `register_student_operation` | `(payload {codigo, tipo, equipo_id?, observaciones?}) -> LoanRecord` | `tipo`: `"prestamo"` o `"devolucion"` |
| `get_student_history` | `(codigo) -> Vec<RecordItem>` | Últimos 100 eventos del alumno |

**Administración** (`commands/admin.rs`):

| Grupo | Comandos |
|---|---|
| Sesión | `admin_login(payload{usuario,password}) -> LoginResult` |
| Admins | `list_admins`, `create_admin`, `update_admin`, `delete_admin` (protege el último activo) |
| Dashboard | `get_dashboard_summary -> {alumnos_activos, equipos_disponibles, prestamos_activos, registros_totales}` |
| Alumnos | `list_students(query?)`, `create_student`, `update_student`, `delete_student` |
| Equipos | `list_equipment(query?)`, `create_equipment`, `update_equipment`, `delete_equipment` |
| Historial | `list_records(filters{alumno_query?, fecha_inicio?, fecha_fin?})` (límite 1000), `clear_records`, `export_records_csv(filters?)` |
| Reportes | `get_report_data(request{report_type, ...})`, `generate_report_pdf(request)` |
| Excel / BD | `import_excel_data(payload{file_name, bytes}) -> ExcelImportSummary`, `backup_database()`, `list_backups()`, `restore_database(payload)` |
| Utilidades | `open_file_path(path)` (abre con `explorer.exe`) |

### Flujo de préstamo y devolución

Préstamo (`services/operation.rs::register_loan`, en una transacción):

1. Valida `equipo_id` presente y alumno existente y **activo**.
2. Rechaza si el alumno ya tiene préstamo activo.
3. Rechaza si el equipo no existe, está inactivo o no está `disponible`.
4. `INSERT INTO prestamos (... estado='activo')` con fecha local `%Y-%m-%d %H:%M:%S`.
5. `UPDATE equipos SET estado='prestado'`.
6. `INSERT INTO historial_eventos ('prestamo', ... observaciones)`.
7. Commit; devuelve el registro completo para el modal.

Devolución (`register_return`):

1. Busca el último préstamo `activo` del alumno (si no hay, error "devolución inválida").
2. `UPDATE prestamos SET fecha_devolucion, estado='devuelto'`.
3. `UPDATE equipos SET estado='disponible'`.
4. Evento `devolucion` en `historial_eventos`.

Casos especiales del panel admin (`update_equipment`): marcar `disponible` un equipo con préstamo activo cierra el préstamo y agrega evento con observación "Devolucion registrada desde panel admin"; marcar `prestado` manualmente sin préstamo real está prohibido.

Frontend (`operation-view.js`): el tipo de operación se decide solo según `student.prestamo_activo`; el overlay de resultado vive 2 segundos; el foco vuelve al campo de código tras cada operación.

### Importación de datos: dos rutas

Existen **dos mecanismos distintos** — no son intercambiables:

| | Ruta A: importador integrado (panel → Importar) | Ruta B: script PowerShell (`scripts/import_excel.ps1`) |
|---|---|---|
| Motor | Rust + calamine (lee `.xlsx`/`.xlsm` en bytes) | Excel COM Automation + Python embebido |
| Hojas | `ALUMNOS` y/o `GRUPOS` (+ formato legado `GRUPOS`+`REGISTRO`) | Hoja catálogo (default `Catalogo`) + hoja eventos (default `Eventos`); configurables por parámetro |
| Qué importa | Solo catálogo: alumnos y grupos (upsert) | Catálogo **y** eventos históricos: recrea préstamos/devoluciones y crea equipos |
| Duplicados | Upsert por `codigo` (alumnos) y `(nombre,turno,ciclo)` (grupos) | `INSERT OR IGNORE`; préstamo solo si no hay activo para alumno ni equipo |
| Transaccionalidad | Sí, todo-o-nada | Por instrucción; errores de SQL abortan el proceso Python |
| Requisitos | Ninguno adicional | Windows con Excel instalado y `python` en PATH |
| Uso típico | Listas nuevas del ciclo escolar | Migrar el historial del `REGISTRO FOTO.xlsm` (hojas `GRUPOS` + `BDD`) |

Formato legado de la ruta A: hoja `GRUPOS` cuyas columnas empiezan directamente con `Código, Nombre, Materia, Profesor(a), Grupo` + hoja `REGISTRO` con `FECHA, CODIGO, NOMBRE, MATERIA, PROFESOR, GRUPO, TIPO DE REGISTRO, LAPTOP, OBSERVACIONES`. Ojo: el xlsm real tiene una columna `No.` antes de `Código:` en su hoja GRUPOS, por eso **no** valida por la ruta A y debe usarse la ruta B.

Detalles del upsert de la ruta A (`services/admin.rs::import_excel_data`):

- Normaliza encabezados: mayúsculas sin acentos (`normalize_header`); variantes aceptadas `PROFESOR(A)` o `PROFESOR`; códigos numéricos flotantes se convierten a entero (`240145`, nunca `240145.0`); filas totalmente vacías se descartan.
- Grupos creados automáticamente desde la columna `Grupo` de ALUMNOS: turno inferido (`VES` si el nombre termina en `V`, si no `MAT`) y ciclo calculado según la fecha actual (julio–diciembre → `YYYY-(YYYY+1)`, enero–junio → `(YYYY-1)-YYYY`).
- Respuesta `ExcelImportSummary`: conteos de insertados/actualizados/omitidos por entidad y hojas validadas.

### Script de importación PowerShell

`scripts/import_excel.ps1` automatiza Excel vía COM, vuelca cada hoja a JSON temporal y ejecuta un script Python incrustado que escribe directo en SQLite.

Parámetros:

| Parámetro | Obligatorio | Default | Descripción |
|---|---|---|---|
| `-ExcelPath` | Sí | — | Ruta del libro `.xlsx`/`.xlsm` |
| `-DatabasePath` | Sí | — | Ruta del `.sqlite` destino (convención: `$env:APPDATA\com.institucion.prestamosequipos\prestamos.sqlite`) |
| `-CatalogSheet` | No | `Catalogo` | Nombre de la hoja de alumnos/catálogo (para el xlsm real: `GRUPOS`) |
| `-EventsSheet` | No | `Eventos` | Nombre de la hoja de eventos (para el xlsm real: `BDD`) |
| `-DefaultCicloEscolar` | No | `2025-2026` | Ciclo asignado a los grupos nuevos |
| `-DefaultTurno` | No | `MAT` | Turno por defecto si la columna Grupo no lo indica |

Columnas esperadas (flexibles: acepta variantes con/sin dos puntos y acentos; si el encabezado no coincide, usa la posición `_colN`):

| Hoja catálogo | Col | Encabezados aceptados |
|---|---|---|
| | 1 | (ignorado; p. ej. `No.`) |
| | 2 | `Código` / `Código:` / `CODIGO` |
| | 3 | `Nombre` / `Nombre:` |
| | 4 | `Materia` / `Materia:` |
| | 5 | `Profesor(a)` / `Profesor(a):` |
| | 6 | `Grupo` / `Grupo:` |

| Hoja eventos | Col | Encabezados aceptados |
|---|---|---|
| | 1 | `Fecha` |
| | 2 | `Código` |
| | 3 | `Nombre` |
| | 4 | `Materia` |
| | 5 | `Profesor(a)` |
| | 6 | `Grupo` |
| | 7 | `Tipo` / `TIPO DE REGISTRO` (`PRÉSTAMO`/`DEVOLUCIÓN`; basta que empiece con "pr") |
| | 8 | `Número de equipo` / `LAP TOP` / `LAPTOP` |
| | 9 | `Observaciones` |

Comportamiento:

- **Fechas:** se toman del texto visible de la celda (propiedad `.Text` de COM) y se guardan **sin transformación** en `prestamos.fecha_prestamo`, `fecha_devolucion` e `historial_eventos.fecha`. El xlsm real muestra `2026-03-18 00:00:00`; ese string exacto termina en la BD. No hay conversión de zona ni de formato: si el Excel muestra otra cosa, se importa tal cual.
- **Grupos:** normaliza `5o. F/MAT` → grupo `5O F`, turno `MAT` (detecta `VES`/`MAT` dentro del texto).
- **Duplicados:** `INSERT OR IGNORE` en todas las entidades. Un préstamo solo se inserta si ni el alumno ni el equipo tienen préstamo activo; la devolución cierra el préstamo activo más reciente que coincida por código+equipo.
- **Equipos:** se crean automáticamente con `tipo='laptop', estado='disponible'`.
- **Materias/profesores:** se registran en sus catálogos y se enlazan en `alumno_materia`.
- **Errores:** `$ErrorActionPreference = Stop`; cualquier fallo aborta. El bloque `finally` cierra Excel y borra los JSON temporales.

Ejemplo con el libro real de la escuela:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\import_excel.ps1 `
  -ExcelPath "C:\ruta\REGISTRO FOTO.xlsm" `
  -DatabasePath "$env:APPDATA\com.institucion.prestamosequipos\prestamos.sqlite" `
  -CatalogSheet "GRUPOS" `
  -EventsSheet "BDD"
```

### Plantillas Excel incluidas

| Archivo | Hojas | Encabezados (fila 1) |
|---|---|---|
| `templates/solo_alumnos.xlsx` | `ALUMNOS` | `Código, Nombre, Materia, Profesor(a), Grupo` |
| `templates/solo_grupos.xlsx` | `GRUPOS` | `Grupo, Turno, Ciclo escolar` |
| `templates/ambas.xlsx` | `ALUMNOS` + `GRUPOS` | Ambas anteriores |

Estas plantillas corresponden al importador integrado (ruta A).

### Build y release

Requisitos de desarrollo en Windows:

- Node.js 20 o posterior y `npm`.
- Rust estable con el target `x86_64-pc-windows-msvc`.
- Microsoft C++ Build Tools con **Desktop development with C++**.
- Microsoft Edge WebView2 Runtime.
- La característica opcional **VBSCRIPT** de Windows si se va a generar el paquete MSI.

Consulte los [prerrequisitos oficiales de Tauri 2](https://v2.tauri.app/es/start/prerequisites/) para preparar el equipo.

Instalación reproducible, pruebas y build local:

```powershell
npm ci
cargo test --manifest-path .\src-tauri\Cargo.toml
npm run dev
npm run build
```

Los instaladores se generan bajo `src-tauri/target/release/bundle/` en las carpetas `msi/` y `nsis/`.

Release automático (`.github/workflows/build-windows.yml`):

- Disparadores: `push` a `main` (ignorando cambios solo en `README.md`) y ejecución manual (`workflow_dispatch`).
- Runner `windows-latest`; Node 20, Bun, Rust stable con target `x86_64-pc-windows-msvc`, caché de Rust (`Swatinem/rust-cache`).
- `tauri-apps/tauri-action@v0` publica MSI y NSIS en una release pública fija con `tagName: auto` y nombre `Prestamo de Equipos - Windows`.
- El tag `auto` se reutiliza: la página de release permanece estable y los assets se reemplazan en cada build elegible. La versión del producto continúa siendo la declarada en `src-tauri/tauri.conf.json` (`0.1.0`).
- Un cambio exclusivo de `README.md` no dispara instaladores; use `workflow_dispatch` si necesita reconstruirlos manualmente.

### Desarrollo y depuración

```powershell
npm ci
npm run dev          # = tauri dev; abre la ventana con binario debug y devtools
```

- Sin backend Tauri (por ejemplo abriendo `src/index.html` en navegador), el store detecta la ausencia de `invoke` y avisa: *"Tauri API no disponible. Abre la app con `npm run tauri dev`."*
- Logs de depuración: `operation-view.js` imprime `[DEBUG]` en consola del webview durante el submit.
- Para inspeccionar la BD sin abrir la app puede usar cualquier cliente SQLite contra la ruta de datos. El repositorio conserva `scripts/inspect_db.rs` y `scripts/inspect-db-Cargo.toml` como fuentes auxiliares, pero no ofrece un comando integrado o soportado para ejecutarlas desde `npm`.
- Tests unitarios existentes (incluyen validación del importador): `cargo test --manifest-path .\src-tauri\Cargo.toml`.
- El repositorio no define scripts de lint ni tests automatizados del frontend; una entrega debe complementar `cargo test` con una prueba manual del flujo préstamo → devolución → respaldo.
- Atajos del shell: teclas `1`/`2` seleccionan rol en la pantalla inicial; `Esc` regresa al inicio.

### Respaldo y migración del esquema

- **Respaldos:** `backup_database` copia el `.sqlite` a `backups/prestamos-backup-<timestamp>.sqlite`. `restore_database` valida extensión `.sqlite/.db`, verifica que existan las tablas `alumnos`, `equipos`, `prestamos`, `historial_eventos`, respalda la base actual y recién entonces reemplaza el archivo y re-ejecuta `init_database`.
- **Arranque (`lib.rs`):** si `%APPDATA%\...\prestamos.sqlite` no existe, se busca una base legada en el directorio actual, junto al ejecutable o en recursos, y se copia. Después corre `db::init_database`.
- **Migraciones (`db/mod.rs::run_migrations`):** idempotentes, corren en cada arranque:
  - `ALTER TABLE ADD COLUMN` si falta (`alumnos.materia/profesor/grupo`, `equipos.descripcion`) verificando `PRAGMA table_info`.
  - Creación de `administradores` si no existe + garantiza el admin `admin`/`1234`.
  - Backfill de denormalizados: `alumnos.grupo/materia/profesor` desde `grupos` y `alumno_materia`; `equipos.descripcion` desde `tipo`; estados de equipo fuera del dominio → `disponible`.
- **Consideraciones:** no hay versionado formal de migraciones (no hay tabla `_migrations`): cualquier cambio nuevo de esquema debe añadirse como paso idempotente en `run_migrations` y, si aplica, en `schema.sql` (que solo crea tablas si no existen). Antes de tocar el esquema en producción, respalde. `src-tauri/Cargo.lock` está en `.gitignore`, así que los builds de CI resuelven versiones de crates en cada ejecución.

### Problemas conocidos

| Área | Detalle | Impacto / mitigación |
|---|---|---|
| Privacidad | `REGISTRO FOTO.xlsm`, un libro histórico con datos de alumnos/eventos, estuvo rastreado por Git | Purgado del árbol actual y de todo el historial Git (`git filter-repo`) e incluido en `.gitignore`. El repositorio fue público mientras el archivo estuvo presente, así que se debe asumir que copias externas (clones, forks, cachés) pueden conservarlo |
| Seguridad | Contraseñas de administradores en texto plano en `administradores`; admin semilla `admin/1234` | Cambiar la contraseña por defecto; migrar a hash si la app crece |
| Seguridad | `CSP: null` en `tauri.conf.json` | Sin política de contenido; riesgo bajo en app local, pero conviene definirlo |
| Dependencia externa | `generate_report_pdf` ejecuta `C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe` (ruta fija) | Sin wkhtmltopdf instalado, el PDF falla; el CSV y la impresión de vista previa funcionan sin él |
| Plataforma | `open_file_path` invoca `explorer.exe` | Solo Windows (objetivo declarado del proyecto) |
| Datos | `delete_student`/`delete_equipment` borran en cascada sus `prestamos` e `historial_eventos` | Respaldo previo si el historial importa |
| Datos | `clear_records` vacía `historial_eventos` sin poder revertirse (pide confirmación) | Usar con criterio; hay respaldo automático solo en restore |
| Importación | Dos contratos de Excel distintos (ruta A vs B); defaults del script (`Catalogo`/`Eventos`) no coinciden con el xlsm real (`GRUPOS`/`BDD`) | Documentado arriba; pasar `-CatalogSheet`/`-EventsSheet` explícitos |
| Importación | Fechas del script se guardan tal cual se muestran en Excel (texto, dependiente de locale) | Filtros por fecha en Registros pueden no agrupar bien para datos importados |
| Entorno | Script PS requiere Excel COM y `python` en PATH | Instalar prerrequisitos o usar la ruta A |
| Reproducibilidad | `Cargo.lock` ignorado en git | Versiones de crates varían entre builds de CI |
| Dominio | `prestamos.estado='retrasado'` existe en el CHECK pero ningún código lo asigna | Valor reservado, hoy inutilizado |

---

## 🤖 Prompt de IA para importar usuarios

El siguiente bloque es una ayuda opcional para quien use un asistente de IA durante la importación. Despliéguelo, cópielo completo y agregue la ruta de su archivo Excel donde se indica.

<details>
<summary><strong>Mostrar prompt completo para la guía de importación</strong></summary>


```text
Actúa como mi guía para importar USUARIOS NUEVOS (alumnos) a la aplicación
"Prestamos de Equipos" (TAE Foto App) de la Preparatoria Quince. Te voy a dar
la ruta de un archivo Excel y debes ayudarme, paso a paso, a dejar los alumnos
cargados y verificados en la base de datos de la app en Windows.

CONTRATO REAL DEL IMPORTADOR (no lo modifiques, aplícalo):

1. Archivo: .xlsx o .xlsm.

2. Hay DOS rutas válidas:
   RUTA A (recomendada para listas nuevas): importador integrado en la app,
   sección Administrador > Importar > "Seleccionar Excel". Requiere hojas con
   nombres EXACTOS:
     - Hoja "ALUMNOS" con encabezados en la fila 1, en este orden:
         Código | Nombre | Materia | Profesor(a) | Grupo
       Ejemplo de fila: 240145 | María Pérez | Fotografía | Laura Soto | 5AV
     - Hoja "GRUPOS" (opcional), encabezados en la fila 1, en este orden:
         Grupo | Turno | Ciclo escolar
       Turno SOLO puede ser MAT o VES. Ciclo escolar formato AAAA-AAAA
       (ejemplo: 2025-2026).
       Plantillas oficiales: templates/solo_alumnos.xlsx,
       templates/solo_grupos.xlsx, templates/ambas.xlsx.
   RUTA B (para libros históricos tipo "REGISTRO FOTO.xlsm", con hojas de
   catálogo y de eventos): script de PowerShell que requiere Excel instalado
   y Python en PATH. Columnas flexibles (acepta variantes con dos puntos o
   mayúsculas y usa posición como respaldo):
     - Hoja de catálogo (parámetro -CatalogSheet; default "Catalogo";
       para el xlsm real usar "GRUPOS"):
         col2 Código | col3 Nombre | col4 Materia | col5 Profesor(a) |
         col6 Grupo   (la col1 se ignora, puede ser "No.")
     - Hoja de eventos (parámetro -EventsSheet; default "Eventos";
       para el xlsm real usar "BDD"):
         col1 Fecha | col2 Código | col3 Nombre | col4 Materia |
         col5 Profesor(a) | col6 Grupo | col7 Tipo de Registro
         (PRÉSTAMO/DEVOLUCIÓN) | col8 LAP TOP/Número de equipo |
         col9 Observaciones

3. Formato de fechas (solo ruta B): la fecha se toma del TEXTO VISIBLE de la
   celda de Excel y se guarda tal cual (ejemplo real: 2026-03-18 00:00:00).
   No hay conversión. Verifica que la columna Fecha esté formateada igual en
   todas las filas antes de importar.

4. Duplicados:
   - Ruta A: si el Código ya existe, ACTUALIZA nombre/materia/profesor/grupo
     y reactiva al alumno; si no existe, lo crea. Los grupos se actualizan o
     crean por Grupo+Turno+Ciclo. Filas sin Código o sin Nombre se omiten.
     La importación es transaccional (todo o nada).
   - Ruta B: INSERT OR IGNORE (nunca duplica alumnos, grupos, materias,
     profesores ni equipos). Un PRÉSTAMO solo se inserta si ni el alumno ni
     el equipo tienen préstamo activo; una DEVOLUCIÓN cierra el préstamo
     activo más reciente que coincida por código+equipo.

5. Base de datos destino (Windows):
   %APPDATA%\com.institucion.prestamosequipos\prestamos.sqlite
   (ruta típica: C:\Users\<usuario>\AppData\Roaming\com.institucion.
   prestamosequipos\prestamos.sqlite)

6. Comando exacto para la RUTA B (ejecutar en PowerShell, desde la carpeta
   del proyecto; reemplaza los placeholders):
   powershell -ExecutionPolicy Bypass -File .\scripts\import_excel.ps1 `
     -ExcelPath "<RUTA_DEL_EXCEL>" `
     -DatabasePath "$env:APPDATA\com.institucion.prestamosequipos\prestamos.sqlite" `
     -CatalogSheet "<NOMBRE_HOJA_CATALOGO>" `
     -EventsSheet "<NOMBRE_HOJA_EVENTOS>"
   Parámetros opcionales: -DefaultCicloEscolar "2025-2026",
   -DefaultTurno "MAT".

REGLAS PARA LA GUÍA:
- Pídeme la ruta del archivo Excel y, si puedo, inspecciónalo o hazme
  preguntas para confirmar: nombres EXACTOS de las hojas, encabezados de la
  fila 1 y si hay fechas involucradas.
- Decide la ruta: si el libro tiene hojas ALUMNOS/GRUPOS, usa la RUTA A;
  si tiene hojas tipo catálogo/eventos (GRUPOS/BDD/Catalogo/Eventos),
  usa la RUTA B con los parámetros correctos.
- Antes de importar, indícame cómo hacer un RESPALDO: abrir la app >
  Administrador (admin) > Importar > "Respaldar base", o copiar
  prestamos.sqlite a una carpeta segura con la app cerrada.
- Errores comunes que debes detectar ANTES de importar: hoja con nombre
  distinto al esperado; encabezados reordenados; turno vacío o distinto de
  MAT/VES (rechaza toda la importación en ruta A); códigos repetidos con
  datos contradictorios; códigos numéricos que Excel muestre con decimales.
- VERIFICACIÓN POSTERIOR OBLIGATORIA, guíame en cada punto:
  1) Abrir la app > Administrador > Resumen: el contador "Alumnos" debe
     aumentar en la cantidad esperada de alumnos nuevos.
  2) Sección Alumnos: buscar 3-5 códigos del Excel y confirmar nombre,
     materia, profesor y grupo.
  3) Modo ESTUDIANTE: escribir un código nuevo y confirmar que aparece
     "Disponible".
  4) Si se importaron eventos (ruta B): Administrador > Registros debe
     mostrar los préstamos/devoluciones históricos, y el contador
     "Prestados" debe reflejar solo los préstamos que quedaron activos.
  5) Opcional por consola (Python instalado):
     python -c "import sqlite3;c=sqlite3.connect(r'<RUTA_BD>');print(c.execute('SELECT COUNT(*) FROM alumnos').fetchone())"
     Comparar el total con la cantidad esperada.
- Si algo falla, NO sugieras borrar la base: restaura el respaldo desde
  Administrador > Importar > "Restaurar base".

Mi archivo Excel está en: <PEGA_AQUÍ_LA_RUTA_DE_TU_ARCHIVO_EXCEL>
```

</details>

---

## 🔐 Seguridad y privacidad

Esta aplicación administra datos identificables de alumnos. Trate la base SQLite, los respaldos, los Excel y los reportes como información institucional sensible.

> [!IMPORTANT]
> `REGISTRO FOTO.xlsm` contiene datos históricos de alumnos/eventos y **ya fue purgado** del árbol de trabajo y de todo el historial Git con `git filter-repo`; además está listado en `.gitignore` para que no vuelva a rastrearse. El libro sigue disponible localmente para quien opere la app, pero no debe versionarse nunca.
>
> El repositorio estuvo público con el archivo dentro, por lo que la purga **no revierte la exposición pasada**: clones, forks y cachés externos pueden conservar una copia. Trate esos datos como ya divulgados.

- Cambie `admin` / `1234` antes de capturar datos reales.
- No comparta contraseñas entre administradores y desactive las cuentas que ya no deban entrar.
- Restrinja el acceso de Windows a `%APPDATA%\com.institucion.prestamosequipos\`.
- No adjunte `prestamos.sqlite`, respaldos, `REGISTRO FOTO.xlsm`, CSV ni capturas con datos personales en issues públicos.
- Mantenga al menos una copia de respaldo fuera del equipo de operación y pruebe periódicamente que pueda restaurarse.
- Antes de distribuir la app en un entorno con más usuarios o equipos, priorice el hash de contraseñas, una CSP explícita y la firma de los instaladores.

La aplicación no sincroniza datos con un servidor. Esa operación local reduce exposición de red, pero **no sustituye** controles de acceso, respaldos ni protección física del equipo.

## 🆘 Soporte

Para incidencias de operación, contacte primero al administrador local de la Preparatoria Quince. Para fallos técnicos reproducibles, abra un [issue en GitHub](https://github.com/Leoglez10/Tae-Foto-P15/issues) e incluya:

1. Versión de Windows y versión de la app (`0.1.0` en la configuración actual).
2. Pasos exactos para reproducir el problema.
3. Resultado esperado y resultado observado.
4. Mensaje de error completo y, si es seguro, una captura sin datos personales.
5. Confirmación de si existe un respaldo reciente.

Nunca publique contraseñas, archivos Excel reales, bases SQLite ni datos de alumnos.

## 🏷 Versionado

Versionado simple `MAYOR.MENOR.PARCHE`. Actualmente **`0.1.0`**.

- **PARCHE** (0.1.**0** → 0.1.1): correcciones de bugs, sin cambios de comportamiento.
- **MENOR** (0.**1**.0 → 0.2.0): funciones nuevas que no rompen lo existente.
- **MAYOR** (**0**.1.0 → 1.0.0): cambios que pueden requerir migración de datos.

> ✅ La versión debe coincidir en `package.json`, `src-tauri/tauri.conf.json` y `src-tauri/Cargo.toml`. Hoy los tres declaran `0.1.0`.

> ℹ️ La release de GitHub reutiliza el tag fijo `auto`: la página del release permanece estable y los instaladores se reemplazan en cada build. El número de versión del producto no cambia solo por publicar.

---

## 🤝 Cómo contribuir

1. Clona el repo: `git clone https://github.com/Leoglez10/Tae-Foto-P15.git`
2. Crea una rama: `git checkout -b feat/mi-cambio`
3. Haz commits claros (convencionales): `feat: exportar registros a Excel`
4. Verifica que compile y pase pruebas:
   ```powershell
   cargo test --manifest-path .\src-tauri\Cargo.toml
   npm run build
   ```
5. Abre un Pull Request explicando **qué** hiciste y **por qué**.

> ⚠️ Nunca subas `prestamos.sqlite`, respaldos, Excel con datos reales ni capturas con información de alumnos. Revisa [Seguridad y privacidad](#-seguridad-y-privacidad) antes de tu primer commit.

---

## ⚖️ Licencia y uso

Proyecto de **uso interno educativo** para la Preparatoria Quince.

> [!WARNING]
> Este repositorio **no incluye actualmente un archivo `LICENSE`**. Por lo tanto, no debe asumirse permiso para copiar, modificar o redistribuir el código. Antes de una distribución externa o de aceptar contribuciones, defina y agregue una licencia explícita.

---

## 🙌 Créditos

<div align="center">

<img src="https://github.com/Leoglez10.png" alt="Leonardo Gonzalez" width="96"/>

### Diseñado y desarrollado por **Leonardo Gonzalez**

[![GitHub](https://img.shields.io/badge/GitHub-%40Leoglez10-181717?logo=github)](https://github.com/Leoglez10)
[![Issues](https://img.shields.io/badge/Reportar_bug_o_idea-2ea44f?logo=github)](https://github.com/Leoglez10/Tae-Foto-P15/issues)

🏫 **Institución**: Preparatoria Quince

🎯 **Propósito**: Control y trazabilidad de préstamos de equipo de TAE Foto

🛠 **Stack**: [Tauri v2](https://tauri.app/) · [Rust](https://www.rust-lang.org/) · JavaScript vanilla (ESM) · [SQLite](https://www.sqlite.org/)

</div>

> 📬 ¿Encontraste un bug o tienes una mejora? Abre un [Issue](https://github.com/Leoglez10/Tae-Foto-P15/issues) o manda un Pull Request.

---

<div align="center">

**¿Dudas?** [Si algo falla](#si-algo-falla) · [Respaldos y restauración](#respaldos-y-restauración) · [Problemas conocidos](#problemas-conocidos) · [Soporte](#-soporte)

Hecho con 💙 para la comunidad de la **Preparatoria Quince** — *respalda siempre* 💾

</div>
