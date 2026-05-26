export type DemoConfig = {
  version: string;
  buildMode: string;
  estimatedMinutes: { min: number; max: number };
  availableContent: string[];
  lockedModes: string[];
  availableBosses: string[];
  availableCards: string;
  finalMessage: string;
  buildDate: string;
};

export const demoConfig: DemoConfig = {
  version: process.env.NEXT_PUBLIC_APP_VERSION ?? "0.1.0-demo",
  buildMode: process.env.NEXT_PUBLIC_BUILD_MODE ?? "demo",
  estimatedMinutes: { min: 15, max: 30 },
  availableContent: [
    "tutorial",
    "1 combate normal",
    "1 boss",
    "coleccion limitada",
    "apertura de 1 sobre",
    "perfil basico",
    "cinematica final",
  ],
  lockedModes: [
    "Juicio Extremo completo",
    "universo expandido completo",
    "multiplayer futuro",
    "temporadas futuras",
  ],
  availableBosses: ["Controlador menor", "Perfeccionista Ascendido"],
  availableCards: "Seleccion curada de cartas comunes, raras, epicas y una legendaria de muestra.",
  finalMessage: "Esta demo contiene una rebanada del Tribunal. El expediente completo sigue en construccion.",
  buildDate: process.env.NEXT_PUBLIC_BUILD_DATE ?? "local",
};

export const isDebugEnabled =
  process.env.NEXT_PUBLIC_ENABLE_DEBUG === "true" || process.env.NODE_ENV !== "production";
