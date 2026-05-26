"use client";

import { BossPortrait } from "@/components/art/BossPortrait";
import { perfeccionistaAscendido } from "@/data/enemies";
import type { DemoCombatant } from "@/types/game";
import { ResourceBar } from "./ResourceBar";

type Props = {
  enemy: DemoCombatant;
  phase: 1 | 2 | 3;
  phrase: string;
  reducedMotion?: boolean;
};

const phaseTone = {
  1: "border-amber-100/22 bg-[linear-gradient(145deg,rgba(28,25,23,0.82),rgba(5,3,8,0.74))]",
  2: "border-orange-100/32 bg-[linear-gradient(145deg,rgba(69,26,3,0.42),rgba(5,3,8,0.78))]",
  3: "border-red-200/45 bg-[linear-gradient(145deg,rgba(127,29,29,0.48),rgba(5,3,8,0.82))]",
};

export function EnemyPanel({ enemy, phase, phrase, reducedMotion }: Props) {
  return (
    <aside className={`relative overflow-hidden rounded-xl border p-4 text-white shadow-[0_24px_70px_rgba(0,0,0,0.46)] ${phaseTone[phase]}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(242,211,123,0.14),transparent_26%)]" />
      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-white/48">Boss demo / fase {phase}</p>
        <h2 className="mt-1 text-3xl font-black">{perfeccionistaAscendido.name}</h2>
        <div className="mt-4">
          <BossPortrait phase={phase} reducedMotion={reducedMotion} />
        </div>
        <p className="mt-3 rounded-lg border border-amber-100/18 bg-black/45 p-3 text-sm font-bold leading-5 text-amber-100">
          {phrase}
        </p>
        <div className="mt-4 grid gap-3">
          <ResourceBar label="Voluntad" value={enemy.will} max={45} tone="red" />
          <ResourceBar label="Claridad" value={enemy.clarity} max={10} tone="blue" />
          <ResourceBar label="Estres" value={enemy.stress} max={12} tone="violet" />
        </div>
        {enemy.blocked ? <p className="mt-3 rounded border border-cyan-200/25 bg-cyan-400/10 p-2 text-sm font-bold text-cyan-100">Bloqueado proximo turno</p> : null}
      </div>
    </aside>
  );
}
