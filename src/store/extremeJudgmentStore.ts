"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { extremeDifficulties, type ExtremeDifficultyId, type ExtremeModifierId } from "@/data/extremeModifiers";
import { pickJudgmentEvent, type RandomJudgmentEvent } from "@/data/randomJudgmentEvents";
import type { VisualEffect } from "@/data/cards";
import { useCollectionStore } from "./collectionStore";
import { useGameStore } from "./gameStore";
import { useProgressionStore } from "./progressionStore";

export type ExtremeAttempt = {
  id: string;
  date: string;
  won: boolean;
  difficulty: ExtremeDifficultyId;
  score: number;
  turns: number;
  modifiers: ExtremeModifierId[];
};

type ExtremeJudgmentState = {
  selectedNegativeModifiers: ExtremeModifierId[];
  selectedPositiveModifier?: ExtremeModifierId;
  difficulty: ExtremeDifficultyId;
  judgmentMeter: number;
  meterThreshold: number;
  avoidedNextEvent: boolean;
  intenseSounds: boolean;
  reducedFlashes: boolean;
  activeEvent?: RandomJudgmentEvent;
  attempts: ExtremeAttempt[];
  bestScore: number;
  lastResult?: ExtremeAttempt;
  selectModifier: (id: ExtremeModifierId, polarity: "negative" | "positive") => void;
  setDifficulty: (difficulty: ExtremeDifficultyId) => void;
  toggleIntenseSounds: () => void;
  toggleReducedFlashes: () => void;
  startRun: () => void;
  raiseMeter: (amount: number, reason: string) => void;
  triggerJudgmentEvent: (forcedSeed?: number) => void;
  clearEvent: () => void;
  finishRun: (won: boolean) => void;
};

const unique = <T,>(items: T[]) => Array.from(new Set(items));

const scoreRun = (won: boolean, difficulty: ExtremeDifficultyId, meter: number, turns: number) => {
  const info = extremeDifficulties[difficulty];
  const base = won ? 1000 : 250;
  return Math.round((base + meter * 3 + Math.max(0, 40 - turns) * 15) * info.rewardMultiplier);
};

export const useExtremeJudgmentStore = create<ExtremeJudgmentState>()(
  persist(
    (set, get) => ({
      selectedNegativeModifiers: ["tribunal-sueno", "culpable-preventa"],
      selectedPositiveModifier: "casco-autoestima",
      difficulty: "martillo-serio",
      judgmentMeter: 0,
      meterThreshold: 100,
      avoidedNextEvent: false,
      intenseSounds: true,
      reducedFlashes: false,
      attempts: [],
      bestScore: 0,

      selectModifier: (id, polarity) =>
        set((state) => {
          if (polarity === "positive") return { selectedPositiveModifier: id };
          const exists = state.selectedNegativeModifiers.includes(id);
          const selectedNegativeModifiers = exists
            ? state.selectedNegativeModifiers.filter((item) => item !== id)
            : unique([...state.selectedNegativeModifiers, id]).slice(-2);
          return { selectedNegativeModifiers };
        }),

      setDifficulty: (difficulty) => set({ difficulty }),
      toggleIntenseSounds: () => set((state) => ({ intenseSounds: !state.intenseSounds })),
      toggleReducedFlashes: () => set((state) => ({ reducedFlashes: !state.reducedFlashes })),

      startRun: () => {
        const state = get();
        const difficulty = extremeDifficulties[state.difficulty];
        const game = useGameStore.getState();
        game.setAIProfile("juez");
        game.setAIDifficulty(difficulty.aiDifficulty);
        game.startBattle();

        const negative = new Set(state.selectedNegativeModifiers);
        const positive = state.selectedPositiveModifier;
        const started = useGameStore.getState();
        useGameStore.setState({
          player: {
            ...started.player,
            stress: Math.min(12, started.player.stress + (negative.has("tribunal-sueno") ? 2 : 0)),
            mentalNoise: Math.max(0, started.player.mentalNoise - (positive === "terapia-bolsillo" ? 1 : 0)),
          },
          enemy: {
            ...started.enemy,
            will: started.enemy.will + difficulty.enemyWillBonus,
          },
          log: [
            "Juicio Extremo inicia: el Tribunal del Craneo apaga las luces y sube el volumen.",
            ...started.log,
          ].slice(0, 10),
        });

        set({
          judgmentMeter: negative.has("culpable-preventa") ? 50 : 0,
          meterThreshold: negative.has("culpable-preventa") ? 50 : 100,
          avoidedNextEvent: false,
          activeEvent: undefined,
        });
      },

      raiseMeter: (amount, reason) => {
        const state = get();
        const difficulty = extremeDifficulties[state.difficulty];
        const negative = new Set(state.selectedNegativeModifiers);
        const boosted = negative.has("ansiedad-megafono") && reason.includes("Estres") ? amount + 1 : amount;
        const nextMeter = Math.min(100, state.judgmentMeter + Math.ceil(boosted * difficulty.meterRate));
        set({ judgmentMeter: nextMeter });
        if (nextMeter >= state.meterThreshold) get().triggerJudgmentEvent(Date.now() + nextMeter + reason.length);
      },

      triggerJudgmentEvent: (forcedSeed) => {
        const state = get();
        if (state.avoidedNextEvent) {
          set({ avoidedNextEvent: false, judgmentMeter: 0, meterThreshold: 100 });
          useGameStore.setState((game) => ({
            log: ["Decreto de No Molestar cancela el Martillazo Aleatorio. El tribunal finge que no dolio.", ...game.log].slice(0, 10),
          }));
          return;
        }

        const event = pickJudgmentEvent(forcedSeed ?? Date.now());
        const difficulty = extremeDifficulties[state.difficulty];
        const negative = new Set(state.selectedNegativeModifiers);
        const game = useGameStore.getState();
        const eventDamage = difficulty.eventDamageBonus;
        const nextPlayer = { ...game.player };
        let nextHand = [...game.hand];
        let nextDiscard = [...game.discard];
        let visual: VisualEffect = event.visual;

        if (event.id === "martillazo-administrativo") nextPlayer.will = Math.max(0, nextPlayer.will - 3 - eventDamage);
        if (event.id === "cadenas-tramite") nextPlayer.block += negative.has("cadenas-sindicalizadas") ? 2 : 1;
        if (event.id === "estampida-pendientes") nextPlayer.will = Math.max(0, nextPlayer.will - nextHand.length - eventDamage - (negative.has("caballos-sin-licencia") ? 2 : 0));
        if (event.id === "auditoria-emocional") nextPlayer.clarity = Math.floor(nextPlayer.clarity / 2);
        if (event.id === "risa-vacio" && nextHand.length) {
          const discarded = nextHand[0];
          nextHand = nextHand.slice(1);
          nextDiscard = [discarded, ...nextDiscard];
        }
        if (event.id === "decreto-casi") visual = "judgment_flash";

        useGameStore.setState({
          player: nextPlayer,
          hand: nextHand,
          discard: nextDiscard,
          activeEffect: visual,
          impactText: event.text,
          log: [`${event.name}: ${event.text}`, ...game.log].slice(0, 10),
          phase: nextPlayer.will <= 0 ? "ended" : game.phase,
          winner: nextPlayer.will <= 0 ? "enemy" : game.winner,
        });
        set({ activeEvent: event, judgmentMeter: 0, meterThreshold: 100 });
      },

      clearEvent: () => set({ activeEvent: undefined }),

      finishRun: (won) => {
        const game = useGameStore.getState();
        const state = get();
        const modifiers = [...state.selectedNegativeModifiers, ...(state.selectedPositiveModifier ? [state.selectedPositiveModifier] : [])];
        const attempt: ExtremeAttempt = {
          id: `${Date.now()}`,
          date: new Date().toISOString(),
          won,
          difficulty: state.difficulty,
          score: scoreRun(won, state.difficulty, state.judgmentMeter, game.turn),
          turns: game.turn,
          modifiers,
        };
        if (won) useCollectionStore.getState().grantExtremeJudgmentReward(attempt.score);
        else useProgressionStore.getState().recordExtremeFinished(false);
        set((current) => ({
          attempts: [attempt, ...current.attempts].slice(0, 12),
          bestScore: Math.max(current.bestScore, attempt.score),
          lastResult: attempt,
        }));
      },
    }),
    {
      name: "saboteadores-extreme-judgment-v1",
      partialize: (state) => ({
        selectedNegativeModifiers: state.selectedNegativeModifiers,
        selectedPositiveModifier: state.selectedPositiveModifier,
        difficulty: state.difficulty,
        intenseSounds: state.intenseSounds,
        reducedFlashes: state.reducedFlashes,
        attempts: state.attempts,
        bestScore: state.bestScore,
        lastResult: state.lastResult,
      }),
    },
  ),
);
