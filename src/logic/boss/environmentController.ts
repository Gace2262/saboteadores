import type { ColossalBossPhase } from "@/data/bossPhases";

export type EnvironmentState = {
  cracks: number;
  fire: number;
  chains: number;
  distortion: number;
  rain: number;
  uiCollapse: number;
  mood: "court" | "cathedral" | "alarm" | "burnout" | "whiteout";
};

type EnvironmentOptions = {
  reduceDestruction?: boolean;
  limitDistortion?: boolean;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function resolveEnvironmentState(phase?: ColossalBossPhase, options: EnvironmentOptions = {}): EnvironmentState {
  const damage = phase ? phase.environmentDamage / 100 : 0.2;
  const scale = options.reduceDestruction ? 0.45 : 1;
  const distortionScale = options.limitDistortion ? 0.25 : 1;
  const text = `${phase?.name ?? ""} ${phase?.visual ?? ""}`.toLowerCase();
  const mood = text.includes("silencio")
    ? "whiteout"
    : text.includes("vitrales") || text.includes("simetria")
      ? "cathedral"
      : text.includes("radar") || text.includes("alarma")
        ? "alarm"
        : text.includes("caballo") || text.includes("oficina")
          ? "burnout"
          : "court";

  return {
    cracks: clamp(damage * scale),
    fire: clamp((mood === "burnout" ? damage : damage * 0.18) * scale),
    chains: clamp((mood === "court" || mood === "whiteout" ? damage : damage * 0.45) * scale),
    distortion: clamp(damage * 0.75 * distortionScale),
    rain: clamp((mood === "cathedral" || mood === "alarm" ? damage * 0.45 : damage * 0.22) * scale),
    uiCollapse: clamp(damage * 0.55 * scale),
    mood,
  };
}

export function getEnvironmentLabel(environment: EnvironmentState) {
  if (environment.mood === "whiteout") return "Silencio del Tribunal";
  if (environment.mood === "burnout") return "Oficina en derrumbe";
  if (environment.mood === "alarm") return "Torre invadiendo UI";
  if (environment.mood === "cathedral") return "Catedral reorganizada";
  return "Tribunal fracturado";
}
