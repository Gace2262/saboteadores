import type { Card } from "@/data/cards";
import { createInitialMatchState, starterPvPDeck } from "./matchState";
import { createMatchEvent } from "./matchEvents";
import { matchReducer } from "./matchReducer";
import type { MatchEvent, MatchState } from "./matchTypes";

export function createLocalMatch(playerOneDeck: Card[] = starterPvPDeck(), playerTwoDeck: Card[] = starterPvPDeck(), seed?: string) {
  return createInitialMatchState({
    mode: "local",
    playerOneName: "Jugador 1",
    playerTwoName: "Jugador 2",
    playerOneDeck,
    playerTwoDeck,
    seed,
  });
}

export function dispatchLocalEvent(state: MatchState, event: MatchEvent) {
  return matchReducer(state, event);
}

export function localPlayCard(state: MatchState, cardId: string) {
  return dispatchLocalEvent(state, createMatchEvent(state, state.activePlayerId, "PLAY_CARD", { cardId }));
}

export function localDrawCard(state: MatchState) {
  return dispatchLocalEvent(state, createMatchEvent(state, state.activePlayerId, "DRAW_CARD"));
}

export function localEndTurn(state: MatchState) {
  return dispatchLocalEvent(state, createMatchEvent(state, state.activePlayerId, "END_TURN"));
}

export function localConcede(state: MatchState) {
  return dispatchLocalEvent(state, createMatchEvent(state, state.activePlayerId, "CONCEDE"));
}

export function replayMatch(initialState: MatchState, events: MatchEvent[]) {
  const replayStart: MatchState = { ...initialState, eventLog: [] };
  return events.reduce<MatchState>((state, event) => matchReducer(state, event), replayStart);
}

export function stepForward(state: MatchState, event: MatchEvent) {
  return matchReducer(state, event);
}

export function stepBackward(initialState: MatchState, events: MatchEvent[], steps: number) {
  return replayMatch(initialState, events.slice(0, Math.max(0, events.length - steps)));
}

export function jumpToTurn(initialState: MatchState, events: MatchEvent[], turnNumber: number) {
  return replayMatch(initialState, events.filter((event) => event.turnNumber <= turnNumber));
}
