import type { Card, VisualEffect } from "@/data/cards";

export type CardCinematicType =
  | "hammer_slam"
  | "chains"
  | "horse_stampede"
  | "guilt_rain"
  | "panic_pulse"
  | "void_laugh"
  | "liberation_burst"
  | "cursed_static"
  | "judgment_flash"
  | "default";

export const extraVisualPhrases = [
  "Sentencia en curso...",
  "Las cadenas encontraron domicilio.",
  "Tu ansiedad pidio caballeria.",
  "El cerebro acaba de perder la garantia.",
  "Objecion aceptada por agotamiento.",
  "La claridad rompio el vidrio.",
];

export function getCardCinematic(card?: Card): { type: CardCinematicType; effect: VisualEffect | undefined; phrase: string } {
  if (!card) return { type: "default", effect: undefined, phrase: extraVisualPhrases[0] };
  const effect = card.visualEffect;
  const phrase =
    effect === "hammer_slam"
      ? "Sentencia en curso..."
      : effect === "chains"
        ? "Las cadenas encontraron domicilio."
        : effect === "horse_stampede"
          ? "Tu ansiedad pidio caballeria."
          : effect === "liberation_burst"
            ? "La claridad rompio el vidrio."
            : effect === "cursed_static" || card.rarity === "maldita"
              ? "El cerebro acaba de perder la garantia."
              : card.impactText;
  return {
    type: effect === "sarcasm_spark" || effect === "mental_spark" ? "default" : effect,
    effect,
    phrase,
  };
}
