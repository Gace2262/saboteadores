"use client";

import Link from "next/link";
import { allCards } from "@/data/cards";
import { useCollectionStore } from "@/store/collectionStore";
import { useEvolutionStore } from "@/store/evolutionStore";
import { Card } from "@/components/Card";
import { CorruptionMeter } from "./CorruptionMeter";
import { MentalEchoDisplay } from "./MentalEchoDisplay";

export function EvolutionDashboard() {
  const copies = useCollectionStore((state) => state.copies);
  const progressions = useEvolutionStore((state) => state.cards);
  const analyzeDeck = useEvolutionStore((state) => state.analyzeDeck);
  const ownedCards = allCards.filter((card) => (copies[card.id] ?? 0) > 0).slice(0, 24);
  const deckMind = analyzeDeck(ownedCards.length ? ownedCards : allCards.slice(0, 12));
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Mazo vivo</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">Evolucion de cartas</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            Las cartas absorben energia emocional, desarrollan ecos, mutan, se corrompen y ocasionalmente recuerdan demasiado.
          </p>
        </header>
        <section className="mt-5 rounded-lg border border-white/12 bg-black/52 p-5">
          <p className="text-sm font-black uppercase text-white/45">Personalidad emergente del mazo</p>
          <h2 className="mt-1 text-4xl font-black">{deckMind.name}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            <Metric label="Alineacion" value={deckMind.alignment} />
            <Metric label="Corrupcion" value={`${deckMind.averageCorruption}%`} />
            <Metric label="Estabilidad" value={`${deckMind.stability}%`} />
            <Metric label="Riesgo" value={deckMind.risk} />
            <Metric label="Colapso" value={`${deckMind.collapsePotential}%`} />
          </div>
          <p className="mt-4 text-sm text-white/55">Keywords dominantes: {deckMind.dominantKeywords.join(", ") || "el silencio tambien cuenta como diagnostico"}</p>
        </section>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(ownedCards.length ? ownedCards : allCards.slice(0, 16)).map((card) => {
            const progression = progressions[card.id];
            return (
              <Link key={card.id} href={`/evolution/card/${card.id}`} className="block rounded-lg border border-white/10 bg-black/35 p-2 transition hover:border-amber-100/40">
                <Card card={card} compact />
                <div className="mt-3 px-2 pb-2">
                  <div className="flex justify-between text-xs font-black uppercase text-white/45">
                    <span>Nivel {progression?.level ?? 1}</span>
                    <span>{progression?.awakenState ?? "dormida"}</span>
                  </div>
                  <div className="mt-2"><CorruptionMeter value={progression?.corruptionLevel ?? 0} /></div>
                  <div className="mt-3"><MentalEchoDisplay text={progression?.mentalEcho} /></div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/6 p-3">
      <p className="text-xs font-black uppercase text-white/42">{label}</p>
      <p className="mt-1 text-xl font-black text-amber-100">{value}</p>
    </div>
  );
}
