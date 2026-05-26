"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  editorBossTemplate,
  editorCardTemplate,
  editorEventTemplate,
  expansionTemplates,
  type EditorBossDraft,
  type EditorCampaignNodeDraft,
  type EditorCardDraft,
  type EditorEventDraft,
  type EditorExpansionDraft,
} from "@/data/editorTemplates";
import { validateEditorCard } from "@/logic/editor/cardValidator";
import { exportContentPackage } from "@/logic/editor/contentExporter";
import { importContentPackage } from "@/logic/editor/contentImporter";
import { buildExpansionFromSnapshot } from "@/logic/editor/expansionBuilder";

export type EditorStateSnapshot = {
  cards: EditorCardDraft[];
  bosses: EditorBossDraft[];
  events: EditorEventDraft[];
  campaignNodes: EditorCampaignNodeDraft[];
  expansions: EditorExpansionDraft[];
};

type EditorQAReport = {
  duplicateIds: string[];
  invalidCards: string[];
  orphanKeywords: string[];
  cardsWithoutAudio: string[];
  cardsWithoutCinematic: string[];
  bossesWithoutPhases: string[];
  invalidEvents: string[];
};

type EditorStore = EditorStateSnapshot & {
  selectedCardId: string;
  selectedBossId: string;
  selectedEventId: string;
  selectedExpansionId: string;
  importMessage: string;
  selectCard: (id: string) => void;
  updateSelectedCard: (patch: Partial<EditorCardDraft>) => void;
  addCard: () => void;
  duplicateCard: (id: string) => void;
  addEffectToSelectedCard: () => void;
  removeEffectFromSelectedCard: (index: number) => void;
  addBoss: () => void;
  updateSelectedBoss: (patch: Partial<EditorBossDraft>) => void;
  addEvent: () => void;
  updateSelectedEvent: (patch: Partial<EditorEventDraft>) => void;
  addCampaignNode: () => void;
  addExpansionFromCurrent: (name: string) => void;
  exportAll: () => string;
  importAll: (json: string, replaceConflicts?: boolean) => void;
  runQA: () => EditorQAReport;
};

const stamp = () => new Date().toISOString();
const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
const uniqueId = (base: string, ids: string[]) => {
  let candidate = base;
  let suffix = 2;
  while (ids.includes(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
};

const initialCampaignNode: EditorCampaignNodeDraft = {
  id: "nodo-editorial",
  type: "evento",
  title: "Nodo Editorial",
  x: 40,
  y: 40,
  connections: [],
  rewardIds: [],
};

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      cards: [editorCardTemplate],
      bosses: [editorBossTemplate],
      events: [editorEventTemplate],
      campaignNodes: [initialCampaignNode],
      expansions: expansionTemplates,
      selectedCardId: editorCardTemplate.id,
      selectedBossId: editorBossTemplate.id,
      selectedEventId: editorEventTemplate.id,
      selectedExpansionId: expansionTemplates[0]?.id ?? "",
      importMessage: "Sin importaciones. El archivo observa en silencio.",
      selectCard: (selectedCardId) => set({ selectedCardId }),
      updateSelectedCard: (patch) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === state.selectedCardId ? { ...card, ...patch, updatedAt: stamp() } : card,
          ),
        })),
      addCard: () =>
        set((state) => {
          const card = { ...clone(editorCardTemplate), id: uniqueId("nueva-carta-del-archivo", state.cards.map((item) => item.id)), createdAt: stamp(), updatedAt: stamp() };
          return { cards: [card, ...state.cards], selectedCardId: card.id };
        }),
      duplicateCard: (id) =>
        set((state) => {
          const source = state.cards.find((card) => card.id === id);
          if (!source) return state;
          const card = { ...clone(source), id: uniqueId(`${source.id}-copia`, state.cards.map((item) => item.id)), name: `${source.name} copia`, createdAt: stamp(), updatedAt: stamp() };
          return { cards: [card, ...state.cards], selectedCardId: card.id };
        }),
      addEffectToSelectedCard: () =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === state.selectedCardId
              ? { ...card, effects: [...card.effects, { type: "damage", target: "enemy", value: 1, animation: "hammer_slam", sound: "hammer_slam" }], updatedAt: stamp() }
              : card,
          ),
        })),
      removeEffectFromSelectedCard: (index) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === state.selectedCardId ? { ...card, effects: card.effects.filter((_, effectIndex) => effectIndex !== index), updatedAt: stamp() } : card,
          ),
        })),
      addBoss: () =>
        set((state) => {
          const boss = { ...clone(editorBossTemplate), id: uniqueId("boss-del-archivo", state.bosses.map((item) => item.id)) };
          return { bosses: [boss, ...state.bosses], selectedBossId: boss.id };
        }),
      updateSelectedBoss: (patch) => set((state) => ({ bosses: state.bosses.map((boss) => (boss.id === state.selectedBossId ? { ...boss, ...patch } : boss)) })),
      addEvent: () =>
        set((state) => {
          const event = { ...clone(editorEventTemplate), id: uniqueId("evento-del-archivo", state.events.map((item) => item.id)) };
          return { events: [event, ...state.events], selectedEventId: event.id };
        }),
      updateSelectedEvent: (patch) => set((state) => ({ events: state.events.map((event) => (event.id === state.selectedEventId ? { ...event, ...patch } : event)) })),
      addCampaignNode: () =>
        set((state) => {
          const node = { ...initialCampaignNode, id: uniqueId("nodo-editorial", state.campaignNodes.map((item) => item.id)) };
          return { campaignNodes: [node, ...state.campaignNodes] };
        }),
      addExpansionFromCurrent: (name) =>
        set((state) => {
          const expansion = buildExpansionFromSnapshot(state, name);
          return { expansions: [expansion, ...state.expansions], selectedExpansionId: expansion.id };
        }),
      exportAll: () => exportContentPackage(get()),
      importAll: (json, replaceConflicts = false) => {
        const state = get();
        const knownIds = [...state.cards.map((item) => item.id), ...state.bosses.map((item) => item.id), ...state.events.map((item) => item.id), ...state.campaignNodes.map((item) => item.id)];
        const result = importContentPackage(json, knownIds);
        if (!result.ok || !result.content) {
          set({ importMessage: result.message });
          return;
        }
        const filterConflicts = <T extends { id: string }>(items: T[]) => (replaceConflicts ? items : items.filter((item) => !result.conflicts.includes(item.id)));
        set({
          cards: [...filterConflicts(result.content.cards), ...state.cards],
          bosses: [...filterConflicts(result.content.bosses), ...state.bosses],
          events: [...filterConflicts(result.content.events), ...state.events],
          campaignNodes: [...filterConflicts(result.content.campaignNodes), ...state.campaignNodes],
          expansions: [...filterConflicts(result.content.expansions), ...state.expansions],
          importMessage: `${result.message} Conflictos: ${result.conflicts.length}`,
        });
      },
      runQA: () => {
        const state = get();
        const ids = [...state.cards.map((item) => item.id), ...state.bosses.map((item) => item.id), ...state.events.map((item) => item.id), ...state.campaignNodes.map((item) => item.id)];
        const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
        const invalidCards = state.cards.filter((card) => !validateEditorCard(card, state.cards.map((item) => item.id)).valid).map((card) => card.id);
        return {
          duplicateIds,
          invalidCards,
          orphanKeywords: [],
          cardsWithoutAudio: state.cards.filter((card) => !card.soundEffect).map((card) => card.id),
          cardsWithoutCinematic: state.cards.filter((card) => !card.cinematic).map((card) => card.id),
          bossesWithoutPhases: state.bosses.filter((boss) => !boss.phases.length).map((boss) => boss.id),
          invalidEvents: state.events.filter((event) => !event.effects.length || !event.title).map((event) => event.id),
        };
      },
    }),
    { name: "saboteadores-editor-v1" },
  ),
);
