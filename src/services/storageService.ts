import type { Application } from "../types/application";

const STORAGE_KEY = "jobtrack_applications";

interface ChromeStorageArea {
  get(
    keys: string[],
    callback: (result: Record<string, unknown>) => void
  ): void;

  set(
    items: Record<string, unknown>,
    callback?: () => void
  ): void;
}

interface ChromeApi {
  storage?: {
    local?: ChromeStorageArea;
  };
}

function getChromeStorage(): ChromeStorageArea | undefined {
  const chromeApi = (
    globalThis as typeof globalThis & { chrome?: ChromeApi }
  ).chrome;

  return chromeApi?.storage?.local;
}

export async function getApplications(): Promise<Application[]> {
  const chromeStorage = getChromeStorage();

  if (chromeStorage) {
    return new Promise((resolve, reject) => {
      chromeStorage.get([STORAGE_KEY], (result) => {
        const data = result[STORAGE_KEY];

        if (data === undefined) {
          resolve([]);
          return;
        }

        if (Array.isArray(data)) {
          resolve(data as Application[]);
        } else {
          reject(new Error("Invalid application storage data."));
        }
      });
    });
  }

  const savedData = localStorage.getItem(STORAGE_KEY);

  return savedData ? JSON.parse(savedData) as Application[] : [];
}

export async function saveApplications(
  applications: Application[]
): Promise<void> {
  const chromeStorage = getChromeStorage();

  if (chromeStorage) {
    return new Promise((resolve) => {
      chromeStorage.set(
        { [STORAGE_KEY]: applications },
        resolve
      );
    });
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(applications)
  );
}