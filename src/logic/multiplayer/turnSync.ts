import type { MatchEvent, MatchState } from "./matchTypes";

export function hashString(input: string) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}

export function seededRandom(seed: string) {
  let state = parseInt(hashString(seed), 16) || 1;
  return () => {
    state = Math.imul(1664525, state) + 1013904223;
    return ((state >>> 0) % 100000) / 100000;
  };
}

export function seededShuffle<T>(items: T[], seed: string) {
  const random = seededRandom(seed);
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

export function calculateStateChecksum(state: MatchState) {
  const stable = {
    matchId: state.matchId,
    activePlayerId: state.activePlayerId,
    turnNumber: state.turnNumber,
    phase: state.phase,
    hands: state.hands,
    decks: state.decks,
    discardPiles: state.discardPiles,
    resources: state.resources,
    status: state.status,
    winnerId: state.winnerId,
  };
  return hashString(JSON.stringify(stable));
}

export function orderEvents(events: MatchEvent[]) {
  return [...events].sort((a, b) => a.sequenceNumber - b.sequenceNumber);
}

export function hasSequenceGap(events: MatchEvent[]) {
  return orderEvents(events).some((event, index) => event.sequenceNumber !== index + 1);
}

export function needsResync(state: MatchState, remoteChecksum: string) {
  return calculateStateChecksum(state) !== remoteChecksum;
}
