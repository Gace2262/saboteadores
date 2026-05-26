"use client";

import Link from "next/link";
import { demoVerticalConfig } from "@/data/demo/demoConfig";
import { demoDialogues } from "@/data/demo/demoDialogues";
import { getUnlockedDemoFeatures } from "@/logic/demo/demoUnlocks";
import { useDemoStore } from "@/store/demoStore";
import { DemoFeedbackPanel } from "./DemoFeedbackPanel";
import { DemoProgressBar } from "./DemoProgressBar";
import { DemoRestartButton } from "./DemoRestartButton";

export function DemoEndScreen() {
  const bossOutcome = useDemoStore((state) => state.bossOutcome);
  const completedStages = useDemoStore((state) => state.completedStages);
  const completeStage = useDemoStore((state) => state.completeStage);
  const unlocked = getUnlockedDemoFeatures(completedStages);
  const won = bossOutcome !== "loss";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,rgba(242,211,123,0.22),transparent_30%),linear-gradient(135deg,#050308,#120707_55%,#050308)] px-5 py-8 text-white">
      <section className="mx-auto grid max-w-7xl gap-6">
        <DemoProgressBar active="end" />
        <header className="relative overflow-hidden rounded-2xl border border-amber-100/20 bg-black/70 p-8 text-center">
          <div className="absolute inset-x-0 top-8 mx-auto h-28 w-52 rounded-[50%] border-4 border-amber-100/45 bg-black/80 shadow-[0_0_120px_rgba(242,211,123,0.35)]" />
          <div className="relative mt-24">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-100/60">Final de demo</p>
            <h1 className="mt-3 text-6xl font-black uppercase md:text-8xl">El juicio continua</h1>
            <p className="mx-auto mt-5 max-w-3xl text-xl font-bold text-white/76">{won ? demoDialogues.endWin : demoDialogues.endLoss}</p>
            <p className="mx-auto mt-3 max-w-3xl text-2xl font-black text-amber-100">{won ? demoDialogues.judgeWin : demoDialogues.judgeLoss}</p>
            <button type="button" onClick={() => completeStage("end")} className="campaign-action mx-auto mt-6 max-w-sm">
              Sellar expediente demo
            </button>
          </div>
        </header>
        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-black/55 p-5">
            <h2 className="text-3xl font-black">Contenido en desarrollo</h2>
            <div className="mt-4 grid gap-2">
              {demoVerticalConfig.locked.map((item) => (
                <p key={item} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/65">
                  {item}: en desarrollo
                </p>
              ))}
            </div>
          </article>
          <article className="rounded-2xl border border-emerald-100/20 bg-emerald-100/10 p-5">
            <h2 className="text-3xl font-black">Desbloqueos demo</h2>
            <div className="mt-4 grid gap-2">
              {unlocked.map((item) => (
                <p key={item.id} className="rounded-lg border border-emerald-100/15 bg-black/25 px-3 py-2 text-sm text-emerald-50/80">
                  {item.label}
                </p>
              ))}
            </div>
          </article>
        </section>
        <DemoFeedbackPanel />
        <div className="flex flex-wrap justify-center gap-3">
          <DemoRestartButton />
          <Link href="/demo/deck" className="campaign-choice max-w-xs">Probar otro mazo</Link>
          <Link href="/collection" className="campaign-choice max-w-xs">Ver coleccion demo</Link>
          <Link href="/credits" className="campaign-choice max-w-xs">Creditos</Link>
        </div>
        <p className="text-center text-xs text-white/45">{demoVerticalConfig.legalNotice}</p>
      </section>
    </main>
  );
}
