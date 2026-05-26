"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateProceduralCampaign, type CampaignGeneratorInput } from "@/logic/procedural/campaignGenerator";
import type { ProceduralCampaign, ProceduralDifficulty, ProceduralMode, ProceduralRunHistoryEntry } from "@/logic/procedural/proceduralTypes";

type ProceduralCampaignState = {
  currentCampaign?: ProceduralCampaign;
  visitedNodeIds: string[];
  runHistory: ProceduralRunHistoryEntry[];
  lastSetup: CampaignGeneratorInput;
  generateRun: (input: CampaignGeneratorInput) => ProceduralCampaign;
  visitNode: (nodeId: string) => void;
  finishRun: (result: "victoria" | "derrota" | "abandono") => void;
  clearRun: () => void;
  setQuickSetup: (mode: ProceduralMode, difficulty: ProceduralDifficulty) => void;
};

const defaultSetup: CampaignGeneratorInput = {
  seedText: "el juez perdio el martillo",
  deckId: "oficina-control",
  difficulty: "crisis-formal",
  mode: "rapido",
  deckFactions: ["controlador", "perfeccionista"],
};

const finalLines = [
  "El expediente termino. La tinta sigue nerviosa.",
  "Sobreviviste al mapa. El mapa no lo supero.",
  "El Tribunal archivo tu victoria con cara de pocos amigos.",
];

export const useProceduralCampaignStore = create<ProceduralCampaignState>()(
  persist(
    (set, get) => ({
      visitedNodeIds: [],
      runHistory: [],
      lastSetup: defaultSetup,
      generateRun: (input) => {
        const campaign = generateProceduralCampaign(input);
        set({ currentCampaign: campaign, visitedNodeIds: [], lastSetup: input });
        return campaign;
      },
      visitNode: (nodeId) => set((state) => ({ visitedNodeIds: Array.from(new Set([...state.visitedNodeIds, nodeId])) })),
      finishRun: (result) => {
        const state = get();
        const campaign = state.currentCampaign;
        if (!campaign) return;
        const entry: ProceduralRunHistoryEntry = {
          id: `${campaign.id}-${Date.now()}`,
          seedText: campaign.seedText,
          seed: campaign.seed,
          deckId: campaign.deckId,
          difficulty: campaign.difficulty,
          result,
          finalBossId: campaign.finalBossId,
          durationMinutes: campaign.mode === "rapido" ? 14 : 42,
          visitedNodeIds: state.visitedNodeIds,
          rewards: campaign.nodes.filter((node) => node.rewardId).slice(0, 5).map((node) => node.rewardId as string),
          maxStress: campaign.modifiers.reduce((sum, modifier) => sum + modifier.stressDelta, result === "victoria" ? 7 : 10),
          keyCard: "Fortaleza de Autoestima",
          bestCombo: "Cadena -> Catarsis -> Objecion",
          finalLine: finalLines[state.runHistory.length % finalLines.length],
          completedAt: new Date().toISOString(),
        };
        set({ runHistory: [entry, ...state.runHistory].slice(0, 20) });
      },
      clearRun: () => set({ currentCampaign: undefined, visitedNodeIds: [] }),
      setQuickSetup: (mode, difficulty) => set((state) => ({ lastSetup: { ...state.lastSetup, mode, difficulty } })),
    }),
    { name: "saboteadores-procedural-campaign", version: 1 },
  ),
);
