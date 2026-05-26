"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { allCards } from "@/data/cards";
import type { Emote } from "@/data/emotes";
import { createLocalMatch, localConcede, localDrawCard, localEndTurn, localPlayCard } from "@/logic/multiplayer/localMatchEngine";
import type { MatchState } from "@/logic/multiplayer/matchTypes";

type MultiplayerProfileStats = {
  localMatchesPlayed: number;
  localWins: number;
  favoriteEmoteId?: string;
  futureRank: string;
  history: string[];
};

type MultiplayerStore = {
  currentMatch?: MatchState;
  stats: MultiplayerProfileStats;
  lastEmote?: Emote;
  startLocalMatch: () => void;
  playCard: (cardId: string) => void;
  drawCard: () => void;
  endTurn: () => void;
  concede: () => void;
  sendEmote: (emote: Emote) => void;
  clearMatch: () => void;
};

export const useMultiplayerStore = create<MultiplayerStore>()(
  persist(
    (set, get) => ({
      stats: { localMatchesPlayed: 0, localWins: 0, futureRank: "Citado", history: [] },
      startLocalMatch: () => {
        const deck = allCards.filter((card) => card.collectible && card.faction !== "juez").slice(0, 30);
        const match = createLocalMatch(deck, [...deck].reverse(), `local-${Date.now()}`);
        set((state) => ({
          currentMatch: match,
          stats: {
            ...state.stats,
            localMatchesPlayed: state.stats.localMatchesPlayed + 1,
            history: [`Partida local creada: ${match.matchId}`, ...state.stats.history].slice(0, 12),
          },
        }));
      },
      playCard: (cardId) => {
        const match = get().currentMatch;
        if (!match) return;
        set({ currentMatch: localPlayCard(match, cardId) });
      },
      drawCard: () => {
        const match = get().currentMatch;
        if (!match) return;
        set({ currentMatch: localDrawCard(match) });
      },
      endTurn: () => {
        const match = get().currentMatch;
        if (!match) return;
        set({ currentMatch: localEndTurn(match) });
      },
      concede: () => {
        const match = get().currentMatch;
        if (!match) return;
        set({ currentMatch: localConcede(match) });
      },
      sendEmote: (emote) =>
        set((state) => ({
          lastEmote: emote,
          stats: { ...state.stats, favoriteEmoteId: emote.id },
        })),
      clearMatch: () => set({ currentMatch: undefined }),
    }),
    { name: "saboteadores-multiplayer-v1" },
  ),
);
