import { allCards } from "@/data/cards";
import { validateDeck } from "@/store/deckStore";
import { loadGame } from "@/logic/save/saveManager";
import { readErrorReports } from "./errorReporter";

export type GameDiagnosticsReport = {
  gameVersion: string;
  saveVersion: number;
  cardsTotal: number;
  savedDecks: number;
  invalidDecks: number;
  pendingRewards: number;
  errorsRecent: number;
  health: "ok" | "warning" | "critical";
  notes: string[];
};

export function runGameDiagnostics(storage: Storage = localStorage): GameDiagnosticsReport {
  const loaded = loadGame(storage);
  const save = loaded.save;
  const decks = (save.decks as { savedDecks?: Array<{ cardIds: string[]; factions: string[] }> }).savedDecks ?? [];
  const invalidDecks = decks.filter((deck) => !validateDeck(deck.cardIds, deck.factions as never, true).valid).length;
  const errorsRecent = readErrorReports(storage).length;
  const notes = [...loaded.validation.errors, ...loaded.validation.warnings];
  if (!notes.length) notes.push("Sistema estable. El Tribunal se muestra decepcionado por la falta de drama.");
  const health = loaded.validation.valid && errorsRecent < 3 && invalidDecks === 0 ? "ok" : errorsRecent > 8 || !loaded.validation.valid ? "critical" : "warning";
  return {
    gameVersion: "0.1.0",
    saveVersion: save.saveVersion,
    cardsTotal: allCards.length,
    savedDecks: decks.length,
    invalidDecks,
    pendingRewards: 0,
    errorsRecent,
    health,
    notes,
  };
}
