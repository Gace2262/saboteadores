"use client";

import Link from "next/link";
import { demoDialogues } from "@/data/demo/demoDialogues";
import { demoRewards } from "@/data/demo/demoRewards";
import { useDemoStore } from "@/store/demoStore";
import { DemoProgressBar } from "./DemoProgressBar";
import { DemoSkipButton } from "./DemoSkipButton";

const resources = [
  ["Voluntad", "Tu barra de seguir discutiendo con la cabeza."],
  ["Claridad", "Paga cartas. Recurso noble, escaso y con ojeras."],
  ["Estres", "Sube con poder riesgoso. Cobra intereses narrativos."],
  ["Ruido Mental", "Basura psiquica acumulada. Catarsis trae escoba."],
];

export function DemoTutorialBattle() {
  const completeStage = useDemoStore((state) => state.completeStage);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#2b1b10,transparent_32%),linear-gradient(135deg,#050308,#130915_55%,#050308)] px-5 py-8 text-white">
      <section className="mx-auto grid max-w-6xl gap-6">
        <DemoProgressBar active="tutorial" />
        <div className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-white/10 bg-black/55 p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-100/65">Tutorial jugable</p>
            <h1 className="mt-2 text-5xl font-black">Primera audiencia asistida</h1>
            <p className="mt-3 max-w-3xl text-white/62">No puedes perder aqui. El Tribunal necesita que entiendas las reglas antes de arruinarte con elegancia.</p>
          </div>
          <DemoSkipButton current="tutorial" />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {resources.map(([name, text]) => (
            <article key={name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <h2 className="text-xl font-black text-amber-100">{name}</h2>
              <p className="mt-2 text-sm text-white/60">{text}</p>
            </article>
          ))}
        </div>
        <section className="grid gap-5 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl border border-amber-100/20 bg-black/60 p-5">
            <div className="grid gap-4 md:grid-cols-3">
              {["Robar carta", "Jugar Conciencia", "Romper Cadena"].map((action, index) => (
                <article key={action} className="rounded-xl border border-white/10 bg-zinc-950 p-4">
                  <p className="text-xs font-black uppercase text-white/35">Paso {index + 1}</p>
                  <h3 className="mt-2 text-2xl font-black">{action}</h3>
                  <p className="mt-2 text-sm text-white/55">{demoDialogues.tutorial[index]}</p>
                </article>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-cyan-200/20 bg-cyan-200/10 p-4">
              <p className="text-sm font-bold text-cyan-100">Intencion enemiga visible: El Controlador Menor prepara un bloqueo. Mala costumbre con metalurgia.</p>
            </div>
          </div>
          <aside className="rounded-2xl border border-emerald-200/20 bg-emerald-200/10 p-5">
            <h2 className="text-2xl font-black">Recompensa tutorial</h2>
            <ul className="mt-3 space-y-2 text-sm text-emerald-50/80">
              {demoRewards.tutorial.map((reward) => (
                <li key={reward}>- {reward}</li>
              ))}
            </ul>
            <Link href="/demo/deck" onClick={() => completeStage("tutorial")} className="campaign-action mt-5">
              Completar audiencia
            </Link>
          </aside>
        </section>
      </section>
    </main>
  );
}
