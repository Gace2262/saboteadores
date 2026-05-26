"use client";

import { Brain, Coffee, Gavel, Moon, Scale, ShoppingBag, Swords } from "lucide-react";
import type { CampaignNode as CampaignNodeData } from "@/data/campaignNodes";

const iconMap = {
  combate: Swords,
  evento: Brain,
  descanso: Moon,
  tienda: ShoppingBag,
  jefe: Scale,
  juicio: Gavel,
};

export function CampaignNode({
  node,
  unlocked,
  completed,
  onSelect,
}: {
  node: CampaignNodeData;
  unlocked: boolean;
  completed: boolean;
  onSelect: () => void;
}) {
  const Icon = iconMap[node.type] ?? Coffee;
  const final = node.type === "juicio";

  return (
    <button
      onClick={onSelect}
      disabled={!unlocked}
      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border text-left transition ${
        final ? "h-24 w-24" : "h-16 w-16"
      } ${
        completed
          ? "border-emerald-200 bg-emerald-300/18 text-emerald-100"
          : unlocked
            ? "border-amber-100/70 bg-amber-200/16 text-amber-100 shadow-[0_0_28px_rgba(242,211,123,0.28)] hover:scale-110"
            : "border-white/10 bg-white/5 text-white/25"
      }`}
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      title={`${node.title}: ${node.subtitle}`}
    >
      <span className="grid h-full w-full place-items-center">
        <Icon size={final ? 34 : 24} />
      </span>
      <span className="sr-only">{node.title}</span>
    </button>
  );
}
