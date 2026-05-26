import type { Card } from "@/data/cards";
import type { MultiplayerMode, TurnTimerMode } from "@/data/multiplayerConfig";

export type MatchPhase = "setup" | "mulligan" | "player_turn" | "opponent_turn" | "resolving" | "cinematic" | "finished" | "disconnected";
export type MatchStatus = "waiting" | "ready" | "in_match" | "finished" | "disconnected";
export type PlayerSlot = 1 | 2;

export type MultiplayerResources = {
  willpower: number;
  clarity: number;
  stress: number;
  mentalNoise: number;
};

export type MatchPlayer = {
  id: string;
  name: string;
  slot: PlayerSlot;
  connected: boolean;
  deckName: string;
  isSpectator?: boolean;
};

export type BoardState = {
  playedCards: Record<string, string[]>;
  blockedCards: Record<string, string[]>;
};

export type PendingEffect = {
  id: string;
  sourceCardId: string;
  ownerId: string;
  description: string;
};

export type MatchState = {
  matchId: string;
  mode: MultiplayerMode;
  timerMode: TurnTimerMode;
  players: MatchPlayer[];
  activePlayerId: string;
  turnNumber: number;
  phase: MatchPhase;
  seed: string;
  board: BoardState;
  hands: Record<string, string[]>;
  decks: Record<string, string[]>;
  discardPiles: Record<string, string[]>;
  resources: Record<string, MultiplayerResources>;
  pendingEffects: PendingEffect[];
  eventLog: MatchEvent[];
  status: MatchStatus;
  winnerId?: string;
  lastChecksum: string;
};

export type MatchEventType =
  | "DRAW_CARD"
  | "PLAY_CARD"
  | "END_TURN"
  | "APPLY_EFFECT"
  | "DISCARD_CARD"
  | "TRIGGER_KEYWORD"
  | "RESOLVE_DAMAGE"
  | "GAIN_RESOURCE"
  | "START_CINEMATIC"
  | "END_CINEMATIC"
  | "CONCEDE"
  | "RECONNECT"
  | "SYNC_STATE";

export type MatchEventPayload = {
  cardId?: string;
  targetPlayerId?: string;
  amount?: number;
  resource?: keyof MultiplayerResources;
  state?: MatchState;
  message?: string;
  emoteId?: string;
};

export type MatchEvent = {
  id: string;
  matchId: string;
  playerId: string;
  type: MatchEventType;
  payload: MatchEventPayload;
  timestamp: number;
  turnNumber: number;
  sequenceNumber: number;
  checksum: string;
};

export type CreateMatchInput = {
  mode: MultiplayerMode;
  timerMode?: TurnTimerMode;
  playerOneName: string;
  playerTwoName: string;
  playerOneDeck: Card[];
  playerTwoDeck: Card[];
  seed?: string;
};
