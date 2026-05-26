"use client";

import { motion, AnimatePresence } from "framer-motion";
import { audioEvents } from "@/data/audioEvents";
import { useAudioStore } from "@/store/audioStore";

export function MusicTransitionOverlay() {
  const eventId = useAudioStore((state) => state.currentAudioEvent);
  const clearAudioEvent = useAudioStore((state) => state.clearAudioEvent);
  const event = eventId ? audioEvents[eventId] : undefined;
  return (
    <AnimatePresence>
      {event ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-50 grid place-items-center bg-black/70 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => window.setTimeout(clearAudioEvent, 900)}
        >
          <div className="rounded-lg border border-amber-100/25 bg-black/70 p-8 text-center shadow-[0_0_80px_rgba(214,170,69,0.25)]">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-100/65">{event.transition}</p>
            <h2 className="mt-2 text-5xl font-black uppercase">{event.title}</h2>
            <p className="mt-3 text-amber-100">{event.subtitle}</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
