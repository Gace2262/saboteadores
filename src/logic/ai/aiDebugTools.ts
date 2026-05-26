import type { BossStrategyDecision, PlayerPatternReport } from "./advancedAITypes";

export function summarizeAIDecision(decision: BossStrategyDecision, pattern: PlayerPatternReport) {
  return {
    intent: decision.intent,
    selected: decision.selectedCards.map((card) => card.name),
    confidence: Math.round(decision.confidence * 100),
    reason: decision.reason,
    dialogue: decision.dialogueLine,
    fairnessWarnings: decision.fairnessWarnings,
    pattern: pattern.summary,
    topScores: decision.scores.map((score) => ({ card: score.card.name, score: Math.round(score.score), reasons: score.reasons })),
  };
}
