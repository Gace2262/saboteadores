"use client";

import { motion } from "framer-motion";
import { chaosRules } from "@/data/chaosRules";
import { mutantModifiers } from "@/data/modeModifiers";
import { useModeStore } from "@/store/modeStore";

export function ChaosModifierWheel() {
  const { chaosSeed, spinChaos, completeModeRun } = useModeStore();
  const rule = chaosRules[chaosSeed % chaosRules.length];
  const modifier = mutantModifiers[(chaosSeed + 2) % mutantModifiers.length];
  return (
    <section className="rounded-lg border border-violet-100/16 bg-black/52 p-5">
      <p className="text-sm font-black uppercase text-violet-100/65">Caos Psicologico</p>
      <h2 className="mt-1 text-4xl font-black">Rueda de reglas mutantes</h2>
      <div className="mt-6 grid gap-5 lg:grid-cols-[280px_1fr]">
        <motion.div animate={{ rotate: chaosSeed * 72 }} transition={{ type: "spring", stiffness: 80, damping: 14 }} className="grid aspect-square place-items-center rounded-full border border-amber-100/30 bg-[conic-gradient(from_90deg,#8b1e3f,#f2d37b,#312e81,#111,#8b1e3f)] p-6 text-center shadow-[0_0_45px_rgba(139,30,63,0.3)]">
          <div className="rounded-full border border-black/40 bg-black/70 p-6">
            <p className="text-sm font-black uppercase text-amber-100">Cada 3 turnos</p>
            <p className="mt-2 text-xl font-black">{rule.name}</p>
          </div>
        </motion.div>
        <div className="space-y-4">
          <div className="rounded-md border border-white/10 bg-white/6 p-4">
            <h3 className="text-2xl font-black text-amber-100">{rule.name}</h3>
            <p className="mt-2 text-white/62">{rule.effect}</p>
            <p className="mt-2 text-sm italic text-white/45">{rule.flavorText}</p>
          </div>
          <div className="rounded-md border border-white/10 bg-white/6 p-4">
            <p className="text-xs font-black uppercase text-white/45">Modificador mutante</p>
            <h3 className="mt-1 text-2xl font-black">{modifier.name}</h3>
            <p className="mt-2 text-white/62">{modifier.effect}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="campaign-action" onClick={spinChaos}>Girar rueda</button>
            <button className="campaign-choice max-w-xs" onClick={() => completeModeRun("chaos", { won: true, score: 666, reward: "Efecto de camara inestable" })}>Completar caos</button>
          </div>
        </div>
      </div>
    </section>
  );
}
