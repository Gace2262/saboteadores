"use client";

import { AnimatePresence, motion } from "framer-motion";

export function ImpactText({ text, reducedMotion }: { text?: string; reducedMotion: boolean }) {
  return (
    <AnimatePresence>
      {text ? (
        <motion.div
          className="pointer-events-none fixed left-1/2 top-[18%] z-50 w-[min(760px,92vw)] -translate-x-1/2 rounded-lg border border-amber-100/45 bg-black/80 px-6 py-4 text-center shadow-[0_0_40px_rgba(242,211,123,0.24)]"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -24, scale: 0.96 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -18, scale: 1.03 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.25 }}
        >
          <p className="text-balance text-xl font-black uppercase text-amber-100 md:text-3xl">{text}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
