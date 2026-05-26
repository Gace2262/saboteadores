"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { RandomJudgmentEvent } from "@/data/randomJudgmentEvents";

export function RandomHammerEvent({ event, reducedFlashes, onClose }: { event?: RandomJudgmentEvent; reducedFlashes: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {event ? (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center bg-black/82 px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => window.setTimeout(onClose, reducedFlashes ? 650 : 1400)}
        >
          <motion.div
            className="max-w-2xl rounded-lg border border-amber-100/35 bg-zinc-950 p-8 text-center shadow-[0_0_80px_rgba(251,191,36,0.22)]"
            initial={{ scale: 0.8, rotate: -3 }}
            animate={reducedFlashes ? { scale: 1, rotate: 0 } : { scale: [0.8, 1.08, 1], rotate: [-3, 3, 0] }}
          >
            <p className="text-sm font-black uppercase text-rose-100/70">Martillazo Aleatorio</p>
            <h2 className="mt-2 text-5xl font-black text-amber-100">{event.name}</h2>
            <p className="mt-5 text-2xl font-bold text-white">{event.text}</p>
            <p className="mt-4 text-white/58">{event.effect}</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
