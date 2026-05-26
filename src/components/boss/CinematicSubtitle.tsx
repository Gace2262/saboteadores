"use client";

import { motion } from "framer-motion";

type CinematicSubtitleProps = {
  title?: string;
  line: string;
  tone?: "gold" | "red" | "white";
};

export function CinematicSubtitle({ title, line, tone = "gold" }: CinematicSubtitleProps) {
  const toneClass = tone === "red" ? "border-red-300/30 text-red-100" : tone === "white" ? "border-white/30 text-white" : "border-amber-100/30 text-amber-100";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      className={`rounded-md border bg-black/70 px-4 py-3 text-center shadow-2xl backdrop-blur ${toneClass}`}
    >
      {title ? <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/45">{title}</p> : null}
      <p className="mt-1 text-sm font-black uppercase md:text-base">{line}</p>
    </motion.div>
  );
}
