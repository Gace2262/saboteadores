import type { ColossalBossPhase } from "@/data/bossPhases";
import type { BossTransformation } from "@/data/bossTransformations";
import type { ColossalBoss } from "@/data/cinematicBosses";
import type { FinaleSequence } from "@/data/finaleSequences";

export type MajorCinematicKind = "intro" | "phase" | "transformation" | "finale" | "derrumbe" | "catarsis" | "rebelion";

export type MajorCinematic = {
  id: string;
  kind: MajorCinematicKind;
  title: string;
  subtitle: string;
  lines: string[];
  soundLabels: string[];
  intensity: number;
};

export function resolveBossIntroCinematic(boss: ColossalBoss): MajorCinematic {
  return {
    id: `intro-${boss.id}`,
    kind: "intro",
    title: boss.name,
    subtitle: boss.quote,
    lines: boss.entrance,
    soundLabels: ["[CADENAS RETORCIENDOSE]", "[CORO JUDICIAL CRECIENDO]", "[MARTILLAZO CELESTIAL]"],
    intensity: boss.difficulty === "apocaliptica" ? 96 : boss.difficulty === "absurda" ? 88 : 74,
  };
}

export function resolvePhaseCinematic(phase: ColossalBossPhase): MajorCinematic {
  return {
    id: `phase-${phase.id}`,
    kind: phase.environmentDamage >= 90 ? "catarsis" : "phase",
    title: phase.name.toUpperCase(),
    subtitle: phase.quote,
    lines: [phase.visual, phase.mechanic],
    soundLabels: ["[LA REALIDAD DEL TABLERO SE FRACTURA]", "[PARTICULAS JUDICIALES EN ASCENSO]"],
    intensity: phase.environmentDamage,
  };
}

export function resolveTransformationCinematic(transformation: BossTransformation): MajorCinematic {
  return {
    id: `transformation-${transformation.id}`,
    kind: "transformation",
    title: transformation.name,
    subtitle: transformation.quote,
    lines: [transformation.visual, transformation.mechanic],
    soundLabels: ["[FONDO ROMPIENDOSE]", "[CORO INTERNO DESAFINADO]"],
    intensity: transformation.rarity === "final" ? 100 : transformation.rarity === "fusion" ? 86 : 70,
  };
}

export function resolveFinaleCinematic(finale: FinaleSequence): MajorCinematic {
  return {
    id: `finale-${finale.id}`,
    kind: "finale",
    title: finale.title,
    subtitle: finale.narrator,
    lines: finale.visual,
    soundLabels: ["[CADENAS CAYENDO]", "[RESPIRACION TRANQUILA]", "[EL TRIBUNAL GUARDA SILENCIO]"],
    intensity: finale.mood === "oscura" ? 94 : finale.mood === "rebelion" ? 90 : 72,
  };
}
