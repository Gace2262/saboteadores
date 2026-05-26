"use client";

import { motion } from "framer-motion";

export function GoldenSeal({ text = "JUICIO" }: { text?: string }) {
  return (
    <motion.div
      className="grid h-64 w-64 place-items-center rounded-full border-[10px] border-amber-200/85 text-center text-5xl font-black uppercase text-amber-100 shadow-[0_0_90px_rgba(252,211,77,0.7)]"
      initial={{ scale: 2.4, opacity: 0, rotate: -18 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0.7, opacity: 0 }}
    >
      {text}
    </motion.div>
  );
}
