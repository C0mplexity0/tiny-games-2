import { appDataDir, sep } from "@tauri-apps/api/path";
import { exists, BaseDirectory, create, mkdir, readDir, readTextFile, readFile } from "@tauri-apps/plugin-fs";

let dataDir = "";

async function initDataDir() {
  dataDir = await appDataDir();
}

initDataDir();

async function makeAppDataDirIfNeeded() {
  const appDataDirPath = await appDataDir();
  const appDataDirExists = await exists(appDataDirPath, { baseDir: BaseDirectory.AppData });
  if (appDataDirExists)
    return;

  await mkdir(await appDataDir());
}

async function mkdirsForFile(path: string) {
  await makeAppDataDirIfNeeded();

  const sections = path.replace(/\\/g, "/").split("/");

  for (let i=0;i<sections.length-1;i++) {
    let currentPath = "";
    for (let j=0;j<=i;j++) {
      currentPath += sections[j] + sep();
    }

    const dirExists = await exists(currentPath, { baseDir: BaseDirectory.AppData });
    if (dirExists)
      continue;

    await mkdir(currentPath, { baseDir: BaseDirectory.AppData });
  }
}

export function applyPathPrefix(path: string) {
  return "tiny-games-data" + sep() + path;
}

export async function createFileIfDoesntExist(path: string, defaultContent: string) {
  const fileExists = await dataFileExists(path);
  if (fileExists)
    return;

  path = applyPathPrefix(path);

  await mkdirsForFile(path);

  const file = await create(path, { baseDir: BaseDirectory.AppData });
  await file.write(new TextEncoder().encode(defaultContent));
  await file.close();
}

export async function createDirIfDoesntExist(path: string) {
  const fileExists = await dataFileExists(path);
  if (fileExists)
    return;

  path = applyPathPrefix(path);

  await mkdirsForFile(path);

  await mkdir(path, { baseDir: BaseDirectory.AppData });
}

export async function dataFileExists(path: string) {
  path = applyPathPrefix(path);

  const fileExists = await exists(path, { baseDir: BaseDirectory.AppData });
  return fileExists;
}

export async function readDataFile(path: string) {
  const fileExists = await dataFileExists(path);
  if (!fileExists)
    return;

  path = applyPathPrefix(path);

  const content = await readTextFile(path, { baseDir: BaseDirectory.AppData });

  return content;
}

export async function readDataDir(path: string) {
  const fileExists = await dataFileExists(path);
  if (!fileExists)
    return;

  path = applyPathPrefix(path);

  const entries = await readDir(path, { baseDir: BaseDirectory.AppData });
  return entries;
}

export function getAppDataDir() {
  return dataDir;
}

function arrayBufferToBase64(buffer: Uint8Array<ArrayBuffer>, callback: (val: string) => void) {
  const blob = new Blob([buffer], {
    type: "application/octet-binary",
  });
  const reader = new FileReader();
  reader.onload = function (evt) {
    const dataurl = evt.target?.result;
    if (typeof dataurl !== "string")
      return;

    callback(dataurl?.substr(dataurl.indexOf(",") + 1));
  };
  reader.readAsDataURL(blob);
}

export async function fetchImg(path: string) {
  const fileExists = await dataFileExists(path);
  if (!fileExists)
    return;

  path = applyPathPrefix(path);

  const img = await readFile(path, { baseDir: BaseDirectory.AppData });
  console.log(img);
  return new Promise<string>((resolve) => {
    arrayBufferToBase64(img, (val) => {
      resolve("data:image/png;base64," + val);
    });
  });
}
