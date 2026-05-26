"use client";

import { motion } from "framer-motion";
import { finaleSequences } from "@/data/finaleSequences";
import { useBossStore } from "@/store/bossStore";

export function FinalChoicePanel() {
  const { finalesVistos, chooseFinale } = useBossStore();
  return (
    <section className="relative overflow-hidden rounded-lg border border-amber-100/20 bg-black/68 p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(242,211,123,0.14),transparent_34%),radial-gradient(circle_at_100%_80%,rgba(190,24,93,0.14),transparent_32%)]" />
      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-100/60">Ultima objecion</p>
        <h1 className="mt-3 text-4xl font-black uppercase text-white md:text-6xl">Finales interactivos</h1>
        <p className="mt-4 max-w-3xl text-white/65">
          El Tribunal del Craneo queda suspendido. Elige que hacer con el martillo, las cadenas y esa costumbre
          teatral de convertir cada pensamiento en audiencia publica.
        </p>
        <div className="mt-7 grid gap-4 lg:grid-cols-2">
          {finaleSequences.map((finale) => {
            const seen = finalesVistos.includes(finale.id);
            return (
              <motion.button
                key={finale.id}
                whileHover={{ y: -4 }}
                onClick={() => chooseFinale(finale.id)}
                className="rounded-lg border border-white/12 bg-white/5 p-5 text-left transition hover:border-amber-100/45 hover:bg-amber-100/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-2xl font-black text-white">{finale.optionText}</h2>
                  <span className={seen ? "rounded bg-emerald-300/15 px-2 py-1 text-xs font-black text-emerald-100" : "rounded bg-white/10 px-2 py-1 text-xs font-black text-white/45"}>
                    {seen ? "Visto" : "Nuevo"}
                  </span>
                </div>
                <p className="mt-3 text-sm text-white/62">{finale.narrator}</p>
                <p className="mt-4 text-xs font-black uppercase text-amber-100/70">{finale.music}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {finale.unlocks.map((unlock) => (
                    <span key={unlock} className="rounded border border-white/10 bg-black/35 px-2 py-1 text-xs text-white/60">
                      {unlock}
                    </span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
