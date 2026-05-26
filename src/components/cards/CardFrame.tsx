"use client";

import type { Card } from "@/data/cards";
import { getFactionVisual } from "@/data/factionVisuals";
import { cardFrameVariants } from "@/data/cardFrameVariants";
import { rarityThemes } from "@/styles/rarityThemes";
import { CardCostOrb } from "./CardCostOrb";
import { CardCorruptionLayer } from "./CardCorruptionLayer";
import { CardFactionBanner } from "./CardFactionBanner";
import { CardFlavorQuote } from "./CardFlavorQuote";
import { CardKeywordIcons } from "./CardKeywordIcons";
import { CardPortrait } from "./CardPortrait";
import { CardRarityBorder } from "./CardRarityBorder";
import { translateCard } from "@/logic/i18n/translator";
import { useLanguageStore } from "@/store/languageStore";

export function CardFrame({ card, compact = false }: { card: Card; compact?: boolean }) {
  const faction = getFactionVisual(card.faction);
  const rarity = rarityThemes[card.rarity];
  const frame = cardFrameVariants[card.rarity];
  const locale = useLanguageStore((state) => state.locale);
  const text = translateCard(card, locale);

  return (
    <div className="relative z-10 flex h-full flex-col gap-3" style={{ transform: "translateZ(34px)" }}>
      <CardRarityBorder rarity={card.rarity} />
      <CardCostOrb cost={card.cost} color={faction.accent} />
      <CardCorruptionLayer card={card} />
      <header className="min-h-16 pl-14 pr-2">
        <p className="text-[10px] font-black uppercase tracking-wide" style={{ color: faction.accent }}>
          {rarity.label} · {frame.label}
        </p>
        <h3 className={`${compact ? "text-sm" : "text-base"} mt-1 font-black leading-tight text-white`}>{text.name}</h3>
      </header>
      <CardPortrait card={card} compact={compact} />
      <CardFactionBanner faction={card.faction} />
      <div className="rounded-md border border-white/10 bg-black/42 p-3">
        <p className="text-sm leading-5 text-white/78">{text.effectText}</p>
        <div className="mt-3">
          <CardKeywordIcons keywords={card.keywords} compact={compact} />
        </div>
      </div>
      <CardFlavorQuote card={card} />
      <div className="mt-auto grid grid-cols-2 gap-2">
        <div className="rounded-md bg-black/40 p-2">
          <p className="text-[10px] uppercase text-white/42">Dano</p>
          <p className="text-2xl font-black text-amber-100">{card.willpowerDamage}</p>
        </div>
        <div className="rounded-md bg-black/40 p-2">
          <p className="text-[10px] uppercase text-white/42">Sello</p>
          <p className="text-sm font-black text-white">{frame.cornerGlyph} {card.rarity}</p>
        </div>
      </div>
    </div>
  );
}
