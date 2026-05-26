"use client";

import { motion } from "framer-motion";

export function TutorialCardPointer({ label }: { label: string }) {
  return (
    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 1.2, repeat: Infinity }} className="absolute -top-10 left-1/2 -translate-x-1/2 rounded bg-amber-200 px-3 py-2 text-xs font-black uppercase text-black shadow-lg">
      {label}
      <span className="absolute left-1/2 top-full h-4 w-4 -translate-x-1/2 rotate-45 bg-amber-200" />
    </motion.div>
  );
}
