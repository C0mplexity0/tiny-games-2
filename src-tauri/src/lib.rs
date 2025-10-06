use tauri::Manager;
use std::thread;
use std::time::Duration;

#[tauri::command]
fn get_ip_address() -> String {
  local_ip_address::local_ip().unwrap().to_string()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_ip_address])
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .setup(|app| {
            if tauri::is_dev() {
                return Ok(());
            }

            let resource_path = app
                .path()
                .resolve("_up_/resources/web/dist", tauri::path::BaseDirectory::Resource)?;

            let figment = rocket::Config::figment()
                .merge(("port", 2420))
                .merge(("address", local_ip_address::local_ip().unwrap()));

            let server = rocket::build()
                .configure(figment)
                .mount("/", rocket::fs::FileServer::from(resource_path));

            tauri::async_runtime::spawn(async move {
                if let Err(e) = server.launch().await {
                    eprintln!("Rocket server failed to launch: {}", e);
                }
            });

            thread::sleep(Duration::from_secs(1));

            println!("✅ Rocket server launched successfully.");
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
