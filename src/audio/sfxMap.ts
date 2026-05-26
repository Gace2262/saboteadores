import type { VisualEffect } from "@/data/cards";
import type { Keyword } from "@/data/keywords";

export type SfxDefinition = {
  id: string;
  route: string;
  subtitle: string;
  frequency: number;
  duration: number;
  intensity: number;
};

export const cinematicSfx: Record<string, SfxDefinition> = {
  judgeEntrance: {
    id: "judgeEntrance",
    route: "/sfx/judge-entrance.wav",
    subtitle: "[ORGANO MASIVO Y CADENAS]",
    frequency: 48,
    duration: 1.6,
    intensity: 90,
  },
  criticalHammer: {
    id: "criticalHammer",
    route: "/sfx/critical-hammer.wav",
    subtitle: "[MARTILLAZO LEJANO]",
    frequency: 58,
    duration: 1.1,
    intensity: 100,
  },
  legendaryCatharsis: {
    id: "legendaryCatharsis",
    route: "/sfx/legendary-catharsis.wav",
    subtitle: "[CORO ASCENDENTE Y CADENAS ROMPIENDOSE]",
    frequency: 440,
    duration: 1.4,
    intensity: 86,
  },
  mentalDefeat: {
    id: "mentalDefeat",
    route: "/sfx/mental-defeat.wav",
    subtitle: "[LATIDOS LENTOS Y RUIDO BLANCO]",
    frequency: 38,
    duration: 1.7,
    intensity: 72,
  },
  judgeVictory: {
    id: "judgeVictory",
    route: "/sfx/judge-victory.wav",
    subtitle: "[CADENAS CAYENDO Y CORO TRIUNFAL]",
    frequency: 220,
    duration: 1.9,
    intensity: 88,
  },
};

export const keywordSfx: Record<Keyword, SfxDefinition> = {
  Sentencia: { id: "kw-sentencia", route: "/sfx/keyword-sentencia.wav", subtitle: "[GOLPE METALICO CON ECO JUDICIAL]", frequency: 92, duration: 0.55, intensity: 75 },
  Cadena: { id: "kw-cadena", route: "/sfx/keyword-cadena.wav", subtitle: "[CADENAS ARRASTRANDOSE]", frequency: 160, duration: 0.7, intensity: 64 },
  Culpa: { id: "kw-culpa", route: "/sfx/keyword-culpa.wav", subtitle: "[SUSURROS INVERTIDOS]", frequency: 310, duration: 0.8, intensity: 52 },
  Derrumbe: { id: "kw-derrumbe", route: "/sfx/keyword-derrumbe.wav", subtitle: "[CONCRETO QUEBRANDOSE]", frequency: 70, duration: 0.8, intensity: 70 },
  Estampida: { id: "kw-estampida", route: "/sfx/keyword-estampida.wav", subtitle: "[ESTAMPIA Y PERCUSION]", frequency: 56, duration: 0.95, intensity: 82 },
  Mascara: { id: "kw-mascara", route: "/sfx/keyword-mascara.wav", subtitle: "[SONIDO AMORTIGUADO]", frequency: 180, duration: 0.45, intensity: 40 },
  Despertar: { id: "kw-despertar", route: "/sfx/keyword-despertar.wav", subtitle: "[CRISTAL LUMINOSO]", frequency: 520, duration: 0.7, intensity: 58 },
  Obsesion: { id: "kw-obsesion", route: "/sfx/keyword-obsesion.wav", subtitle: "[REPETICION DISTORSIONADA]", frequency: 118, duration: 0.72, intensity: 68 },
  Ironia: { id: "kw-ironia", route: "/sfx/keyword-ironia.wav", subtitle: "[RISA SECA]", frequency: 640, duration: 0.32, intensity: 45 },
  Catarsis: { id: "kw-catarsis", route: "/sfx/keyword-catarsis.wav", subtitle: "[EXPLOSION CORAL]", frequency: 392, duration: 1, intensity: 88 },
  Aceptacion: { id: "kw-aceptacion", route: "/sfx/keyword-aceptacion.wav", subtitle: "[RESPIRACION TRANQUILA]", frequency: 330, duration: 0.55, intensity: 36 },
  Limites: { id: "kw-limites", route: "/sfx/keyword-limites.wav", subtitle: "[CANDADO ABRIENDOSE]", frequency: 260, duration: 0.5, intensity: 46 },
  Enfoque: { id: "kw-enfoque", route: "/sfx/keyword-enfoque.wav", subtitle: "[PULSO CLARO]", frequency: 440, duration: 0.45, intensity: 42 },
  Confianza: { id: "kw-confianza", route: "/sfx/keyword-confianza.wav", subtitle: "[ALARMA APAGANDOSE]", frequency: 250, duration: 0.52, intensity: 44 },
  Intuicion: { id: "kw-intuicion", route: "/sfx/keyword-intuicion.wav", subtitle: "[CHISPA MENTAL]", frequency: 700, duration: 0.42, intensity: 50 },
  Responsabilidad: { id: "kw-responsabilidad", route: "/sfx/keyword-responsabilidad.wav", subtitle: "[SELLO FIRME]", frequency: 150, duration: 0.48, intensity: 48 },
  "Accion Directa": { id: "kw-accion-directa", route: "/sfx/keyword-accion-directa.wav", subtitle: "[PUERTA ABIENDOSE DE GOLPE]", frequency: 110, duration: 0.5, intensity: 62 },
  Expresion: { id: "kw-expresion", route: "/sfx/keyword-expresion.wav", subtitle: "[VOZ SALIENDO DEL ECO]", frequency: 360, duration: 0.65, intensity: 55 },
  Silencio: { id: "kw-silencio", route: "/sfx/keyword-silencio.wav", subtitle: "[SILENCIO PRESIONADO]", frequency: 42, duration: 0.6, intensity: 30 },
  Caos: { id: "kw-caos", route: "/sfx/keyword-caos.wav", subtitle: "[RUIDO MENTAL CRUZADO]", frequency: 90, duration: 0.75, intensity: 76 },
};

export const visualEffectSubtitles: Record<VisualEffect, string> = {
  hammer_slam: "[MARTILLAZO LEJANO]",
  chains: "[CADENAS ARRASTRANDOSE]",
  horse_stampede: "[ESTAMPIA DE PENDIENTES]",
  guilt_rain: "[LLUVIA DE CULPA]",
  panic_pulse: "[RESPIRACION AGITADA]",
  sarcasm_spark: "[CHISPA SARCASTICA]",
  void_laugh: "[RISA DEL VACIO]",
  liberation_burst: "[CADENAS ROMPIENDOSE]",
  judgment_flash: "[CORO JUDICIAL]",
  cursed_static: "[ESTATICA MENTAL]",
  mental_spark: "[CHISPA MENTAL]",
};
