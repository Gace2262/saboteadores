"use client";

import { getTutorialProgress } from "@/logic/tutorial/tutorialProgress";
import { useTutorialStore } from "@/store/tutorialStore";
import type { TutorialStep } from "@/data/tutorialSteps";

export function TutorialStepOverlay({ step }: { step: TutorialStep }) {
  const { completedStepIds, nextStep, currentStepId, skipTutorial, largeText } = useTutorialStore();
  const progress = getTutorialProgress(currentStepId, completedStepIds);
  return (
    <section className={`rounded-lg border border-amber-100/22 bg-black/68 p-5 ${largeText ? "text-lg" : ""}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-100/60">Paso {progress.index + 1}/{progress.total}</p>
          <h2 className="mt-2 text-3xl font-black text-white">{step.title}</h2>
        </div>
        <button className="rounded border border-white/10 bg-white/5 px-3 py-2 text-xs font-black uppercase text-white/60" onClick={skipTutorial}>
          Saltar tutorial
        </button>
      </div>
      <p className="mt-3 text-sm font-bold text-amber-100">{step.objective}</p>
      <p className="mt-2 text-white/64">{step.narrator}</p>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-gradient-to-r from-amber-200 via-red-300 to-cyan-200" style={{ width: `${progress.percent}%` }} />
      </div>
      <button className="campaign-action mt-5 max-w-xs" onClick={nextStep}>
        {step.cta}
      </button>
    </section>
  );
}
