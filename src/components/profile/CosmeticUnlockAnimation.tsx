"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function CosmeticUnlockAnimation({ label = "Cosmetico desbloqueado" }: { label?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-lg border border-amber-100/20 bg-black/58 p-5 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(242,211,123,0.22),transparent_30%)]" />
      <div className="relative flex items-center gap-3">
        <Sparkles className="text-amber-100" />
        <div>
          <p className="text-xs font-black uppercase text-amber-100/65">Animacion ceremonial</p>
          <h2 className="text-2xl font-black">{label}</h2>
        </div>
      </div>
    </motion.div>
  );
}
