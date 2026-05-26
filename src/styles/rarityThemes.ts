export type VisualRarity = "comun" | "rara" | "epica" | "legendaria" | "maldita" | "common" | "rare" | "epic" | "legendary" | "cursed";

export type RarityTheme = {
  label: string;
  border: string;
  frame: string;
  glow: string;
  text: string;
  animated: boolean;
};

const normalizedThemes: Record<"comun" | "rara" | "epica" | "legendaria" | "maldita", RarityTheme> = {
  comun: {
    label: "Comun",
    border: "border-zinc-500/45",
    frame: "from-zinc-900 via-neutral-950 to-black",
    glow: "shadow-[0_18px_42px_rgba(0,0,0,0.5)]",
    text: "text-zinc-200",
    animated: false,
  },
  rara: {
    label: "Rara",
    border: "border-cyan-300/55",
    frame: "from-blue-950 via-zinc-950 to-violet-950",
    glow: "shadow-[0_0_34px_rgba(34,211,238,0.24)]",
    text: "text-cyan-100",
    animated: true,
  },
  epica: {
    label: "Epica",
    border: "border-orange-300/60",
    frame: "from-red-950 via-zinc-950 to-amber-950",
    glow: "shadow-[0_0_40px_rgba(251,146,60,0.26)]",
    text: "text-orange-100",
    animated: true,
  },
  legendaria: {
    label: "Legendaria",
    border: "border-amber-200/80",
    frame: "from-amber-950 via-zinc-950 to-yellow-950",
    glow: "shadow-[0_0_52px_rgba(242,211,123,0.34)]",
    text: "text-amber-100",
    animated: true,
  },
  maldita: {
    label: "Maldita",
    border: "border-red-400/70",
    frame: "from-black via-red-950 to-zinc-950",
    glow: "shadow-[0_0_42px_rgba(248,113,113,0.28)]",
    text: "text-red-100",
    animated: true,
  },
};

const alias: Record<VisualRarity, keyof typeof normalizedThemes> = {
  comun: "comun",
  common: "comun",
  rara: "rara",
  rare: "rara",
  epica: "epica",
  epic: "epica",
  legendaria: "legendaria",
  legendary: "legendaria",
  maldita: "maldita",
  cursed: "maldita",
};

export const getRarityTheme = (rarity: string): RarityTheme => normalizedThemes[alias[rarity as VisualRarity] ?? "comun"];

export const rarityThemes: Record<string, RarityTheme & { glow: string; frame: string }> = {
  common: {
    ...normalizedThemes.comun,
    frame: "border-zinc-500/45",
    glow: "rgba(161,161,170,0.22)",
  },
  comun: {
    ...normalizedThemes.comun,
    frame: "border-zinc-500/45",
    glow: "rgba(161,161,170,0.22)",
  },
  rare: {
    ...normalizedThemes.rara,
    frame: "border-cyan-300/55 rare-pulse-border",
    glow: "rgba(34,211,238,0.35)",
  },
  rara: {
    ...normalizedThemes.rara,
    frame: "border-cyan-300/55 rare-pulse-border",
    glow: "rgba(34,211,238,0.35)",
  },
  epic: {
    ...normalizedThemes.epica,
    frame: "border-orange-300/60",
    glow: "rgba(251,146,60,0.38)",
  },
  epica: {
    ...normalizedThemes.epica,
    frame: "border-orange-300/60",
    glow: "rgba(251,146,60,0.38)",
  },
  legendary: {
    ...normalizedThemes.legendaria,
    frame: "border-amber-200/80 living-gold-border",
    glow: "rgba(242,211,123,0.45)",
  },
  legendaria: {
    ...normalizedThemes.legendaria,
    frame: "border-amber-200/80 living-gold-border",
    glow: "rgba(242,211,123,0.45)",
  },
  cursed: {
    ...normalizedThemes.maldita,
    frame: "border-red-400/70 cursed-glitch-border",
    glow: "rgba(248,113,113,0.4)",
  },
  maldita: {
    ...normalizedThemes.maldita,
    frame: "border-red-400/70 cursed-glitch-border",
    glow: "rgba(248,113,113,0.4)",
  },
};
