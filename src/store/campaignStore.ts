"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { playerCards, type Card } from "@/data/cards";
import { getCampaignNode, type CampaignNode } from "@/data/campaignNodes";
import { getBoss } from "@/data/bosses";
import { getEvent } from "@/data/events";
import { makeRewardBundle, negativeCards, type RewardBundle } from "@/data/rewards";
import { getChapterByBoss } from "@/data/story/chapters";
import { chooseEnding } from "@/data/story/endings";
import type { AIDifficultyId } from "@/logic/ai/aiTypes";
import { useCollectionStore } from "./collectionStore";

export type CampaignStatus = "map" | "event" | "reward" | "boss" | "finale" | "defeat";

type CampaignState = {
  status: CampaignStatus;
  currentNodeId: string;
  completedNodeIds: string[];
  unlockedNodeIds: string[];
  campaignDeck: Card[];
  will: number;
  maxWill: number;
  stress: number;
  mentalNoise: number;
  clarityFragments: number;
  upgradedCards: string[];
  defeatedBossIds: string[];
  pendingReward?: RewardBundle;
  lastDefeatLine?: string;
  finalNarrativeShown: boolean;
  aiDifficulty: AIDifficultyId;
  resetCampaign: () => void;
  enterNode: (nodeId: string) => CampaignNode | undefined;
  completeActiveEncounter: (won: boolean) => void;
  chooseRewardCard: (cardId: string) => void;
  skipRewardForUpgrade: () => void;
  removeNegativeCard: () => void;
  chooseEventOption: (optionId: "a" | "b" | "c") => void;
  rest: () => void;
  buyClarity: () => void;
  goToMap: () => void;
  setCampaignDifficulty: (difficulty: AIDifficultyId) => void;
};

const defeatLines = [
  "El Juez pidio orden. Tu ansiedad trajo catering.",
  "Perdiste, pero al menos lo hiciste con una crisis bien producida.",
  "Tu mente colapso con excelente direccion artistica.",
];

const starterDeck = () =>
  playerCards
    .filter((card) => ["controlador", "inquieto", "perfeccionista"].includes(card.faction))
    .slice(0, 8);

const initialCampaign = {
  status: "map" as CampaignStatus,
  currentNodeId: "inicio",
  completedNodeIds: [],
  unlockedNodeIds: ["inicio"],
  campaignDeck: starterDeck(),
  will: 24,
  maxWill: 30,
  stress: 0,
  mentalNoise: 0,
  clarityFragments: 0,
  upgradedCards: [],
  defeatedBossIds: [],
  pendingReward: undefined,
  lastDefeatLine: undefined,
  finalNarrativeShown: false,
  aiDifficulty: "crisis" as AIDifficultyId,
};

const unlockNext = (nodeId: string, unlocked: string[]) => {
  const node = getCampaignNode(nodeId);
  if (!node) return unlocked;
  return Array.from(new Set([...unlocked, ...node.next]));
};

const completeNode = (nodeId: string, completed: string[]) => Array.from(new Set([...completed, nodeId]));

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set, get) => ({
      ...initialCampaign,

      resetCampaign: () => set({ ...initialCampaign, campaignDeck: starterDeck() }),

      enterNode: (nodeId) => {
        const node = getCampaignNode(nodeId);
        if (!node || !get().unlockedNodeIds.includes(nodeId)) return undefined;
        const status: CampaignStatus =
          node.type === "evento"
            ? "event"
            : node.type === "jefe" || node.type === "juicio" || node.type === "combate"
              ? "boss"
              : node.type === "descanso" || node.type === "tienda"
                ? "reward"
                : "map";
        set({ currentNodeId: nodeId, status });
        return node;
      },

      completeActiveEncounter: (won) => {
        const state = get();
        const node = getCampaignNode(state.currentNodeId);
        if (!node) return;

        if (!won) {
          if (node.type === "juicio") {
            useCollectionStore.getState().unlockEnding("condena-circular");
          }
          set({
            status: "defeat",
            lastDefeatLine: defeatLines[(state.completedNodeIds.length + state.stress) % defeatLines.length],
          });
          return;
        }

        const boss = getBoss(node.bossId);
        const completedNodeIds = completeNode(node.id, state.completedNodeIds);
        const unlockedNodeIds = unlockNext(node.id, state.unlockedNodeIds);
        const rewardSeed = completedNodeIds.length + state.campaignDeck.length;
        const bossReward = boss?.rewardCardId
          ? playerCards.find((card) => card.id === boss.rewardCardId)
          : undefined;

        if (node.type === "juicio") {
          const ending = chooseEnding({
            won: true,
            stress: state.stress,
            hiperrationalCards: state.campaignDeck.filter((card) => card.faction === "hiperracional").length,
          });
          useCollectionStore.getState().grantJudgeReward();
          useCollectionStore.getState().markCampaignComplete();
          useCollectionStore.getState().unlockEnding(ending.id);
          useCollectionStore.getState().unlockLoreEntry("tribunal-craneo");
          set({
            completedNodeIds,
            unlockedNodeIds,
            defeatedBossIds: boss ? Array.from(new Set([...state.defeatedBossIds, boss.id])) : state.defeatedBossIds,
            status: "finale",
            finalNarrativeShown: true,
          });
          return;
        }

        if (node.type === "jefe" && boss?.rewardCardId) {
          useCollectionStore.getState().grantBossReward(boss.rewardCardId);
          const chapter = getChapterByBoss(boss.id);
          if (chapter?.loreUnlockId) useCollectionStore.getState().unlockLoreEntry(chapter.loreUnlockId);
        } else {
          useCollectionStore.getState().grantCombatReward();
        }

        set({
          completedNodeIds,
          unlockedNodeIds,
          defeatedBossIds: boss ? Array.from(new Set([...state.defeatedBossIds, boss.id])) : state.defeatedBossIds,
          campaignDeck: bossReward ? [...state.campaignDeck, bossReward] : state.campaignDeck,
          clarityFragments: state.clarityFragments + 2,
          stress: Math.max(0, state.stress + (node.type === "jefe" ? 1 : 0)),
          pendingReward: makeRewardBundle(rewardSeed),
          status: "reward",
        });
      },

      chooseRewardCard: (cardId) => {
        const state = get();
        const card = state.pendingReward?.cards.find((item) => item.id === cardId);
        set({
          campaignDeck: card ? [...state.campaignDeck, card] : state.campaignDeck,
          clarityFragments: state.clarityFragments + (state.pendingReward?.clarityFragments ?? 0),
          pendingReward: undefined,
          status: "map",
        });
      },

      skipRewardForUpgrade: () => {
        const state = get();
        const target = state.campaignDeck.find((card) => !state.upgradedCards.includes(card.id));
        set({
          upgradedCards: target ? [...state.upgradedCards, target.id] : state.upgradedCards,
          clarityFragments: state.clarityFragments + 1,
          pendingReward: undefined,
          status: "map",
        });
      },

      removeNegativeCard: () => {
        const state = get();
        const negativeIds = new Set(negativeCards.map((card) => card.id));
        const index = state.campaignDeck.findIndex((card) => negativeIds.has(card.id));
        const campaignDeck = index >= 0 ? state.campaignDeck.filter((_, cardIndex) => cardIndex !== index) : state.campaignDeck;
        set({ campaignDeck, pendingReward: undefined, status: "map" });
      },

      chooseEventOption: (optionId) => {
        const state = get();
        const node = getCampaignNode(state.currentNodeId);
        const event = getEvent(node?.eventId);
        if (!event) return;

        let campaignDeck = state.campaignDeck;
        let will = state.will;
        let stress = state.stress;
        let mentalNoise = state.mentalNoise;
        let clarityFragments = state.clarityFragments;
        let upgradedCards = state.upgradedCards;
        const option = event.options.find((item) => item.id === optionId);
        if (option) useCollectionStore.getState().recordNarrativeChoice(`${event.title}: ${option.label}`);

        if (event.id === "espejo-incomodo" && optionId === "a") {
          campaignDeck = [...campaignDeck, playerCards.find((card) => card.faction === "conciencia") ?? playerCards[0]];
          stress += 1;
        }
        if (event.id === "espejo-incomodo" && optionId === "b") {
          campaignDeck = [...campaignDeck, playerCards.find((card) => card.keywords.includes("Ironia")) ?? playerCards[0]];
          mentalNoise = Math.max(0, mentalNoise - 1);
        }
        if (event.id === "espejo-incomodo" && optionId === "c") campaignDeck = [...campaignDeck, negativeCards[0]];
        if (event.id === "cafe-ansiedad" && optionId === "a") {
          clarityFragments += 2;
          stress += 1;
        }
        if (event.id === "cafe-ansiedad" && optionId === "b") will = Math.min(state.maxWill, will + 3);
        if (event.id === "pasillo-pendientes" && optionId === "a") campaignDeck = [...campaignDeck, negativeCards[0]];
        if (event.id === "pasillo-pendientes" && optionId === "b") {
          const index = campaignDeck.findIndex((card) => card.rarity === "comun");
          if (index >= 0) campaignDeck = campaignDeck.filter((_, cardIndex) => cardIndex !== index);
        }
        if (event.id === "terapia-relampago" && optionId === "a") stress = Math.max(0, stress - 2);
        if (event.id === "terapia-relampago" && optionId === "b") {
          const target = campaignDeck[0];
          upgradedCards = target ? [...upgradedCards, target.id] : upgradedCards;
        }
        if (event.id === "funeral-expectativas" && optionId === "a") {
          campaignDeck = campaignDeck.slice(1);
          campaignDeck = [...campaignDeck, playerCards.find((card) => card.rarity === "rara") ?? playerCards[0]];
        }
        if (event.id === "funeral-expectativas" && optionId === "b") {
          will = state.maxWill;
          mentalNoise += 2;
        }

        set({
          campaignDeck,
          will,
          stress,
          mentalNoise,
          clarityFragments,
          upgradedCards,
          completedNodeIds: completeNode(state.currentNodeId, state.completedNodeIds),
          unlockedNodeIds: unlockNext(state.currentNodeId, state.unlockedNodeIds),
          status: "map",
        });
      },

      rest: () => {
        const state = get();
        set({
          will: Math.min(state.maxWill, state.will + 6),
          stress: Math.max(0, state.stress - 2),
          completedNodeIds: completeNode(state.currentNodeId, state.completedNodeIds),
          unlockedNodeIds: unlockNext(state.currentNodeId, state.unlockedNodeIds),
          status: "map",
        });
      },

      buyClarity: () => {
        const state = get();
        set({
          clarityFragments: state.clarityFragments + 3,
          mentalNoise: state.mentalNoise + 1,
          completedNodeIds: completeNode(state.currentNodeId, state.completedNodeIds),
          unlockedNodeIds: unlockNext(state.currentNodeId, state.unlockedNodeIds),
          status: "map",
        });
      },

      goToMap: () => set({ status: "map" }),
      setCampaignDifficulty: (aiDifficulty) => set({ aiDifficulty }),
    }),
    {
      name: "saboteadores-campaign-v1",
      partialize: (state) => ({
        status: state.status,
        currentNodeId: state.currentNodeId,
        completedNodeIds: state.completedNodeIds,
        unlockedNodeIds: state.unlockedNodeIds,
        campaignDeck: state.campaignDeck,
        will: state.will,
        maxWill: state.maxWill,
        stress: state.stress,
        mentalNoise: state.mentalNoise,
        clarityFragments: state.clarityFragments,
        upgradedCards: state.upgradedCards,
        defeatedBossIds: state.defeatedBossIds,
        pendingReward: state.pendingReward,
        lastDefeatLine: state.lastDefeatLine,
        finalNarrativeShown: state.finalNarrativeShown,
        aiDifficulty: state.aiDifficulty,
      }),
    },
  ),
);
