"use client";

import { motion } from "framer-motion";
import type { ColossalBoss } from "@/data/cinematicBosses";
import { CinematicSubtitle } from "./CinematicSubtitle";

type BossIntroCinematicProps = {
  boss: ColossalBoss;
  onStart: () => void;
};

export function BossIntroCinematic({ boss, onStart }: BossIntroCinematicProps) {
  return (
    <section className="relative overflow-hidden rounded-lg border border-amber-100/20 bg-black/70 p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(242,211,123,0.18),transparent_35%)]" />
      <div className="relative grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="rounded-lg border border-white/10 bg-white/5 p-5 text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-100/60">Entrada colosal</p>
          <h2 className="mt-3 text-4xl font-black uppercase text-white">{boss.name}</h2>
          <p className="mt-4 text-lg font-bold text-amber-100">{boss.quote}</p>
        </motion.div>
        <div className="grid gap-3">
          {boss.entrance.map((line) => (
            <CinematicSubtitle key={line} line={line} />
          ))}
          <p className="rounded-md border border-white/10 bg-black/35 p-4 text-sm text-white/65">
            Soundtrack: {boss.soundtrack}. El tablero no fue consultado y ya presento queja formal.
          </p>
          <button onClick={onStart} className="campaign-action max-w-sm">
            Iniciar cinematicamente
          </button>
        </div>
      </div>
    </section>
  );
}
