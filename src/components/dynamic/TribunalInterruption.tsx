"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useTribunalStore } from "@/store/tribunalStore";

const judgeLines = [
  "Volviste.",
  "La ultima derrota sigue archivada.",
  "Tu mazo aprendio habitos preocupantes.",
  "Las cadenas te reconocen.",
  "El tribunal detecto reincidencia emocional.",
];

export function TribunalInterruption() {
  const event = useTribunalStore((state) => state.activeEvent);
  const clearEvent = useTribunalStore((state) => state.clearEvent);
  const stableMode = useTribunalStore((state) => state.stableMode);
  const reduceCorruptionVisuals = useTribunalStore((state) => state.reduceCorruptionVisuals);
  const visible = !stableMode && event?.type === "judge_interruption";

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(clearEvent, reduceCorruptionVisuals ? 1400 : 2600);
    return () => window.clearTimeout(timer);
  }, [clearEvent, reduceCorruptionVisuals, visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/78 px-5 text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ scale: 0.96, y: 12 }} animate={{ scale: 1, y: 0 }} className="max-w-2xl rounded-lg border border-amber-100/25 bg-black/82 p-8 text-center shadow-[0_0_60px_rgba(242,211,123,0.18)]">
            <p className="text-sm font-black uppercase text-amber-100/65">Interrupcion del Juez</p>
            <h2 className="mt-3 text-5xl font-black">{judgeLines[(event.id.length + event.intensity) % judgeLines.length]}</h2>
            <p className="mt-4 text-white/62">{event.visual}</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
