"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TutorialDeckId } from "@/data/tutorialDecks";
import type { TutorialStepId } from "@/data/tutorialSteps";
import { getNextTutorialStepId } from "@/logic/tutorial/tutorialProgress";

type TutorialBattleState = {
  playerWill: number;
  enemyWill: number;
  clarity: number;
  stress: number;
  mentalNoise: number;
  blockedCardId?: string;
  playedCards: string[];
  log: string[];
};

type TutorialStore = {
  currentStepId: TutorialStepId;
  completedStepIds: TutorialStepId[];
  skipped: boolean;
  completed: boolean;
  selectedDeckId?: TutorialDeckId;
  selectedRewardCardId?: string;
  simpleExplanation: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  fullSubtitles: boolean;
  battle: TutorialBattleState;
  nextStep: () => void;
  goToStep: (stepId: TutorialStepId) => void;
  resetTutorial: () => void;
  skipTutorial: () => void;
  completeTutorial: () => void;
  selectDeck: (deckId: TutorialDeckId) => void;
  selectRewardCard: (cardId: string) => void;
  playTutorialAction: (action: "conciencia" | "block" | "catarsis" | "combo" | "victory") => void;
  toggleFlag: (flag: "simpleExplanation" | "largeText" | "reducedMotion" | "fullSubtitles") => void;
};

const initialBattle: TutorialBattleState = {
  playerWill: 18,
  enemyWill: 12,
  clarity: 3,
  stress: 1,
  mentalNoise: 1,
  playedCards: [],
  log: ["El Tribunal abre expediente tutorial. El dado fue reemplazado por sospecha."],
};

export const useTutorialStore = create<TutorialStore>()(
  persist(
    (set) => ({
      currentStepId: "citation",
      completedStepIds: [],
      skipped: false,
      completed: false,
      simpleExplanation: false,
      largeText: false,
      reducedMotion: false,
      fullSubtitles: true,
      battle: initialBattle,
      nextStep: () =>
        set((state) => {
          const next = getNextTutorialStepId(state.currentStepId);
          return {
            currentStepId: next,
            completedStepIds: Array.from(new Set([...state.completedStepIds, state.currentStepId])),
          };
        }),
      goToStep: (currentStepId) => set({ currentStepId }),
      resetTutorial: () => set({ currentStepId: "citation", completedStepIds: [], skipped: false, completed: false, battle: initialBattle }),
      skipTutorial: () => set({ skipped: true, completed: true, currentStepId: "first-deck" }),
      completeTutorial: () => set({ completed: true, currentStepId: "first-deck" }),
      selectDeck: (selectedDeckId) => set({ selectedDeckId }),
      selectRewardCard: (selectedRewardCardId) => set({ selectedRewardCardId }),
      playTutorialAction: (action) =>
        set((state) => {
          const battle = { ...state.battle, playedCards: [...state.battle.playedCards], log: [...state.battle.log] };
          if (action === "conciencia") {
            battle.clarity = Math.max(0, battle.clarity - 1);
            battle.mentalNoise = Math.max(0, battle.mentalNoise - 1);
            battle.playedCards.push("conciencia-basica");
            battle.log.unshift("Conciencia Basica limpia ruido. Pequena victoria, gran papeleo.");
          }
          if (action === "block") {
            battle.blockedCardId = "pensamiento-automatico";
            battle.log.unshift("Controlador menor encadena una carta. La mala costumbre trae candado.");
          }
          if (action === "catarsis") {
            battle.clarity += 2;
            battle.mentalNoise = 0;
            battle.blockedCardId = undefined;
            battle.playedCards.push("catarsis-inicial");
            battle.log.unshift("Catarsis rompe el bloqueo y devuelve Claridad.");
          }
          if (action === "combo") {
            battle.enemyWill = Math.max(1, battle.enemyWill - 6);
            battle.stress += 1;
            battle.playedCards.push("combo-ansiedad-catarsis");
            battle.log.unshift("Pensamiento Automatico + Catarsis: ansiedad convertida en dano legalmente dudoso.");
          }
          if (action === "victory") {
            battle.enemyWill = 0;
            battle.playerWill = Math.max(8, battle.playerWill);
            battle.log.unshift("Controlador menor derrotado. El Tribunal finge que no le impresiono.");
          }
          return { battle };
        }),
      toggleFlag: (flag) => set((state) => ({ [flag]: !state[flag] } as Pick<TutorialStore, typeof flag>)),
    }),
    {
      name: "saboteadores-tutorial-v1",
    },
  ),
);
