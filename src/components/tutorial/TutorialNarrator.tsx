"use client";

import { motion } from "framer-motion";

export function TutorialNarrator({ text, title = "Narrador del Tribunal" }: { text: string; title?: string }) {
  return (
    <motion.aside initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-amber-100/20 bg-black/72 p-5">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-100/60">{title}</p>
      <p className="mt-3 text-xl font-black text-white">{text}</p>
    </motion.aside>
  );
}
