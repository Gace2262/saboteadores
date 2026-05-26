import { aiBossProfiles } from "@/data/aiBossProfiles";
import type { BossStrategyDecision, BossStrategyInput } from "./advancedAITypes";
import { scoreAICardAdvanced } from "./aiDecisionScorer";
import { planAICombo } from "./aiComboPlanner";
import { guardAICombo, applyFairnessGuard } from "./aiFairnessGuard";
import { resolveBossIntent } from "./bossIntentResolver";
import { selectAIDialogue } from "./aiDialogueDirector";

export function resolveBossStrategy(input: BossStrategyInput): BossStrategyDecision {
  const boss = aiBossProfiles[input.bossProfile.id] ?? aiBossProfiles.juez;
  const pattern = {
    dominantStyle: input.playerPatternMemory.dominantStyle,
    confidence: 0.75,
    signals: {
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
    },
    favoriteCards: input.playerPatternMemory.favoriteCards,
    repeatedCombos: input.playerPatternMemory.frequentCombos,
    summary: `Memoria dominante: ${input.playerPatternMemory.dominantStyle}`,
  };
  const scores = input.availableCards
    .map((card) => scoreAICardAdvanced(card, input.gameState, input.bossProfile, input.difficulty, pattern, input.playerPatternMemory, input.currentPhase))
    .sort((a, b) => b.score - a.score);
  const combo = planAICombo(input.availableCards, input.gameState.enemy.clarity, input.bossProfile.id, input.difficulty);
  const guardedCombo = guardAICombo(combo, input.gameState);
  const useCombo = combo && guardedCombo.allowed && combo.score > (scores[0]?.score ?? 0) * 0.9;
  const selectedCards = useCombo ? combo.cards : scores[0]?.card ? [scores[0].card] : [];
  const intent = resolveBossIntent(selectedCards, input.difficulty);
  const dialogueLine = selectAIDialogue({
    bossId: input.bossProfile.id,
    event: input.gameState.player.stress >= 7 ? "playerHighStress" : useCombo ? "repeatedCombo" : "combatStart",
    pattern: input.playerPatternMemory.dominantStyle,
    difficulty: input.difficulty,
    phase: input.currentPhase,
    seed: input.seed,
  });
  const decision: BossStrategyDecision = {
    selectedCards,
    selectedAction: selectedCards[0],
    confidence: Math.min(1, Math.max(0.1, ((useCombo ? combo.score : scores[0]?.score ?? 0) / 100) + boss.weights.memoryUse * 0.015)),
    intent: intent.intent,
    reason: useCombo ? combo.reason : `${boss.title}: ${scores[0]?.reasons.join(", ") || "sin jugada clara"}. ${intent.preview}`,
    dialogueLine,
    scores: scores.slice(0, 8),
    combo: useCombo ? combo : undefined,
    fairnessWarnings: guardedCombo.warnings,
  };
  return applyFairnessGuard(decision, input.gameState);
}
