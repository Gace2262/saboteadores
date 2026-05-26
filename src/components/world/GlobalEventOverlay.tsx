"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useWorldStore } from "@/store/worldStore";

export function GlobalEventOverlay() {
  const { activeWorldEvent, clearGlobalEvent, fullSubtitles } = useWorldStore();
  return (
    <AnimatePresence>
      {activeWorldEvent ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/82 p-5 text-white">
          <motion.section initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0 }} className="w-full max-w-3xl rounded-lg border border-amber-100/25 bg-zinc-950 p-7 text-center shadow-2xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-100/60">Evento global</p>
            <h2 className="mt-3 text-4xl font-black uppercase md:text-6xl">{activeWorldEvent.name}</h2>
            <p className="mt-4 text-lg font-bold text-amber-100">{activeWorldEvent.effect}</p>
            <p className="mx-auto mt-4 max-w-xl text-white/64">{activeWorldEvent.flavor}</p>
            {fullSubtitles ? (
              <div className="mx-auto mt-6 grid max-w-xl gap-2">
                <p className="rounded border border-white/10 bg-white/5 px-4 py-3 text-sm font-black uppercase text-white/70">[EL UNIVERSO DEL TRIBUNAL RESPIRA]</p>
                <p className="rounded border border-white/10 bg-white/5 px-4 py-3 text-sm font-black uppercase text-amber-100">[{activeWorldEvent.climate}]</p>
              </div>
            ) : null}
            <button className="campaign-action mx-auto mt-7 max-w-xs" onClick={clearGlobalEvent}>
              Archivar evento
            </button>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
