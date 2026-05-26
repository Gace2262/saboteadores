import type { DemoStageId } from "@/data/demo/demoFlow";

export type DemoUnlock = {
  id: string;
  label: string;
  unlockedBy: DemoStageId;
};

export const demoUnlocks: DemoUnlock[] = [
  { id: "collection-preview", label: "Coleccion demo limitada", unlockedBy: "battle" },
  { id: "feedback-export", label: "Exportar feedback local", unlockedBy: "end" },
  { id: "boss-rematch", label: "Repetir boss demo", unlockedBy: "boss" },
  { id: "trailer-clean-ui", label: "Modo captura limpia", unlockedBy: "intro" },
];

export const getUnlockedDemoFeatures = (completed: DemoStageId[]) =>
  demoUnlocks.filter((unlock) => completed.includes(unlock.unlockedBy));
