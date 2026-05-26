"use client";

import { AnimatePresence, motion } from "framer-motion";

export function AITauntBubble({ text, color = "#f2d37b" }: { text?: string; color?: string }) {
  return (
    <AnimatePresence mode="wait">
      {text ? (
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, -8], scale: [0.96, 1, 1, 0.98] }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 2, times: [0, 0.12, 0.82, 1] }}
          className="relative rounded-lg border bg-black/78 p-3 text-sm font-bold leading-5 shadow-2xl"
          style={{ borderColor: `${color}88`, boxShadow: `0 0 28px ${color}33` }}
        >
          <span className="absolute -top-2 right-8 h-4 w-4 rotate-45 border-l border-t bg-black" style={{ borderColor: `${color}88` }} />
          <p style={{ color }}>{text}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
