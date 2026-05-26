import type { ProceduralDifficulty } from "./proceduralTypes";

export const difficultyProfiles: Record<ProceduralDifficulty, { label: string; enemyWill: number; rewardBias: number; anomalyChance: number; eliteChance: number; aiPressure: number }> = {
  "audiencia-suave": { label: "Audiencia Suave", enemyWill: 1, rewardBias: 0.9, anomalyChance: 0.08, eliteChance: 0.1, aiPressure: 0.85 },
  "crisis-formal": { label: "Crisis Formal", enemyWill: 1.12, rewardBias: 1, anomalyChance: 0.12, eliteChance: 0.16, aiPressure: 1 },
  "juicio-serio": { label: "Juicio Serio", enemyWill: 1.25, rewardBias: 1.15, anomalyChance: 0.18, eliteChance: 0.24, aiPressure: 1.15 },
  "tribunal-desatado": { label: "Tribunal Desatado", enemyWill: 1.42, rewardBias: 1.3, anomalyChance: 0.26, eliteChance: 0.32, aiPressure: 1.35 },
};

export function getDifficultyRating(act: number, nodeIndex: number, difficulty: ProceduralDifficulty) {
  const profile = difficultyProfiles[difficulty];
  return Math.round((act * 10 + nodeIndex * 1.6) * profile.aiPressure);
}
