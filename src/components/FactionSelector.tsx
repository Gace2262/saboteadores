"use client";

import { motion } from "framer-motion";
import { ArrowRight, Scale } from "lucide-react";
import { useRouter } from "next/navigation";
import { selectableFactions, useGameStore } from "@/store/gameStore";
import { translateFaction } from "@/logic/i18n/translator";
import { useLanguageStore } from "@/store/languageStore";

export function FactionSelector() {
  const router = useRouter();
  const selectedFactions = useGameStore((state) => state.selectedFactions);
  const toggleFaction = useGameStore((state) => state.toggleFaction);
  const startBattle = useGameStore((state) => state.startBattle);
  const locale = useLanguageStore((state) => state.locale);
  const begin = () => {
    startBattle();
    router.push("/battle");
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-7 px-5 py-8">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-amber-100/15 pb-5">
        <div>
          <p className="text-sm font-black uppercase text-amber-100/70">Seleccion de defensa mental</p>
          <h1 className="mt-2 text-4xl font-black text-white md:text-6xl">Elige dos saboteadores para usarlos contra el tribunal</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            La estrategia es dudosa, pero poetica: mezclas dos patrones internos y los obligas a declarar contra el Juez.
          </p>
        </div>
        <button
          onClick={begin}
          disabled={selectedFactions.length !== 2}
          className="inline-flex min-h-12 items-center gap-2 rounded-md bg-amber-200 px-5 text-sm font-black uppercase text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Entrar al juicio
          <ArrowRight size={18} />
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {selectableFactions.map((faction) => {
          const active = selectedFactions.includes(faction.id);
          const text = translateFaction(faction, locale);
          return (
            <motion.button
              layout
              key={faction.id}
              onClick={() => toggleFaction(faction.id)}
              className={`relative min-h-80 overflow-hidden rounded-lg border p-5 text-left transition ${
                active ? "border-amber-100 bg-amber-100/10" : "border-white/12 bg-black/35 hover:bg-white/8"
              }`}
            >
              <div className="absolute inset-0 opacity-35" style={{ background: `radial-gradient(circle at 25% 0%, ${faction.color}, transparent 42%)` }} />
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <Scale className="text-amber-100" size={28} />
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-amber-100/35 bg-black/45 text-2xl font-black text-amber-100">
                    {faction.sigil}
                  </span>
                </div>
                <h2 className="mt-8 text-3xl font-black text-white">{text.name}</h2>
                <p className="mt-3 text-base leading-7 text-white/70">{text.description}</p>
                <p className="mt-auto rounded-md border border-white/10 bg-black/35 p-3 text-sm text-white/62">{text.tagline}</p>
              </div>
            </motion.button>
          );
        })}
      </section>
    </main>
  );
}
