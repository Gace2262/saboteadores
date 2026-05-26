"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { MajorCinematic } from "@/logic/boss/cinematicResolver";
import { CinematicSubtitle } from "./CinematicSubtitle";

type PhaseTransitionOverlayProps = {
  cinematic?: MajorCinematic;
  onClose: () => void;
  simplified?: boolean;
};

export function PhaseTransitionOverlay({ cinematic, onClose, simplified }: PhaseTransitionOverlayProps) {
  useEffect(() => {
    if (!cinematic) return;
    const timeout = window.setTimeout(onClose, simplified ? 1800 : 4200);
    return () => window.clearTimeout(timeout);
  }, [cinematic, onClose, simplified]);

  return (
    <AnimatePresence>
      {cinematic ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/86 p-5 text-white"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: simplified ? 1 : 0.9, y: simplified ? 0 : 28 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: simplified ? 0.15 : 0.55 }}
            className="relative max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-amber-100/25 bg-zinc-950/95 p-7 text-center shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(242,211,123,0.18),transparent_36%),radial-gradient(circle_at_10%_90%,rgba(220,38,38,0.16),transparent_30%)]" />
            <div className="relative">
              <button className="absolute right-0 top-0 rounded border border-white/10 bg-white/10 px-3 py-2 text-xs font-black uppercase text-white/70 transition hover:bg-white/18" onClick={onClose}>
                Cerrar
              </button>
              <p className="text-xs font-black uppercase tracking-[0.32em] text-amber-100/60">Cinematica mayor</p>
              <h2 className="mt-3 text-4xl font-black uppercase md:text-6xl">{cinematic.title}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">{cinematic.subtitle}</p>
              <div className="mx-auto mt-7 grid max-w-3xl gap-3">
                {cinematic.soundLabels.map((line) => (
                  <CinematicSubtitle key={line} line={line} tone={cinematic.intensity > 90 ? "red" : "gold"} />
                ))}
                {cinematic.lines.map((line) => (
                  <p key={line} className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/72">
                    {line}
                  </p>
                ))}
              </div>
              <button className="campaign-action mx-auto mt-7 max-w-xs" onClick={onClose}>
                Continuar el juicio
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
