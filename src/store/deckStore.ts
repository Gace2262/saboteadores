"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { allCards, type Card, type Rarity } from "@/data/cards";
import { deckRules, sarcasticWarnings } from "@/data/deckRules";
import type { FactionId } from "@/data/factions";
import { getSynergy } from "@/data/synergies";
import { starterDecks } from "@/data/starterDecks";

export type SavedDeck = {
  id: string;
  name: string;
  factions: [FactionId, FactionId];
  cardIds: string[];
  createdAt: string;
};

export type DeckValidation = {
  valid: boolean;
  warnings: string[];
};

type DeckState = {
  deckName: string;
  selectedFactions: FactionId[];
  cardIds: string[];
  search: string;
  savedDecks: SavedDeck[];
  setDeckName: (name: string) => void;
  setSearch: (value: string) => void;
  toggleFaction: (faction: FactionId) => void;
  addCard: (cardId: string) => void;
  removeCard: (cardId: string) => void;
  clearDeck: () => void;
  autoCompleteDeck: () => void;
  saveDeck: () => void;
  loadDeck: (deckId: string) => void;
  deleteDeck: (deckId: string) => void;
  loadStarter: (starterId: string) => void;
};

export const neutralFactions = new Set<FactionId>(deckRules.neutralFactions);

export const getCardById = (id: string) => allCards.find((card) => card.id === id);

export const countCopies = (cardIds: string[], cardId: string) => cardIds.filter((id) => id === cardId).length;

export const maxCopiesFor = (rarity: Rarity) => deckRules.maxCopiesByRarity[rarity];

export const isCardAllowedForFactions = (card: Card, factions: FactionId[], extremeUnlocked: boolean) => {
  if (card.faction === deckRules.judgeFaction) return extremeUnlocked && factions.includes("juez");
  return neutralFactions.has(card.faction) || factions.includes(card.faction);
};

export const validateDeck = (cardIds: string[], factions: FactionId[], extremeUnlocked: boolean): DeckValidation => {
  const warnings: string[] = [];
  const cards = cardIds.map(getCardById).filter((card): card is Card => Boolean(card));

  if (cardIds.length < deckRules.minSize) warnings.push(sarcasticWarnings.tooSmall);
  if (cardIds.length > deckRules.maxSize) warnings.push("Demasiadas cartas. Esto no es mazo, es mudanza emocional.");
  if (factions.length !== 2) warnings.push("Elige 2 facciones. Una sola voz interna no alcanza para el concierto.");

  const factionSet = new Set(cards.filter((card) => !neutralFactions.has(card.faction)).map((card) => card.faction));
  const illegalFaction = [...factionSet].some((faction) => !factions.includes(faction));
  if (illegalFaction) warnings.push(sarcasticWarnings.unfocused);

  if (cards.some((card) => card.faction === "juez") && !extremeUnlocked) warnings.push(sarcasticWarnings.judgeBlocked);

  const tooManyCopies = cards.some((card) => countCopies(cardIds, card.id) > maxCopiesFor(card.rarity));
  if (tooManyCopies) warnings.push("Hay demasiadas copias. La obsesion pidio permiso y se lo negamos.");

  const averageCost = cards.length ? cards.reduce((sum, card) => sum + card.cost, 0) / cards.length : 0;
  if (averageCost > 3.2) warnings.push(sarcasticWarnings.expensive);

  if (!warnings.length) warnings.push(sarcasticWarnings.valid);

  return {
    valid: warnings.length === 1 && warnings[0] === sarcasticWarnings.valid,
    warnings,
  };
};

const defaultFactions: [FactionId, FactionId] = ["controlador", "perfeccionista"];

const starterCards = () => {
  const pool = allCards.filter((card) => card.collectible && isCardAllowedForFactions(card, defaultFactions, false) && card.faction !== "juez");
  const next: string[] = [];
  let guard = 0;
  while (next.length < deckRules.minSize && guard < 400) {
    const card = pool[guard % pool.length];
    if (card && countCopies(next, card.id) < maxCopiesFor(card.rarity)) next.push(card.id);
    guard += 1;
  }
  return next;
};

export const useDeckStore = create<DeckState>()(
  persist(
    (set) => ({
      deckName: "Dictadura del Casi sin licencia",
      selectedFactions: defaultFactions,
      cardIds: starterCards(),
      search: "",
      savedDecks: [],

      setDeckName: (deckName) => set({ deckName }),
      setSearch: (search) => set({ search }),

      toggleFaction: (faction) =>
        set((state) => {
          const exists = state.selectedFactions.includes(faction);
          const selectedFactions = exists
            ? state.selectedFactions.filter((item) => item !== faction)
            : [...state.selectedFactions, faction].slice(-2);
          const filteredCards = state.cardIds.filter((id) => {
            const card = getCardById(id);
            return card ? isCardAllowedForFactions(card, selectedFactions, true) : false;
          });
          return { selectedFactions, cardIds: filteredCards };
        }),

      addCard: (cardId) =>
        set((state) => {
          const card = getCardById(cardId);
          if (!card || state.cardIds.length >= deckRules.maxSize) return state;
          if (countCopies(state.cardIds, cardId) >= maxCopiesFor(card.rarity)) return state;
          if (!isCardAllowedForFactions(card, state.selectedFactions, true)) return state;
          return { cardIds: [...state.cardIds, cardId] };
        }),

      removeCard: (cardId) =>
        set((state) => {
          const index = state.cardIds.indexOf(cardId);
          if (index < 0) return state;
          return { cardIds: state.cardIds.filter((_, cardIndex) => cardIndex !== index) };
        }),

      clearDeck: () => set({ cardIds: [] }),

      autoCompleteDeck: () =>
        set((state) => {
          const pool = allCards.filter((card) => card.collectible && isCardAllowedForFactions(card, state.selectedFactions, false));
          const next = [...state.cardIds];
          let guard = 0;
          while (next.length < deckRules.minSize && guard < 300) {
            const card = pool[guard % pool.length];
            if (card && countCopies(next, card.id) < maxCopiesFor(card.rarity)) next.push(card.id);
            guard += 1;
          }
          return { cardIds: next.slice(0, deckRules.maxSize) };
        }),

      saveDeck: () =>
        set((state) => {
          if (state.selectedFactions.length !== 2) return state;
          const deck: SavedDeck = {
            id: `deck-${Date.now()}`,
            name: state.deckName || getSynergy(state.selectedFactions)?.name || "Mazo sin diagnostico",
            factions: [state.selectedFactions[0], state.selectedFactions[1]],
            cardIds: state.cardIds,
            createdAt: new Date().toISOString(),
          };
          return { savedDecks: [deck, ...state.savedDecks].slice(0, 20) };
        }),

      loadDeck: (deckId) =>
        set((state) => {
          const deck = state.savedDecks.find((item) => item.id === deckId);
          if (!deck) return state;
          return { deckName: deck.name, selectedFactions: deck.factions, cardIds: deck.cardIds };
        }),

      deleteDeck: (deckId) => set((state) => ({ savedDecks: state.savedDecks.filter((deck) => deck.id !== deckId) })),

      loadStarter: (starterId) =>
        set(() => {
          const starter = starterDecks.find((deck) => deck.id === starterId) ?? starterDecks[0];
          const pool = allCards.filter((card) => card.collectible && isCardAllowedForFactions(card, starter.factions, false));
          const seeded = starter.cardIds.filter((id) => pool.some((card) => card.id === id));
          const cardIds = [...seeded];
          let guard = 0;
          while (cardIds.length < deckRules.minSize && guard < 400) {
            const card = pool[guard % pool.length];
            if (card && countCopies(cardIds, card.id) < maxCopiesFor(card.rarity)) cardIds.push(card.id);
            guard += 1;
          }
          return { deckName: starter.name, selectedFactions: starter.factions, cardIds };
        }),
    }),
    { name: "saboteadores-decks-v1" },
  ),
);
