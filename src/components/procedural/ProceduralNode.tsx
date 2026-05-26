"use client";

import type { ProceduralNode as ProceduralNodeType } from "@/logic/procedural/proceduralTypes";

type Props = {
  node: ProceduralNodeType;
  visited: boolean;
  onSelect: () => void;
};

const tone = {
  combate: "border-red-200/25 bg-red-500/15",
  elite: "border-rose-200/35 bg-rose-600/20",
  evento: "border-cyan-200/25 bg-cyan-300/12",
  descanso: "border-emerald-200/25 bg-emerald-300/12",
  tienda: "border-amber-200/25 bg-amber-300/12",
  anomalia: "border-violet-200/30 bg-violet-500/16",
  recompensa: "border-yellow-200/25 bg-yellow-300/12",
  boss: "border-orange-200/35 bg-orange-500/20",
  juicio: "border-amber-100/50 bg-amber-300/20",
  secreto: "border-fuchsia-200/35 bg-fuchsia-500/16",
};

export function ProceduralNode({ node, visited, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border p-1 text-[10px] font-black uppercase text-white shadow-[0_0_30px_rgba(242,211,123,0.12)] transition hover:scale-110 ${tone[node.type]} ${visited ? "ring-2 ring-emerald-200" : ""}`}
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      title={`${node.title}: ${node.subtitle}`}
    >
      {node.type}
    </button>
  );
}
