//! In-app problem reports.
//!
//! The POST lives in Rust, not in the webview, for one reason: the version and the
//! operating system are read from the process itself, so a report cannot lie about
//! them. The webview only supplies what the user typed.
//!
//! The request goes to a Cloudflare Worker that holds the GitHub token and opens the
//! issue. Shipping a token inside the binary is never an option. See `worker/README.md`.

const FEEDBACK_URL_PLACEHOLDER: &str = "REPLACE_WITH_TAEFOTO_P15_FEEDBACK_WORKER_REPORT_URL";
/// Guard against shipping a build that still points at the placeholder. While
/// `FEEDBACK_URL` equals this, the command fails fast and never opens a socket.
const FEEDBACK_URL: &str = "https://taefoto-p15-feedback.leoeligr10.workers.dev/report";

const TITULO_MAX: usize = 120;
const DESCRIPCION_MAX: usize = 4000;

/// Same bounds as the Worker, so bad input fails here instead of after a round trip.
fn validar(tipo: &str, titulo: &str, descripcion: &str) -> Result<(), String> {
    if tipo != "bug" && tipo != "sugerencia" {
        return Err("Elige si es un problema o una sugerencia.".into());
    }
    if titulo.is_empty() || titulo.chars().count() > TITULO_MAX {
        return Err(format!(
            "El título no puede quedar vacío ni pasar de {TITULO_MAX} caracteres."
        ));
    }
    if descripcion.is_empty() || descripcion.chars().count() > DESCRIPCION_MAX {
        return Err(format!(
            "La descripción no puede quedar vacía ni pasar de {DESCRIPCION_MAX} caracteres."
        ));
    }
    Ok(())
}

fn feedback_url() -> Result<&'static str, String> {
    if FEEDBACK_URL == FEEDBACK_URL_PLACEHOLDER || !FEEDBACK_URL.starts_with("https://") {
        return Err(
            "El envío de reportes todavía no está configurado. Pide a la persona encargada que pegue la URL del Worker."
                .into(),
        );
    }
    Ok(FEEDBACK_URL)
}

#[tauri::command]
pub async fn reportar_problema(
    app: tauri::AppHandle,
    tipo: String,
    titulo: String,
    descripcion: String,
) -> Result<(), String> {
    let titulo = titulo.trim().to_string();
    let descripcion = descripcion.trim().to_string();
    validar(&tipo, &titulo, &descripcion)?;
    let url = feedback_url()?;

    let version = app.package_info().version.to_string();
    let so = format!("{} {}", std::env::consts::OS, std::env::consts::ARCH);
    let cuerpo = serde_json::json!({
        "tipo": tipo,
        "titulo": titulo,
        "descripcion": descripcion,
        "version": version,
        "so": so,
    });

    let respuesta = reqwest::Client::new()
        .post(url)
        .json(&cuerpo)
        .send()
        .await
        .map_err(|_| "No se pudo conectar. Revisa la conexión a Internet e inténtalo de nuevo.".to_string())?;

    if respuesta.status() == reqwest::StatusCode::TOO_MANY_REQUESTS {
        return Err("Enviaste varios reportes seguidos. Espera un minuto e inténtalo de nuevo.".into());
    }
    if !respuesta.status().is_success() {
        return Err("El servidor no aceptó el reporte. Inténtalo más tarde.".into());
    }
    Ok(())
}
