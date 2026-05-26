"use client";

import { motion } from "framer-motion";
import { useModeStore } from "@/store/modeStore";

export function MirrorEffectOverlay() {
  const { mirrorCorruption, raiseMirrorCorruption, completeModeRun } = useModeStore();
  return (
    <section className="relative overflow-hidden rounded-lg border border-violet-100/16 bg-black/52 p-5">
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(159,92,255,0.18),rgba(255,255,255,0.08))]"
        animate={{ x: ["-20%", "10%", "-20%"] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <div className="relative">
        <p className="text-sm font-black uppercase text-violet-100/65">Modo Espejo</p>
        <h2 className="mt-1 text-4xl font-black">Copia distorsionada del mazo</h2>
        <p className="mt-3 text-white/62">Casco de Autoestima se convierte en Casco de Negacion Decorativa. El reflejo no innova, pero cobra con resentimiento.</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-md border border-white/10 bg-white/6 p-4">
            <p className="text-xs font-black uppercase text-white/45">Original</p>
            <h3 className="mt-1 text-2xl font-black text-amber-100">Casco de Autoestima</h3>
            <p className="mt-2 text-sm text-white/58">Limpia Ruido Mental y gana Claridad.</p>
          </div>
          <div className="rounded-md border border-violet-100/20 bg-violet-500/10 p-4">
            <p className="text-xs font-black uppercase text-violet-100/60">Espejo</p>
            <h3 className="mt-1 text-2xl font-black text-violet-100">Casco de Negacion Decorativa</h3>
            <p className="mt-2 text-sm text-white/58">Limpia la evidencia, no el problema. Muy elegante, poco legal.</p>
          </div>
        </div>
        <div className="mt-5 h-4 overflow-hidden rounded-full border border-white/10 bg-black/55">
          <div className="h-full bg-violet-300" style={{ width: `${mirrorCorruption}%` }} />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button className="campaign-action" onClick={raiseMirrorCorruption}>Aumentar corrupcion</button>
          <button className="campaign-choice max-w-xs" onClick={() => completeModeRun("mirror", { won: true, score: mirrorCorruption * 10, reward: "Borde de cristal oscuro" })}>Vencer reflejo</button>
        </div>
      </div>
    </section>
  );
}
