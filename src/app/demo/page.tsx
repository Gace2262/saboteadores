"use client";

import { useRouter } from "next/navigation";
import { AnimatedBackground } from "@/components/art/AnimatedBackground";
import { FactionSymbol } from "@/components/art/FactionSymbol";
import { realDemoDecks } from "@/data/demoDecks";
import { useRealGameStore } from "@/store/gameStore";
import { visualTheme } from "@/styles/visualTheme";
import type { DemoDeckId } from "@/types/game";

const deckSymbols: Record<DemoDeckId, string[]> = {
  "oficina-control": ["controlador", "perfeccionista"],
  "circo-pendientes": ["inquieto", "hipervigilante"],
  "manual-no-me-pasa": ["reservado", "evitador", "conciencia"],
};

const deckFlavors: Record<DemoDeckId, string> = {
  "oficina-control": "La libertad necesita formulario.",
  "circo-pendientes": "La agenda aprendio a galopar.",
  "manual-no-me-pasa": "Todo bien. El humo es decorativo.",
};

export default function DemoPage() {
  const router = useRouter();
  const chooseDeck = useRealGameStore((state) => state.chooseDeck);
  const startDemoBattle = useRealGameStore((state) => state.startDemoBattle);
  const wins = useRealGameStore((state) => state.wins);
  const losses = useRealGameStore((state) => state.losses);

  const start = (deckId: DemoDeckId) => {
    chooseDeck(deckId);
    startDemoBattle(deckId);
    router.push("/battle");
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-10 text-white">
      <AnimatedBackground variant="catedral" />
      <section className="relative mx-auto grid max-w-6xl gap-6">
        <header className={`${visualTheme.etchedPanel} p-7`}>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-100/60">Primera citacion demo</p>
          <h1 className="mt-2 text-5xl font-black">Elige tu expediente inicial</h1>
          <p className="mt-3 max-w-3xl text-white/65">
            Tres mazos, tres maneras de discutir con tu cabeza. Victorias: {wins} / Derrotas: {losses}. Guardado local simple activo.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {realDemoDecks.map((deck) => (
            <button
              key={deck.id}
              type="button"
              onClick={() => start(deck.id)}
              className="group relative min-h-80 overflow-hidden rounded-xl border border-white/12 bg-[linear-gradient(145deg,rgba(12,10,13,0.9),rgba(0,0,0,0.72))] p-5 text-left shadow-[0_22px_64px_rgba(0,0,0,0.42)] transition hover:-translate-y-1 hover:border-amber-100/50"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,211,123,0.12),transparent_34%)] opacity-80" />
              <div className="relative">
                <div className="flex gap-2">
                  {deckSymbols[deck.id].map((symbol) => (
                    <FactionSymbol key={symbol} faction={symbol} className="h-12 w-12" />
                  ))}
                </div>
                <p className="mt-5 text-xs font-black uppercase tracking-[0.25em] text-white/40">{deck.id}</p>
                <h2 className="mt-3 text-3xl font-black">{deck.name}</h2>
                <p className="mt-4 leading-7 text-white/66">{deck.description}</p>
                <p className="mt-5 rounded border border-amber-100/18 bg-amber-100/8 p-3 text-sm font-bold text-amber-100">&quot;{deckFlavors[deck.id]}&quot;</p>
                <p className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-white/50">{deck.cardIds.length * 3} cartas en mazo demo</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
