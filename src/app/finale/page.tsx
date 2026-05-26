"use client";

import Link from "next/link";
import { FinalChoicePanel } from "@/components/boss/FinalChoicePanel";
import { PhaseTransitionOverlay } from "@/components/boss/PhaseTransitionOverlay";
import { useBossStore } from "@/store/bossStore";

export default function FinalePage() {
  const { activeCinematic, clearCinematic, finalesVistos } = useBossStore();
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-5 py-8 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(242,211,123,0.18),transparent_30%),radial-gradient(circle_at_80%_78%,rgba(255,255,255,0.08),transparent_32%)]" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-100/60">Secuencia final</p>
            <h1 className="mt-2 text-4xl font-black uppercase md:text-6xl">Tribunal Suspendido</h1>
          </div>
          <Link href="/bosses" className="campaign-choice max-w-xs">Volver al tribunal</Link>
        </div>
        <FinalChoicePanel />
        <div className="rounded-lg border border-white/12 bg-black/45 p-5">
          <h2 className="text-2xl font-black">Finales vistos</h2>
          <p className="mt-2 text-white/60">
            {finalesVistos.length ? finalesVistos.join(" / ") : "Ninguno todavia. El martillo esta mirando el reloj."}
          </p>
        </div>
      </section>
      <PhaseTransitionOverlay cinematic={activeCinematic} onClose={clearCinematic} />
    </main>
  );
}
