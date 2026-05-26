"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { CardCast } from "@/store/gameStore";
import { Card } from "./Card";

export function AnimatedCardCast({ cast, reducedMotion }: { cast?: CardCast; reducedMotion: boolean }) {
  return (
    <AnimatePresence>
      {cast ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-40 grid place-items-center bg-black/45"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-[min(330px,82vw)]"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.45, rotate: -12, y: 80 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1.08, rotate: 0, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.86, y: -40 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.42, type: "spring", bounce: 0.36 }}
          >
            <Card card={cast.card} disabled />
            <p className="mt-4 rounded-md border border-amber-100/30 bg-black/75 p-3 text-center text-sm font-black uppercase text-amber-100">
              {cast.caster === "player" ? "Argumento de la defensa" : "Fiscalia del Juez Interior"}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
