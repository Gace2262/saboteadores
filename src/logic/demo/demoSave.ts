import type { DemoDeckId } from "@/data/demo/demoDecks";
import type { DemoStageId } from "@/data/demo/demoFlow";

export type DemoFeedback = {
  rulesUnderstood: string;
  bossDifficulty: string;
  deckUsed: string;
  favoritePart: string;
  confusingPart: string;
  performanceIssues: string;
  createdAt: string;
};

export type DemoSaveSnapshot = {
  version: string;
  completedStages: DemoStageId[];
  selectedDeck?: DemoDeckId;
  eventChoice?: string;
  evolvedCard?: string;
  bossOutcome?: "win" | "loss";
  feedback: DemoFeedback[];
  exportedAt: string;
};

export const createDemoExport = (snapshot: Omit<DemoSaveSnapshot, "exportedAt">): DemoSaveSnapshot => ({
  ...snapshot,
  exportedAt: new Date().toISOString(),
});

export const stringifyDemoExport = (snapshot: DemoSaveSnapshot) => JSON.stringify(snapshot, null, 2);
