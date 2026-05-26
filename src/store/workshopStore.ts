"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WorkshopContent, WorkshopRating, WorkshopReaction } from "@/logic/workshop/workshopTypes";
import { calculateWorkshopChecksum } from "@/logic/workshop/workshopExporter";
import { serializeRunReplay } from "@/logic/workshop/runReplaySerializer";
import { weeklyMockChallenge } from "@/logic/workshop/challengeGenerator";
import { importWorkshopContent } from "@/logic/workshop/workshopImporter";

const makeContent = (content: Omit<WorkshopContent, "checksum" | "createdAt">): WorkshopContent => {
  const draft = { ...content, createdAt: "2026-05-26T00:00:00.000Z" };
  return { ...draft, checksum: calculateWorkshopChecksum(draft) };
};

export const featuredWorkshopContent: WorkshopContent[] = [
  makeContent({
    id: "oficina-nunca-cerro",
    title: "La Oficina Nunca Cerro",
    description: "Seed procedural donde el Controlador firma permisos para tus permisos.",
    type: "seed",
    creatorId: "archivista-burnout",
    creatorName: "Archivista del Burnout",
    tags: ["burnout", "procedural", "tactical"],
    difficulty: "crisis-formal",
    warnings: ["difficult_gameplay", "burnout_themes"],
    language: "es-CL",
    dependencies: [],
    seed: { seedText: "la oficina nunca cerro", difficulty: "crisis-formal", finalBoss: "Controlador", winRate: 42, averageMinutes: 24 },
    payload: { note: "Seed local destacada." },
  }),
  makeContent({
    id: "tribunal-bajo-mar",
    title: "El Tribunal Bajo el Mar",
    description: "Campaña mock con silencio pesado, culpa salina y boss final mojado de solemnidad.",
    type: "campaign",
    creatorId: "magistrado-caos",
    creatorName: "Magistrado del Caos",
    tags: ["narrative", "cinematic", "psychological"],
    difficulty: "juicio-serio",
    warnings: ["psychological_horror"],
    language: "es",
    dependencies: [],
    payload: { acts: 4, bosses: ["Reservado", "El Juez"] },
  }),
  makeContent({
    id: "respirar-es-opcional",
    title: "Respirar es opcional",
    description: "Desafio semanal local: no Catarsis, elites dobles y orgullo en llamas.",
    type: "challenge",
    creatorId: "inspector-catarsis",
    creatorName: "Inspector de Catarsis",
    tags: ["hardcore", "cursed", "boss-rush"],
    difficulty: "tribunal-desatado",
    warnings: ["difficult_gameplay", "intense_corruption"],
    language: "es-CL",
    dependencies: [],
    challenge: weeklyMockChallenge,
    payload: weeklyMockChallenge,
  }),
  makeContent({
    id: "run-catedral-respira",
    title: "Expediente 992: La Catedral Respira",
    description: "Run legendaria con ruta rota, decisiones dudosas y un Perfeccionista demasiado motivado.",
    type: "run",
    creatorId: "heraldo-almost",
    creatorName: "Heraldo del Almost",
    tags: ["procedural", "cinematic", "tactical"],
    difficulty: "juicio-serio",
    warnings: ["difficult_gameplay"],
    language: "es-CL",
    dependencies: [],
    replay: serializeRunReplay({
      seedText: "la catedral respira",
      eventLog: ["inicio", "elite", "espejo", "boss"],
      keyDecisions: ["Mirar de frente", "Tomar reliquia", "Aceptar corrupcion"],
      routeNodeIds: ["a1-n0", "a1-n1", "a2-n2", "a4-juicio"],
    }),
    payload: { finalBoss: "Perfeccionista" },
  }),
];

type WorkshopStore = {
  contents: WorkshopContent[];
  ratings: Record<string, WorkshopRating>;
  search: string;
  selectedTag: string;
  importMessage: string;
  setSearch: (search: string) => void;
  setSelectedTag: (tag: string) => void;
  importContent: (raw: string) => void;
  publishContent: (content: WorkshopContent) => void;
  reactToContent: (contentId: string, reaction: WorkshopReaction) => void;
  toggleFavorite: (contentId: string) => void;
  markPlayed: (contentId: string) => void;
  markExported: (contentId: string) => void;
};

const emptyRating = (contentId: string): WorkshopRating => ({ contentId, reactions: {}, favorite: false, played: 0, exported: 0 });

export const useWorkshopStore = create<WorkshopStore>()(
  persist(
    (set) => ({
      contents: featuredWorkshopContent,
      ratings: {},
      search: "",
      selectedTag: "all",
      importMessage: "Archivo Publico listo. Algunos expedientes respiran.",
      setSearch: (search) => set({ search }),
      setSelectedTag: (selectedTag) => set({ selectedTag }),
      importContent: (raw) => {
        const imported = importWorkshopContent(raw);
        if (!imported.ok || !imported.content) {
          set({ importMessage: imported.errors.join(" ") });
          return;
        }
        set((state) => ({ contents: [imported.content as WorkshopContent, ...state.contents.filter((item) => item.id !== imported.content?.id)], importMessage: "Expediente importado. El Tribunal finge calma." }));
      },
      publishContent: (content) => set((state) => ({ contents: [content, ...state.contents.filter((item) => item.id !== content.id)] })),
      reactToContent: (contentId, reaction) =>
        set((state) => {
          const rating = state.ratings[contentId] ?? emptyRating(contentId);
          return { ratings: { ...state.ratings, [contentId]: { ...rating, reactions: { ...rating.reactions, [reaction]: (rating.reactions[reaction] ?? 0) + 1 } } } };
        }),
      toggleFavorite: (contentId) =>
        set((state) => {
          const rating = state.ratings[contentId] ?? emptyRating(contentId);
          return { ratings: { ...state.ratings, [contentId]: { ...rating, favorite: !rating.favorite } } };
        }),
      markPlayed: (contentId) =>
        set((state) => {
          const rating = state.ratings[contentId] ?? emptyRating(contentId);
          return { ratings: { ...state.ratings, [contentId]: { ...rating, played: rating.played + 1 } } };
        }),
      markExported: (contentId) =>
        set((state) => {
          const rating = state.ratings[contentId] ?? emptyRating(contentId);
          return { ratings: { ...state.ratings, [contentId]: { ...rating, exported: rating.exported + 1 } } };
        }),
    }),
    { name: "saboteadores-workshop-v1", version: 1 },
  ),
);
