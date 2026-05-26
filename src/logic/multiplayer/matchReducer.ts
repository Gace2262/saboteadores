import { allCards } from "@/data/cards";
import type { MatchEvent, MatchState } from "./matchTypes";
import { getOpponentId } from "./matchState";
import { validateMatchEvent } from "./matchValidator";
import { calculateStateChecksum } from "./turnSync";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function withLoggedEvent(state: MatchState, event: MatchEvent): MatchState {
  const next = { ...state, eventLog: [...state.eventLog, event] };
  return { ...next, lastChecksum: calculateStateChecksum(next) };
}

export function matchReducer(state: MatchState, event: MatchEvent): MatchState {
  if (event.type !== "SYNC_STATE") {
    const validation = validateMatchEvent(state, event);
    if (!validation.valid) return withLoggedEvent({ ...state, phase: "resolving" }, { ...event, payload: { ...event.payload, message: validation.errors.join(" ") } });
  }

  let next: MatchState = { ...state };
  const playerId = event.playerId;
  const opponentId = getOpponentId(state, playerId);

  if (event.type === "SYNC_STATE" && event.payload.state) {
    return { ...event.payload.state, eventLog: [...event.payload.state.eventLog, event], lastChecksum: calculateStateChecksum(event.payload.state) };
  }

  if (event.type === "DRAW_CARD") {
    const [drawn, ...deck] = state.decks[playerId] ?? [];
    if (drawn) {
      next = {
        ...next,
        decks: { ...next.decks, [playerId]: deck },
        hands: { ...next.hands, [playerId]: [...(next.hands[playerId] ?? []), drawn] },
      };
    }
  }

  if (event.type === "PLAY_CARD") {
    const cardId = event.payload.cardId;
    const card = allCards.find((item) => item.id === cardId);
    if (card && cardId) {
      const playerResources = state.resources[playerId];
      const opponentResources = state.resources[opponentId];
      const damage = card.willpowerDamage + (card.keywords.includes("Sentencia") && opponentResources.stress >= 5 ? 3 : 0);
      next = {
        ...next,
        hands: { ...next.hands, [playerId]: state.hands[playerId].filter((id) => id !== cardId) },
        discardPiles: { ...next.discardPiles, [playerId]: [...state.discardPiles[playerId], cardId] },
        board: {
          ...next.board,
          playedCards: { ...next.board.playedCards, [playerId]: [...next.board.playedCards[playerId], cardId].slice(-3) },
          blockedCards: card.keywords.includes("Cadena")
            ? { ...next.board.blockedCards, [opponentId]: [...next.board.blockedCards[opponentId], `block-${event.sequenceNumber}`] }
            : next.board.blockedCards,
        },
        resources: {
          ...next.resources,
          [playerId]: {
            ...playerResources,
            clarity: clamp(playerResources.clarity - card.cost + card.clarityGain, 0, 12),
            stress: clamp(playerResources.stress + card.stressGain, 0, 20),
            mentalNoise: clamp(playerResources.mentalNoise + card.mentalNoise, 0, 20),
          },
          [opponentId]: {
            ...opponentResources,
            willpower: clamp(opponentResources.willpower - damage, 0, 30),
            clarity: card.keywords.includes("Culpa") ? clamp(opponentResources.clarity - 2, 0, 12) : opponentResources.clarity,
          },
        },
      };
      if (next.resources[opponentId].willpower <= 0) {
        next = { ...next, status: "finished", phase: "finished", winnerId: playerId };
      }
    }
  }

  if (event.type === "END_TURN") {
    const nextPlayer = opponentId;
    next = {
      ...next,
      activePlayerId: nextPlayer,
      turnNumber: state.turnNumber + 1,
      phase: nextPlayer === "p1" ? "player_turn" : "opponent_turn",
      resources: {
        ...next.resources,
        [nextPlayer]: { ...next.resources[nextPlayer], clarity: clamp(next.resources[nextPlayer].clarity + 2, 0, 12) },
      },
    };
  }

  if (event.type === "RESOLVE_DAMAGE" && event.payload.targetPlayerId && event.payload.amount) {
    const target = event.payload.targetPlayerId;
    next = {
      ...next,
      resources: {
        ...next.resources,
        [target]: { ...next.resources[target], willpower: clamp(next.resources[target].willpower - event.payload.amount, 0, 30) },
      },
    };
  }

  if (event.type === "GAIN_RESOURCE" && event.payload.resource && event.payload.amount) {
    const resource = event.payload.resource;
    next = {
      ...next,
      resources: {
        ...next.resources,
        [playerId]: { ...next.resources[playerId], [resource]: clamp(next.resources[playerId][resource] + event.payload.amount, 0, 30) },
      },
    };
  }

  if (event.type === "START_CINEMATIC") next = { ...next, phase: "cinematic" };
  if (event.type === "END_CINEMATIC") next = { ...next, phase: state.activePlayerId === "p1" ? "player_turn" : "opponent_turn" };
  if (event.type === "CONCEDE") next = { ...next, status: "finished", phase: "finished", winnerId: opponentId };
  if (event.type === "RECONNECT") next = { ...next, status: "in_match", phase: state.activePlayerId === "p1" ? "player_turn" : "opponent_turn" };

  return withLoggedEvent(next, event);
}
