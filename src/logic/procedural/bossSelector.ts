import { proceduralBosses } from "@/data/procedural/bossPools";
import type { FactionId } from "@/data/factions";
import type { MentalClimate, ProceduralDifficulty } from "./proceduralTypes";
import type { SeededRandom } from "./seededRandom";

type BossSelectorInput = {
  act: number;
  theme: MentalClimate;
  difficulty: ProceduralDifficulty;
  deckFactions?: readonly FactionId[];
  stressLean?: boolean;
  controlLean?: boolean;
};

export function selectProceduralBoss(random: SeededRandom, input: BossSelectorInput): FactionId {
  if (input.act >= 4) return "juez";
  const candidates = proceduralBosses.filter((boss) => boss.id !== "juez");
  const weighted = candidates.flatMap((boss) => {
    let weight = 2;
    if (boss.actBias === input.act) weight += 3;
    if (boss.climates.includes(input.theme)) weight += 2;
    if (input.deckFactions?.includes(boss.id)) weight += 1;
    if (input.controlLean && ["controlador", "hipervigilante"].includes(boss.id)) weight += 2;
    if (input.stressLean && ["inquieto", "juez"].includes(boss.id)) weight += 2;
    if (input.difficulty === "audiencia-suave" && boss.actBias > 2) weight -= 1;
    return Array.from({ length: Math.max(1, weight) }, () => boss.id);
  });
  return random.pick(weighted);
}
