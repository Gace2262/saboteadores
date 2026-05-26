import type { Card } from "@/data/cards";
import { advancedDifficultyProfiles } from "@/data/aiDifficultyProfiles";
import type { AIDifficultyId } from "./aiTypes";
import type { BossIntent } from "./advancedAITypes";

export function resolveBossIntent(cards: Card[], difficultyId: AIDifficultyId): { intent: BossIntent; preview: string } {
  const card = cards[0];
  const clarity = advancedDifficultyProfiles[difficultyId].intentClarity;
  if (!card) return { intent: "prepare_combo", preview: "El enemigo esta pensando demasiado. Mala senal administrativa." };
  let intent: BossIntent = "attack";
  if (card.keywords.includes("Cadena")) intent = "block";
  else if (card.keywords.includes("Despertar") || card.stressGain < 0 || card.mentalNoise < 0) intent = "heal";
  else if (card.keywords.includes("Sentencia")) intent = "punish_stress";
  else if (card.keywords.includes("Mascara")) intent = "protect";
  else if (card.type === "Crisis") intent = "invoke_crisis";
  else if (cards.length > 1) intent = "prepare_combo";

  const clear = {
    attack: "prepara un ataque directo.",
    block: "prepara un bloqueo.",
    heal: "busca recuperarse.",
    prepare_combo: "esta armando un combo.",
    invoke_crisis: "invocara una crisis.",
    punish_stress: "prepara una Sentencia.",
    protect: "esta levantando defensas.",
    transform: "esta por transformarse.",
  }[intent];
  if (clarity === "clear") return { intent, preview: `El boss ${clear}` };
  if (clarity === "partial") return { intent, preview: "El boss inclina el tablero hacia una jugada peligrosa." };
  return { intent, preview: "El boss sonrie con subtitulos clasificados." };
}
