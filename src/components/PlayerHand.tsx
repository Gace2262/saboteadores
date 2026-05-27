"use client";

import { useState } from "react";
import type { DemoCard } from "@/types/game";
import { soundtrackController } from "@/logic/audio/soundtrackController";
import { Card } from "./Card";

type Props = {
  hand: DemoCard[];
  deck?: DemoCard[];
  discard?: DemoCard[];
  clarity: number;
  onPlay: (cardId: string) => void;
};

export function PlayerHand({ hand, deck = [], discard = [], clarity, onPlay }: Props) {
  const [showFullDeck, setShowFullDeck] = useState(false);
  const fullDeck = [...hand, ...deck, ...discard];

  const playCard = async (cardId: string) => {
    await soundtrackController.unlock();
    soundtrackController.playSfx("ui_click");
    onPlay(cardId);
  };

  return (
    <section className="min-w-0 rounded-xl border border-amber-100/18 bg-[linear-gradient(180deg,rgba(10,8,12,0.86),rgba(0,0,0,0.72))] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.42)] sm:p-4">
      <div className="flex min-w-0 flex-wrap items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-100/50 sm:tracking-[0.25em]">Mano del jugador</p>
          <h2 className="text-xl font-black text-white sm:text-2xl">Cartas disponibles</h2>
        </div>
        <div className="flex min-w-0 flex-wrap gap-2">
          <p className="rounded border border-cyan-100/18 bg-cyan-400/8 px-3 py-2 text-sm font-bold text-cyan-100">Claridad: {clarity}</p>
          <button
            type="button"
            onClick={() => setShowFullDeck((value) => !value)}
            className="rounded border border-amber-100/18 bg-amber-100/8 px-3 py-2 text-sm font-black uppercase text-amber-100"
          >
            {showFullDeck ? "Ocultar mazo" : `Ver mazo completo (${fullDeck.length})`}
          </button>
        </div>
      </div>

      <div className="mt-4 flex max-w-full snap-x gap-3 overflow-x-auto overscroll-x-contain pb-3 sm:gap-4">
        {hand.map((card) => (
          <div key={card.id} className="w-[15.5rem] shrink-0 snap-start sm:w-[18rem]">
            <Card card={card} disabled={card.cost > clarity} onClick={() => void playCard(card.id)} />
          </div>
        ))}
      </div>

      {showFullDeck ? (
        <div className="mt-4 rounded-lg border border-white/10 bg-black/35 p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-black text-white">Mazo completo visible</h3>
            <p className="text-sm text-white/55">Mano {hand.length} / Mazo {deck.length} / Descarte {discard.length}</p>
          </div>
          <div className="mt-3 grid max-h-[70vh] grid-cols-1 gap-3 overflow-y-auto pr-1 min-[390px]:grid-cols-2 lg:grid-cols-4">
            {fullDeck.map((card, index) => (
              <div key={`${card.id}-${index}`} className="min-w-0">
                <Card card={card} compact disabled={card.cost > clarity && hand.some((item) => item.id === card.id)} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
