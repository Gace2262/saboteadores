export type MusicTransitionType = "fade" | "cinematic_drop" | "silence_break" | "impact_cut" | "reverb_tail";

export type MusicTransition = {
  type: MusicTransitionType;
  durationMs: number;
  silenceMs: number;
  subtitle: string;
};

export const musicTransitions: Record<MusicTransitionType, MusicTransition> = {
  fade: { type: "fade", durationMs: 800, silenceMs: 0, subtitle: "[TRANSICION MUSICAL]" },
  cinematic_drop: { type: "cinematic_drop", durationMs: 500, silenceMs: 140, subtitle: "[CORTE CINEMATICO]" },
  silence_break: { type: "silence_break", durationMs: 260, silenceMs: 240, subtitle: "[SILENCIO]" },
  impact_cut: { type: "impact_cut", durationMs: 180, silenceMs: 90, subtitle: "[IMPACTO]" },
  reverb_tail: { type: "reverb_tail", durationMs: 1200, silenceMs: 0, subtitle: "[ECO]" },
};

export function transitionForBossPhase(phase: 1 | 2 | 3): MusicTransitionType {
  if (phase === 3) return "silence_break";
  if (phase === 2) return "cinematic_drop";
  return "fade";
}
