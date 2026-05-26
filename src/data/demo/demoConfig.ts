export const DEMO_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "0.1.0-demo";

export const demoVerticalConfig = {
  version: DEMO_VERSION,
  buildMode: process.env.NEXT_PUBLIC_BUILD_MODE ?? "demo",
  estimatedMinutes: { min: 15, max: 25 },
  enableDebug: process.env.NEXT_PUBLIC_ENABLE_DEBUG === "true",
  enableLockedContent: true,
  enableAudio: true,
  enableFeedback: true,
  enableAnalyticsLocal: true,
  finalMessage: "Esta demo contiene una rebanada del Tribunal. El expediente completo sigue en construccion.",
  legalNotice: "Obra de ficcion psicologica. No reemplaza apoyo profesional ni terapia.",
  available: ["tutorial", "1 combate normal", "1 evento narrativo", "1 evolucion", "1 boss", "coleccion demo limitada", "audio dinamico", "feedback local"],
  locked: ["campana completa", "Juicio Extremo", "Boss Rush", "coleccion completa", "Tribunal Vivo avanzado", "mods", "multiplayer", "universo expandido"],
};
