import { createInitialMatchState } from "./matchState";
import type { NetworkAdapter } from "./networkAdapter";
import type { CreateMatchInput, MatchEvent, MatchState } from "./matchTypes";

export class MockNetworkAdapter implements NetworkAdapter {
  private matches = new Map<string, MatchState>();
  private listeners = new Map<string, Set<(event: MatchEvent) => void>>();

  async createMatch(input: CreateMatchInput) {
    const state = createInitialMatchState(input);
    this.matches.set(state.matchId, state);
    return state;
  }

  async joinMatch(matchId: string) {
    const state = this.matches.get(matchId);
    if (!state) throw new Error("Partida mock no encontrada.");
    return state;
  }

  async sendEvent(event: MatchEvent) {
    this.listeners.get(event.matchId)?.forEach((listener) => listener(event));
  }

  subscribeToEvents(matchId: string, onEvent: (event: MatchEvent) => void) {
    const listeners = this.listeners.get(matchId) ?? new Set();
    listeners.add(onEvent);
    this.listeners.set(matchId, listeners);
    return () => listeners.delete(onEvent);
  }

  async disconnect() {}

  async reconnect(matchId: string) {
    return this.matches.get(matchId) ?? null;
  }
}
