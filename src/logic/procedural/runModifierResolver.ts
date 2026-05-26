import { proceduralRunModifiers } from "@/data/procedural/runModifiers";
import type { MentalClimate, ProceduralRunModifier } from "./proceduralTypes";
import type { SeededRandom } from "./seededRandom";

export function resolveRunModifiers(random: SeededRandom, theme: MentalClimate, forcedModifierId?: string): ProceduralRunModifier[] {
  const forced = forcedModifierId ? proceduralRunModifiers.find((modifier) => modifier.id === forcedModifierId) : undefined;
  const weighted = proceduralRunModifiers.filter((modifier) => modifier.tags.includes(theme));
  const picked = forced ?? random.pick(weighted.length ? weighted : proceduralRunModifiers);
  const second = random.chance(0.22) ? random.pick(proceduralRunModifiers.filter((modifier) => modifier.id !== picked.id)) : undefined;
  return second ? [picked, second] : [picked];
}
