import type { Card } from "@/data/cards";
import type { PlayerPattern, PlayerPatternReport } from "./advancedAITypes";

export type PlayerPatternInput = {
  playedCards: Card[];
  recentCombos: string[][];
  finalStress?: number;
  turnsPassed?: number;
};

const emptySignals = (): Record<PlayerPattern, number> => ({
  stress_overuse: 0,
  card_dependency: 0,
  defensive: 0,
  aggressive: 0,
  slow_deck: 0,
  combo_deck: 0,
  chain_abuse: 0,
  catarsis_frequent: 0,
  evasion: 0,
  irony_random: 0,
});

export function analyzePlayerPatterns(input: PlayerPatternInput): PlayerPatternReport {
  const signals = emptySignals();
  const counts = new Map<string, number>();
  input.playedCards.forEach((card) => {
    counts.set(card.id, (counts.get(card.id) ?? 0) + 1);
    if (card.stressGain > 0 || card.rarity === "maldita") signals.stress_overuse += 2;
    if (card.willpowerDamage >= 4) signals.aggressive += 2;
    if (card.willpowerDamage === 0 && (card.clarityGain > 0 || card.mentalNoise < 0 || card.stressGain < 0)) signals.defensive += 2;
    if (card.cost >= 4) signals.slow_deck += 2;
    if (card.keywords.includes("Cadena")) signals.chain_abuse += 2;
    if (card.keywords.includes("Catarsis")) signals.catarsis_frequent += 3;
    if (card.keywords.includes("Mascara") || card.faction === "evitador" || card.faction === "reservado") signals.evasion += 2;
    if (card.keywords.includes("Ironia")) signals.irony_random += 2;
    if (card.keywords.length >= 2) signals.combo_deck += 1;
  });
  if ((input.finalStress ?? 0) >= 8) signals.stress_overuse += 4;
  if ((input.turnsPassed ?? 0) >= 4 && input.playedCards.length <= 2) signals.slow_deck += 3;
  input.recentCombos.forEach((combo) => {
    if (combo.length >= 2) signals.combo_deck += combo.length;
  });
  const repeated = Array.from(counts.entries()).filter(([, count]) => count >= 3);
  signals.card_dependency += repeated.length * 5;

  const dominantStyle = (Object.entries(signals).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "aggressive") as PlayerPattern;
  const max = signals[dominantStyle] || 1;
  return {
    dominantStyle,
    confidence: Math.min(1, max / 10),
    signals,
    favoriteCards: Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([id]) => id),
    repeatedCombos: input.recentCombos.map((combo) => combo.join(" -> ")).filter(Boolean).slice(0, 4),
    summary: `Patron dominante: ${dominantStyle}. El expediente huele a habito repetido.`,
  };
}
