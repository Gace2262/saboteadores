import { nodeSubtitles, nodeTitlePools } from "@/data/procedural/nodePools";
import type { ProceduralDifficulty, ProceduralNode, ProceduralNodeType, ProceduralRouteStyle } from "./proceduralTypes";
import type { SeededRandom } from "./seededRandom";
import { getDifficultyRating } from "./difficultyCurve";

export function generateProceduralNode(
  random: SeededRandom,
  input: {
    act: number;
    index: number;
    lane: number;
    type: ProceduralNodeType;
    routeStyle: ProceduralRouteStyle;
    difficulty: ProceduralDifficulty;
  },
): ProceduralNode {
  const id = `a${input.act}-n${input.index}-l${input.lane}-${input.type}`;
  return {
    id,
    act: input.act,
    index: input.index,
    lane: input.lane,
    type: input.type,
    title: random.pick(nodeTitlePools[input.type]),
    subtitle: random.pick(nodeSubtitles[input.type]),
    x: Math.round(((input.index + (input.act - 1) * 7) / 27) * 92 + 4),
    y: 22 + input.lane * 18 + random.int(-4, 4),
    next: [],
    routeStyle: input.routeStyle,
    difficultyRating: getDifficultyRating(input.act, input.index, input.difficulty),
  };
}
