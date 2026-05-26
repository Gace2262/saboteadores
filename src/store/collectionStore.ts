"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { allCards, type Card } from "@/data/cards";
import { getPack, type PackId } from "@/data/packs";
import { playerTitles, progressRules } from "@/data/playerProgress";
import type { CollectibleRarity } from "@/data/rarities";
import { useProgressionStore } from "./progressionStore";

export type CollectionFilters = {
  faction: string;
  rarity: string;
  type: string;
  keyword: string;
  sort: "rarity" | "faction" | "type" | "cost";
};

export type StoryMode = "full" | "reduced" | "skip-dialogues" | "combat-only";

export type CollectionState = {
  copies: Record<string, number>;
  favorites: string[];
  unlockedCards: string[];
  level: number;
  experience: number;
  clarityFragments: number;
  mentalKeys: number;
  packsOpened: number;
  bossesDefeated: number;
  campaignCompleted: boolean;
  extremeJudgmentUnlocked: boolean;
  unlockedTitles: string[];
  unlockedLoreEntries: string[];
  unlockedEndings: string[];
  narrativeChoices: string[];
  storyMode: StoryMode;
  timeline: string[];
  filters: CollectionFilters;
  lastOpenedCards: Card[];
  selectedCardId?: string;
  setFilter: (key: keyof CollectionFilters, value: string) => void;
  toggleFavorite: (cardId: string) => void;
  selectCard: (cardId?: string) => void;
  openPack: (packId: PackId) => Card[];
  grantCard: (cardId: string, source: string) => void;
  grantCombatReward: () => void;
  grantBossReward: (cardId?: string) => void;
  grantJudgeReward: () => void;
  grantExtremeJudgmentReward: (score: number) => void;
  markCampaignComplete: () => void;
  unlockLoreEntry: (entryId: string) => void;
  unlockEnding: (endingId: string) => void;
  recordNarrativeChoice: (choice: string) => void;
  setStoryMode: (mode: StoryMode) => void;
};

const starterIds = ["controlador-compulsivo", "caballos-drama", "manual-no-sentir", "excel-culpa"];

const rarityOrder: Record<CollectibleRarity, number> = {
  comun: 1,
  rara: 2,
  epica: 3,
  legendaria: 4,
  maldita: 5,
};

const xpToLevel = (experience: number) => Math.max(1, Math.floor(experience / progressRules.levelBase) + 1);

const chooseCards = (packId: PackId, seed: number) => {
  const pack = getPack(packId);
  if (!pack) return [];
  const pool = allCards.filter((card) => {
    if (!card.collectible) return false;
    if (!card.packSources.includes(packId) && !pack.rarities.includes(card.rarity)) return false;
    if (pack.factions?.length && !pack.factions.includes(card.faction)) return false;
    if (pack.keywords?.length && !card.keywords.some((keyword) => pack.keywords?.includes(keyword))) return false;
    return pack.rarities.includes(card.rarity) || card.packSources.includes(packId);
  });
  const sorted = [...pool].sort((a, b) => ((a.id.length + seed + rarityOrder[b.rarity]) % 17) - ((b.id.length + seed + rarityOrder[a.rarity]) % 17));
  return sorted.slice(0, pack.cardsPerPack);
};

const addCards = (copies: Record<string, number>, cards: Card[]) => {
  const next = { ...copies };
  cards.forEach((card) => {
    next[card.id] = (next[card.id] ?? 0) + 1;
  });
  return next;
};

export const useCollectionStore = create<CollectionState>()(
  persist(
    (set, get) => ({
      copies: starterIds.reduce<Record<string, number>>((acc, id) => ({ ...acc, [id]: 1 }), {}),
      favorites: [],
      unlockedCards: starterIds,
      level: 1,
      experience: 0,
      clarityFragments: 12,
      mentalKeys: 1,
      packsOpened: 0,
      bossesDefeated: 0,
      campaignCompleted: false,
      extremeJudgmentUnlocked: false,
      unlockedTitles: [playerTitles[0]],
      unlockedLoreEntries: ["origen-saboteadores"],
      unlockedEndings: [],
      narrativeChoices: [],
      storyMode: "full",
      timeline: ["Coleccion iniciada: el album mental se abrio con olor a expediente."],
      filters: { faction: "todas", rarity: "todas", type: "todos", keyword: "todas", sort: "rarity" },
      lastOpenedCards: [],

      setFilter: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: value } })),
      toggleFavorite: (cardId) =>
        set((state) => ({
          favorites: state.favorites.includes(cardId)
            ? state.favorites.filter((id) => id !== cardId)
            : [...state.favorites, cardId],
        })),
      selectCard: (cardId) => set({ selectedCardId: cardId }),

      openPack: (packId) => {
        const state = get();
        const pack = getPack(packId);
        if (!pack) return [];
        if (pack.keyCost && state.mentalKeys < pack.keyCost) return [];
        const cards = chooseCards(packId, state.packsOpened + state.experience + state.clarityFragments);
        const copies = addCards(state.copies, cards);
        const unlockedCards = Array.from(new Set([...state.unlockedCards, ...cards.map((card) => card.id)]));
        const duplicateGain = cards.reduce((sum, card) => sum + ((state.copies[card.id] ?? 0) > 0 ? card.duplicateValue : 0), 0);
        const experience = state.experience + 20 + cards.length * 5;
        const level = xpToLevel(experience);
        const title = level >= 5 ? playerTitles[2] : state.unlockedTitles[0];
        set({
          copies,
          unlockedCards,
          packsOpened: state.packsOpened + 1,
          clarityFragments: state.clarityFragments + duplicateGain,
          mentalKeys: pack.keyCost ? state.mentalKeys - pack.keyCost : state.mentalKeys,
          experience,
          level,
          unlockedTitles: Array.from(new Set([...state.unlockedTitles, title])),
          lastOpenedCards: cards,
          timeline: [`Abriste ${pack.name}: ${pack.phrase}`, ...state.timeline].slice(0, 18),
        });
        useProgressionStore.getState().recordPackOpened();
        return cards;
      },

      grantCard: (cardId, source) => {
        const card = allCards.find((item) => item.id === cardId);
        if (!card) return;
        set((state) => ({
          copies: addCards(state.copies, [card]),
          unlockedCards: Array.from(new Set([...state.unlockedCards, card.id])),
          timeline: [`Carta desbloqueada por ${source}: ${card.name}`, ...state.timeline].slice(0, 18),
        }));
      },

      grantCombatReward: () =>
        set((state) => {
          const experience = state.experience + progressRules.combatXp;
          return {
            experience,
            level: xpToLevel(experience),
            clarityFragments: state.clarityFragments + progressRules.combatFragments,
            timeline: ["Combate ganado: experiencia y fragmentos de claridad obtenidos.", ...state.timeline].slice(0, 18),
          };
        }),

      grantBossReward: (cardId) => {
        set((state) => {
          const card = cardId ? allCards.find((item) => item.id === cardId) : undefined;
          const experience = state.experience + progressRules.bossXp;
          return {
            copies: card ? addCards(state.copies, [card]) : state.copies,
            unlockedCards: card ? Array.from(new Set([...state.unlockedCards, card.id])) : state.unlockedCards,
            bossesDefeated: state.bossesDefeated + 1,
            mentalKeys: state.mentalKeys + 1,
            clarityFragments: state.clarityFragments + progressRules.bossFragments,
            experience,
            level: xpToLevel(experience),
            unlockedTitles: Array.from(new Set([...state.unlockedTitles, playerTitles[Math.min(4, state.bossesDefeated + 1)]])),
            timeline: [`Jefe derrotado: ${card ? `${card.name} desbloqueada y ` : ""}llave mental obtenida.`, ...state.timeline].slice(0, 18),
          };
        });
        useProgressionStore.getState().recordBossDefeated();
      },

      grantJudgeReward: () => {
        set((state) => {
          const card = allCards.find((item) => item.id === "martillazo-realidad");
          const experience = state.experience + progressRules.finalJudgeXp;
          return {
            copies: card ? addCards(state.copies, [card]) : state.copies,
            unlockedCards: card ? Array.from(new Set([...state.unlockedCards, card.id])) : state.unlockedCards,
            mentalKeys: state.mentalKeys + 1,
            experience,
            level: xpToLevel(experience),
            unlockedTitles: Array.from(new Set([...state.unlockedTitles, playerTitles[4], playerTitles[9]])),
            timeline: ["El Juez vencido: Sobre del Tribunal y carta legendaria desbloqueados.", ...state.timeline].slice(0, 18),
          };
        });
        useProgressionStore.getState().recordBossDefeated();
      },

      grantExtremeJudgmentReward: (score) => {
        set((state) => {
          const rewards = ["martillo-medianoche", "catarsis-sirena", "abogado-diablo-interior", "decreto-no-molestar", "ultima-objecion"]
            .map((id) => allCards.find((item) => item.id === id))
            .filter((card): card is Card => Boolean(card));
          const picked = rewards[state.packsOpened % rewards.length];
          const experience = state.experience + 260 + Math.floor(score / 10);
          return {
            copies: picked ? addCards(state.copies, [picked]) : state.copies,
            unlockedCards: picked ? Array.from(new Set([...state.unlockedCards, picked.id])) : state.unlockedCards,
            packsOpened: state.packsOpened + 1,
            mentalKeys: state.mentalKeys + 1,
            clarityFragments: state.clarityFragments + 12,
            experience,
            level: xpToLevel(experience),
            unlockedTitles: Array.from(new Set([...state.unlockedTitles, "Fiscal de la pesadilla", "Libre bajo protesta"])),
            timeline: [
              `Juicio Extremo completado: sobre maldito, cosmetico de energia maldita y ${picked?.name ?? "carta exclusiva"} desbloqueados.`,
              ...state.timeline,
            ].slice(0, 18),
          };
        });
        useProgressionStore.getState().recordExtremeFinished(true);
      },

      markCampaignComplete: () =>
        set((state) => ({
          campaignCompleted: true,
          extremeJudgmentUnlocked: true,
          unlockedTitles: Array.from(new Set([...state.unlockedTitles, playerTitles[9]])),
          timeline: ["Campana completada: modo Juicio Extremo desbloqueado.", ...state.timeline].slice(0, 18),
        })),

      unlockLoreEntry: (entryId) => {
        set((state) => ({
          unlockedLoreEntries: Array.from(new Set([...state.unlockedLoreEntries, entryId])),
          timeline: state.unlockedLoreEntries.includes(entryId)
            ? state.timeline
            : [`Lore desbloqueado: ${entryId.replaceAll("-", " ")}.`, ...state.timeline].slice(0, 18),
        }));
        useProgressionStore.getState().recordLoreUnlocked(get().unlockedLoreEntries.length);
      },

      unlockEnding: (endingId) =>
        set((state) => ({
          unlockedEndings: Array.from(new Set([...state.unlockedEndings, endingId])),
          timeline: state.unlockedEndings.includes(endingId)
            ? state.timeline
            : [`Final registrado: ${endingId.replaceAll("-", " ")}.`, ...state.timeline].slice(0, 18),
        })),

      recordNarrativeChoice: (choice) =>
        set((state) => ({
          narrativeChoices: Array.from(new Set([choice, ...state.narrativeChoices])).slice(0, 20),
          timeline: [`Decision narrativa: ${choice}`, ...state.timeline].slice(0, 18),
        })),

      setStoryMode: (storyMode) => set({ storyMode }),
    }),
    {
      name: "saboteadores-collection-v1",
    },
  ),
);

export const sortCards = (cards: Card[], sort: CollectionFilters["sort"]) =>
  [...cards].sort((a, b) => {
    if (sort === "rarity") return rarityOrder[b.rarity] - rarityOrder[a.rarity] || a.cost - b.cost;
    if (sort === "faction") return a.faction.localeCompare(b.faction);
    if (sort === "type") return a.type.localeCompare(b.type);
    return a.cost - b.cost;
  });
