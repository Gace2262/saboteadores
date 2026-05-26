"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Card } from "@/data/cards";
import type { AwakeningState } from "@/data/cardAwakenings";
import type { EvolutionAffinity } from "@/data/evolutions";
import { normalizeCardId } from "@/logic/evolution/evolutionEngine";
import { progressCard, type CardProgressionEvent } from "@/logic/evolution/cardProgression";

export type CardProgression = {
  cardId: string;
  experience: number;
  affinity: EvolutionAffinity;
  corruptionLevel: number;
  level: number;
  history: string[];
  mutations: string[];
  awakenState: AwakeningState;
  mentalEcho: string;
  bondedDecks: string[];
  usageCount: number;
  stressGenerated: number;
  clarityGenerated: number;
  damageDealt: number;
  bossesDefeated: string[];
  transformationsUnlocked: string[];
};

export type DeckPersonality = {
  name: string;
  alignment: string;
  dominantKeywords: string[];
  averageCorruption: number;
  stability: number;
  risk: string;
  collapsePotential: number;
};

type EvolutionStore = {
  cards: Record<string, CardProgression>;
  lastAwakenedCardId?: string;
  lastEcho?: { cardId: string; text: string };
  recordCardUse: (event: CardProgressionEvent) => void;
  markDeckBond: (cardIds: string[], deckName: string) => void;
  getCardProgression: (cardId: string) => CardProgression | undefined;
  analyzeDeck: (cards: Card[]) => DeckPersonality;
  clearLastAwakening: () => void;
};

const personalityNames: Record<EvolutionAffinity, string> = {
  agresiva: "Tribunal agresivo",
  defensiva: "Silencio defensivo",
  caotica: "Caos elegante",
  racional: "Ansiedad funcional",
  maldita: "Burnout ceremonial",
  catartica: "Catarsis inestable",
};

export const useEvolutionStore = create<EvolutionStore>()(
  persist(
    (set, get) => ({
      cards: {},

      recordCardUse: (event) =>
        set((state) => {
          const cardId = normalizeCardId(event.card.id);
          const before = state.cards[cardId];
          const next = progressCard(before, event);
          const awakened = before?.awakenState !== next.awakenState && (next.awakenState === "despierta" || next.awakenState === "legendaria");
          return {
            cards: { ...state.cards, [cardId]: next },
            lastAwakenedCardId: awakened ? cardId : state.lastAwakenedCardId,
            lastEcho: { cardId, text: next.mentalEcho },
          };
        }),

      markDeckBond: (cardIds, deckName) =>
        set((state) => {
          const cards = { ...state.cards };
          cardIds.forEach((rawId) => {
            const cardId = normalizeCardId(rawId);
            const current = cards[cardId];
            if (current) cards[cardId] = { ...current, bondedDecks: Array.from(new Set([deckName, ...current.bondedDecks])).slice(0, 5) };
          });
          return { cards };
        }),

      getCardProgression: (cardId) => get().cards[normalizeCardId(cardId)],

      analyzeDeck: (deck) => {
        const progressions = deck.map((card) => get().cards[normalizeCardId(card.id)]).filter((item): item is CardProgression => Boolean(item));
        const affinityCounts = progressions.reduce<Record<EvolutionAffinity, number>>((acc, item) => {
          acc[item.affinity] = (acc[item.affinity] ?? 0) + 1;
          return acc;
        }, {} as Record<EvolutionAffinity, number>);
        const dominant = (Object.entries(affinityCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "defensiva") as EvolutionAffinity;
        const keywords = deck.flatMap((card) => card.keywords);
        const dominantKeywords = Array.from(new Set(keywords)).slice(0, 5);
        const averageCorruption = progressions.length
          ? Math.round(progressions.reduce((sum, item) => sum + item.corruptionLevel, 0) / progressions.length)
          : 0;
        const stability = Math.max(0, 100 - averageCorruption);
        return {
          name: personalityNames[dominant],
          alignment: dominant,
          dominantKeywords,
          averageCorruption,
          stability,
          risk: averageCorruption > 70 ? "abisal" : averageCorruption > 40 ? "alto" : averageCorruption > 15 ? "moderado" : "estable",
          collapsePotential: Math.min(100, averageCorruption + dominantKeywords.length * 4),
        };
      },

      clearLastAwakening: () => set({ lastAwakenedCardId: undefined }),
    }),
    {
      name: "saboteadores-evolution-v1",
    },
  ),
);
