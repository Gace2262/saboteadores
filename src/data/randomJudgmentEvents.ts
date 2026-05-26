import type { VisualEffect } from "./cards";

export type RandomJudgmentEventId =
  | "martillazo-administrativo"
  | "cadenas-tramite"
  | "estampida-pendientes"
  | "auditoria-emocional"
  | "risa-vacio"
  | "decreto-casi";

export type RandomJudgmentEvent = {
  id: RandomJudgmentEventId;
  name: string;
  effect: string;
  text: string;
  visual: VisualEffect;
  sound: VisualEffect;
};

export const randomJudgmentEvents: RandomJudgmentEvent[] = [
  {
    id: "martillazo-administrativo",
    name: "Martillazo Administrativo",
    effect: "El jugador pierde 3 Voluntad.",
    text: "El tribunal detecto entusiasmo no autorizado.",
    visual: "hammer_slam",
    sound: "hammer_slam",
  },
  {
    id: "cadenas-tramite",
    name: "Cadenas de Tramite Interno",
    effect: "Bloquea una carta aleatoria del jugador.",
    text: "Tu libertad esta en revision desde 1998.",
    visual: "chains",
    sound: "chains",
  },
  {
    id: "estampida-pendientes",
    name: "Estampida de Pendientes",
    effect: "Dano igual al numero de cartas en mano.",
    text: "La lista de tareas abrio los establos.",
    visual: "horse_stampede",
    sound: "horse_stampede",
  },
  {
    id: "auditoria-emocional",
    name: "Auditoria Emocional",
    effect: "Reduce Claridad a la mitad.",
    text: "Tus sentimientos no pasaron contabilidad.",
    visual: "guilt_rain",
    sound: "sarcasm_spark",
  },
  {
    id: "risa-vacio",
    name: "Risa del Vacio",
    effect: "Descarta una carta aleatoria.",
    text: "El abismo se rio. Tenia razon, pero fue poco profesional.",
    visual: "void_laugh",
    sound: "void_laugh",
  },
  {
    id: "decreto-casi",
    name: "Decreto del Casi",
    effect: "Si una carta no derrota al enemigo, cuesta +1 el proximo turno.",
    text: "Casi suficiente. Legalmente inutil.",
    visual: "judgment_flash",
    sound: "hammer_slam",
  },
];

export const pickJudgmentEvent = (seed: number) => randomJudgmentEvents[Math.abs(seed) % randomJudgmentEvents.length];
