"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTribunalStore } from "@/store/tribunalStore";

export function DynamicNarrator() {
  const narration = useTribunalStore((state) => state.activeNarration);
  const stableMode = useTribunalStore((state) => state.stableMode);

  return (
    <AnimatePresence>
      {!stableMode && narration ? (
        <motion.div
          key={narration.id}
          className="fixed bottom-24 right-4 z-40 max-w-md rounded-lg border border-white/12 bg-black/72 p-4 text-white backdrop-blur"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
        >
          <p className="text-xs font-black uppercase text-white/40">Narrador dinamico - {narration.tone}</p>
          <p className="mt-1 text-lg font-black text-white/82">{narration.text}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
