import { exists, BaseDirectory, create, mkdir } from "@tauri-apps/plugin-fs";

async function mkdirsForFile(path: string) {
  const sections = path.replace("\\", "/").split("/")

  for (let i=0;i<sections.length-1;i++) {
    let currentPath = "";
    for (let j=0;j<=i;j++) {
      currentPath += sections[j] + "/";
    }

    const dirExists = await exists(currentPath, { baseDir: BaseDirectory.AppData });
    if (dirExists)
      continue

    await mkdir(currentPath, { baseDir: BaseDirectory.AppData });
  }
}

function applyPathPrefix(path: string) {
  return "tiny-games-data/" + path;
}

export async function createFileIfDoesntExist(path: string, defaultContent: string) {
  path = applyPathPrefix(path);

  const fileExists = await exists(path, { baseDir: BaseDirectory.AppData });

  if (fileExists)
    return

  await mkdirsForFile(path)

  const file = await create(path, { baseDir: BaseDirectory.AppData });
  await file.write(new TextEncoder().encode(defaultContent));
  await file.close();
}

export async function createDirIfDoesntExist(path: string) {
  path = applyPathPrefix(path);

  const dirExists = await exists(path, { baseDir: BaseDirectory.AppData });

  if (dirExists)
    return

  await mkdirsForFile(path)

  await mkdir(path, { baseDir: BaseDirectory.AppData });
}
