"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { demoEvolution } from "@/data/demo/demoCards";
import { useDemoStore } from "@/store/demoStore";
import { DemoProgressBar } from "./DemoProgressBar";

export function DemoCardEvolution() {
  const evolveCard = useDemoStore((state) => state.evolveCard);
  const completeStage = useDemoStore((state) => state.completeStage);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_24%),linear-gradient(135deg,#050308,#10190f_55%,#050308)] px-5 py-8 text-white">
      <section className="mx-auto grid max-w-6xl gap-6">
        <DemoProgressBar active="evolution" />
        <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-100/65">Despertar de carta</p>
            <h1 className="mt-3 text-6xl font-black leading-none">La carta recordo para que nacio.</h1>
            <p className="mt-5 max-w-2xl text-xl text-white/65">Cadenas rotas, grietas luminosas y una mejora lo bastante sana como para parecer sospechosa.</p>
            <Link
              href="/demo/boss"
              onClick={() => {
                evolveCard(demoEvolution.to);
                completeStage("evolution");
              }}
              className="campaign-action mt-8 max-w-sm"
            >
              Llevarla al boss
            </Link>
          </div>
          <motion.article initial={{ rotateY: -18, opacity: 0, y: 30 }} animate={{ rotateY: 0, opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="rounded-3xl border-2 border-emerald-100/50 bg-gradient-to-br from-emerald-100/20 via-black to-amber-100/15 p-6 shadow-[0_0_90px_rgba(127,255,212,0.25)]">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-100/70">{demoEvolution.from} evoluciona a</p>
            <h2 className="mt-3 text-4xl font-black text-white">{demoEvolution.to}</h2>
            <div className="my-6 h-56 rounded-2xl border border-white/15 bg-[radial-gradient(circle,rgba(255,255,255,0.28),transparent_35%),linear-gradient(135deg,rgba(127,255,212,0.22),rgba(0,0,0,0.6))]" />
            <p className="rounded-xl border border-white/10 bg-black/45 p-4 text-sm text-white/75">{demoEvolution.effect}</p>
            <p className="mt-4 text-sm italic text-amber-100">&quot;{demoEvolution.quote}&quot;</p>
          </motion.article>
        </div>
      </section>
    </main>
  );
}
