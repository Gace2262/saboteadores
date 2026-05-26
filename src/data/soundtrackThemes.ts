export type DemoSoundtrackThemeId =
  | "menu_tribunal_respira"
  | "battle_ansiedad_operativa"
  | "boss_catedral_casi"
  | "victory_suspension_sentencia"
  | "defeat_archivo_fracaso";

export type DemoSoundtrackTheme = {
  id: DemoSoundtrackThemeId;
  name: string;
  mood: string;
  bpm: number;
  rootFrequency: number;
  layers: {
    baseLayer: string;
    tensionLayer: string;
    stressLayer: string;
    climaxLayer: string;
    ambienceLayer: string;
  };
  subtitles: string[];
};

export const soundtrackThemes: Record<DemoSoundtrackThemeId, DemoSoundtrackTheme> = {
  menu_tribunal_respira: {
    id: "menu_tribunal_respira",
    name: "El Tribunal Respira",
    mood: "Organo oscuro, coro distante y cadenas respirando desde el fondo.",
    bpm: 58,
    rootFrequency: 55,
    layers: {
      baseLayer: "organo ceremonial lento",
      tensionLayer: "cuerdas graves suspendidas",
      stressLayer: "respiracion metalica",
      climaxLayer: "martillo lejano",
      ambienceLayer: "murmullos del tribunal",
    },
    subtitles: ["[CORO DISTANTE]", "[CADENAS SUAVES]", "[MARTILLO LEJANO]"],
  },
  battle_ansiedad_operativa: {
    id: "battle_ansiedad_operativa",
    name: "Ansiedad Operativa",
    mood: "Pulso tactico, percusion mental y cuerdas tensas que cuentan tus errores.",
    bpm: 92,
    rootFrequency: 65,
    layers: {
      baseLayer: "pulso electronico oscuro",
      tensionLayer: "cuerdas rapidas",
      stressLayer: "latido y respiracion",
      climaxLayer: "coro leve de crisis",
      ambienceLayer: "sala judicial activa",
    },
    subtitles: ["[PULSO MENTAL]", "[RESPIRACION DISTANTE]", "[CUERDAS TENSAS]"],
  },
  boss_catedral_casi: {
    id: "boss_catedral_casi",
    name: "Catedral del Casi",
    mood: "Organo agresivo, reloj mecanico, campanas y coro judicial con modales crueles.",
    bpm: 76,
    rootFrequency: 49,
    layers: {
      baseLayer: "organo de catedral fracturada",
      tensionLayer: "reloj mecanico y campanas",
      stressLayer: "percusion metalica",
      climaxLayer: "coro judicial completo",
      ambienceLayer: "grietas simetricas",
    },
    subtitles: ["[CORO JUDICIAL]", "[RELOJ MECANICO]", "[CATEDRAL FRACTURANDOSE]"],
  },
  victory_suspension_sentencia: {
    id: "victory_suspension_sentencia",
    name: "Suspension de Sentencia",
    mood: "Alivio cansado, luz imperfecta y cadenas cayendo sin hacer discurso.",
    bpm: 64,
    rootFrequency: 73,
    layers: {
      baseLayer: "acorde claro sostenido",
      tensionLayer: "cuerdas suaves",
      stressLayer: "respiro luminoso",
      climaxLayer: "coro de catarsis leve",
      ambienceLayer: "cadenas cayendo",
    },
    subtitles: ["[CADENAS CAYENDO]", "[LUZ SONORA]", "[CORO SUAVE]"],
  },
  defeat_archivo_fracaso: {
    id: "defeat_archivo_fracaso",
    name: "Archivo de Fracaso",
    mood: "Silencio pesado, organo bajo y papeles cerrandose como una puerta.",
    bpm: 46,
    rootFrequency: 41,
    layers: {
      baseLayer: "drone grave agotado",
      tensionLayer: "eco de expediente",
      stressLayer: "frecuencia baja",
      climaxLayer: "martillo oscuro",
      ambienceLayer: "archivo apagado",
    },
    subtitles: ["[SILENCIO PESADO]", "[EXPEDIENTE CERRADO]", "[ECO LEJANO]"],
  },
};
