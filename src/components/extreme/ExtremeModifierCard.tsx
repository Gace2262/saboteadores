"use client";

import { motion } from "framer-motion";
import type { ExtremeModifier } from "@/data/extremeModifiers";

export function ExtremeModifierCard({
  modifier,
  selected,
  onSelect,
}: {
  modifier: ExtremeModifier;
  selected: boolean;
  onSelect: () => void;
}) {
  const positive = modifier.polarity === "positive";
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className={`min-h-44 rounded-lg border p-4 text-left transition ${
        selected
          ? positive
            ? "border-emerald-200 bg-emerald-300/12 shadow-[0_0_28px_rgba(110,231,183,0.22)]"
            : "border-rose-200 bg-rose-500/12 shadow-[0_0_28px_rgba(251,113,133,0.22)]"
          : "border-white/10 bg-black/42 hover:border-amber-100/30"
      }`}
    >
      <p className={`text-xs font-black uppercase ${positive ? "text-emerald-100/70" : "text-rose-100/70"}`}>
        {positive ? "Bendicion dudosa" : "Condena opcional"}
      </p>
      <h3 className="mt-2 text-xl font-black text-white">{modifier.name}</h3>
      <p className="mt-3 text-sm text-white/62">{modifier.effect}</p>
      <p className="mt-3 text-sm font-bold text-amber-100/72">{modifier.text}</p>
    </motion.button>
  );
}
