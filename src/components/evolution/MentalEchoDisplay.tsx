"use client";

import { motion } from "framer-motion";

export function MentalEchoDisplay({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-violet-100/18 bg-violet-950/20 p-4"
    >
      <p className="text-xs font-black uppercase text-violet-100/60">Eco mental</p>
      <p className="mt-2 text-xl font-black italic text-white/82">{text}</p>
    </motion.div>
  );
}
