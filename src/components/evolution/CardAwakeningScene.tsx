"use client";

import { motion } from "framer-motion";
import { getAwakening } from "@/data/cardAwakenings";

export function CardAwakeningScene({ cardId }: { cardId: string }) {
  const awakening = getAwakening(cardId);
  if (!awakening) return null;
  return (
    <motion.section initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative overflow-hidden rounded-lg border border-white/20 bg-black/70 p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.24),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(242,211,123,0.2),transparent_30%)]" />
      <div className="relative">
        <p className="text-sm font-black uppercase text-amber-100/65">Despertar de carta</p>
        <h2 className="mt-2 text-4xl font-black">{awakening.awakenedName}</h2>
        <p className="mt-3 text-xl font-black text-white/82">{awakening.impactText}</p>
        <p className="mt-3 text-white/62">{awakening.newEffect}</p>
      </div>
    </motion.section>
  );
}
