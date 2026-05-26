"use client";

import Link from "next/link";
import { allCards } from "@/data/cards";
import { getCorruptionRule } from "@/data/corruptions";
import { useEvolutionStore } from "@/store/evolutionStore";
import { CorruptionMeter } from "./CorruptionMeter";

export function CorruptionDashboard() {
  const progressions = useEvolutionStore((state) => state.cards);
  const entries = Object.values(progressions).sort((a, b) => b.corruptionLevel - a.corruptionLevel);
  const average = entries.length ? Math.round(entries.reduce((sum, item) => sum + item.corruptionLevel, 0) / entries.length) : 0;
  const rule = getCorruptionRule(average);
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(127,29,29,0.35),transparent_28%),linear-gradient(135deg,#050505,#16070b,#050505)]" />
      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="rounded-lg border border-rose-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-rose-100/65">Corrupcion mental</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">Cartas que miraron demasiado al Tribunal</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            Glitches, mutaciones, poder oscuro y penalizaciones con sonrisa de contrato. Promedio actual: {rule.state}.
          </p>
          <div className="mt-5 max-w-2xl"><CorruptionMeter value={average} /></div>
        </header>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(entries.length ? entries : []).map((entry) => {
            const card = allCards.find((item) => item.id === entry.cardId);
            if (!card) return null;
            const cardRule = getCorruptionRule(entry.corruptionLevel);
            return (
              <Link key={entry.cardId} href={`/evolution/card/${entry.cardId}`} className="rounded-lg border border-rose-100/14 bg-black/52 p-5 transition hover:border-rose-100/35">
                <p className="text-xs font-black uppercase text-rose-100/60">{cardRule.state}</p>
                <h2 className="mt-1 text-2xl font-black">{card.name}</h2>
                <p className="mt-2 text-sm text-white/55">{cardRule.visual}</p>
                <div className="mt-4"><CorruptionMeter value={entry.corruptionLevel} /></div>
              </Link>
            );
          })}
          {!entries.length ? (
            <p className="rounded-lg border border-white/10 bg-black/52 p-5 text-white/62">Aun no hay corrupcion registrada. Las cartas estan demasiado tranquilas. Sospechoso.</p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
