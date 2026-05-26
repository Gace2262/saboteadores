import { proceduralEvents } from "@/data/procedural/eventPools";
import type { MentalClimate, ProceduralEvent } from "./proceduralTypes";
import type { SeededRandom } from "./seededRandom";

export function generateProceduralEvent(random: SeededRandom, theme: MentalClimate): ProceduralEvent {
  const themed = proceduralEvents.filter((event) => event.category.includes(theme));
  return random.pick(themed.length ? themed : proceduralEvents);
}
