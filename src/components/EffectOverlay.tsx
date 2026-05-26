"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DemoVisualEffect } from "@/types/game";
import { soundtrackController } from "@/logic/audio/soundtrackController";
import { mapVisualEffectToSfx } from "@/logic/audio/sfxEngine";
import { FactionSymbol } from "./art/FactionSymbol";

type Props = {
  effect?: DemoVisualEffect;
  muted: boolean;
  reducedMotion: boolean;
  onDone: () => void;
};

const labels: Record<DemoVisualEffect, { title: string; subtitle: string; faction: string; className: string }> = {
  hammer_slam: {
    title: "Martillazo",
    subtitle: "Sello judicial en impacto",
    faction: "juez",
    className: "from-amber-200/28 via-black/30 to-amber-950/22",
  },
  chains: {
    title: "Cadenas",
    subtitle: "Bloqueo registrado",
    faction: "controlador",
    className: "from-slate-300/20 via-black/35 to-amber-950/18",
  },
  horse_stampede: {
    title: "Estampida",
    subtitle: "La agenda aprendio a galopar",
    faction: "inquieto",
    className: "from-orange-500/20 via-black/30 to-red-950/24",
  },
  panic_pulse: {
    title: "Pulso de panico",
    subtitle: "La ansiedad pidio altavoces",
    faction: "hipervigilante",
    className: "from-red-500/22 via-black/35 to-violet-950/22",
  },
  liberation_burst: {
    title: "Catarsis",
    subtitle: "La claridad rompio el vidrio",
    faction: "conciencia",
    className: "from-white/26 via-amber-100/16 to-cyan-200/18",
  },
  hit: {
    title: "Impacto",
    subtitle: "Dano archivado",
    faction: "perfeccionista",
    className: "from-rose-500/20 via-black/35 to-amber-950/18",
  },
  shimmer: {
    title: "Claridad",
    subtitle: "Decision financiada",
    faction: "conciencia",
    className: "from-white/24 via-cyan-100/16 to-amber-100/18",
  },
  error: {
    title: "Error mental",
    subtitle: "El expediente se mordio solo",
    faction: "juez",
    className: "from-red-600/22 via-black/40 to-zinc-950",
  },
};

export function EffectOverlay({ effect, muted, reducedMotion, onDone }: Props) {
  useEffect(() => {
    if (!effect) return;
    if (!muted) soundtrackController.playSfx(mapVisualEffectToSfx(effect));
    const timer = window.setTimeout(onDone, reducedMotion ? 360 : 900);
    return () => window.clearTimeout(timer);
  }, [effect, muted, onDone, reducedMotion]);

  const data = effect ? labels[effect] : undefined;

  return (
    <AnimatePresence>
      {effect && data ? (
        <motion.div
          className={`pointer-events-none fixed inset-0 z-40 grid place-items-center bg-gradient-to-br ${data.className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {effect === "hammer_slam" ? <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_0_18%,rgba(242,211,123,0.22)_19%,transparent_20%_100%)]" /> : null}
          {effect === "chains" ? (
            <>
              <div className="absolute left-[-8%] top-1/3 h-10 w-[120%] rotate-[-16deg] border-y border-amber-100/22 bg-[repeating-linear-gradient(90deg,rgba(242,211,123,0.22)_0_14px,transparent_14px_34px)]" />
              <div className="absolute left-[-8%] top-1/2 h-10 w-[120%] rotate-[14deg] border-y border-amber-100/18 bg-[repeating-linear-gradient(90deg,rgba(148,163,184,0.18)_0_14px,transparent_14px_34px)]" />
            </>
          ) : null}
          {effect === "horse_stampede" ? <div className="absolute inset-x-0 bottom-1/3 h-20 bg-[repeating-linear-gradient(100deg,transparent_0_32px,rgba(0,0,0,0.6)_33px,transparent_52px)] blur-[1px]" /> : null}
          {effect === "panic_pulse" ? <div className="absolute inset-4 rounded-3xl border border-red-300/30 shadow-[inset_0_0_80px_rgba(239,68,68,0.24)]" /> : null}
          {effect === "liberation_burst" ? <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.38),transparent_38%)]" /> : null}

          <motion.div
            initial={{ scale: reducedMotion ? 1 : 0.78, y: reducedMotion ? 0 : 22 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            className="relative rounded-xl border border-amber-100/32 bg-black/78 px-8 py-6 text-center shadow-[0_0_90px_rgba(242,211,123,0.28)]"
          >
            <FactionSymbol faction={data.faction} className="mx-auto h-16 w-16" />
            <p className="mt-4 text-4xl font-black text-amber-100">{data.title}</p>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-white/58">[{data.subtitle}]</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
