import type { CardProgression } from "@/store/evolutionStore";
import type { PlayerStats } from "@/data/playerStats";

export type PlayerMemorySnapshot = {
  favoriteFaction?: string;
  mostUsedCard?: string;
  hardestBoss?: string;
  stressStyle: "sereno" | "ansioso" | "maldito";
  defeatCount: number;
  judgeUseCount: number;
  corruptionAverage: number;
  catarsisNeglect: number;
};

export function buildPlayerMemory(input: {
  stats: PlayerStats;
  cardProgressions: Record<string, CardProgression>;
  selectedFactions?: string[];
  lastBoss?: string;
}): PlayerMemorySnapshot {
  const cards = Object.values(input.cardProgressions);
  const mostUsed = [...cards].sort((a, b) => b.usageCount - a.usageCount)[0];
  const corruptionAverage = cards.length
    ? Math.round(cards.reduce((sum, card) => sum + card.corruptionLevel, 0) / cards.length)
    : 0;
  const judgeUseCount = cards.filter((card) => card.cardId.includes("juez") || card.cardId.includes("martillo")).reduce((sum, card) => sum + card.usageCount, 0);
  const stressStyle =
    input.stats.stressAccumulated > 180 || corruptionAverage > 65
      ? "maldito"
      : input.stats.stressAccumulated > 45
        ? "ansioso"
        : "sereno";
  return {
    favoriteFaction: input.selectedFactions?.[0],
    mostUsedCard: mostUsed?.cardId,
    hardestBoss: input.lastBoss,
    stressStyle,
    defeatCount: input.stats.defeats,
    judgeUseCount,
    corruptionAverage,
    catarsisNeglect: Math.max(0, input.stats.gamesPlayed - input.stats.catarsisActivated),
  };
}

export function contextualMemoryLine(memory: PlayerMemorySnapshot) {
  if (memory.stressStyle === "maldito") return "La ansiedad ya decoro el lugar.";
  if (memory.favoriteFaction === "evitador") return "El tribunal noto tus ausencias.";
  if ((memory.hardestBoss ?? "") === "juez" && memory.defeatCount > 2) return "La apelacion fue rechazada otra vez.";
  if (memory.catarsisNeglect > 10) return `Hace ${memory.catarsisNeglect} partidas que la Catarsis mira desde la puerta.`;
  if (memory.mostUsedCard) return `El expediente subraya una carta: ${memory.mostUsedCard.replaceAll("-", " ")}.`;
  return "El tribunal recuerda lo suficiente para ponerse dramatico.";
}
