import type { Card } from "@/data/cards";
import { calculateCorruptionGain, resolveMutationIds } from "./corruptionResolver";
import { awakeningFromProgress, inferAffinity, levelFromExperience, normalizeCardId, resolveMentalEcho, resolveUnlockedTransformations } from "./evolutionEngine";
import type { CardProgression } from "@/store/evolutionStore";

export type CardProgressionEvent = {
  card: Card;
  damage: number;
  stressGain: number;
  clarityGain: number;
  bossId?: string;
  won?: boolean;
  lost?: boolean;
  extreme?: boolean;
};

export function createInitialProgression(card: Card): CardProgression {
  return {
    cardId: normalizeCardId(card.id),
    experience: 0,
    affinity: inferAffinity(card),
    corruptionLevel: 0,
    level: 1,
    history: [],
    mutations: [],
    awakenState: "dormida",
    mentalEcho: card.impactText,
    bondedDecks: [],
    usageCount: 0,
    stressGenerated: 0,
    clarityGenerated: 0,
    damageDealt: 0,
    bossesDefeated: [],
    transformationsUnlocked: [],
  };
}

export function progressCard(current: CardProgression | undefined, event: CardProgressionEvent) {
  const base = current ?? createInitialProgression(event.card);
  const experienceGain = 8 + event.damage + event.clarityGain + event.stressGain + (event.won ? 12 : 0);
  const usageCount = base.usageCount + 1;
  const experience = base.experience + Math.max(1, experienceGain);
  const corruptionLevel = Math.min(120, base.corruptionLevel + calculateCorruptionGain(event));
  const next: CardProgression = {
    ...base,
    experience,
    usageCount,
    corruptionLevel,
    level: levelFromExperience(experience),
    stressGenerated: base.stressGenerated + Math.max(0, event.stressGain),
    clarityGenerated: base.clarityGenerated + Math.max(0, event.clarityGain),
    damageDealt: base.damageDealt + Math.max(0, event.damage),
    bossesDefeated: event.bossId && event.won ? Array.from(new Set([...base.bossesDefeated, event.bossId])) : base.bossesDefeated,
    history: [
      `${new Date().toLocaleDateString("es-ES")}: ${event.card.name} absorbio ${Math.max(1, experienceGain)} de energia emocional.`,
      ...base.history,
    ].slice(0, 12),
  };
  next.awakenState = awakeningFromProgress(event.card, next);
  next.transformationsUnlocked = resolveUnlockedTransformations(event.card, next);
  next.mutations = resolveMutationIds(next.corruptionLevel, next.usageCount);
  next.mentalEcho = resolveMentalEcho(event.card, next);
  return next;
}
