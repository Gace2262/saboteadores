"use client";

import Link from "next/link";
import { getTutorialStep } from "@/data/tutorialSteps";
import { useTutorialStore } from "@/store/tutorialStore";
import { FirstDeckChoice } from "./FirstDeckChoice";
import { QuickGlossary } from "./QuickGlossary";
import { TutorialNarrator } from "./TutorialNarrator";
import { TutorialRewardScreen } from "./TutorialRewardScreen";
import { TutorialStepOverlay } from "./TutorialStepOverlay";

export function TutorialFlow() {
  const store = useTutorialStore();
  const step = getTutorialStep(store.currentStepId);
  const showReward = ["reward", "first-deck"].includes(store.currentStepId);
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <div className="absolute inset-0 court-fog opacity-70" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Primera citacion oficial</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">Onboarding del Tribunal</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            Tutorial corto, narrativo y jugable. No es una clase: es una audiencia con recursos, cadenas y una cantidad razonable de sarcasmo.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/tutorial/battle" className="campaign-action max-w-xs">Ir al combate guiado</Link>
            <button className="campaign-choice max-w-xs" onClick={store.resetTutorial}>Repetir tutorial</button>
            <button className="campaign-choice max-w-xs" onClick={store.skipTutorial}>Saltar tutorial</button>
          </div>
        </header>

        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <section className="grid gap-5">
            <TutorialStepOverlay step={step} />
            <TutorialNarrator text={step.narrator} />
            {showReward ? <TutorialRewardScreen /> : null}
            {store.currentStepId === "first-deck" ? <FirstDeckChoice /> : null}
          </section>
          <aside className="grid content-start gap-4">
            <QuickGlossary />
            <section className="rounded-lg border border-white/10 bg-black/50 p-5">
              <h2 className="text-2xl font-black">Accesibilidad tutorial</h2>
              <div className="mt-4 grid gap-2">
                {[
                  ["largeText", "Texto mas grande"],
                  ["reducedMotion", "Reducir animaciones"],
                  ["simpleExplanation", "Explicacion simple"],
                  ["fullSubtitles", "Subtitulos completos"],
                ].map(([key, label]) => (
                  <button key={key} className="campaign-choice justify-between" onClick={() => store.toggleFlag(key as never)}>
                    {label}
                    <strong className={store[key as keyof typeof store] ? "text-emerald-100" : "text-white/45"}>{store[key as keyof typeof store] ? "ON" : "OFF"}</strong>
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
