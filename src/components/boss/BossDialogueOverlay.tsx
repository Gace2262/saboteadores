"use client";

import { motion } from "framer-motion";

type BossDialogueOverlayProps = {
  name: string;
  quote: string;
};

export function BossDialogueOverlay({ name, quote }: BossDialogueOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-amber-100/20 bg-black/72 p-4 shadow-2xl backdrop-blur"
    >
      <p className="text-xs font-black uppercase tracking-[0.26em] text-amber-100/65">{name}</p>
      <p className="mt-2 text-xl font-black text-white">{quote}</p>
    </motion.div>
  );
}
