import { allCards } from "@/data/cards";
import { multiplayerConfig } from "@/data/multiplayerConfig";
import type { MatchEvent, MatchState } from "./matchTypes";

export type ValidationResult = {
  valid: boolean;
  errors: string[];
};

const fail = (...errors: string[]): ValidationResult => ({ valid: false, errors });
const ok = (): ValidationResult => ({ valid: true, errors: [] });

export function validateMatchEvent(state: MatchState, event: MatchEvent): ValidationResult {
  if (state.eventLog.some((item) => item.id === event.id)) return fail("Evento duplicado.");
  if (event.sequenceNumber !== state.eventLog.length + 1) return fail("sequenceNumber incorrecto.");
  if (state.status === "finished" && event.type !== "SYNC_STATE") return fail("La partida ya termino.");
  if (!state.players.some((player) => player.id === event.playerId)) return fail("Jugador inexistente.");
  if (["PLAY_CARD", "DRAW_CARD", "END_TURN"].includes(event.type) && event.playerId !== state.activePlayerId) return fail("No es el turno de ese jugador.");

  if (event.type === "PLAY_CARD") {
    const cardId = event.payload.cardId;
    if (!cardId) return fail("Falta cardId.");
    const card = allCards.find((item) => item.id === cardId);
    if (!card) return fail("La carta no existe.");
    if (!state.hands[event.playerId]?.includes(cardId)) return fail("La carta no esta en mano.");
    if (!multiplayerConfig.pvpRules.judgeAllowed && card.faction === "juez") return fail("El Juez no cabe en PvP normal. Y creeme, intento entrar.");
    if (state.resources[event.playerId].clarity < card.cost) return fail("Claridad insuficiente.");
  }

  const negativeResource = Object.values(state.resources).some((resource) =>
    resource.willpower < 0 || resource.clarity < 0 || resource.stress < 0 || resource.mentalNoise < 0,
  );
  if (negativeResource) return fail("Recursos negativos detectados.");
  return ok();
}
