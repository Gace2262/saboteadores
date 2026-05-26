import type { Card } from "@/data/cards";
import { getAwakening, type AwakeningState } from "@/data/cardAwakenings";
import { getCorruptionRule } from "@/data/corruptions";
import { getEvolutionBranches, type EvolutionAffinity } from "@/data/evolutions";
import { getEchoesForAffinity } from "@/data/mentalEchoes";
import type { CardProgression } from "@/store/evolutionStore";

export const normalizeCardId = (cardId: string) => cardId.replace(/-echo$/, "");

export function inferAffinity(card: Card): EvolutionAffinity {
  if (card.rarity === "maldita" || card.keywords.includes("Obsesion")) return "maldita";
  if (card.keywords.includes("Catarsis") || card.keywords.includes("Despertar")) return "catartica";
  if (card.keywords.includes("Caos") || card.keywords.includes("Ironia")) return "caotica";
  if (card.faction === "hiperracional") return "racional";
  if (card.willpowerDamage >= 4 || card.keywords.includes("Estampida") || card.keywords.includes("Sentencia")) return "agresiva";
  return "defensiva";
}

export function levelFromExperience(experience: number) {
  if (experience >= 240) return 5;
  if (experience >= 140) return 4;
  if (experience >= 75) return 3;
  if (experience >= 30) return 2;
  return 1;
}

export function awakeningFromProgress(card: Card, progress: CardProgression): AwakeningState {
  const awakening = getAwakening(normalizeCardId(card.id));
  if (!awakening) return progress.usageCount >= 8 ? "inquieta" : "dormida";
  if (progress.level >= 5 && progress.usageCount >= 12) return card.rarity === "legendaria" ? "legendaria" : "despierta";
  if (progress.level >= 3) return "inquieta";
  return "dormida";
}

export function resolveUnlockedTransformations(card: Card, progress: CardProgression) {
  return getEvolutionBranches(normalizeCardId(card.id))
    .filter((branch) => progress.level >= branch.requiredLevel && (branch.affinity === progress.affinity || branch.branch === "despertar" || branch.branch === "secreta"))
    .map((branch) => branch.id);
}

export function resolveMentalEcho(card: Card, progress: CardProgression) {
  const echoes = getEchoesForAffinity(progress.affinity, progress.usageCount);
  if (!echoes.length) return card.impactText;
  return echoes[(progress.usageCount + progress.level) % echoes.length].text;
}

export function summarizeCardEvolution(card: Card, progress: CardProgression) {
  const corruption = getCorruptionRule(progress.corruptionLevel);
  const branches = getEvolutionBranches(normalizeCardId(card.id)).filter((branch) => progress.transformationsUnlocked.includes(branch.id));
  return {
    corruption,
    branches,
    awakening: getAwakening(normalizeCardId(card.id)),
    echo: resolveMentalEcho(card, progress),
  };
}
