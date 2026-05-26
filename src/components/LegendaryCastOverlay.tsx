"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { CardCast } from "@/store/gameStore";

export function LegendaryCastOverlay({ cast, reducedMotion }: { cast?: CardCast; reducedMotion: boolean }) {
  const show = Boolean(cast && (cast.card.rarity === "legendaria" || cast.card.id === "el-juez"));

  return (
    <AnimatePresence>
      {show && cast ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[35] overflow-hidden bg-black/78"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,211,123,0.18),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(159,92,255,0.14),transparent_38%)]"
            animate={reducedMotion ? {} : { scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <motion.div
            className="chain-stripe absolute left-[-15%] top-[34%] h-10 w-[130%] rotate-12"
            initial={{ x: "-35%" }}
            animate={{ x: "0%" }}
            transition={{ duration: reducedMotion ? 0.1 : 0.45 }}
          />
          <motion.div
            className="chain-stripe absolute left-[-15%] top-[62%] h-10 w-[130%] -rotate-12"
            initial={{ x: "35%" }}
            animate={{ x: "0%" }}
            transition={{ duration: reducedMotion ? 0.1 : 0.45 }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 w-[min(760px,92vw)] -translate-x-1/2 -translate-y-1/2 text-center"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 30 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-sm font-black uppercase text-amber-100/60">
              {cast.card.id === "el-juez" ? "Aparicion especial del fiscal interno" : "Carta legendaria"}
            </p>
            <h2 className="mt-3 text-5xl font-black uppercase text-amber-100 md:text-7xl">{cast.card.name}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-black text-white/78">{cast.card.impactText}</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
