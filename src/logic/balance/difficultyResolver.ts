import { difficultyScaling, type DifficultyMode, type DifficultyPreview } from "@/data/difficultyScaling";

export type DifficultyInput = {
  mode: DifficultyMode;
  recentWins: number;
  recentLosses: number;
  deckPower: number;
  playerLevel: number;
  corruptionAverage: number;
  gameMode?: string;
};

export function resolveDifficulty(input: DifficultyInput): DifficultyPreview {
  const base = difficultyScaling[input.mode];
  const streakPressure = input.mode === "fixed" ? 0 : (input.recentWins - input.recentLosses) * 0.025;
  const deckPressure = input.mode === "fixed" ? 0 : Math.max(0, input.deckPower - 90) * 0.0025;
  const levelPressure = input.mode === "cruel-tribunal" ? input.playerLevel * 0.004 : input.playerLevel * 0.0015;
  const corruptionPressure = input.corruptionAverage * (input.mode === "cruel-tribunal" ? 0.002 : 0.001);
  const modifier = Math.max(-0.08, Math.min(0.28, streakPressure + deckPressure + levelPressure + corruptionPressure));
  return {
    ...base,
    enemyWillMultiplier: Number((base.enemyWillMultiplier + modifier).toFixed(2)),
    aiAggression: Number((base.aiAggression + modifier * 0.8).toFixed(2)),
    comboFrequency: Number((base.comboFrequency + modifier * 0.6).toFixed(2)),
    rewardMultiplier: Number((base.rewardMultiplier + Math.max(0, modifier * 0.8)).toFixed(2)),
  };
}
