import { proceduralRewards } from "@/data/procedural/rewardPools";
import type { ProceduralDifficulty, ProceduralReward } from "./proceduralTypes";
import type { SeededRandom } from "./seededRandom";
import { difficultyProfiles } from "./difficultyCurve";

export function generateProceduralReward(random: SeededRandom, difficulty: ProceduralDifficulty, risk: number): ProceduralReward {
  const bias = difficultyProfiles[difficulty].rewardBias + risk * 0.12;
  const rarityOrder = ["comun", "rara", "epica", "legendaria", "maldita"] as const;
  const maxIndex = Math.min(rarityOrder.length - 1, Math.floor(bias + random.next() * (2 + risk)));
  const allowed = proceduralRewards.filter((reward) => rarityOrder.indexOf(reward.rarity) <= maxIndex);
  return random.pick(allowed.length ? allowed : proceduralRewards);
}
