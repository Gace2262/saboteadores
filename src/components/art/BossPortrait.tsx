"use client";

import { motion } from "framer-motion";
import { FactionSymbol } from "./FactionSymbol";

type Props = {
  phase: 1 | 2 | 3;
  reducedMotion?: boolean;
};

export function BossPortrait({ phase, reducedMotion }: Props) {
  const phaseClass =
    phase === 1
      ? "from-stone-950 via-zinc-900 to-amber-950"
      : phase === 2
        ? "from-stone-950 via-red-950 to-zinc-950"
        : "from-red-950 via-black to-amber-950";

  return (
    <div className={`relative h-56 overflow-hidden rounded-xl border border-amber-100/20 bg-gradient-to-br ${phaseClass}`}>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:34px_34px]" />
      <div className="absolute inset-0 [background-image:linear-gradient(42deg,transparent_0_47%,rgba(242,211,123,0.22)_48%,transparent_49%_100%),linear-gradient(118deg,transparent_0_57%,rgba(248,113,113,0.18)_58%,transparent_59%_100%)]" />
      <motion.div
        className="absolute left-1/2 top-8 h-28 w-28 -translate-x-1/2 rounded-full border border-amber-100/40 bg-black/40 shadow-[0_0_58px_rgba(242,211,123,0.2)]"
        animate={reducedMotion ? {} : phase === 3 ? { scale: [1, 1.04, 1], x: [0, 1, -1, 0] } : { scale: [1, 1.02, 1] }}
        transition={{ duration: phase === 3 ? 0.8 : 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute left-1/2 top-10 h-4 w-16 -translate-x-1/2 rounded-full bg-cyan-100/80 shadow-[0_0_22px_rgba(103,232,249,0.55)]" />
      </motion.div>
      <div className="absolute bottom-7 left-1/2 h-20 w-36 -translate-x-1/2 rounded-t-full border border-amber-100/20 bg-black/45" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <FactionSymbol faction="perfeccionista" className="h-16 w-16" />
      </div>
      {phase === 3 ? (
        <div className="absolute left-3 right-3 top-3 rounded border border-red-300/40 bg-red-950/45 px-3 py-2 text-center text-xs font-black uppercase text-red-100 shadow-[0_0_28px_rgba(248,113,113,0.24)]">
          Error imperdonable
        </div>
      ) : null}
    </div>
  );
}
