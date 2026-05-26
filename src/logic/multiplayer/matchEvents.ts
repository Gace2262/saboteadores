import type { MatchEvent, MatchEventPayload, MatchEventType, MatchState } from "./matchTypes";
import { calculateStateChecksum } from "./turnSync";

export function createMatchEvent(
  state: MatchState,
  playerId: string,
  type: MatchEventType,
  payload: MatchEventPayload = {},
): MatchEvent {
  return {
    id: `${state.matchId}-${state.eventLog.length + 1}-${type}`,
    matchId: state.matchId,
    playerId,
    type,
    payload,
    timestamp: Date.now(),
    turnNumber: state.turnNumber,
    sequenceNumber: state.eventLog.length + 1,
    checksum: calculateStateChecksum(state),
  };
}
