use tauri::path::BaseDirectory;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .setup(|app| {
            if tauri::is_dev() {
                return Ok(()); // Vite will already host a development server
            }

            let resource_path = app
                .path()
                .resolve("_up_/src/web/dist", BaseDirectory::Resource)?;

            println!(
                "Starting Rocket server to serve static files from: {}",
                resource_path.display()
            );

            tauri::async_runtime::spawn(async move {
                let server = rocket::fs::FileServer::from(resource_path);

                rocket::build()
                    .configure(
                        rocket::Config::figment()
                            .merge(("port", 2420))
                            .merge(("address", local_ip_address::local_ip().unwrap())),
                    )
                    .mount("/", server)
                    .launch()
                    .await
                    .expect("failed to launch Rocket server");
            });

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
