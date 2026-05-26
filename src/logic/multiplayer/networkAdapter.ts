import type { CreateMatchInput, MatchEvent, MatchState } from "./matchTypes";

export type QueueTicket = {
  id: string;
  mode: string;
  createdAt: string;
};

export interface NetworkAdapter {
  createMatch(input: CreateMatchInput): Promise<MatchState>;
  joinMatch(matchId: string, playerId: string): Promise<MatchState>;
  sendEvent(event: MatchEvent): Promise<void>;
  subscribeToEvents(matchId: string, onEvent: (event: MatchEvent) => void): () => void;
  disconnect(matchId: string): Promise<void>;
  reconnect(matchId: string): Promise<MatchState | null>;
  createQueueTicket?(mode: string): Promise<QueueTicket>;
  cancelQueue?(ticketId: string): Promise<void>;
  acceptMatch?(ticketId: string): Promise<void>;
  declineMatch?(ticketId: string): Promise<void>;
}
