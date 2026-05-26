import { demoStages, type DemoStageId } from "@/data/demo/demoFlow";

export const getDemoProgressPercent = (completed: DemoStageId[]) => {
  const playableStages = demoStages.filter((stage) => stage.id !== "home");
  const done = playableStages.filter((stage) => completed.includes(stage.id)).length;
  return Math.round((done / playableStages.length) * 100);
};

export const isDemoStageUnlocked = (stageId: DemoStageId, completed: DemoStageId[]) => {
  if (stageId === "home" || stageId === "intro") return true;
  const index = demoStages.findIndex((stage) => stage.id === stageId);
  const previous = demoStages[index - 1];
  return previous ? completed.includes(previous.id) : true;
};
