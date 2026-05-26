"use client";

import { allCards } from "@/data/cards";
import { cardPowerScore } from "@/logic/balance/cardPowerScore";
import { useBalanceStore } from "@/store/balanceStore";

export function BalanceDebugTable() {
  const balance = useBalanceStore();
  const rows = allCards.map((card) => ({ card, score: cardPowerScore(card) })).sort((a, b) => b.score.score - a.score.score);
  return (
    <section className="rounded-lg border border-white/10 bg-black/50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-3xl font-black">BalanceDebugTable</h2>
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            ["XP", balance.xpMultiplier, balance.setXpMultiplier],
            ["Fragmentos", balance.fragmentMultiplier, balance.setFragmentMultiplier],
            ["Drops", balance.dropRateMultiplier, balance.setDropRateMultiplier],
          ].map(([label, value, setter]) => (
            <label key={label as string} className="grid gap-1 rounded border border-white/10 bg-white/5 p-2">
              {label as string}: {value as number}
              <input type="range" min="0.2" max="3" step="0.1" value={value as number} onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))} />
            </label>
          ))}
        </div>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="text-xs uppercase text-white/45">
            <tr>
              <th className="p-2">Carta</th>
              <th className="p-2">Costo</th>
              <th className="p-2">Rareza</th>
              <th className="p-2">Poder</th>
              <th className="p-2">Penalizacion</th>
              <th className="p-2">Eficiencia</th>
              <th className="p-2">Observacion</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ card, score }) => (
              <tr key={card.id} className="border-t border-white/10">
                <td className="p-2 font-bold text-white">{card.name}</td>
                <td className="p-2 text-white/65">{card.cost}</td>
                <td className="p-2 text-white/65">{card.rarity}</td>
                <td className="p-2 text-amber-100">{score.score}</td>
                <td className="p-2 text-red-100">{score.penalty}</td>
                <td className="p-2 text-cyan-100">{score.efficiency}</td>
                <td className="p-2 text-white/55">{score.observations[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
