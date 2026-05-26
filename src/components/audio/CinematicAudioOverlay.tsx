"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useAudioStore } from "@/store/audioStore";

const labels: Record<string, string> = {
  judgeEntrance: "El tribunal interno entra en sesion.",
  criticalHammer: "Martillazo critico",
  legendaryCatharsis: "Catarsis legendaria",
  mentalDefeat: "Derrota mental",
  judgeVictory: "Victoria contra El Juez",
};

export function CinematicAudioOverlay() {
  const { cinematicEvent, clearCinematic, reduceFlashes } = useAudioStore();

  useEffect(() => {
    if (!cinematicEvent) return;
    const timer = window.setTimeout(clearCinematic, 1700);
    return () => window.clearTimeout(timer);
  }, [cinematicEvent, clearCinematic]);

  return (
    <AnimatePresence>
      {cinematicEvent ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[65] grid place-items-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, reduceFlashes ? 0.3 : 0.8, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.7 }}
        >
          <motion.div
            className="rounded-lg border border-amber-100/35 bg-black/72 px-8 py-6 text-center shadow-[0_0_90px_rgba(252,211,77,0.25)]"
            animate={reduceFlashes ? { scale: 1 } : { scale: [0.94, 1.05, 1] }}
          >
            <p className="text-xs font-black uppercase text-amber-100/60">Evento cinematografico</p>
            <h2 className="mt-2 text-4xl font-black text-amber-100">{labels[cinematicEvent]}</h2>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
