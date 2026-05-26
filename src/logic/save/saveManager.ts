import { startingWallet } from "@/data/economyConfig";
import { CURRENT_SAVE_VERSION, migrateSave, type LegacySave } from "./saveMigrations";
import { sanitizeSave, validateSave, type SaveValidationResult } from "./saveValidator";

export type GameSave = {
  saveVersion: number;
  createdAt: string;
  updatedAt: string;
  profile: unknown;
  collection: unknown;
  campaign: unknown;
  decks: unknown;
  settings: unknown;
  economy: { wallet: typeof startingWallet; [key: string]: unknown };
  achievements: unknown;
  evolution: unknown;
  world: unknown;
  tribunal: unknown;
};

export type SaveLoadResult = {
  save: GameSave;
  validation: SaveValidationResult;
  recoveredFromBackup: boolean;
  message: string;
};

const SAVE_KEY = "saboteadores-safe-save";
const BACKUP_KEY = "saboteadores-safe-save-backup";
const PRE_MIGRATION_BACKUP_KEY = "saboteadores-safe-save-before-migration";

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

export function createCleanSave(now = new Date().toISOString()): GameSave {
  return {
    saveVersion: CURRENT_SAVE_VERSION,
    createdAt: now,
    updatedAt: now,
    profile: {},
    collection: {},
    campaign: {},
    decks: { savedDecks: [] },
    settings: {},
    economy: { wallet: startingWallet },
    achievements: {},
    evolution: { cardProgressions: {} },
    world: {},
    tribunal: { memory: { eventsSeen: [], anomaliesSeen: [] } },
  };
}

function parseStored(raw: string | null): LegacySave | undefined {
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : undefined;
  } catch {
    return undefined;
  }
}

export function saveGame(save: GameSave, storage?: Storage) {
  const safeStorage = getSafeStorage(storage);
  const previous = safeStorage.getItem(SAVE_KEY);
  if (previous) safeStorage.setItem(BACKUP_KEY, previous);
  const next = { ...save, updatedAt: new Date().toISOString() };
  safeStorage.setItem(SAVE_KEY, JSON.stringify(next));
  safeStorage.setItem(BACKUP_KEY, JSON.stringify(next));
  return next;
}

export function loadGame(storage?: Storage): SaveLoadResult {
  const safeStorage = getSafeStorage(storage);
  const raw = parseStored(safeStorage.getItem(SAVE_KEY));
  const fallback = parseStored(safeStorage.getItem(BACKUP_KEY));
  const clean = createCleanSave();
  const source = raw ?? fallback ?? clean;
  const migrated = migrateSave(source);
  if (source.saveVersion !== migrated.saveVersion) safeStorage.setItem(PRE_MIGRATION_BACKUP_KEY, JSON.stringify(source));
  const sanitized = sanitizeSave(migrated) as GameSave;
  const validation = validateSave(sanitized);
  if (validation.valid) {
    saveGame(sanitized, safeStorage);
    return { save: sanitized, validation, recoveredFromBackup: !raw && Boolean(fallback), message: "Save cargado correctamente." };
  }
  if (fallback && fallback !== source) {
    const backupMigrated = sanitizeSave(migrateSave(fallback)) as GameSave;
    const backupValidation = validateSave(backupMigrated);
    if (backupValidation.valid) {
      saveGame(backupMigrated, safeStorage);
      return {
        save: backupMigrated,
        validation: backupValidation,
        recoveredFromBackup: true,
        message: "El expediente mental llego con paginas mordidas. Restauramos el ultimo backup estable.",
      };
    }
  }
  saveGame(clean, safeStorage);
  return { save: clean, validation: validateSave(clean), recoveredFromBackup: false, message: "Save corrupto sin backup valido. Iniciamos expediente limpio." };
}

export function exportSave(storage?: Storage) {
  const safeStorage = getSafeStorage(storage);
  return safeStorage.getItem(SAVE_KEY) ?? JSON.stringify(createCleanSave());
}

export function importSave(serialized: string, storage?: Storage) {
  const safeStorage = getSafeStorage(storage);
  const parsed = parseStored(serialized);
  if (!parsed) return loadGame(safeStorage);
  safeStorage.setItem(SAVE_KEY, JSON.stringify(parsed));
  return loadGame(safeStorage);
}

export function resetSave(storage?: Storage) {
  const safeStorage = getSafeStorage(storage);
  const clean = createCleanSave();
  safeStorage.setItem(BACKUP_KEY, safeStorage.getItem(SAVE_KEY) ?? JSON.stringify(clean));
  safeStorage.setItem(SAVE_KEY, JSON.stringify(clean));
  return clean;
}

export const saveKeys = { SAVE_KEY, BACKUP_KEY, PRE_MIGRATION_BACKUP_KEY };
