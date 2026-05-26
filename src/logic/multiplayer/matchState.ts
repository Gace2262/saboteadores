import type { Card } from "@/data/cards";
import { playerCards } from "@/data/cards";
import { multiplayerConfig } from "@/data/multiplayerConfig";
import type { CreateMatchInput, MatchState, MultiplayerResources } from "./matchTypes";
import { calculateStateChecksum, seededShuffle } from "./turnSync";

export const defaultResources: MultiplayerResources = {
  willpower: 30,
  clarity: 2,
  stress: 0,
  mentalNoise: 0,
};

export const starterPvPDeck = (): Card[] => playerCards.filter((card) => card.faction !== "juez").slice(0, 30);

export function createInitialMatchState(input: CreateMatchInput): MatchState {
  const seed = input.seed ?? `tribunal-${Date.now()}`;
  const matchId = `match-${seed}`;
  const p1 = { id: "p1", name: input.playerOneName || "Jugador 1", slot: 1 as const, connected: true, deckName: "Mazo local 1" };
  const p2 = { id: "p2", name: input.playerTwoName || "Jugador 2", slot: 2 as const, connected: true, deckName: "Mazo local 2" };
  const deckOne = seededShuffle(input.playerOneDeck.map((card) => card.id), `${seed}-p1`);
  const deckTwo = seededShuffle(input.playerTwoDeck.map((card) => card.id), `${seed}-p2`);
  const state: MatchState = {
    matchId,
    mode: input.mode,
    timerMode: input.timerMode ?? multiplayerConfig.defaultTimer,
    players: [p1, p2],
    activePlayerId: p1.id,
    turnNumber: 1,
    phase: "player_turn",
    seed,
    board: { playedCards: { [p1.id]: [], [p2.id]: [] }, blockedCards: { [p1.id]: [], [p2.id]: [] } },
    hands: { [p1.id]: deckOne.slice(0, 5), [p2.id]: deckTwo.slice(0, 5) },
    decks: { [p1.id]: deckOne.slice(5), [p2.id]: deckTwo.slice(5) },
    discardPiles: { [p1.id]: [], [p2.id]: [] },
    resources: { [p1.id]: { ...defaultResources }, [p2.id]: { ...defaultResources } },
    pendingEffects: [],
    eventLog: [],
    status: "in_match",
    lastChecksum: "",
  };
  return { ...state, lastChecksum: calculateStateChecksum(state) };
}

export function getOpponentId(state: MatchState, playerId: string) {
  return state.players.find((player) => player.id !== playerId && !player.isSpectator)?.id ?? state.players[0]?.id ?? playerId;
}
