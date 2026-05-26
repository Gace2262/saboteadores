"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { demoVerticalConfig } from "@/data/demo/demoConfig";
import { demoStages, type DemoStageId } from "@/data/demo/demoFlow";
import { useDemoStore } from "@/store/demoStore";
import { DemoBuildBadge } from "./DemoBuildBadge";
import { DemoProgressBar } from "./DemoProgressBar";
import { DemoRestartButton } from "./DemoRestartButton";

type Props = {
  stage?: DemoStageId;
};

export function DemoFlowController({ stage = "home" }: Props) {
  const searchParams = useSearchParams();
  const trailerMode = searchParams.get("trailer") === "true";
  const completeStage = useDemoStore((state) => state.completeStage);
  const toggleSetting = useDemoStore((state) => state.toggleSetting);
  const lowPerformance = useDemoStore((state) => state.lowPerformance);
  const reducedMotion = useDemoStore((state) => state.reducedMotion);
  const reducedFlashes = useDemoStore((state) => state.reducedFlashes);
  const subtitles = useDemoStore((state) => state.subtitles);

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <div className="absolute inset-0 court-fog opacity-70" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-6">
        <header className="rounded-2xl border border-amber-100/18 bg-black/68 p-7">
          <DemoBuildBadge hidden={trailerMode} />
          <p className="mt-5 text-sm font-black uppercase tracking-[0.3em] text-amber-100/65">Demo vertical</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">Saboteadores Mentales: Habitantes Invisibles</h1>
          <p className="mt-4 max-w-3xl text-xl font-bold text-white/70">Una rebanada jugable del Tribunal. Breve, intensa y ligeramente judicial.</p>
          <p className="mt-3 max-w-3xl text-sm text-white/55">{demoVerticalConfig.finalMessage}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/demo/intro" onClick={() => completeStage(stage)} className="campaign-action max-w-xs">
              Iniciar demo
            </Link>
            <Link href="/settings" className="campaign-choice max-w-xs">
              Ajustes
            </Link>
            <Link href="/credits" className="campaign-choice max-w-xs">
              Creditos
            </Link>
            <DemoRestartButton />
          </div>
        </header>
        <DemoProgressBar active={stage} trailerMode={trailerMode} />
        <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-3">
            {demoStages
              .filter((item) => item.id !== "home")
              .map((item) => (
                <Link key={item.id} href={`${item.route}${trailerMode ? "?trailer=true" : ""}`} className="rounded-2xl border border-white/10 bg-black/48 p-5 transition hover:border-amber-100/35">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.24em] text-white/38">{item.duration}</p>
                      <h2 className="mt-2 text-3xl font-black">{item.title}</h2>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/55">{item.id}</span>
                  </div>
                  <p className="mt-3 text-sm text-white/60">{item.promise}</p>
                </Link>
              ))}
          </div>
          <aside className="grid content-start gap-4">
            <div className="rounded-2xl border border-cyan-100/18 bg-black/55 p-5">
              <h2 className="text-2xl font-black">Ajustes minimos demo</h2>
              <div className="mt-4 grid gap-2">
                {[
                  ["lowPerformance", "Modo bajo rendimiento", lowPerformance],
                  ["reducedMotion", "Reducir animaciones", reducedMotion],
                  ["reducedFlashes", "Reducir flashes", reducedFlashes],
                  ["subtitles", "Subtitulos", subtitles],
                ].map(([key, label, active]) => (
                  <button key={String(key)} type="button" onClick={() => toggleSetting(key as "lowPerformance" | "reducedMotion" | "reducedFlashes" | "subtitles")} className="flex justify-between rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm">
                    <span>{label}</span>
                    <span className={active ? "text-emerald-200" : "text-white/35"}>{active ? "Activo" : "Off"}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-amber-100/18 bg-amber-100/10 p-5">
              <h2 className="text-2xl font-black">Para trailer</h2>
              <p className="mt-2 text-sm text-white/62">Usa <span className="font-mono text-amber-100">?trailer=true</span> para ocultar badge, acelerar lectura visual y limpiar la captura.</p>
              <Link href="/demo/intro?trailer=true" className="campaign-choice mt-4">
                Abrir captura limpia
              </Link>
            </div>
          </aside>
        </section>
        <p className="text-xs text-white/45">{demoVerticalConfig.legalNotice}</p>
      </section>
    </main>
  );
}
