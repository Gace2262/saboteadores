export type DifficultyMode = "fixed" | "adaptive-soft" | "cruel-tribunal";

export type DifficultyPreview = {
  mode: DifficultyMode;
  label: string;
  enemyWillMultiplier: number;
  enemyClarityBonus: number;
  aiAggression: number;
  comboFrequency: number;
  controlResistance: number;
  rewardMultiplier: number;
  description: string;
};

export const difficultyScaling: Record<DifficultyMode, DifficultyPreview> = {
  fixed: {
    mode: "fixed",
    label: "Fija",
    enemyWillMultiplier: 1,
    enemyClarityBonus: 0,
    aiAggression: 1,
    comboFrequency: 1,
    controlResistance: 0,
    rewardMultiplier: 1,
    description: "El jugador elige dificultad. El Tribunal no improvisa, por una vez.",
  },
  "adaptive-soft": {
    mode: "adaptive-soft",
    label: "Adaptativa suave",
    enemyWillMultiplier: 1.08,
    enemyClarityBonus: 1,
    aiAggression: 1.12,
    comboFrequency: 1.1,
    controlResistance: 0.08,
    rewardMultiplier: 1.08,
    description: "Ajustes minimos segun racha, poder de mazo y nivel.",
  },
  "cruel-tribunal": {
    mode: "cruel-tribunal",
    label: "Tribunal cruel",
    enemyWillMultiplier: 1.22,
    enemyClarityBonus: 2,
    aiAggression: 1.35,
    comboFrequency: 1.28,
    controlResistance: 0.18,
    rewardMultiplier: 1.22,
    description: "Escala agresivamente sin hacer trampa visible. Trae casco.",
  },
};

export const difficultyGuardrails = [
  "No robar cartas imposibles.",
  "No ignorar reglas.",
  "No manipular resultados ocultos injustamente.",
  "No abusar de bloqueos permanentes.",
  "No quitar control del jugador durante demasiados turnos.",
];
