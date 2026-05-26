import type { Card } from "@/data/cards";
import { aiDifficulties } from "./aiDifficulty";
import { chooseAICard } from "./chooseAICard";
import type { AIDifficultyId, AIGameStateSnapshot, AIProfile } from "./aiTypes";

export type AITurnPlan = {
  cards: Card[];
  reasons: string[];
};

export function resolveAITurn(state: AIGameStateSnapshot, profile: AIProfile, difficultyId: AIDifficultyId): AITurnPlan {
  const difficulty = aiDifficulties[difficultyId];
  const cards: Card[] = [];
  const reasons: string[] = [];
  let clarity = state.enemy.clarity;
  let simulatedHand = [...state.enemyHand];

  for (let index = 0; index < difficulty.maxCardsPerTurn; index += 1) {
    const choice = chooseAICard({ ...state, enemy: { ...state.enemy, clarity }, enemyHand: simulatedHand }, profile, difficultyId);
    if (!choice.card) break;
    cards.push(choice.card);
    reasons.push(choice.reason);
    clarity -= choice.card.cost;
    simulatedHand = simulatedHand.filter((card) => card.id !== choice.card?.id);

    const hasCombo = choice.card.keywords.some((keyword) => profile.pattern.preferredKeywords.includes(keyword));
    if (!hasCombo && difficulty.comboLookahead < 2) break;
    if (clarity <= 0) break;
  }

  return { cards, reasons };
}
