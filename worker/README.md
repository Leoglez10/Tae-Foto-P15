# Worker de reportes de Tae Foto P15

Recibe los reportes de la app de escritorio y abre un issue en `Leoglez10/Tae-Foto-P15`. Los usuarios no necesitan cuenta de GitHub: el token vive solo en los secretos del Worker.

## Despliegue seguro

Ejecuta Wrangler siempre desde esta carpeta:

```bash
cd worker
npx wrangler login
npx wrangler deploy
npx wrangler secret put GITHUB_TOKEN
```

No ejecutes `wrangler deploy` desde la raíz del repositorio. Wrangler no falla ahí: puede detectar un proyecto parecido a Vite y publicar el frontend como otro Worker, dejando un Worker sobrante.

## Token de GitHub

Usa un **fine-grained personal access token**, con vencimiento:

- Repositorio: solo `Leoglez10/Tae-Foto-P15`.
- Permisos: únicamente `Issues: Read and write`.

Guárdalo con la forma interactiva exacta:

```bash
npx wrangler secret put GITHUB_TOKEN
```

No pases el token como argumento. Si lo escribes en el comando, Wrangler puede dejarlo en su archivo de logs bajo `~/Library/Preferences/.wrangler/logs/`.

## Rotación del token

1. Crea un token fine-grained nuevo con el mismo alcance y una fecha de vencimiento.
2. Desde `worker/`, ejecuta `npx wrangler secret put GITHUB_TOKEN` y pega el token nuevo cuando Wrangler lo pida.
3. Revoca el token anterior en GitHub.
4. Envía un reporte de prueba desde la app ya configurada.

## Después de desplegar

`npx wrangler deploy` imprime la URL `*.workers.dev`. Pega esa URL con `/report` al final en la constante `FEEDBACK_URL` de `src-tauri/src/feedback.rs` y recompila la app.

La URL del Worker viaja dentro del binario. Cualquiera que desempaque la aplicación podría verla y llamar el endpoint; el límite por IP solo mitiga abuso, no lo elimina.
