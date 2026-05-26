"use client";

import { motion } from "framer-motion";

export function ExtremeJudgmentMeter({ value, threshold }: { value: number; threshold: number }) {
  const percent = Math.min(100, (value / threshold) * 100);
  return (
    <div className="rounded-lg border border-amber-100/18 bg-black/62 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase text-amber-100/60">Medidor de Juicio</p>
          <h2 className="text-2xl font-black text-white">Martillazo: {Math.round(percent)}%</h2>
        </div>
        <strong className="text-3xl font-black text-amber-100">{value}</strong>
      </div>
      <div className="mt-3 h-4 overflow-hidden rounded-full border border-amber-100/20 bg-zinc-950">
        <motion.div
          className="h-full bg-gradient-to-r from-rose-500 via-amber-300 to-white"
          animate={{ width: `${percent}%`, filter: percent > 80 ? ["brightness(1)", "brightness(1.8)", "brightness(1)"] : "brightness(1)" }}
          transition={{ duration: 0.35 }}
        />
      </div>
      <p className="mt-2 text-xs text-white/50">
        Sube con Estres, dano del Juez, descartes negativos, cartas Malditas y Ruido Mental acumulado.
      </p>
    </div>
  );
}
