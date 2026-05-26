import { aiBossProfiles } from "@/data/aiBossProfiles";
import type { FactionId } from "@/data/factions";
import type { BossPhaseId } from "./advancedAITypes";

export function getBossPhaseId(phase: number | BossPhaseId): BossPhaseId {
  if (typeof phase !== "number") return phase;
  if (phase <= 1) return "phase1";
  if (phase === 2) return "phase2";
  if (phase === 3) return "phase3";
  return "final";
}

export function getBossPhaseStrategy(bossId: FactionId, phase: number | BossPhaseId) {
  const phaseId = getBossPhaseId(phase);
  const profile = aiBossProfiles[bossId] ?? aiBossProfiles.juez;
  return {
    bossId,
    phaseId,
    description: profile.phasePlan[phaseId],
    aggressionMod: phaseId === "phase3" ? 1.25 : phaseId === "final" ? 1.1 : 1,
    controlMod: phaseId === "phase2" ? 1.2 : 1,
    intentObscurity: phaseId === "final" ? 0.7 : phaseId === "phase3" ? 0.45 : 0.15,
  };
}
