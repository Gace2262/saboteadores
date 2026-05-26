import type { AIGameStateSnapshot } from "./aiTypes";
import type { AIComboPlan, BossStrategyDecision } from "./advancedAITypes";

export function validateAIActionCosts(cards: { id: string; cost: number }[], clarity: number) {
  const totalCost = cards.reduce((sum, card) => sum + card.cost, 0);
  return { valid: totalCost <= clarity, totalCost, warning: totalCost > clarity ? "La IA intento jugar sin Claridad suficiente." : undefined };
}

export function guardAICombo(combo: AIComboPlan | undefined, state: AIGameStateSnapshot, recentControlActions = 0) {
  const warnings: string[] = [];
  if (!combo) return { allowed: true, warnings };
  const cost = validateAIActionCosts(combo.cards, state.enemy.clarity);
  if (!cost.valid) warnings.push(cost.warning as string);
  if (combo.cards.length > 3) warnings.push("Combo infinito prevenido: maximo 3 cartas.");
  const strongControl = combo.cards.filter((card) => card.keywords.includes("Cadena") || card.keywords.includes("Derrumbe")).length;
  if (strongControl > 1 || recentControlActions >= 2) warnings.push("Control fuerte limitado para dejar salida jugable.");
  return { allowed: warnings.length === 0, warnings };
}

export function applyFairnessGuard(decision: BossStrategyDecision, state: AIGameStateSnapshot, recentControlActions = 0): BossStrategyDecision {
  const cost = validateAIActionCosts(decision.selectedCards, state.enemy.clarity);
  const warnings = [...decision.fairnessWarnings];
  if (!cost.valid && cost.warning) warnings.push(cost.warning);
  const controlCount = decision.selectedCards.filter((card) => card.keywords.includes("Cadena") || card.keywords.includes("Derrumbe")).length;
  if (controlCount > 1 || recentControlActions >= 2) warnings.push("Maximo 1 counter directo o control fuerte por turno.");
  const safeCards = cost.valid ? decision.selectedCards : decision.selectedCards.slice(0, 1).filter((card) => card.cost <= state.enemy.clarity);
  return {
    ...decision,
    selectedCards: safeCards,
    selectedAction: safeCards[0],
    fairnessWarnings: Array.from(new Set(warnings)),
  };
}
