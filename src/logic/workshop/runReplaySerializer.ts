import { seedTextToNumber } from "@/logic/procedural/seededRandom";
import type { CommunityRunReplay } from "./workshopTypes";

export function serializeRunReplay(input: Omit<CommunityRunReplay, "checksum">): CommunityRunReplay {
  const checksum = `${seedTextToNumber(input.seedText)}:${input.eventLog.length}:${input.routeNodeIds.join(">")}:${input.keyDecisions.join("|").length}`;
  return { ...input, checksum };
}

export function replaySummary(replay: CommunityRunReplay) {
  return {
    seed: replay.seedText,
    events: replay.eventLog.length,
    decisions: replay.keyDecisions.length,
    routeLength: replay.routeNodeIds.length,
    checksum: replay.checksum,
  };
}
