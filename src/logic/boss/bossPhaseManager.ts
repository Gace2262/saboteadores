import { getBossPhases, type ColossalBossPhase } from "@/data/bossPhases";
import type { ColossalBossId } from "@/data/cinematicBosses";

export type BossPhaseState = {
  bossId: ColossalBossId;
  phaseIndex: number;
  phase: ColossalBossPhase;
  isFinalPhase: boolean;
  progressLabel: string;
};

export function getBossPhaseState(bossId: ColossalBossId, phaseIndex = 0): BossPhaseState {
  const phases = getBossPhases(bossId);
  const safeIndex = Math.max(0, Math.min(phaseIndex, phases.length - 1));
  const phase = phases[safeIndex] ?? phases[0];
  return {
    bossId,
    phaseIndex: safeIndex,
    phase,
    isFinalPhase: safeIndex >= phases.length - 1,
    progressLabel: `Fase ${safeIndex + 1}/${Math.max(1, phases.length)}`,
  };
}

export function getNextBossPhaseIndex(bossId: ColossalBossId, phaseIndex: number) {
  const phases = getBossPhases(bossId);
  return Math.min(phaseIndex + 1, Math.max(0, phases.length - 1));
}

export function getPhaseThreat(phase?: ColossalBossPhase) {
  if (!phase) return "estable";
  if (phase.environmentDamage >= 90) return "final";
  if (phase.environmentDamage >= 65) return "critica";
  if (phase.environmentDamage >= 35) return "alta";
  return "creciente";
}
