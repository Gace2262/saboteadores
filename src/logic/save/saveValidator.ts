import { allCards } from "@/data/cards";
import { deckRules } from "@/data/deckRules";
import type { CurrencyWallet } from "@/data/economyConfig";
import { CURRENT_SAVE_VERSION, type LegacySave } from "./saveMigrations";

export type SaveValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

const requiredFields = ["saveVersion", "createdAt", "updatedAt", "profile", "collection", "campaign", "decks", "settings", "economy", "achievements", "evolution", "world", "tribunal"];
const cardIds = new Set(allCards.map((card) => card.id));

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateWallet(wallet: unknown, errors: string[]) {
  if (!isRecord(wallet)) {
    errors.push("Economia sin wallet valido.");
    return;
  }
  Object.entries(wallet as Partial<CurrencyWallet>).forEach(([key, value]) => {
    if (typeof value !== "number" || value < 0) errors.push(`Moneda invalida: ${key}`);
  });
}

function validateDecks(decks: unknown, warnings: string[]) {
  if (!isRecord(decks)) return;
  const savedDecks = decks.savedDecks;
  if (!Array.isArray(savedDecks)) return;
  savedDecks.forEach((deck) => {
    if (!isRecord(deck) || !Array.isArray(deck.cardIds)) return;
    const invalidCards = deck.cardIds.filter((id) => typeof id !== "string" || !cardIds.has(id));
    if (invalidCards.length) warnings.push(`Mazo con cartas invalidas: ${invalidCards.join(", ")}`);
    if (deck.cardIds.length > deckRules.maxSize) warnings.push("Mazo excede tamano maximo.");
  });
}

export function validateSave(save: unknown): SaveValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!isRecord(save)) return { valid: false, errors: ["Save no es un objeto."], warnings };

  requiredFields.forEach((field) => {
    if (!(field in save)) errors.push(`Falta campo requerido: ${field}`);
  });
  if (typeof save.saveVersion !== "number" || save.saveVersion > CURRENT_SAVE_VERSION) errors.push("Version de save invalida.");
  if (typeof save.createdAt !== "string" || typeof save.updatedAt !== "string") errors.push("Fechas de save invalidas.");
  validateWallet((save.economy as { wallet?: unknown } | undefined)?.wallet, errors);
  validateDecks(save.decks, warnings);

  return { valid: errors.length === 0, errors, warnings };
}

export function sanitizeSave(save: LegacySave): LegacySave {
  const economy = isRecord(save.economy) ? save.economy : {};
  return {
    ...save,
    economy: {
      ...economy,
      wallet: isRecord(economy.wallet)
        ? Object.fromEntries(Object.entries(economy.wallet).map(([key, value]) => [key, typeof value === "number" ? Math.max(0, value) : 0]))
        : economy.wallet,
    },
  };
}
