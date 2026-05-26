"use client";

import Link from "next/link";
import { BossTransformationScene } from "@/components/boss/BossTransformationScene";
import { CinematicSubtitle } from "@/components/boss/CinematicSubtitle";
import { PhaseTransitionOverlay } from "@/components/boss/PhaseTransitionOverlay";
import { bossTransformations } from "@/data/bossTransformations";
import { cinematicBosses } from "@/data/cinematicBosses";
import { finaleSequences } from "@/data/finaleSequences";
import { resolveBossIntroCinematic, resolveFinaleCinematic } from "@/logic/boss/cinematicResolver";
import { useBossStore } from "@/store/bossStore";

export default function CinematicsPage() {
  const { activeCinematic, clearCinematic, unlockCinematic } = useBossStore();
  const previewIntro = (bossId: string) => {
    const boss = cinematicBosses.find((item) => item.id === bossId) ?? cinematicBosses[0];
    useBossStore.setState({ activeCinematic: resolveBossIntroCinematic(boss) });
    unlockCinematic(`intro-${boss.id}`);
  };
  const previewFinale = (finaleId: string) => {
    const finale = finaleSequences.find((item) => item.id === finaleId) ?? finaleSequences[0];
    useBossStore.setState({ activeCinematic: resolveFinaleCinematic(finale) });
    unlockCinematic(`finale-${finale.id}`);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-5 py-8 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(242,211,123,0.16),transparent_32%),radial-gradient(circle_at_12%_82%,rgba(124,58,237,0.16),transparent_34%)]" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-100/60">Archivo audiovisual</p>
            <h1 className="mt-2 text-4xl font-black uppercase md:text-6xl">Cinematicas mayores</h1>
            <p className="mt-4 max-w-3xl text-white/65">
              Juicio Final, Catarsis Total, Derrumbe Mental y Rebelion de las Cartas quedan listos como escenas
              modulares para cartas legendarias, bosses colosales y finales.
            </p>
          </div>
          <Link href="/bosses" className="campaign-action max-w-xs">Volver a bosses</Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {["Juicio Final", "Catarsis Total", "Derrumbe Mental", "Rebelion de las Cartas"].map((title) => (
            <article key={title} className="rounded-lg border border-amber-100/16 bg-black/55 p-5">
              <CinematicSubtitle title="Escena mayor" line={title} tone={title.includes("Derrumbe") ? "red" : "gold"} />
              <p className="mt-4 text-sm text-white/58">
                Freeze frame, zoom dramatico, subtitulos obligatorios y destruccion visual controlada.
              </p>
            </article>
          ))}
        </div>

        <section className="rounded-lg border border-white/12 bg-black/45 p-5">
          <h2 className="text-3xl font-black">Entradas de bosses</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {cinematicBosses.map((boss) => (
              <button key={boss.id} onClick={() => previewIntro(boss.id)} className="campaign-choice text-left">
                {boss.name}
                <span className="text-xs text-white/45">{boss.quote}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-white/12 bg-black/45 p-5">
          <h2 className="text-3xl font-black">Finales como microescenas</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {finaleSequences.map((finale) => (
              <button key={finale.id} onClick={() => previewFinale(finale.id)} className="campaign-choice text-left">
                {finale.title}
                <span className="text-xs text-white/45">{finale.narrator}</span>
              </button>
            ))}
          </div>
        </section>

        <BossTransformationScene transformations={bossTransformations} />
      </section>
      <PhaseTransitionOverlay cinematic={activeCinematic} onClose={clearCinematic} />
    </main>
  );
}
