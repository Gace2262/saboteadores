import type { Card } from "@/data/cards";
import { corruptionMutations, getCorruptionRule } from "@/data/corruptions";

export function calculateCorruptionGain(input: { card: Card; stressGain: number; lost?: boolean; extreme?: boolean }) {
  let gain = 0;
  if (input.card.rarity === "maldita") gain += 9;
  if (input.card.keywords.includes("Obsesion")) gain += 4;
  if (input.card.keywords.includes("Sentencia")) gain += 2;
  gain += Math.max(0, input.stressGain) * 2;
  if (input.extreme) gain += 6;
  if (input.lost) gain += 5;
  return gain;
}

export function resolveMutationIds(corruptionLevel: number, usageCount: number) {
  const rule = getCorruptionRule(corruptionLevel);
  const count = Math.min(corruptionMutations.length, rule.level + Math.floor(usageCount / 12));
  return corruptionMutations.slice(0, count).map((mutation) => mutation.id);
}
