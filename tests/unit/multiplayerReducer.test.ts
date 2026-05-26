import { describe, expect, it } from "vitest";
import { allCards } from "@/data/cards";
import { createLocalMatch, localEndTurn, localPlayCard, replayMatch } from "@/logic/multiplayer/localMatchEngine";
import { createMatchEvent } from "@/logic/multiplayer/matchEvents";
import { createInitialMatchState } from "@/logic/multiplayer/matchState";
import { matchReducer } from "@/logic/multiplayer/matchReducer";
import { calculateStateChecksum } from "@/logic/multiplayer/turnSync";

const deck = allCards.filter((card) => card.collectible && card.faction !== "juez").slice(0, 30);

describe("multiplayer match reducer", () => {
  it("starts a valid local match", () => {
    const match = createLocalMatch(deck, deck, "qa-seed");
    expect(match.players).toHaveLength(2);
    expect(match.hands.p1).toHaveLength(5);
    expect(match.status).toBe("in_match");
  });

  it("applies play card events through reducer", () => {
    const match = createLocalMatch(deck, deck, "play-card");
    const cardId = match.hands[match.activePlayerId][0];
    const next = localPlayCard(match, cardId);
    expect(next.hands.p1).not.toContain(cardId);
    expect(next.discardPiles.p1).toContain(cardId);
    expect(next.eventLog).toHaveLength(1);
  });

  it("does not allow playing outside active turn", () => {
    const match = createLocalMatch(deck, deck, "wrong-turn");
    const event = createMatchEvent(match, "p2", "PLAY_CARD", { cardId: match.hands.p2[0] });
    const next = matchReducer(match, event);
    expect(next.hands.p2).toContain(match.hands.p2[0]);
    expect(next.eventLog[0].payload.message).toContain("No es el turno");
  });

  it("does not allow insufficient clarity", () => {
    const expensive = allCards.find((card) => card.cost >= 5 && card.faction !== "juez") ?? deck[0];
    const base = createInitialMatchState({
      mode: "local",
      playerOneName: "P1",
      playerTwoName: "P2",
      playerOneDeck: [expensive, ...deck],
      playerTwoDeck: deck,
      seed: "expensive",
    });
    const state = {
      ...base,
      hands: { ...base.hands, p1: [expensive.id, ...base.hands.p1.slice(1)] },
      resources: { ...base.resources, p1: { ...base.resources.p1, clarity: 0 } },
    };
    const event = createMatchEvent(state, "p1", "PLAY_CARD", { cardId: state.hands.p1[0] });
    const next = matchReducer(state, event);
    expect(next.eventLog[0].payload.message).toContain("Claridad insuficiente");
  });

  it("replay rebuilds the same checksum", () => {
    const initial = createLocalMatch(deck, deck, "replay");
    const afterPlay = localPlayCard(initial, initial.hands.p1[0]);
    const afterTurn = localEndTurn(afterPlay);
    const replayed = replayMatch(initial, afterTurn.eventLog);
    expect(calculateStateChecksum(replayed)).toBe(calculateStateChecksum(afterTurn));
  });

  it("checksum changes when state changes", () => {
    const match = createLocalMatch(deck, deck, "checksum");
    const next = localEndTurn(match);
    expect(calculateStateChecksum(next)).not.toBe(calculateStateChecksum(match));
  });
});
