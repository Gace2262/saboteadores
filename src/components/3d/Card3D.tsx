"use client";

import { motion } from "framer-motion";
import type { Card as CardData } from "@/data/cards";
import { getFaction } from "@/data/factions";
import { getRarityAnimation } from "@/logic/visual/getRarityAnimation";
import { CardFrame } from "@/components/cards/CardFrame";
import { CardHolographicLayer } from "./CardHolographicLayer";
import { CardShadowAura } from "./CardShadowAura";
import { CardTiltWrapper } from "./CardTiltWrapper";

export type CardVisualState =
  | "normal"
  | "hover"
  | "selected"
  | "playable"
  | "blocked"
  | "cursed"
  | "legendary"
  | "casting"
  | "exhausted";

export function Card3D({
  card,
  disabled,
  selected,
  compact = false,
  state = "normal",
  onClick,
}: {
  card: CardData;
  disabled?: boolean;
  selected?: boolean;
  compact?: boolean;
  state?: CardVisualState;
  onClick?: () => void;
}) {
  const faction = getFaction(card.faction);
  const rarity = getRarityAnimation(card.rarity);
  const visualState = disabled ? "blocked" : selected ? "selected" : card.rarity === "maldita" ? "cursed" : card.rarity === "legendaria" ? "legendary" : state;

  return (
    <CardTiltWrapper disabled={disabled} selected={selected}>
      <motion.button
        layout
        whileTap={{ scale: disabled ? 1 : 0.985 }}
        disabled={disabled}
        onClick={onClick}
        data-card-state={visualState}
        className={`gold-card card-3d relative flex w-full flex-col overflow-hidden rounded-lg border p-4 text-left transition ${
          compact ? "min-h-44" : "min-h-72"
        } ${rarity.borderClass} ${rarity.auraClass} ${selected ? "ring-2 ring-amber-200" : ""} ${
          disabled ? "opacity-45 grayscale-[0.35]" : "hover:border-amber-100"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <CardShadowAura card={card} />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: `radial-gradient(circle at 20% 0%, ${faction?.color ?? "#d7a74f"}55, transparent 38%), linear-gradient(145deg, rgba(255,255,255,0.08), transparent 42%, rgba(0,0,0,0.42))`,
          }}
        />
        <CardHolographicLayer card={card} />
        <CardFrame card={card} compact={compact} />
      </motion.button>
    </CardTiltWrapper>
  );
}
