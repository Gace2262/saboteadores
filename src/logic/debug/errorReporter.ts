export type GameErrorType =
  | "save_error"
  | "card_effect_error"
  | "battle_state_error"
  | "audio_error"
  | "animation_error"
  | "economy_error"
  | "unknown_error";

export type GameErrorReport = {
  id: string;
  timestamp: string;
  type: GameErrorType;
  message: string;
  screen: string;
  safeState?: Record<string, unknown>;
};

const ERROR_KEY = "saboteadores-error-log-v1";

const memoryStorage = (): Storage => {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (key) => store.get(key) ?? null,
    key: (index) => Array.from(store.keys())[index] ?? null,
    removeItem: (key) => store.delete(key),
    setItem: (key, value) => {
      store.set(key, String(value));
    },
  };
};

const getSafeStorage = (storage?: Storage) => storage ?? (typeof globalThis.localStorage !== "undefined" ? globalThis.localStorage : memoryStorage());

export function readErrorReports(storage?: Storage): GameErrorReport[] {
  const safeStorage = getSafeStorage(storage);
  try {
    const parsed = JSON.parse(safeStorage.getItem(ERROR_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.slice(0, 20) : [];
  } catch {
    return [];
  }
}

export function reportGameError(input: Omit<GameErrorReport, "id" | "timestamp">, storage?: Storage): GameErrorReport {
  const safeStorage = getSafeStorage(storage);
  const report: GameErrorReport = {
    ...input,
    id: `${Date.now()}-${input.type}`,
    timestamp: new Date().toISOString(),
  };
  const reports = [report, ...readErrorReports(safeStorage)].slice(0, 20);
  safeStorage.setItem(ERROR_KEY, JSON.stringify(reports));
  return report;
}

export function clearErrorReports(storage?: Storage) {
  getSafeStorage(storage).removeItem(ERROR_KEY);
}
