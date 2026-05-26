"use client";

import { packCosts } from "@/data/economyConfig";
import { packDefinitions, type PackId } from "@/data/packs";
import { packDropRates } from "@/logic/economy/rewardCalculator";
import { useEconomyStore } from "@/store/economyStore";

export function PackCostPreview() {
  const { simulatePack, lastPackSimulation, openEconomyPack } = useEconomyStore();
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {packDefinitions.map((pack) => (
        <article key={pack.id} className="rounded-lg border border-white/10 bg-black/50 p-5">
          <p className="text-xs font-black uppercase text-amber-100/60">{pack.phrase}</p>
          <h3 className="mt-2 text-2xl font-black text-white">{pack.name}</h3>
          <p className="mt-2 text-sm text-white/58">{pack.description}</p>
          <p className="mt-4 text-xs font-black uppercase text-white/45">Costo</p>
          <p className="mt-1 text-sm text-amber-100">{Object.entries(packCosts[pack.id]).map(([key, value]) => `${value} ${key}`).join(" + ")}</p>
          <div className="mt-4 grid gap-1 text-xs text-white/55">
            {Object.entries(packDropRates[pack.id]).filter(([, value]) => value > 0).map(([rarity, value]) => (
              <div key={rarity} className="flex justify-between"><span>{rarity}</span><strong>{value}%</strong></div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button className="campaign-choice max-w-xs" onClick={() => simulatePack(pack.id as PackId)}>Simular 100</button>
            <button className="campaign-action max-w-xs" onClick={() => openEconomyPack(pack.id as PackId)}>Abrir mock</button>
          </div>
        </article>
      ))}
      {lastPackSimulation ? (
        <article className="rounded-lg border border-cyan-100/20 bg-cyan-950/20 p-5 md:col-span-2 xl:col-span-3">
          <h3 className="text-2xl font-black">Simulacion: {lastPackSimulation.packId}</h3>
          <p className="mt-2 text-white/60">Valor duplicado promedio: {lastPackSimulation.averageDuplicateValue}. Pity epico activado {lastPackSimulation.pityEpicAt} veces.</p>
          <div className="mt-4 grid gap-2 md:grid-cols-5">
            {Object.entries(lastPackSimulation.distribution).map(([rarity, amount]) => (
              <div key={rarity} className="rounded border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-xs uppercase text-white/45">{rarity}</p>
                <p className="text-2xl font-black text-cyan-100">{amount}</p>
              </div>
            ))}
          </div>
        </article>
      ) : null}
    </section>
  );
}
