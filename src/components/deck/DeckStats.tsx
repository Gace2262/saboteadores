"use client";

import { allCards } from "@/data/cards";
import { useDeckStore } from "@/store/deckStore";

export function DeckStats() {
  const cardIds = useDeckStore((state) => state.cardIds);
  const cards = cardIds.map((id) => allCards.find((card) => card.id === id)).filter(Boolean);
  const costBuckets = [0, 1, 2, 3, 4, 5];
  const byType = tally(cards.map((card) => card?.type ?? ""));
  const byRarity = tally(cards.map((card) => card?.rarity ?? ""));
  const keywords = tally(cards.flatMap((card) => card?.keywords ?? []));

  return (
    <section className="rounded-lg border border-white/10 bg-black/48 p-4">
      <h2 className="text-xl font-black text-white">Estadisticas</h2>
      <p className="mt-1 text-sm text-white/52">{cardIds.length} cartas en la mesa ritual.</p>
      <div className="mt-4">
        <p className="text-xs font-black uppercase text-white/45">Curva de costo</p>
        <div className="mt-2 grid grid-cols-6 gap-2">
          {costBuckets.map((cost) => {
            const count = cards.filter((card) => (card?.cost ?? 5) === cost || (cost === 5 && (card?.cost ?? 0) >= 5)).length;
            return (
              <div key={cost} className="rounded bg-white/6 p-2 text-center">
                <div className="mx-auto flex h-20 items-end justify-center">
                  <span className="w-5 rounded bg-amber-200" style={{ height: `${Math.min(100, count * 18)}%` }} />
                </div>
                <p className="mt-1 text-xs text-white/60">{cost}{cost === 5 ? "+" : ""}</p>
              </div>
            );
          })}
        </div>
      </div>
      <MetricGroup title="Tipos" values={byType} />
      <MetricGroup title="Rarezas" values={byRarity} />
      <MetricGroup title="Keywords" values={keywords} limit={5} />
    </section>
  );
}

function tally(items: string[]) {
  return items.filter(Boolean).reduce<Record<string, number>>((acc, item) => ({ ...acc, [item]: (acc[item] ?? 0) + 1 }), {});
}

function MetricGroup({ title, values, limit = 8 }: { title: string; values: Record<string, number>; limit?: number }) {
  return (
    <div className="mt-4">
      <p className="text-xs font-black uppercase text-white/45">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {Object.entries(values).slice(0, limit).map(([key, value]) => (
          <span key={key} className="rounded border border-white/10 bg-white/6 px-2 py-1 text-xs text-white/68">
            {key}: {value}
          </span>
        ))}
      </div>
    </div>
  );
}
