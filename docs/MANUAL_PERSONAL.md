---
title: "Manual del personal"
subtitle: "Préstamo de Equipos — TAE Foto · Control de equipo fotográfico y audiovisual · Preparatoria Quince"
lang: es
---

# Índice

1. [Antes de empezar](#antes-de-empezar): para quién es, cómo leerlo, las cinco reglas de oro
2. [Qué es la app y qué no es](#qué-es-la-app-y-qué-no-es): y qué puede hacer, de un vistazo
3. [Instalar la app](#instalar-la-app): conseguir el instalador, instalarlo, dejarlo listo
4. [Las dos puertas de entrada](#las-dos-puertas-de-entrada): Estudiante y Administrador
5. [Prestar y devolver](#prestar-y-devolver): el trabajo del mostrador
6. [El panel de administración](#el-panel-de-administración): alumnos, equipos, cuentas, registros, reportes
7. [Importar alumnos desde Excel](#importar-alumnos-desde-excel)
8. [Respaldos](#respaldos): crear, restaurar, dónde vive todo
9. [Actualizaciones](#actualizaciones)
10. [**Qué hago si…**](#qué-hago-si): el capítulo de emergencias
11. [Calendario de mantenimiento](#calendario-de-mantenimiento): qué toca cada semana, mes y ciclo
12. [Preguntas rápidas](#preguntas-rápidas)
13. [Glosario](#glosario)
14. [Dónde está lo demás](#dónde-está-lo-demás): ayuda, reportar un problema, documentación

> En el PDF, este índice trae el número de página de cada capítulo y de cada
> sección. En GitHub, cada línea es un enlace.

---

# Antes de empezar

## Para quién es este manual

Para la persona que **usa la app todos los días**: quien atiende el mostrador del
TAE de Foto, presta y recibe equipo, da de alta alumnos y saca los reportes.

No necesita saber programar ni saber qué es una base de datos. Todo lo que hay
que hacer está aquí, paso a paso.

> Si lo que busca es **modificar el programa** (compilarlo, cambiarle el código,
> publicar una versión nueva), este no es su documento. Vea `README.md`, sección
> *Mantenimiento y desarrollo*, y `CONTRIBUTING.md`.

## Cómo leerlo

No hace falta leerlo de corrido. Está hecho para consultarse:

| Si necesita… | Vaya a… |
|---|---|
| Entender qué es la app y quién usa qué | [Qué es la app](#qué-es-la-app-y-qué-no-es) y [Las dos puertas](#las-dos-puertas-de-entrada) |
| Prestar o recibir un equipo | [Prestar y devolver](#prestar-y-devolver) |
| Dar de alta, editar o sacar un reporte | [El panel de administración](#el-panel-de-administración) |
| **Resolver un problema** | [Qué hago si…](#qué-hago-si) |
| Saber qué toca hacer esta semana | [Calendario de mantenimiento](#calendario-de-mantenimiento) |
| Entender una palabra | [Glosario](#glosario) |

## Las cinco reglas de oro

Si solo recuerda cinco cosas, que sean estas:

1. **La app no se respalda sola.** El único respaldo que existe es el que alguien
   crea con el botón **Respaldar base**. Hágalo cada semana y antes de cualquier
   cambio grande.
2. **Restaurar reemplaza TODO.** No mezcla ni fusiona. Lo capturado después de la
   fecha de ese respaldo se pierde.
3. **Una sola computadora.** Dos computadoras con la app tienen dos bases
   separadas que no se comunican entre sí.
4. **Eliminar no pide confirmación.** El botón **Eliminar** de un alumno o de un
   equipo borra también todo su historial, en el momento.
5. **Cambie la contraseña de fábrica y cierre sesión.** La cuenta inicial es
   `admin` / `1234`, y la computadora es compartida.

---

# Qué es la app y qué no es

## Qué es

Un programa de escritorio que se instala en **una computadora con Windows** y
funciona como la libreta de préstamos del TAE de Foto, pero digital. Reemplaza la
lista manual del archivo `REGISTRO FOTO.xlsm`.

Responde tres preguntas:

1. ¿Qué equipo prestamos?
2. ¿A qué alumno se lo prestamos?
3. ¿Cuándo nos lo devolvió?

Y guarda el historial completo de cada préstamo y cada devolución.

## Qué NO es

| No es… | Por qué importa |
|---|---|
| **Una página web** | No se abre en el navegador ni en el celular. Es un ícono en el escritorio de Windows. |
| **Un sistema en la nube** | Los datos viven **dentro de esa computadora**. Si se borra la carpeta de datos, se pierden. |
| **Un sistema sincronizado** | Dos computadoras con la app tienen **dos bases separadas**. |
| **Un sistema que necesite internet** | Presta, devuelve, reporta y respalda sin red. Solo dos funciones salen a internet, y únicamente cuando usted las usa: buscar actualizaciones y enviar un reporte de problema. |

> **La consecuencia práctica es una sola:** el respaldo no es opcional. Es lo único
> que separa un accidente de una pérdida total.

## Qué necesita para funcionar

- Windows 10 u 11 de 64 bits.
- El componente **WebView2** de Microsoft (suele venir instalado; si la app abre
  en blanco, falta).
- Un lector de código de barras USB es opcional, pero agiliza el mostrador. Debe
  enviar la tecla `Enter` al terminar cada lectura.
- Para **Generar PDF** en Reportes, el programa **wkhtmltopdf** instalado en su
  ruta predeterminada. Sin él, la vista previa y la impresión funcionan igual.

## Qué puede hacer, de un vistazo

| Función | Qué resuelve |
|---|---|
| **Préstamo y devolución por código** | El alumno se identifica con su código y el registro toma segundos, sin contraseña |
| **Un préstamo a la vez** | Un alumno no puede tener dos equipos, y un equipo no puede estar prestado dos veces |
| **Panel de administración** | Protegido con usuario y contraseña |
| **Alumnos, equipos y administradores** | Alta, edición, activar/desactivar y baja |
| **Historial de registros** | Búsqueda por alumno y por fechas, exportación a CSV |
| **Reportes** | Préstamos por alumno, por fecha y equipos más usados, con vista previa, impresión y PDF |
| **Importar alumnos desde Excel** | Las listas del ciclo escolar se cargan de una sola vez |
| **Respaldo y restauración** | Una copia completa de la base, y un respaldo automático justo antes de restaurar |
| **Se actualiza con su permiso** | Avisa cuando hay versión nueva; no descarga nada hasta que usted confirma |
| **Reportar un problema** | Desde la app, sin cuenta de GitHub |

---

# Instalar la app

Este capítulo se usa una vez por computadora. Si la app ya está instalada y
funcionando, pase al siguiente.

## Paso 1: conseguir el instalador

Es un archivo que termina en `.exe` o `.msi`, por ejemplo
`Prestamo de Equipos_X.Y.Z_x64-setup.exe`, donde `X.Y.Z` es el número de versión.

- Entre a <https://github.com/Leoglez10/Tae-Foto-P15/releases/latest>.
- En la sección **Assets**, descargue el `.exe` (o el `.msi`).

> En esa misma página está **este manual en PDF**. Descargue el de la misma
> versión que va a instalar: las pantallas cambian entre versiones.

## Paso 2: instalar

1. Si descargó el instalador en otra computadora, cópielo a la computadora destino.
2. **Si Windows bloquea el archivo:** clic derecho sobre el instalador →
   **Propiedades** → abajo a la derecha marque **Desbloquear** → **Aplicar**.
3. Doble clic sobre el archivo.
4. Si aparece una pantalla azul que dice *"Windows protegió su PC"*, elija
   **Más información** → **Ejecutar de todas formas**. Es esperado: el instalador
   es de distribución interna y no tiene certificado comercial.
5. Siga el asistente hasta el final.
6. Abra **Prestamo de Equipos** desde el menú Inicio o el escritorio. La primera
   vez crea la base de datos y la cuenta de fábrica.

> **Si la app abre en blanco**, falta **WebView2**. Instálelo desde
> <https://developer.microsoft.com/microsoft-edge/webview2/> y vuelva a abrirla.

## Paso 3: dejarla lista para trabajar

Esta lista es lo que separa una instalación que sirve de una que va a dar
problemas en tres meses:

- [ ] Entre a **ADMINISTRADOR** con `admin` / `1234`.
- [ ] En **Admins**, **cambie la contraseña** de `admin`.
- [ ] Cree una cuenta por cada persona que va a administrar, cada una con su
      propia contraseña.
- [ ] Cargue los alumnos del ciclo (a mano o con [Importar](#importar-alumnos-desde-excel)).
- [ ] Dé de alta los equipos que se prestan.
- [ ] Haga un préstamo y una devolución de prueba, y revise que aparezcan en
      **Registros**.
- [ ] En **Configuración**, pulse **Respaldar base** y confirme que el archivo
      aparece en *Historial de respaldos*.
- [ ] Si usa lector de códigos, pruebe que al escanear busque solo (que envíe `Enter`).

> No deje la lista a medias. Una app con la contraseña de fábrica y sin
> respaldos funciona perfectamente… hasta el día que no.

---

# Las dos puertas de entrada

Al abrir la app aparecen dos tarjetas grandes. Cada una es un modo distinto, con
distinto nivel de acceso.

| Puerta | Tecla | Quién la usa | Qué necesita | Para qué |
|---|---|---|---|---|
| **ESTUDIANTE** | `1` | Quien atiende el mostrador | Solo el **código del alumno**. Sin contraseña. | Prestar y recibir equipo |
| **ADMINISTRADOR** | `2` | Un administrador | **Usuario + contraseña** | Alumnos, equipos, cuentas, registros, reportes, importación, respaldos, actualizaciones |

Para el trabajo diario solo se necesita **ESTUDIANTE**.

## Cuándo termina cada sesión

| Modo | Se cierra… |
|---|---|
| ESTUDIANTE | No tiene sesión: cada operación empieza escaneando un código |
| ADMINISTRADOR | Al pulsar **Cerrar sesion**, **Volver al inicio**, la tecla `Esc` o al cerrar la app. **No tiene temporizador**: si nadie la cierra, sigue abierta |

> Mientras la sesión de administrador esté abierta, cualquiera con acceso a la
> computadora puede borrar alumnos, equipos o el historial completo. **Ciérrela
> antes de levantarse.**

## Cuenta de fábrica

La app viene con un administrador precargado para poder entrar la primera vez:

| Campo | Valor |
|---|---|
| Usuario | `admin` |
| Contraseña | `1234` |

> **Cambie la contraseña el primer día.** Todo el que haya leído este manual o el
> README conoce esa combinación.
>
> Tenga presente además que, en la versión actual, las contraseñas se guardan sin
> cifrar dentro de la base. No comparta la base ni los respaldos con nadie ajeno
> a la administración.

---

# Prestar y devolver

Cada tarea es una receta. Siga los pasos en orden.

## Inicio y cierre del turno

**Al empezar:**

- [ ] Abra la app y confirme que la pantalla de inicio carga sin errores.
- [ ] Revise que la fecha y hora de Windows sean correctas: son las que quedan en
      cada registro.
- [ ] Si hay un aviso de actualización, **no actualice con gente esperando**.
      Pulse **Más tarde**.

**Antes de irse:**

- [ ] Registre todas las devoluciones que ya están físicamente en el mostrador.
- [ ] Cierre la sesión de administrador si la abrió.
- [ ] Si hizo una importación o una captura grande, cree un respaldo.

## Prestar un equipo

1. En la pantalla de inicio, toque **ESTUDIANTE** (o pulse `1`).
2. Escanee o escriba el **código del alumno** en el campo grande (paso **1**) y
   pulse `Enter` o **Buscar**.
3. A la derecha aparece la tarjeta del alumno: nombre, materia, grupo, profesor y
   la etiqueta **Disponible**. Abajo, su historial.
4. En el paso **2, Elige el equipo**, toque el equipo que se lleva. Solo aparecen
   los equipos disponibles, ordenados por número.
   - Si hay más de 12 disponibles, aparece un buscador para filtrar por número o
     descripción.
5. Opcional: escriba una **observación** ("funda raída", "sin tapa").
6. Toque **Registrar préstamo** (o pulse `Enter` desde las observaciones).
7. La pantalla muestra en grande **PRESTAMO REGISTRADO** y el número de equipo.
   Se cierra sola a los **2 segundos**; tocarla o pulsar cualquier tecla la
   cierra antes.

La app queda lista para el siguiente alumno.

> Arriba de la pantalla hay tres contadores: **Alumnos**, **Disponibles** y
> **Prestados**. Sirven para ver de un vistazo cuánto equipo hay afuera.

## Recibir una devolución

1. En **ESTUDIANTE**, escanee el **código del alumno**.
2. La app detecta sola que tiene un préstamo activo: la tarjeta dice
   **CON PRESTAMO**, muestra el equipo y desde cuándo lo tiene, y el botón cambia
   a **Registrar devolución** en rojo.
3. No hay que elegir equipo: la app ya sabe cuál es. Escriba una observación si
   volvió con algún detalle.
4. Toque **Registrar devolución**. El aviso **EQUIPO DEVUELTO** lo confirma.

> **Un préstamo a la vez.** Un alumno con un equipo prestado no puede llevarse
> otro hasta devolver el primero, y un equipo prestado no aparece para nadie más.
> Es una regla de la base de datos, no solo de la pantalla.

## Atajos del teclado

| Tecla | Dónde | Qué hace |
|---|---|---|
| `1` / `2` | Pantalla de inicio | Entra a ESTUDIANTE / ADMINISTRADOR |
| `Enter` | Campo de código | Busca al alumno |
| `Enter` | Observaciones o equipo elegido | Registra la operación |
| `Esc` | ESTUDIANTE | Limpia el formulario |
| `Esc` | ADMINISTRADOR | Vuelve al inicio y cierra la sesión |

---

# El panel de administración

## Entrar y salir

1. En la pantalla de inicio, toque **ADMINISTRADOR** (o pulse `2`).
2. Escriba **Usuario** y **Contrasena**, y pulse **INGRESAR**.

Para salir, use **Cerrar sesion** (el botón rojo al pie de la barra lateral) o
**Volver al inicio**. Las dos cierran la sesión.

## Las secciones

A la izquierda hay una barra lateral con estas secciones:

| Grupo | Sección | Para qué sirve |
|---|---|---|
| Principal | **Resumen** | Accesos rápidos y contadores: alumnos, disponibles, prestados, registros y admins. Cada contador lleva a su sección |
| Principal | **Registros** | Historial de préstamos y devoluciones: buscar, filtrar por fechas, exportar a CSV |
| Organización | **Alumnos** | Alta, edición, activar/desactivar y baja de alumnos |
| Organización | **Equipos** | Inventario: alta, edición, filtros y orden por columna |
| Análisis | **Reportes** | Tres reportes con vista previa, impresión y PDF |
| Sistema | **Importar** | Carga de alumnos y grupos desde Excel |
| Sistema | **Admins** | Cuentas del panel |
| Sistema | **Configuración** | Versión, actualizaciones, reportar un problema y respaldos |

## Dar de alta un alumno

1. **Alumnos** → abra **Agregar alumno**.
2. Llene **Codigo**, **Nombre**, **Materia**, **Profesor** y **Grupo**. Los cinco
   son obligatorios.
3. **Agregar alumno**. Aparece el aviso *"Alumno agregado"*.

El código tiene que ser único y debe coincidir **exactamente** con el que el
alumno escanea en el mostrador.

## Dar de alta un equipo

1. **Equipos** → abra **Agregar equipo**.
2. Llene **Numero** (único), **Tipo** (por ejemplo *Cámara*, *Lente*) y
   **Descripcion**.
3. Deje el **Estado** en `disponible`.
4. **Agregar equipo**.

## Editar un alumno, un equipo o una cuenta

Las tablas son editables: cambie el valor directamente en la celda y pulse
**Guardar** **en esa misma fila**. Si cambia varias filas, guarde cada una.

Arriba de cada tabla hay un buscador, filtros y **Limpiar filtros**. En
**Equipos** puede ordenar tocando el encabezado de una columna.

## Activo e inactivo

En lugar de borrar, **desactive**:

- Un **alumno inactivo** se sigue encontrando por su código, pero la app no le
  presta equipo (*"El alumno está inactivo"*).
- Un **equipo inactivo** deja de aparecer en la lista de disponibles.
- Una **cuenta inactiva** ya no puede entrar al panel.

El historial se conserva completo. Por eso, desactivar casi siempre es mejor que
eliminar.

## Los dos estados de un equipo

| Estado | Significa | Quién lo pone |
|---|---|---|
| `disponible` | Está en el TAE y se puede prestar | La app, al registrar la devolución |
| `prestado` | Lo tiene un alumno | La app, al registrar el préstamo |

No hace falta cambiarlo a mano. Dos casos especiales:

- Si marca como `disponible` un equipo que sigue prestado y guarda, **la app
  cierra ese préstamo y registra la devolución por usted**, con la observación
  *"Devolucion registrada desde panel admin"*. Úselo solo cuando el equipo de
  verdad ya está de vuelta.
- No se puede marcar un equipo como `prestado` a mano: un préstamo solo nace
  desde el mostrador.

## Eliminar

> **El botón Eliminar no pide confirmación.** Actúa en cuanto lo pulsa.

- Al eliminar un **alumno** o un **equipo** se borran también **todos sus
  préstamos e historial**. Si ese historial importa, cree un respaldo antes o,
  mejor, desactívelo.
- No se puede eliminar un alumno ni un equipo con **préstamo activo**: primero
  registre la devolución.
- No se puede eliminar ni desactivar al **último administrador activo**.

## Cuentas de administrador

- **Crear:** **Admins** → **Agregar administrador** → **Usuario**, **Nombre** y
  **Contrasena** → **Agregar administrador**.
- **Cambiar una contraseña:** escriba la nueva en la columna **Nueva contrasena**
  de esa fila y pulse **Guardar**. Si deja la celda en blanco, la contraseña no
  cambia.
- **Quitar el acceso a alguien:** ponga su cuenta en **Inactivo** y guarde. No
  comparta una misma cuenta entre varias personas.

## Consultar los registros

**Registros** muestra cada préstamo y cada devolución: fecha, tipo, código,
nombre, materia, profesor, grupo, equipo y observaciones.

1. Abra **Buscar por alumno o rango de fechas**, escriba el código o nombre y/o
   las fechas, y pulse **Filtrar**. La tabla carga hasta 1000 registros por
   consulta; acote con fechas si busca algo antiguo.
2. Dentro de lo cargado, use **Buscar en resultados** y el filtro de tipo
   (**Prestamos** / **Devoluciones**).
3. **Exportar CSV** guarda los registros en un archivo que se abre con Excel. El
   aviso verde indica la ruta donde quedó.

> **Borrar historial** elimina **todo** el historial de préstamos y devoluciones.
> Pide confirmación una vez y **no se puede deshacer**. No lo use para "limpiar":
> cree un respaldo antes, siempre.

## Sacar reportes

1. **Reportes** → elija el **Tipo de reporte**:
   - **Prestamos por alumno**: opcionalmente, elija un **Alumno**.
   - **Prestamos por fecha**.
   - **Equipos mas usados**.
2. Opcional: **Fecha inicio** y **Fecha fin**.
3. Elija:
   - **Solo consultar**: muestra el resultado en la tabla de abajo.
   - **Vista previa**: abre una hoja lista para imprimir.
4. En la vista previa:
   - **Imprimir vista** manda la hoja a la impresora de Windows. Desde ahí también
     puede elegir *Microsoft Print to PDF* para guardarla como PDF.
   - **Generar PDF** crea el PDF y lo abre solo. Después, **Abrir ultimo PDF** lo
     vuelve a abrir.

> **Generar PDF** necesita el programa **wkhtmltopdf** instalado en
> `C:\Program Files\wkhtmltopdf\`. Si no está, aparece un error: use
> **Imprimir vista** → *Microsoft Print to PDF*, que da el mismo resultado.

---

# Importar alumnos desde Excel

Para cargar las listas del ciclo escolar de una sola vez.

## Dónde está

**ADMINISTRADOR** → **Importar** → **Seleccionar Excel**.

## Qué archivo acepta

Un libro `.xlsx` o `.xlsm` con una hoja **ALUMNOS**, una hoja **GRUPOS**, o
ambas.

**Hoja ALUMNOS**, con estas columnas en este orden:

| Código | Nombre | Materia | Profesor(a) | Grupo |
|---|---|---|---|---|
| 240145 | María Pérez | Fotografía | Laura Soto | 5AV |

**Hoja GRUPOS** (opcional), con estas columnas en este orden:

| Grupo | Turno | Ciclo escolar |
|---|---|---|
| 5AV | MAT | 2025-2026 |

El turno solo puede ser `MAT` (matutino) o `VES` (vespertino).

> **La forma segura de armar el archivo:** parta de las plantillas de la carpeta
> `templates/` del proyecto (`solo_alumnos.xlsx`, `solo_grupos.xlsx`,
> `ambas.xlsx`) y pegue sus datos **debajo** de la primera fila, sin tocarla.

## Las cuatro reglas de la importación

1. **Todo o nada.** Si algo está mal, no se guarda nada y la app explica el error.
   No quedan importaciones a medias.
2. **No borra a nadie.** Si el código ya existe, ese alumno se **actualiza** y
   queda activo; si no existe, se crea. Los alumnos que no vienen en el Excel no
   se tocan.
3. **El orden de las columnas importa.** Acentos y mayúsculas en los encabezados
   no (`CÓDIGO` = `Código`); el orden sí.
4. **Filas incompletas se omiten.** Una fila sin código o sin nombre no entra.

Al terminar aparece un resumen: alumnos y grupos **insertados**,
**actualizados** y **omitidos**, y las hojas que se validaron.

> Cree un **respaldo antes de importar**. La importación no borra, pero sí
> actualiza nombres, materias y grupos de alumnos que ya existían.

## El `REGISTRO FOTO.xlsm` histórico

El libro histórico de la escuela usa otras hojas y **no entra por este botón**.
Para migrarlo existe un procedimiento aparte que ejecuta la persona responsable
del sistema. No intente renombrar sus hojas para forzarlo.

---

# Respaldos

Este es el capítulo que hay que leer aunque no se lea ningún otro.

## En diez segundos

**La app no hace respaldos por su cuenta.** Un respaldo es una copia completa de
la base en un momento dado, y solo existe si alguien pulsa **Respaldar base**. La
única excepción es la restauración: justo antes de restaurar, la app guarda una
copia de la base actual.

## Crear un respaldo

1. **ADMINISTRADOR** → **Configuración** → panel **Respaldos de la base**.
2. Pulse **Respaldar base**.
3. El aviso verde indica dónde quedó. El archivo aparece en **Historial de
   respaldos**, con fecha y tamaño.

Hágalo **al menos una vez por semana**, y siempre antes de: importar un Excel,
actualizar la app, eliminar alumnos o equipos, borrar el historial, cerrar el
ciclo escolar, o cualquier cosa que le dé nervios.

## Sacar el respaldo de la computadora

Un respaldo que vive en el mismo disco se pierde junto con el disco.

1. En **Historial de respaldos**, pulse **Abrir carpeta**.
2. Copie el archivo más reciente a una USB o a una carpeta de la escuela en la
   nube.
3. Guárdelo **fuera de la computadora del mostrador**.

## Los nombres de los respaldos

Todos se llaman `prestamos-backup-AAAAMMDD-HHMMSS.sqlite`, por ejemplo
`prestamos-backup-20260913-101530.sqlite` (13 de septiembre de 2026, 10:15:30).

El respaldo que la app crea antes de restaurar **tiene el mismo formato de
nombre**. Para distinguirlo, fíjese en la hora: coincide con el momento en que
restauró.

## Restaurar

1. **ADMINISTRADOR** → **Configuración** → **Respaldos de la base**.
2. Pulse **Restaurar base** y elija el archivo `.sqlite` o `.db`. Puede estar en
   la carpeta de respaldos o en una USB.
3. La app avisa: *"Se reemplazará la base de datos actual con el archivo
   seleccionado. Antes se creará un respaldo automático."* Acepte solo si está
   seguro del archivo.
4. La app revisa que el archivo sea una base válida, respalda la actual y la
   reemplaza. El aviso dice dónde quedó ese respaldo previo.
5. Revise **Alumnos**, **Equipos** y **Registros** antes de volver a operar.

> **Restaurar reemplaza TODA la base, no la mezcla.** Lo capturado después de la
> fecha de ese respaldo se pierde. Si se equivocó de archivo, restaure el
> respaldo previo que la app acaba de crear.

## Copiar la base a mano, sin la app

Si la app no abre:

1. Asegúrese de que la app **esté cerrada**.
2. Win + R → pegue `%APPDATA%\com.institucion.prestamosequipos` → Enter.
3. Copie `prestamos.sqlite` a un lugar seguro.

## Dónde vive todo

Todo vive dentro de una sola carpeta de Windows:

`C:\Users\<SU_USUARIO>\AppData\Roaming\com.institucion.prestamosequipos\`

| Archivo o carpeta | Qué es | ¿Se puede borrar? |
|---|---|---|
| `prestamos.sqlite` | **La base de datos.** Alumnos, equipos, cuentas y todo el historial | **Nunca** |
| `backups\` | Los respaldos | Solo respaldos viejos que ya tenga copiados fuera |
| `reports\` | Los CSV y PDF que genera la app | Sí, una vez guardados donde corresponda |

**Atajo para llegar:** Win + R → `%APPDATA%\com.institucion.prestamosequipos` → Enter.

> Si borra esa carpeta, **pierde todo el historial de préstamos**. Desinstalar y
> reinstalar la app no la borra, pero no lo ponga a prueba sin un respaldo.

---

# Actualizaciones

**La app busca versiones nuevas sola, pero nunca se actualiza sin su permiso.**

Busca al abrir y cada 6 horas mientras está abierta. Si encuentra una, aparece
un aviso arriba de la pantalla. Solo instala paquetes **firmados** por el
proyecto, así que nadie puede colarle un instalador falso por ese aviso.

## Cómo actualizar

1. **Cree un respaldo** y cópielo fuera de la computadora.
2. Termine lo que esté haciendo. Al final, Windows cierra la app para instalar.
3. En el aviso de arriba leerá *"Versión X disponible. No se descarga nada hasta
   que confirmes."* Abra **Notas de la versión** si quiere ver qué trae.
4. Pulse **Actualizar ahora**. La app pide confirmación una vez más y solo
   entonces empieza a descargar; va mostrando los KB descargados.
5. Al terminar, **Windows cierra la aplicación** para instalar. Déjela trabajar.
6. Abra la app de nuevo. Aparece **Actualización completada** con lo que cambió;
   pulse **Entendido**.
7. Haga un préstamo y una devolución de prueba antes de volver a atender.

> **No está obligado a actualizar en ese momento.** **Más tarde** oculta el aviso
> por lo que queda de la sesión y **no descarga nada**. Actualice cuando no haya
> gente esperando.

Los datos se conservan al actualizar.

## Qué versión tengo, y buscar una a mano

**ADMINISTRADOR** → **Configuración** → panel **Actualizaciones**. Ahí dice
**Versión instalada** y está el botón **Buscar actualizaciones**.

Buscar **no descarga ni instala nada**: solo pregunta si hay algo nuevo. Si no hay
internet, el panel lo dice y la app sigue funcionando normal.

## Computadoras con una versión muy antigua

Las primeras versiones de la app **no traían el actualizador**. Si una
computadora nunca muestra avisos y en **Configuración** no aparece el panel
**Actualizaciones**, instale la versión más reciente **a mano una vez**, como en
[Instalar la app](#instalar-la-app). Desde ahí se actualiza con avisos.

## Actualicé y algo se ve raro

Restaure el respaldo del paso 1 e informe qué pasó (vea
[Reportar un problema](#reportar-un-problema-desde-la-app)). No siga capturando
sobre un estado que no entiende.

---

# Qué hago si…

Este es el capítulo de consulta. Busque su caso.

## Problemas en el mostrador

### Al escanear dice "Registro no encontrado"

**Causa casi siempre:** el alumno no está dado de alta, o el código se capturó
distinto.

1. Vuelva a escanear o escriba el código con cuidado.
2. **ADMINISTRADOR** → **Alumnos** → búsquelo por nombre.
3. Si no aparece, dé de alta al alumno o impórtelo desde Excel.
4. Si sí aparece, compare el código letra por letra con el de su credencial. Un
   dígito de más o de menos basta para no encontrarlo.

### Dice "El alumno está inactivo"

Alguien lo desactivó. Si debe poder llevarse equipo: **Alumnos** → búsquelo →
**Estado: Activo** → **Guardar**.

### Dice "El alumno ya tiene un préstamo activo"

Tiene un equipo pendiente de devolver. Primero registre esa devolución; después
podrá prestarle otro.

### El equipo que busco no aparece en la lista

La lista solo muestra equipos **disponibles** y **activos**.

1. **ADMINISTRADOR** → **Equipos** → búsquelo por número.
2. Si dice `prestado`, lo tiene otro alumno: revise en **Registros** quién.
3. Si dice **Inactivo** y debe prestarse, cámbielo a **Activo** y guarde.
4. Si no existe, dé de alta el equipo.

### El lector escribe el código pero no busca

El lector no envía `Enter` al final. Pulse **Buscar**, o configure el lector
(normalmente escaneando un código de configuración de su manual) para que agregue
`Enter`.

### Registré un préstamo equivocado

Si el equipo nunca salió, escanee al alumno y registre la devolución con una
observación que lo explique ("préstamo capturado por error"). El historial queda
completo y honesto.

## Problemas con equipos

### Un equipo volvió pero nadie registró la devolución

- **Lo mejor:** escanee el código del alumno y registre la devolución con una
  observación.
- **Si el alumno no está:** **ADMINISTRADOR** → **Equipos** → en la fila del
  equipo cambie **Estado** a `disponible` → **Guardar**. La app cierra el préstamo
  y lo anota como *"Devolucion registrada desde panel admin"*.

### Dice "No se puede marcar como prestado manualmente"

Es a propósito: un préstamo solo se registra desde **ESTUDIANTE**, con el código
del alumno, para que siempre se sepa quién lo tiene.

### Quiero dar de baja un equipo dañado o perdido

**No lo elimine** si quiere conservar su historial: póngalo en **Inactivo** y
agregue en la descripción lo que pasó. Deja de aparecer para préstamo y su
historial queda.

### No me deja eliminar un alumno o un equipo

Tiene un **préstamo activo**. Registre la devolución primero. Y antes de eliminar,
recuerde que se borra todo su historial: desactivar suele ser mejor.

## Problemas con cuentas

### Olvidé mi contraseña de administrador

Otro administrador activo puede ponerle una nueva: **Admins** → su fila →
**Nueva contrasena** → **Guardar**.

Si **nadie** puede entrar al panel, la app no tiene un botón de recuperación.
**No borre ni reinstale nada**: llame a la persona responsable del sistema.

### Alguien dejó la sesión de administrador abierta

**No se cierra sola.** Ciérrela usted ahora con **Cerrar sesion**. Si pasa
seguido, cierre la **app** completa al terminar el turno.

### No me deja desactivar o eliminar una cuenta

Dice *"Debe existir al menos un administrador activo"*. Es a propósito: siempre
tiene que quedar alguien que pueda entrar. Cree o active otra cuenta primero.

## Problemas con reportes y registros

### "Generar PDF" da error

Falta **wkhtmltopdf** en esa computadora. Use **Imprimir vista** →
*Microsoft Print to PDF*, o pida a la persona responsable del sistema que lo
instale.

### No encuentro un registro antiguo

La tabla carga hasta 1000 registros por consulta. Abra **Buscar por alumno o rango
de fechas** y acote por fechas o por alumno.

### Borré el historial por error

El historial solo vuelve restaurando un respaldo anterior al borrado. Todo lo
capturado después de ese respaldo se pierde; anótelo antes de restaurar.

## Problemas con la importación

### "La hoja 'ALUMNOS' no tiene el formato correcto"

Los encabezados están cambiados, en otro orden, o la hoja tiene otro nombre. Copie
la plantilla de `templates/` y pegue sus datos debajo de la primera fila.

### "Turno invalido para el grupo…"

En la hoja **GRUPOS**, el turno está vacío o no es `MAT` ni `VES`. Corríjalo y
vuelva a importar.

### "El archivo debe contener una hoja 'ALUMNOS'…"

El libro no trae ninguna hoja reconocible. Renombre las hojas exactamente a
`ALUMNOS` y/o `GRUPOS`.

### Importé el Excel equivocado

La importación actualiza alumnos existentes con los datos del archivo. Restaure el
respaldo que creó antes de importar (vea [Restaurar](#restaurar)).

## Problemas con la app misma

### Windows muestra "Windows protegió su PC"

Es esperado con el instalador. **Más información** → **Ejecutar de todas formas**.

### La app abre en blanco

Falta **WebView2**. Instálelo desde
<https://developer.microsoft.com/microsoft-edge/webview2/> y vuelva a abrirla.

### La app se congeló o muestra errores extraños

1. Cierre la app y vuelva a abrirla.
2. Si sigue igual, **no borre la carpeta de datos** ni reinstale "por si acaso".
3. Copie `prestamos.sqlite` a una USB (vea
   [Copiar la base a mano](#copiar-la-base-a-mano-sin-la-app)) y llame a la persona
   responsable del sistema.

### Necesito cambiar de computadora

1. En la vieja: **Respaldar base** y copie ese archivo a una USB.
2. En la nueva: instale la app, entre a **Configuración** → **Restaurar base** y
   elija ese archivo.
3. Revise alumnos, equipos y registros.
4. Deje de usar la computadora vieja. Dos computadoras con la app terminan con
   préstamos capturados en la equivocada.

## Problemas con actualizaciones y reportes de problema

### "No se pudo buscar la actualización"

No hay internet o el servidor no respondió. La app sigue funcionando normal. Pulse
**Reintentar búsqueda** cuando haya conexión.

### "No se pudo descargar, verificar o instalar la actualización"

Nada cambió en su instalación. Pulse **Reintentar actualización** cuando tenga una
conexión estable.

### "La actualización ya se instaló, pero no se pudo reiniciar"

Cierre la app y ábrala de nuevo. No hace falta volver a instalar.

### El reporte de problema no se envía

| Mensaje | Qué hacer |
|---|---|
| *"No se pudo conectar. Revisa la conexión a Internet…"* | Espere a tener internet y vuelva a enviar |
| *"Enviaste varios reportes seguidos…"* | Espere un minuto |
| *"El servidor no aceptó el reporte…"* | Inténtelo más tarde, o use el formulario de GitHub (vea [Dónde está lo demás](#dónde-está-lo-demás)) |

---

# Calendario de mantenimiento

| Cada… | Tarea |
|---|---|
| **Diario** | Registrar todas las devoluciones del día y cerrar la sesión de administrador. |
| **Semanal** | **Respaldar base** y copiar el archivo fuera de la computadora. |
| **Semanal** | Revisar en **Equipos** los que llevan mucho tiempo `prestado`, y buscar al alumno. |
| **Mensual** | Sacar el reporte del mes (**Reportes** → fechas del mes → **Vista previa**). |
| **Mensual** | Borrar de la carpeta `backups\` los respaldos viejos que ya estén copiados fuera. |
| **Antes de importar** | Crear un respaldo. |
| **Antes de actualizar** | Crear un respaldo. |
| **Inicio de ciclo** | Importar las listas nuevas y desactivar a los alumnos que ya no cursan. |

## Checklist del cierre de ciclo escolar

- [ ] Revisar que no queden equipos `prestado`.
- [ ] Perseguir lo que no volvió; desactivar lo que no aparezca, anotando el motivo.
- [ ] Sacar los reportes del ciclo completo y archivarlos.
- [ ] Exportar los registros del ciclo a CSV y archivarlos.
- [ ] Crear un **respaldo** del cierre.
- [ ] Copiar ese respaldo a una USB y guardarlo **fuera de la oficina**.

> El checklist de una computadora nueva está en
> [Dejarla lista para trabajar](#paso-3-dejarla-lista-para-trabajar).

---

# Preguntas rápidas

Las que se responden en una línea, para cuando alguien pregunta de pasada.

**¿Necesito internet?**
Para trabajar, no. Solo buscar actualizaciones y enviar un reporte de problema
usan red.

**¿La app manda datos a algún servidor?**
No envía alumnos, préstamos ni contraseñas. Un reporte de problema envía solo lo
que usted escribe, más la versión de la app y el sistema operativo.

**¿Sirve en Mac, Linux o celular?**
No. Solo Windows 10 y 11 de 64 bits.

**¿Puedo tener la app en varias computadoras?**
Puede instalarla, pero cada una tendrá su propia base y no se comunican. Use una
sola para operar.

**¿Se respalda sola?**
No. Solo guarda una copia automática justo antes de restaurar. Los demás
respaldos los crea usted con **Respaldar base**.

**¿Qué pasa si elimino un alumno o un equipo?**
Se borra también todo su historial, sin pedir confirmación. Desactivar es más
seguro.

**¿Puede haber varios administradores?**
Sí, y es lo recomendable: una cuenta por persona.

**¿Por qué no puedo prestar dos equipos al mismo alumno?**
Es una regla de la app: un préstamo activo por alumno y por equipo.

**¿Dónde descargo este manual?**
En la página de Releases, junto al instalador de cada versión.

---

# Glosario

| Palabra | Qué significa aquí |
|---|---|
| **Activo / Inactivo** | Si un alumno, equipo o cuenta participa en la operación. Inactivo no se borra: solo deja de usarse. |
| **Base de datos** | El archivo `prestamos.sqlite` donde vive todo: alumnos, equipos, cuentas e historial. |
| **Código** | El número que identifica a un alumno. Es lo que se escanea en el mostrador. |
| **CSV** | Un archivo de tabla que se abre con Excel. Lo genera **Exportar CSV**. |
| **Devolución** | El registro de que un equipo volvió. Cierra el préstamo. |
| **Disponible** | Equipo en el TAE, listo para prestarse. |
| **Historial** | La lista de todos los préstamos y devoluciones. Se ve en **Registros**. |
| **Importar** | Cargar alumnos y grupos desde un Excel. |
| **Lector** | La pistola de código de barras USB. |
| **Préstamo activo** | Un préstamo que aún no tiene devolución. |
| **Prestado** | Equipo que tiene un alumno. |
| **Reemplazar** | Poner una base completa encima de otra. Es lo que hace *restaurar*. Lo anterior se pierde. |
| **Respaldo** | Una copia completa de la base en un momento dado. Archivo `.sqlite`. |
| **Restaurar** | Volver la base al estado de un respaldo. |
| **Turno** | `MAT` (matutino) o `VES` (vespertino). |

---

# Dónde está lo demás

## Si necesita ayuda

Antes de pedir soporte, anote estas cinco cosas. Con eso otra persona puede
ayudarle sin adivinar:

1. La **versión** instalada (**Configuración** → **Actualizaciones**).
2. La pantalla y el botón exactos donde ocurrió.
3. El mensaje completo del error; tome una foto si hace falta.
4. Lo último que funcionó y lo último que cambió.
5. La fecha del respaldo más reciente. **No borre ni reemplace archivos**
   mientras espera ayuda.

## Reportar un problema desde la app

No hace falta cuenta de GitHub ni saber programar.

1. **ADMINISTRADOR** → **Configuración** → panel **Reportar un problema**.
2. **¿Qué quieres contarnos?**: *Un problema* o *Una sugerencia*.
3. **Título**: en una línea, qué pasó.
4. **Descripción**: qué estaba haciendo, qué esperaba que pasara y qué pasó en su
   lugar.
5. **Enviar reporte**. Sale *"Gracias, el reporte se envió."*

Se envían automáticamente la versión instalada y el sistema operativo. **No se
envían datos de alumnos, préstamos ni contraseñas.** Tampoco los escriba usted en
el reporte.

Si la app no abre, use los formularios de GitHub:
<https://github.com/Leoglez10/Tae-Foto-P15/issues/new/choose>. Nunca adjunte la
base de datos, respaldos, archivos Excel reales ni capturas con datos de alumnos.

## Documentación

| Documento | Para qué |
|---|---|
| `README.md` | La guía general del proyecto, incluidas las preguntas frecuentes |
| `CONTRIBUTING.md` | Cómo reportar un problema y cómo contribuir código |
| `templates/` | Plantillas de Excel para importar alumnos y grupos |

## El programa y sus versiones

- **Instaladores y manual en PDF:** <https://github.com/Leoglez10/Tae-Foto-P15/releases>
- **Código fuente:** <https://github.com/Leoglez10/Tae-Foto-P15>

Cada versión publicada trae su instalador de Windows y una copia de este mismo
manual en PDF. **Descargue siempre el manual de la misma versión que tenga
instalada.**

Las versiones las publica automáticamente el sistema de compilación del proyecto.
El personal operativo **no debe editar números de versión ni crear versiones a
mano**.

---

*Manual generado desde `docs/MANUAL_PERSONAL.md` del repositorio del proyecto.
Si algo en la app no coincide con lo que dice aquí, gana la app, y hay que
corregir el manual.*
