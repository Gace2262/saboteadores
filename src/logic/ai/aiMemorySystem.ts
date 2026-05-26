import type { Card } from "@/data/cards";
import type { FactionId } from "@/data/factions";
import type { AIMemorySnapshot, PlayerPatternReport } from "./advancedAITypes";

export const emptyAIMemory = (): AIMemorySnapshot => ({
  favoriteCards: [],
  frequentCombos: [],
  favoriteFactions: [],
  bossLosses: {},
  bossWins: {},
  dominantStyle: "aggressive",
  commonWeakness: "none",
});

export function updateAIMemory(memory: AIMemorySnapshot, report: PlayerPatternReport, playedCards: Card[], bossId?: FactionId, result?: "win" | "loss"): AIMemorySnapshot {
  const favoriteFactions = Array.from(new Set([...playedCards.map((card) => card.faction), ...memory.favoriteFactions])).slice(0, 5);
  const next: AIMemorySnapshot = {
    favoriteCards: Array.from(new Set([...report.favoriteCards, ...memory.favoriteCards])).slice(0, 8),
    frequentCombos: Array.from(new Set([...report.repeatedCombos, ...memory.frequentCombos])).slice(0, 8),
    favoriteFactions,
    bossLosses: { ...memory.bossLosses },
    bossWins: { ...memory.bossWins },
    dominantStyle: report.dominantStyle,
    commonWeakness:
      report.dominantStyle === "slow_deck"
        ? "early_pressure"
        : report.dominantStyle === "aggressive"
          ? "low_defense"
          : report.dominantStyle === "stress_overuse"
            ? "stress_spikes"
            : "none",
  };
  if (bossId && result === "loss") next.bossLosses[bossId] = (next.bossLosses[bossId] ?? 0) + 1;
  if (bossId && result === "win") next.bossWins[bossId] = (next.bossWins[bossId] ?? 0) + 1;
  return next;
}

export function sanitizeAIMemory(memory: AIMemorySnapshot): AIMemorySnapshot {
  return {
    favoriteCards: memory.favoriteCards.slice(0, 12),
    frequentCombos: memory.frequentCombos.slice(0, 12),
    favoriteFactions: memory.favoriteFactions.slice(0, 6),
    bossLosses: { ...memory.bossLosses },
    bossWins: { ...memory.bossWins },
    dominantStyle: memory.dominantStyle,
    commonWeakness: memory.commonWeakness,
  };
}
