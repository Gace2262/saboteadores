"use client";

import { motion } from "framer-motion";

export function HorseStampedeScene({ text, reducedMotion }: { text: string; reducedMotion?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-stone-950/78">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-stone-900 via-stone-800/70 to-transparent" />
      {Array.from({ length: 7 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute h-24 w-48 rounded-[50%] bg-black/80 blur-sm"
          style={{ bottom: `${12 + index * 10}%` }}
          initial={{ x: "-35vw", opacity: 0 }}
          animate={{ x: "120vw", opacity: [0, 0.95, 0] }}
          transition={{ duration: reducedMotion ? 0.25 : 1, delay: index * 0.07 }}
        />
      ))}
      <motion.p
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-5xl font-black uppercase text-rose-100"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {text}
      </motion.p>
    </div>
  );
}
