"use client";

import { CardArtwork } from "@/components/art/CardArtwork";
import { FactionSymbol } from "@/components/art/FactionSymbol";
import { RarityFrame } from "@/components/art/RarityFrame";
import type { DemoCard } from "@/types/game";
import type { Card as RichCard } from "@/data/cards";
import { getFactionTheme } from "@/styles/factionThemes";
import { getRarityTheme } from "@/styles/rarityThemes";

type AnyCard = DemoCard | RichCard;

const getDamage = (card: AnyCard) => ("damage" in card ? card.damage : card.willpowerDamage);
const getHeal = (card: AnyCard) => ("heal" in card ? card.heal : 0);
const getStress = (card: AnyCard) => ("stress" in card ? card.stress : card.stressGain);
const getFlavor = (card: AnyCard) => ("flavorText" in card ? card.flavorText : card.flavorQuote);
const getRarity = (card: AnyCard) => String(card.rarity);

export function Card({
  card,
  disabled,
  selected,
  onClick,
  compact = false,
}: {
  card: AnyCard;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
  compact?: boolean;
}) {
  const faction = getFactionTheme(card.faction);
  const rarity = getRarityTheme(getRarity(card));

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`group h-full w-full text-left text-white transition duration-200 ${
        disabled ? "cursor-not-allowed" : "hover:-translate-y-2 hover:scale-[1.015]"
      } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-100`}
    >
      <RarityFrame rarity={getRarity(card)} selected={selected} disabled={disabled}>
        <div className="relative flex h-full min-h-[420px] flex-col p-3">
          <div className="absolute left-3 top-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-amber-100/45 bg-[radial-gradient(circle_at_35%_25%,#fff8d6,#f2d37b_42%,#7c4a12)] text-lg font-black text-black shadow-[0_0_24px_rgba(242,211,123,0.35)]">
            {card.cost}
          </div>

          <div className="flex min-h-16 items-start justify-between gap-3 rounded-t-xl border border-white/10 bg-black/45 p-3 pl-14">
            <div className="min-w-0">
              <p className="truncate text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: faction.ink }}>
                {faction.label}
              </p>
              <h3 className={`${compact ? "text-lg" : "text-xl"} mt-1 leading-tight font-black text-white`}>{card.name}</h3>
            </div>
            <FactionSymbol faction={card.faction} className="h-11 w-11 shrink-0" />
          </div>

          <div className="mt-2">
            <CardArtwork faction={card.faction} rarity={rarity.label} compact={compact} />
          </div>

          <div className="mt-2 flex flex-1 flex-col rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(0,0,0,0.3))] p-3">
            <p className="min-h-16 text-sm font-bold leading-5 text-white/82">{card.effectText}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-black uppercase">
              {getDamage(card) ? <span className="rounded border border-rose-300/25 bg-rose-500/16 px-2 py-1 text-rose-100">Dano {getDamage(card)}</span> : null}
              {getHeal(card) ? <span className="rounded border border-emerald-300/25 bg-emerald-500/16 px-2 py-1 text-emerald-100">Cura {getHeal(card)}</span> : null}
              {getStress(card) ? <span className="rounded border border-violet-300/25 bg-violet-500/16 px-2 py-1 text-violet-100">Estres {getStress(card)}</span> : null}
            </div>
            <p className="mt-auto border-t border-white/10 pt-3 text-xs italic leading-5 text-white/50">&quot;{getFlavor(card)}&quot;</p>
          </div>

          <div className={`mt-2 rounded-b-xl border border-white/10 bg-black/42 px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.2em] ${rarity.text}`}>
            {rarity.label}
          </div>
        </div>
      </RarityFrame>
    </button>
  );
}
