"use client";

import { allCards } from "@/data/cards";
import { cardPowerScore } from "@/logic/balance/cardPowerScore";

export function CardPowerPanel() {
  const top = allCards.map((card) => ({ card, score: cardPowerScore(card) })).sort((a, b) => b.score.efficiency - a.score.efficiency).slice(0, 6);
  return (
    <section className="rounded-lg border border-white/10 bg-black/50 p-5">
      <h2 className="text-3xl font-black">Poder de cartas</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {top.map(({ card, score }) => (
          <article key={card.id} className="rounded border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-black uppercase text-white/45">{card.rarity} / costo {card.cost}</p>
            <h3 className="mt-2 text-xl font-black text-white">{card.name}</h3>
            <p className="mt-2 text-sm text-amber-100">Poder {score.score} / eficiencia {score.efficiency}</p>
            <p className="mt-2 text-xs text-white/55">{score.observations[0]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
