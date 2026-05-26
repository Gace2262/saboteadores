"use client";

import { motion } from "framer-motion";
import { Eye, Gavel, ShieldAlert } from "lucide-react";
import type { ColossalBoss } from "@/data/cinematicBosses";
import type { EnvironmentState } from "@/logic/boss/environmentController";

type ColossalBossRendererProps = {
  boss: ColossalBoss;
  environment: EnvironmentState;
};

const bossColor: Record<ColossalBoss["id"], string> = {
  "juez-supremo": "from-amber-200 via-yellow-600 to-zinc-950",
  "perfeccionista-ascendido": "from-white via-amber-100 to-zinc-900",
  "hipervigilante-omega": "from-red-300 via-rose-700 to-zinc-950",
  "caballeria-burnout": "from-orange-300 via-red-800 to-black",
};

export function ColossalBossRenderer({ boss, environment }: ColossalBossRendererProps) {
  const icon = boss.id === "juez-supremo" ? <Gavel size={76} /> : boss.id === "hipervigilante-omega" ? <Eye size={76} /> : <ShieldAlert size={76} />;
  return (
    <div className="relative min-h-[460px] overflow-hidden rounded-lg border border-amber-100/15 bg-black/60">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(242,211,123,0.18),transparent_32%),radial-gradient(circle_at_50%_90%,rgba(190,24,93,0.16),transparent_40%)]" />
      <motion.div
        animate={{ scale: [1, 1.025, 1], y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute left-1/2 top-[8%] h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-amber-100/20"
        style={{
          boxShadow: `0 0 ${80 + environment.cracks * 80}px rgba(242,211,123,.24), inset 0 0 80px rgba(255,255,255,.08)`,
        }}
      />
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-8 h-[360px] w-[360px] -translate-x-1/2 rounded-full border border-dashed border-amber-100/25"
      />
      <motion.div
        animate={{ y: [0, -14, 0], filter: [`blur(${environment.distortion * 2}px)`, `blur(${environment.distortion * 5}px)`, `blur(${environment.distortion * 2}px)`] }}
        transition={{ duration: 3.8, repeat: Infinity }}
        className={`absolute left-1/2 top-16 flex h-[360px] w-[300px] -translate-x-1/2 flex-col items-center justify-center rounded-t-[140px] bg-gradient-to-b ${bossColor[boss.id]} p-6 text-center text-black shadow-2xl`}
      >
        <div className="absolute -inset-6 rounded-t-[160px] border border-white/15" />
        <div className="text-amber-950 drop-shadow">{icon}</div>
        <h2 className="mt-6 text-3xl font-black uppercase leading-none">{boss.name}</h2>
        <p className="mt-3 text-xs font-black uppercase tracking-[0.24em] opacity-70">{boss.subtitle}</p>
      </motion.div>
      <div className="absolute inset-x-4 bottom-4 rounded-md border border-white/10 bg-black/65 p-4 backdrop-blur">
        <p className="text-sm font-black uppercase text-amber-100">{boss.arena}</p>
        <p className="mt-2 text-sm text-white/60">{boss.visual.join(" / ")}</p>
      </div>
    </div>
  );
}
