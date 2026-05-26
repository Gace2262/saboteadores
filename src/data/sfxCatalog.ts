export type DemoSfxId =
  | "ui_click"
  | "ui_hover"
  | "ui_confirm"
  | "ui_cancel"
  | "hit_light"
  | "hit_heavy"
  | "shield"
  | "draw_card"
  | "discard"
  | "heal"
  | "stress_gain"
  | "clarity_gain"
  | "hammer_slam"
  | "chains"
  | "panic_pulse"
  | "liberation_burst"
  | "horse_stampede"
  | "corruption_glitch"
  | "boss_phase_transition"
  | "perfection_break"
  | "tribunal_whisper";

export type DemoSfxDefinition = {
  id: DemoSfxId;
  label: string;
  subtitle: string;
  bus: "ui" | "effects" | "cinematic" | "voice" | "ambience";
  baseFrequency: number;
  duration: number;
  waveform: OscillatorType;
  impact: number;
};

export const sfxCatalog: Record<DemoSfxId, DemoSfxDefinition> = {
  ui_click: { id: "ui_click", label: "Click judicial", subtitle: "[CLIC METALICO]", bus: "ui", baseFrequency: 440, duration: 0.05, waveform: "triangle", impact: 0.35 },
  ui_hover: { id: "ui_hover", label: "Humo de boton", subtitle: "[HUMO LEVE]", bus: "ui", baseFrequency: 330, duration: 0.04, waveform: "sine", impact: 0.18 },
  ui_confirm: { id: "ui_confirm", label: "Sello confirmado", subtitle: "[SELLO]", bus: "ui", baseFrequency: 520, duration: 0.09, waveform: "triangle", impact: 0.48 },
  ui_cancel: { id: "ui_cancel", label: "Objecion cancelada", subtitle: "[OBJECION CANCELADA]", bus: "ui", baseFrequency: 160, duration: 0.08, waveform: "sawtooth", impact: 0.32 },
  hit_light: { id: "hit_light", label: "Impacto leve", subtitle: "[IMPACTO]", bus: "effects", baseFrequency: 150, duration: 0.1, waveform: "square", impact: 0.52 },
  hit_heavy: { id: "hit_heavy", label: "Impacto pesado", subtitle: "[IMPACTO GRAVE]", bus: "effects", baseFrequency: 82, duration: 0.18, waveform: "square", impact: 0.78 },
  shield: { id: "shield", label: "Defensa", subtitle: "[ESCUDO]", bus: "effects", baseFrequency: 290, duration: 0.16, waveform: "triangle", impact: 0.44 },
  draw_card: { id: "draw_card", label: "Robo de carta", subtitle: "[CARTA ROBADA]", bus: "effects", baseFrequency: 380, duration: 0.07, waveform: "sine", impact: 0.26 },
  discard: { id: "discard", label: "Descarte", subtitle: "[DESCARTE]", bus: "effects", baseFrequency: 210, duration: 0.08, waveform: "sawtooth", impact: 0.32 },
  heal: { id: "heal", label: "Curacion", subtitle: "[REPARACION]", bus: "effects", baseFrequency: 470, duration: 0.22, waveform: "sine", impact: 0.38 },
  stress_gain: { id: "stress_gain", label: "Estres", subtitle: "[RESPIRACION INESTABLE]", bus: "effects", baseFrequency: 96, duration: 0.26, waveform: "sawtooth", impact: 0.42 },
  clarity_gain: { id: "clarity_gain", label: "Claridad", subtitle: "[CLARIDAD]", bus: "effects", baseFrequency: 620, duration: 0.2, waveform: "sine", impact: 0.36 },
  hammer_slam: { id: "hammer_slam", label: "Martillazo", subtitle: "[MARTILLAZO]", bus: "cinematic", baseFrequency: 54, duration: 0.38, waveform: "square", impact: 1 },
  chains: { id: "chains", label: "Cadenas", subtitle: "[CADENAS]", bus: "effects", baseFrequency: 144, duration: 0.34, waveform: "sawtooth", impact: 0.72 },
  panic_pulse: { id: "panic_pulse", label: "Pulso de panico", subtitle: "[RESPIRACION DISTANTE]", bus: "effects", baseFrequency: 88, duration: 0.32, waveform: "sine", impact: 0.58 },
  liberation_burst: { id: "liberation_burst", label: "Catarsis", subtitle: "[LUZ SONORA]", bus: "cinematic", baseFrequency: 660, duration: 0.42, waveform: "sine", impact: 0.82 },
  horse_stampede: { id: "horse_stampede", label: "Estampida", subtitle: "[CASCOS LEJANOS]", bus: "effects", baseFrequency: 120, duration: 0.42, waveform: "square", impact: 0.76 },
  corruption_glitch: { id: "corruption_glitch", label: "Glitch", subtitle: "[ESTATICA MENTAL]", bus: "effects", baseFrequency: 74, duration: 0.24, waveform: "sawtooth", impact: 0.54 },
  boss_phase_transition: { id: "boss_phase_transition", label: "Cambio de fase", subtitle: "[CORO JUDICIAL]", bus: "cinematic", baseFrequency: 98, duration: 0.52, waveform: "square", impact: 0.92 },
  perfection_break: { id: "perfection_break", label: "Quiebre perfecto", subtitle: "[CATEDRAL FRACTURANDOSE]", bus: "cinematic", baseFrequency: 115, duration: 0.48, waveform: "sawtooth", impact: 0.84 },
  tribunal_whisper: { id: "tribunal_whisper", label: "Susurro", subtitle: "[EL TRIBUNAL OBSERVA]", bus: "voice", baseFrequency: 72, duration: 0.28, waveform: "triangle", impact: 0.24 },
};
