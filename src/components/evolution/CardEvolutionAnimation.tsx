"use client";

import { motion } from "framer-motion";

export function CardEvolutionAnimation({ title = "La carta recordo demasiado" }: { title?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-amber-100/20 bg-amber-100/10 p-5"
    >
      <p className="text-xs font-black uppercase text-amber-100/70">Evento especial</p>
      <h2 className="mt-1 text-3xl font-black">{title}</h2>
      <p className="mt-2 text-white/60">Pantalla oscura, carta flotando, grietas, luz interna y cadenas que por fin renuncian.</p>
    </motion.div>
  );
}
