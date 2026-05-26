"use client";

import type { DemoCard } from "@/types/game";
import { Card } from "./Card";

type Props = {
  hand: DemoCard[];
  clarity: number;
  onPlay: (cardId: string) => void;
};

export function PlayerHand({ hand, clarity, onPlay }: Props) {
  return (
    <section className="rounded-xl border border-amber-100/18 bg-[linear-gradient(180deg,rgba(10,8,12,0.86),rgba(0,0,0,0.72))] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-100/50">Mano del jugador</p>
          <h2 className="text-2xl font-black text-white">Cartas disponibles</h2>
        </div>
        <p className="rounded border border-cyan-100/18 bg-cyan-400/8 px-3 py-2 text-sm font-bold text-cyan-100">Claridad actual: {clarity}</p>
      </div>
      <div className="mt-4 flex gap-4 overflow-x-auto pb-3">
        {hand.map((card) => (
          <div key={card.id} className="w-[18rem] shrink-0">
            <Card card={card} disabled={card.cost > clarity} onClick={() => onPlay(card.id)} />
          </div>
        ))}
      </div>
    </section>
  );
}
