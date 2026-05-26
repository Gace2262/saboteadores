"use client";

import { motion } from "framer-motion";

export function CursedCardScene({ text, reducedMotion }: { text: string; reducedMotion?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black/88">
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute h-1 w-full bg-rose-400/35"
          style={{ top: `${index * 6}%` }}
          animate={reducedMotion ? { opacity: 0.35 } : { x: ["-18%", "24%", "-10%"], opacity: [0, 0.9, 0] }}
          transition={{ duration: 0.25, repeat: reducedMotion ? 0 : 5, delay: index * 0.02 }}
        />
      ))}
      <motion.div
        className="absolute left-1/2 top-1/2 grid h-80 w-60 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg border border-rose-200 bg-rose-950/50 text-center text-3xl font-black uppercase text-rose-100"
        animate={reducedMotion ? {} : { x: ["-50%", "-48%", "-52%", "-50%"], rotate: [-1, 1, -1] }}
      >
        ERROR DEL ALMA
      </motion.div>
      <p className="absolute bottom-[16%] w-full px-5 text-center text-2xl font-black text-rose-100">{text}</p>
    </div>
  );
}
