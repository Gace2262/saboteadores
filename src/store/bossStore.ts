"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ColossalBossId } from "@/data/cinematicBosses";
import { getCinematicBoss } from "@/data/cinematicBosses";
import type { FinaleId } from "@/data/finaleSequences";
import { getFinaleSequence } from "@/data/finaleSequences";
import { getBossPhaseState, getNextBossPhaseIndex } from "@/logic/boss/bossPhaseManager";
import { resolveBossIntroCinematic, resolveFinaleCinematic, resolvePhaseCinematic, type MajorCinematic } from "@/logic/boss/cinematicResolver";
import { resolveEnvironmentState, type EnvironmentState } from "@/logic/boss/environmentController";

type BossStore = {
  selectedBossId: ColossalBossId;
  phaseIndex: number;
  environment: EnvironmentState;
  activeCinematic?: MajorCinematic;
  defeatedBossIds: ColossalBossId[];
  finalesVistos: FinaleId[];
  transformationsSeen: string[];
  unlockedCinematics: string[];
  reduceDestruction: boolean;
  reduceShake: boolean;
  reduceFlashes: boolean;
  simplifiedCinematics: boolean;
  subtitlesForced: boolean;
  limitDistortion: boolean;
  selectBoss: (bossId: ColossalBossId) => void;
  startBoss: (bossId?: ColossalBossId) => void;
  advancePhase: () => void;
  defeatBoss: () => void;
  chooseFinale: (finaleId: FinaleId) => void;
  unlockCinematic: (id: string) => void;
  clearCinematic: () => void;
  recordTransformation: (id: string) => void;
  toggleFlag: (flag: "reduceDestruction" | "reduceShake" | "reduceFlashes" | "simplifiedCinematics" | "subtitlesForced" | "limitDistortion") => void;
};

const initialBossId: ColossalBossId = "juez-supremo";
const initialPhase = getBossPhaseState(initialBossId, 0).phase;

export const useBossStore = create<BossStore>()(
  persist(
    (set, get) => ({
      selectedBossId: initialBossId,
      phaseIndex: 0,
      environment: resolveEnvironmentState(initialPhase),
      defeatedBossIds: [],
      finalesVistos: [],
      transformationsSeen: [],
      unlockedCinematics: ["juicio-final", "catarsis-total"],
      reduceDestruction: false,
      reduceShake: false,
      reduceFlashes: false,
      simplifiedCinematics: false,
      subtitlesForced: true,
      limitDistortion: false,

      selectBoss: (selectedBossId) => {
        const phase = getBossPhaseState(selectedBossId, 0).phase;
        set((state) => ({
          selectedBossId,
          phaseIndex: 0,
          environment: resolveEnvironmentState(phase, state),
          activeCinematic: undefined,
        }));
      },

      startBoss: (bossId) => {
        const selectedBossId = bossId ?? get().selectedBossId;
        const boss = getCinematicBoss(selectedBossId);
        const phase = getBossPhaseState(selectedBossId, 0).phase;
        set((state) => ({
          selectedBossId,
          phaseIndex: 0,
          environment: resolveEnvironmentState(phase, state),
          activeCinematic: resolveBossIntroCinematic(boss),
          unlockedCinematics: Array.from(new Set([`intro-${selectedBossId}`, ...state.unlockedCinematics])),
        }));
      },

      advancePhase: () => {
        const state = get();
        const nextIndex = getNextBossPhaseIndex(state.selectedBossId, state.phaseIndex);
        const phaseState = getBossPhaseState(state.selectedBossId, nextIndex);
        set((current) => ({
          phaseIndex: nextIndex,
          environment: resolveEnvironmentState(phaseState.phase, current),
          activeCinematic: resolvePhaseCinematic(phaseState.phase),
          unlockedCinematics: Array.from(new Set([`phase-${phaseState.phase.id}`, ...current.unlockedCinematics])),
        }));
      },

      defeatBoss: () =>
        set((state) => ({
          defeatedBossIds: Array.from(new Set([state.selectedBossId, ...state.defeatedBossIds])),
          activeCinematic: {
            id: `derrota-${state.selectedBossId}`,
            kind: "rebelion",
            title: "REBELION DE LAS CARTAS",
            subtitle: "Ya fue suficiente.",
            lines: ["No nacimos para obedecer.", "Las cadenas aprendieron miedo.", "El escenario deja de obedecer al martillo."],
            soundLabels: ["[CARTAS ELEVANDOSE]", "[CADENAS ROMPIENDOSE]", "[CORO DE CATARSIS]"],
            intensity: 92,
          },
        })),

      chooseFinale: (finaleId) =>
        set((state) => {
          const finale = getFinaleSequence(finaleId);
          return {
            finalesVistos: Array.from(new Set([finaleId, ...state.finalesVistos])),
            activeCinematic: resolveFinaleCinematic(finale),
            unlockedCinematics: Array.from(new Set([`finale-${finaleId}`, ...state.unlockedCinematics])),
          };
        }),

      unlockCinematic: (id) => set((state) => ({ unlockedCinematics: Array.from(new Set([id, ...state.unlockedCinematics])) })),
      clearCinematic: () => set({ activeCinematic: undefined }),
      recordTransformation: (id) => set((state) => ({ transformationsSeen: Array.from(new Set([id, ...state.transformationsSeen])) })),
      toggleFlag: (flag) => set((state) => ({ [flag]: !state[flag] } as Pick<BossStore, typeof flag>)),
    }),
    {
      name: "saboteadores-boss-cinematics-v1",
      partialize: (state) => ({
        selectedBossId: state.selectedBossId,
        phaseIndex: state.phaseIndex,
        environment: state.environment,
        defeatedBossIds: state.defeatedBossIds,
        finalesVistos: state.finalesVistos,
        transformationsSeen: state.transformationsSeen,
        unlockedCinematics: state.unlockedCinematics,
        reduceDestruction: state.reduceDestruction,
        reduceShake: state.reduceShake,
        reduceFlashes: state.reduceFlashes,
        simplifiedCinematics: state.simplifiedCinematics,
        subtitlesForced: state.subtitlesForced,
        limitDistortion: state.limitDistortion,
      }),
    },
  ),
);
