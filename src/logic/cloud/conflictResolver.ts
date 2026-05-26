import type { GameSave } from "@/logic/save/saveManager";

export type SaveConflict = {
  localUpdatedAt: string;
  cloudUpdatedAt: string;
  localSummary: SaveSummary;
  cloudSummary: SaveSummary;
};

export type SaveSummary = {
  level?: number;
  cards?: number;
  decks?: number;
  achievements?: number;
  campaignCompleted?: boolean;
};

const recordLength = (value: unknown) => (value && typeof value === "object" ? Object.keys(value as Record<string, unknown>).length : 0);

export function summarizeSave(save: GameSave): SaveSummary {
  const collection = save.collection as { level?: number; copies?: Record<string, number>; campaignCompleted?: boolean } | undefined;
  const decks = save.decks as { savedDecks?: unknown[] } | undefined;
  const achievements = save.achievements as { unlockedAchievementIds?: string[] } | undefined;
  return {
    level: collection?.level,
    cards: collection?.copies ? Object.keys(collection.copies).length : recordLength(save.collection),
    decks: decks?.savedDecks?.length ?? recordLength(save.decks),
    achievements: achievements?.unlockedAchievementIds?.length ?? recordLength(save.achievements),
    campaignCompleted: collection?.campaignCompleted,
  };
}

export function detectSaveConflict(localSave: GameSave, cloudSave: GameSave): SaveConflict | null {
  if (localSave.updatedAt === cloudSave.updatedAt) return null;
  return {
    localUpdatedAt: localSave.updatedAt,
    cloudUpdatedAt: cloudSave.updatedAt,
    localSummary: summarizeSave(localSave),
    cloudSummary: summarizeSave(cloudSave),
  };
}

function mergeRecord<T>(a: T, b: T): T {
  if (!a || typeof a !== "object") return b;
  if (!b || typeof b !== "object") return a;
  return { ...(a as Record<string, unknown>), ...(b as Record<string, unknown>) } as T;
}

function mergeCollection(local: unknown, cloud: unknown) {
  const l = (local ?? {}) as Record<string, unknown>;
  const c = (cloud ?? {}) as Record<string, unknown>;
  const localCopies = (l.copies ?? {}) as Record<string, number>;
  const cloudCopies = (c.copies ?? {}) as Record<string, number>;
  const copies = { ...cloudCopies };
  Object.entries(localCopies).forEach(([cardId, count]) => {
    copies[cardId] = Math.max(copies[cardId] ?? 0, count);
  });
  return {
    ...c,
    ...l,
    copies,
    unlockedCards: Array.from(new Set([...(c.unlockedCards as string[] | undefined ?? []), ...(l.unlockedCards as string[] | undefined ?? [])])),
    unlockedTitles: Array.from(new Set([...(c.unlockedTitles as string[] | undefined ?? []), ...(l.unlockedTitles as string[] | undefined ?? [])])),
    unlockedLoreEntries: Array.from(new Set([...(c.unlockedLoreEntries as string[] | undefined ?? []), ...(l.unlockedLoreEntries as string[] | undefined ?? [])])),
    unlockedEndings: Array.from(new Set([...(c.unlockedEndings as string[] | undefined ?? []), ...(l.unlockedEndings as string[] | undefined ?? [])])),
    clarityFragments: Math.max(Number(l.clarityFragments ?? 0), Number(c.clarityFragments ?? 0)),
    mentalKeys: Math.max(Number(l.mentalKeys ?? 0), Number(c.mentalKeys ?? 0)),
    campaignCompleted: Boolean(l.campaignCompleted || c.campaignCompleted),
  };
}

function mergeDecks(local: unknown, cloud: unknown) {
  const l = (local ?? {}) as { savedDecks?: { name?: string; id?: string }[] };
  const c = (cloud ?? {}) as { savedDecks?: { name?: string; id?: string }[] };
  const decks = [...(c.savedDecks ?? [])];
  (l.savedDecks ?? []).forEach((deck) => {
    const exists = decks.some((item) => (item.id && item.id === deck.id) || (item.name && item.name === deck.name));
    decks.push(exists ? { ...deck, name: `${deck.name ?? "Mazo"} local` } : deck);
  });
  return { ...c, ...l, savedDecks: decks };
}

export function mergeSavesSafely(localSave: GameSave, cloudSave: GameSave): GameSave {
  return {
    ...cloudSave,
    ...localSave,
    updatedAt: new Date().toISOString(),
    economy: mergeRecord(localSave.economy, cloudSave.economy),
    collection: mergeCollection(localSave.collection, cloudSave.collection),
    achievements: mergeRecord(localSave.achievements, cloudSave.achievements),
    campaign: mergeRecord(localSave.campaign, cloudSave.campaign),
    settings: localSave.settings,
    decks: mergeDecks(localSave.decks, cloudSave.decks),
  };
}
