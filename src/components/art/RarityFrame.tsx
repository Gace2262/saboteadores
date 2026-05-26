import type { ReactNode } from "react";
import { getRarityTheme } from "@/styles/rarityThemes";

type Props = {
  rarity: string;
  selected?: boolean;
  disabled?: boolean;
  children: ReactNode;
};

export function RarityFrame({ rarity, selected, disabled, children }: Props) {
  const theme = getRarityTheme(rarity);
  const animationClass =
    theme.label === "Rara"
      ? "rare-pulse-border"
      : theme.label === "Epica"
        ? "epic-dark-fire"
        : theme.label === "Legendaria"
          ? "living-gold-border"
          : theme.label === "Maldita"
            ? "cursed-glitch-border"
            : "";

  return (
    <div
      className={`relative h-full overflow-hidden rounded-[1.1rem] border-2 bg-gradient-to-br ${theme.border} ${theme.frame} ${theme.glow} ${animationClass} ${
        selected ? "ring-2 ring-amber-100" : ""
      } ${disabled ? "opacity-55 grayscale-[0.25]" : ""}`}
    >
      <div className="absolute inset-2 rounded-xl border border-white/10" />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" />
      <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-100/35 to-transparent" />
      {children}
    </div>
  );
}
