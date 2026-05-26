"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Gavel, X } from "lucide-react";
import { useProgressionStore } from "@/store/progressionStore";
import { useVisualStore } from "@/store/visualStore";

export function JudgmentNotification() {
  const { notifications, dismissNotification, cleanCompetitiveMode } = useProgressionStore();
  const reducedMotion = useVisualStore((state) => state.reducedMotion);
  if (cleanCompetitiveMode) return null;
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 grid w-[min(360px,calc(100vw-2rem))] gap-3">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 40, scale: 0.96 }}
            className="pointer-events-auto relative overflow-hidden rounded-lg border border-amber-100/25 bg-black/82 p-4 text-white shadow-[0_0_30px_rgba(0,0,0,0.6)]"
          >
            <div className="absolute inset-0 court-fog opacity-35" />
            <div className="relative flex items-start gap-3">
              <div className="grid size-10 place-items-center rounded-md border border-amber-100/25 bg-amber-100/10 text-amber-100">
                <Gavel size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black uppercase text-amber-100">{notification.title}</p>
                <p className="mt-1 text-sm font-black leading-5 text-white/82">{notification.message}</p>
              </div>
              <button className="rounded border border-white/10 p-1 text-white/55 hover:text-white" onClick={() => dismissNotification(notification.id)}>
                <X size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
