import type { VisualEffect } from "./cards";

export type CollectibleRarity = "comun" | "rara" | "epica" | "legendaria" | "maldita";

export type RarityDefinition = {
  id: CollectibleRarity;
  label: string;
  weight: number;
  visual: "soft_glow" | "mental_spark" | "dark_flame" | "judgment_flash" | "cursed_static";
  sound: "paper_flip" | "shimmer" | "heavy_hit" | "hammer_slam" | "void_laugh";
  combatVisual: VisualEffect;
  color: string;
};

export const rarityDefinitions: Record<CollectibleRarity, RarityDefinition> = {
  comun: {
    id: "comun",
    label: "Comun",
    weight: 1,
    visual: "soft_glow",
    sound: "paper_flip",
    combatVisual: "sarcasm_spark",
    color: "#d9d9d9",
  },
  rara: {
    id: "rara",
    label: "Rara",
    weight: 2,
    visual: "mental_spark",
    sound: "shimmer",
    combatVisual: "guilt_rain",
    color: "#80b7ff",
  },
  epica: {
    id: "epica",
    label: "Epica",
    weight: 3,
    visual: "dark_flame",
    sound: "heavy_hit",
    combatVisual: "panic_pulse",
    color: "#c084fc",
  },
  legendaria: {
    id: "legendaria",
    label: "Legendaria",
    weight: 4,
    visual: "judgment_flash",
    sound: "hammer_slam",
    combatVisual: "hammer_slam",
    color: "#f2d37b",
  },
  maldita: {
    id: "maldita",
    label: "Maldita",
    weight: 5,
    visual: "cursed_static",
    sound: "void_laugh",
    combatVisual: "void_laugh",
    color: "#ff4d6d",
  },
};
