"use client";

import Link from "next/link";
import { demoDecks } from "@/data/demo/demoDecks";
import { useDemoStore } from "@/store/demoStore";
import { DemoProgressBar } from "./DemoProgressBar";

export function DemoDeckChoice() {
  const selectedDeck = useDemoStore((state) => state.selectedDeck);
  const selectDeck = useDemoStore((state) => state.selectDeck);
  const completeStage = useDemoStore((state) => state.completeStage);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,rgba(242,211,123,0.18),transparent_30%),linear-gradient(135deg,#050308,#16091b_55%,#050308)] px-5 py-8 text-white">
      <section className="mx-auto grid max-w-7xl gap-6">
        <DemoProgressBar active="deck" />
        <header className="rounded-2xl border border-white/10 bg-black/55 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-100/65">Seleccion de mazo demo</p>
          <h1 className="mt-2 text-5xl font-black">Elige tu mecanismo favorito</h1>
          <p className="mt-3 max-w-3xl text-white/62">Tres rutas cortas, tres maneras de fingir que esto estaba planeado.</p>
        </header>
        <div className="grid gap-4 lg:grid-cols-3">
          {demoDecks.map((deck) => {
            const active = selectedDeck === deck.id;
            return (
              <button
                key={deck.id}
                type="button"
                onClick={() => selectDeck(deck.id)}
                className={`group min-h-[360px] rounded-2xl border p-5 text-left transition ${active ? "border-amber-200 bg-amber-200/15" : "border-white/10 bg-black/45 hover:border-amber-200/45"}`}
              >
                <p className="text-xs font-black uppercase tracking-[0.25em] text-white/45">{deck.factions}</p>
                <h2 className="mt-3 text-3xl font-black text-white">{deck.name}</h2>
                <p className="mt-2 text-sm font-bold text-amber-100">{deck.style}</p>
                <p className="mt-4 text-sm text-white/58">{deck.quote}</p>
                <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase text-white/35">Cartas clave</p>
                  <p className="mt-2 text-sm text-white/75">{deck.keyCards.join(" / ")}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Dificultad {deck.difficulty}</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{deck.visual}</span>
                </div>
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap justify-end gap-3">
          <Link href="/demo/battle" onClick={() => completeStage("deck")} className={`campaign-action max-w-xs ${selectedDeck ? "" : "pointer-events-none opacity-45"}`}>
            Confirmar mazo
          </Link>
        </div>
      </section>
    </main>
  );
}
