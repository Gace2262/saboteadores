import { tutorialSteps, type TutorialStepId } from "@/data/tutorialSteps";

export function getTutorialProgress(stepId: TutorialStepId, completedStepIds: TutorialStepId[]) {
  const index = tutorialSteps.findIndex((step) => step.id === stepId);
  const safeIndex = Math.max(0, index);
  return {
    index: safeIndex,
    total: tutorialSteps.length,
    percent: Math.round(((completedStepIds.length + 1) / tutorialSteps.length) * 100),
    isLast: safeIndex >= tutorialSteps.length - 1,
    nextStep: tutorialSteps[Math.min(safeIndex + 1, tutorialSteps.length - 1)],
  };
}

export function getNextTutorialStepId(stepId: TutorialStepId): TutorialStepId {
  const index = tutorialSteps.findIndex((step) => step.id === stepId);
  return tutorialSteps[Math.min(Math.max(index, 0) + 1, tutorialSteps.length - 1)].id;
}
