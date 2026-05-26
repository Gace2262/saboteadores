"use client";

import { motion } from "framer-motion";
import { DoorOpen, LockKeyhole, Trophy } from "lucide-react";
import Link from "next/link";
import type { GameModeDefinition } from "@/data/gameModes";
import type { ModeProgress } from "@/store/modeStore";

export function GameModeCard({ mode, record }: { mode: GameModeDefinition; record?: ModeProgress }) {
  return (
    <motion.article
      whileHover={{ y: -6, rotateX: 2 }}
      className="relative overflow-hidden rounded-lg border border-amber-100/16 bg-black/52 p-5 shadow-[0_0_30px_rgba(0,0,0,0.35)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(242,211,123,0.16),transparent_26%),radial-gradient(circle_at_85%_20%,rgba(139,30,63,0.2),transparent_32%)]" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase text-amber-100/60">{mode.difficulty}</p>
            <h2 className="mt-1 text-3xl font-black">{mode.name}</h2>
          </div>
          <div className="grid size-12 place-items-center rounded-md border border-amber-100/25 bg-amber-100/10 text-amber-100">
            {mode.unlocked ? <DoorOpen size={24} /> : <LockKeyhole size={24} />}
          </div>
        </div>
        <p className="mt-3 min-h-16 text-sm leading-6 text-white/64">{mode.concept}</p>
        <p className="mt-3 rounded-md border border-white/10 bg-white/6 p-3 text-sm italic text-white/58">{mode.narratorLine}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-white/58">
          <span className="rounded bg-black/45 p-2">Jugadas <strong className="block text-white">{record?.plays ?? 0}</strong></span>
          <span className="rounded bg-black/45 p-2">Victorias <strong className="block text-white">{record?.wins ?? 0}</strong></span>
          <span className="rounded bg-black/45 p-2">Record <strong className="block text-white">{record?.bestScore ?? record?.bestWave ?? 0}</strong></span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {mode.rewards.slice(0, 2).map((reward) => (
            <span key={reward} className="inline-flex items-center gap-1 rounded border border-amber-100/18 bg-amber-100/10 px-2 py-1 text-xs font-black text-amber-100">
              <Trophy size={12} />
              {reward}
            </span>
          ))}
        </div>
        <Link
          href={mode.route}
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-amber-200 px-4 text-sm font-black uppercase text-black transition hover:bg-white"
        >
          Entrar al portal
        </Link>
      </div>
    </motion.article>
  );
}
