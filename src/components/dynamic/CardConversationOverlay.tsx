"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useTribunalStore } from "@/store/tribunalStore";

export function CardConversationOverlay() {
  const lines = useTribunalStore((state) => state.activeCardConversation);
  const setCardConversation = useTribunalStore((state) => state.setCardConversation);

  useEffect(() => {
    if (!lines?.length) return;
    const timer = window.setTimeout(() => setCardConversation(undefined), 4500);
    return () => window.clearTimeout(timer);
  }, [lines, setCardConversation]);

  return (
    <AnimatePresence>
      {lines?.length ? (
        <motion.div className="fixed left-1/2 top-28 z-40 w-[min(520px,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-violet-100/16 bg-black/78 p-4 text-white backdrop-blur" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <p className="text-xs font-black uppercase text-violet-100/60">Cartas discutiendo</p>
          <div className="mt-3 grid gap-2">
            {lines.map((line, index) => (
              <p key={`${line}-${index}`} className={`rounded-md p-3 text-sm ${index % 2 ? "bg-amber-100/10 text-amber-100" : "bg-violet-400/10 text-violet-100"}`}>
                {line}
              </p>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
