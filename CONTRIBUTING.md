# Cómo contribuir

Este repositorio mantiene **Prestamo de Equipos**, una app local de Windows para la Preparatoria Quince. Hay dos caminos distintos para ayudar:

- **Camino 1:** reportar un problema o sugerir una mejora, pensado para cualquier persona que use la app.
- **Camino 2:** contribuir código, pensado para desarrolladores.

---

## Camino 1: reportar un problema o sugerir una mejora

Si usted usa la app como docente, personal escolar o administrador del panel, no necesita saber programar para reportar algo.

### Opción recomendada: desde la app

Si puede entrar al panel, use **Admin → Configuración → Reportar un problema**. Ese formulario es la forma más útil porque envía automáticamente la versión de la app y el sistema operativo.

### Alternativa: desde GitHub

Si la app no abre, el panel no funciona o el reporte interno es parte del problema, use los formularios de GitHub:

- [Reportar un problema](https://github.com/Leoglez10/Tae-Foto-P15/issues/new?template=bug.yml)
- [Sugerir una mejora](https://github.com/Leoglez10/Tae-Foto-P15/issues/new?template=feature.yml)

Antes de abrir un reporte, revise las [Preguntas frecuentes](README.md#-preguntas-frecuentes) del README. Varias dudas de instalación, respaldos, datos locales e importación ya están documentadas ahí.

> [!IMPORTANT]
> No publique datos personales de alumnos. No adjunte nombres, códigos de alumno, grupos, bases SQLite, respaldos, archivos Excel reales ni capturas que muestren información de alumnos. Es mejor incluir el mensaje de error, la pantalla donde ocurrió y una captura recortada o cubierta.

---

## Camino 2: contribuir código

Si vas a corregir o ampliar la app, trabaja con el flujo **fork → rama → Pull Request**. No necesitas permisos de escritura sobre el repositorio principal.

### Requisitos

- Node.js 20 o posterior.
- npm.
- Rust estable.
- En Windows, los prerrequisitos de Tauri 2 para compilar apps de escritorio, incluido WebView2 y las herramientas de compilación de Microsoft.
- Git.

La app es Tauri 2 + Rust + JavaScript vanilla + SQLite. No hay servidor externo: la base vive en la computadora del usuario.

### Flujo de trabajo

```bash
# 1. Haz fork del repositorio en GitHub.

# 2. Clona tu fork y entra a la raíz de la app.
git clone <URL_DE_SU_FORK>
cd <CARPETA_DEL_REPOSITORIO>

# 3. Instala dependencias de Node.
npm install

# 4. Crea una rama corta y descriptiva.
git checkout -b feat/mi-cambio

# 5. Ejecuta la app localmente con Tauri.
npm run dev
```

Para abrir el Pull Request, sube tu rama a tu fork y explica qué cambiaste, por qué lo cambiaste y cómo lo verificaste.

### Comandos disponibles

`package.json` define solo estos scripts:

```bash
npm run tauri
npm run dev
npm run build
npm run docs:pdf   # manual del personal en PDF; requiere: python3 -m pip install -r docs/manual-pdf-requirements.txt
```

No inventes comandos como `npm test`, `npm run lint` o `npm run typecheck`: este repositorio no los define.

Validaciones útiles según el tipo de cambio:

```bash
# Tests JavaScript existentes con node:test.
node --test src/reports/reporteProblema.test.js src/updates/updateController.test.js

# Tests Rust, incluidos los del importador Excel en src-tauri/src/services/admin.rs.
cargo test --manifest-path src-tauri/Cargo.toml

# Build Tauri local.
npm run build
```

Para cambios visuales o de operación, verifica manualmente con `npm run dev` al menos estos flujos si aplican: préstamo, devolución, acceso al panel, importación, respaldos y reporte de problemas desde Configuración.

### Convenciones del repositorio

- Mantén la app como escritorio local para Windows x64; no agregues dependencia de un servidor salvo que exista una decisión explícita del mantenedor.
- Protege datos escolares: nunca subas `prestamos.sqlite`, respaldos, archivos Excel reales, CSV generados ni capturas con datos de alumnos.
- El texto para personal escolar usa **usted**. El texto para desarrolladores puede usar **tú**. Evita voseo.
- Usa nombres de rama descriptivos: `feat/...`, `fix/...`, `docs/...`.
- Usa commits claros, por ejemplo `feat: agrega filtro de reportes` o `fix: corrige validación de Excel`.
- Si tocas SQLite o importación, respalda primero una base de prueba y documenta cómo verificaste que no se pierden datos.
- Si agregas comandos nuevos, también actualiza esta guía y el README correspondiente.

### Release y CI

El flujo actual vive en `.github/workflows/build-windows.yml`:

- Se dispara con `push` a `main`, tags `v*` y ejecución manual (`workflow_dispatch`).
- Usa Node 20 en CI.
- La preparación corre en Ubuntu y usa `scripts/release-gate.sh`; si corresponde publicar, revisa sintaxis de módulos JavaScript con `node --check`, ejecuta `scripts/test-release-gate.sh` y puede correr `scripts/ci-bump-release.sh`.
- La compilación final corre en `windows-latest`, instala dependencias con `npm install`, instala Rust estable con target `x86_64-pc-windows-msvc`, ejecuta `cargo test --manifest-path src-tauri/Cargo.toml` y publica con `tauri-apps/tauri-action@v0` cuando el gate lo permite.
- La release usa instaladores Windows y updater JSON firmados; no publiques releases manuales sin revisar ese flujo.
- El job `build-manual` (Ubuntu) genera el manual del personal en PDF desde `docs/MANUAL_PERSONAL.md` y lo adjunta a esa misma release como `manual-personal-taefoto.pdf`. Solo corre cuando el gate publica y `build-tauri` terminó bien. Si cambias pantallas o flujos que usa el personal, actualiza también el manual.

### Antes de pedir revisión

Confirma en el Pull Request:

1. Qué problema resuelve.
2. Qué archivos cambiaste.
3. Qué comandos ejecutaste y cuál fue el resultado.
4. Qué prueba manual hiciste en Windows o en el entorno Tauri.
5. Que no incluiste datos reales de alumnos ni archivos locales sensibles.

---

## Preguntas

Para dudas de uso, empiece por las [Preguntas frecuentes](README.md#-preguntas-frecuentes). Para dudas de desarrollo, abra una sugerencia o coméntelo en el Pull Request correspondiente.
