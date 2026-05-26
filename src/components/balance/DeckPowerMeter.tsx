"use client";

import { allCards, type Card } from "@/data/cards";
import { evaluateDeckPower } from "@/logic/balance/deckPowerEvaluator";
import { useDeckStore } from "@/store/deckStore";

export function DeckPowerMeter() {
  const cardIds = useDeckStore((state) => state.cardIds);
  const cards = cardIds.map((id) => allCards.find((card) => card.id === id)).filter((card): card is Card => Boolean(card));
  const report = evaluateDeckPower(cards);
  return (
    <section className="rounded-lg border border-amber-100/15 bg-black/52 p-5">
      <h2 className="text-3xl font-black">DeckPowerEvaluator</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {[
          ["Poder total", report.totalPower],
          ["Coste medio", report.averageCost],
          ["Riesgo Estres", `${report.stressRisk}%`],
          ["Consistencia", `${report.consistency}%`],
          ["Control", `${report.control}%`],
          ["Dano", `${report.damage}%`],
          ["Defensa", `${report.defense}%`],
          ["Corrupcion", `${report.corruptionAverage}%`],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded border border-white/10 bg-white/5 p-3">
            <p className="text-xs uppercase text-white/45">{label as string}</p>
            <p className="text-2xl font-black text-amber-100">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-2">
        {report.warnings.map((warning) => <p key={warning} className="rounded border border-white/10 bg-white/5 p-3 text-sm text-white/70">{warning}</p>)}
      </div>
    </section>
  );
}
