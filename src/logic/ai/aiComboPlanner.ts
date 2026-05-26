import type { Card } from "@/data/cards";
import { aiBossProfiles } from "@/data/aiBossProfiles";
import { advancedDifficultyProfiles } from "@/data/aiDifficultyProfiles";
import type { FactionId } from "@/data/factions";
import type { AIDifficultyId } from "./aiTypes";
import type { AIComboPlan } from "./advancedAITypes";

export function planAICombo(cards: Card[], clarity: number, bossId: FactionId, difficultyId: AIDifficultyId): AIComboPlan | undefined {
  const difficulty = advancedDifficultyProfiles[difficultyId];
  if (difficulty.maxComboLength <= 1) return undefined;
  const boss = aiBossProfiles[bossId] ?? aiBossProfiles.juez;
  const playable = cards.filter((card) => card.cost <= clarity);
  const ordered = playable
    .map((card) => ({
      card,
      priority: card.keywords.reduce((sum, keyword) => sum + (boss.preferredCombo.includes(keyword) ? 4 : 0), 0) + card.willpowerDamage - card.cost,
    }))
    .sort((a, b) => b.priority - a.priority);
  const selected: Card[] = [];
  let cost = 0;
  for (const item of ordered) {
    if (selected.length >= difficulty.maxComboLength) break;
    if (cost + item.card.cost <= clarity) {
      selected.push(item.card);
      cost += item.card.cost;
    }
  }
  if (selected.length < 2) return undefined;
  const keywords = Array.from(new Set(selected.flatMap((card) => card.keywords)));
  const synergy = keywords.filter((keyword) => boss.preferredCombo.includes(keyword)).length;
  if (synergy < 2) return undefined;
  return {
    cards: selected,
    totalCost: cost,
    score: selected.reduce((sum, card) => sum + card.willpowerDamage + card.keywords.length * 2, 0) + synergy * 8,
    keywords,
    reason: `${boss.title} prepara combo ${keywords.join(" -> ")}. El expediente trae coreografia.`,
  };
}
