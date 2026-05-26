"use client";

import { motion } from "framer-motion";

export function BattleIntensityMeter({ value }: { value: number }) {
  return (
    <div className="rounded-md border border-amber-100/14 bg-black/55 p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-black uppercase text-amber-100/60">Intensidad</p>
        <strong className="text-sm text-amber-100">{value}</strong>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-200 via-amber-200 to-rose-500"
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
