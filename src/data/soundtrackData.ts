import type { DemoSoundtrackThemeId } from "./soundtrackThemes";

export type DemoMusicRoute = "home" | "demo" | "battle" | "boss" | "victory" | "defeat";

export const soundtrackRoutes: Record<DemoMusicRoute, DemoSoundtrackThemeId> = {
  home: "menu_tribunal_respira",
  demo: "menu_tribunal_respira",
  battle: "battle_ansiedad_operativa",
  boss: "boss_catedral_casi",
  victory: "victory_suspension_sentencia",
  defeat: "defeat_archivo_fracaso",
};

export const demoVoiceLines = {
  judge: [
    { text: "La audiencia continua.", subtitle: "[EL JUEZ: LA AUDIENCIA CONTINUA]" },
    { text: "El expediente sigue abierto.", subtitle: "[EL JUEZ: EL EXPEDIENTE SIGUE ABIERTO]" },
  ],
  perfectionist: [
    { text: "Casi aceptable.", subtitle: "[PERFECCIONISTA: CASI ACEPTABLE]" },
    { text: "El error persiste.", subtitle: "[PERFECCIONISTA: EL ERROR PERSISTE]" },
  ],
  narrator: [
    { text: "Las cadenas recuerdan.", subtitle: "[NARRADOR: LAS CADENAS RECUERDAN]" },
    { text: "El Tribunal observa.", subtitle: "[NARRADOR: EL TRIBUNAL OBSERVA]" },
  ],
};
