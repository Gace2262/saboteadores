"use client";

import Link from "next/link";
import { allCards } from "@/data/cards";
import { normalizeCardId, summarizeCardEvolution } from "@/logic/evolution/evolutionEngine";
import { useEvolutionStore } from "@/store/evolutionStore";
import { Card } from "@/components/Card";
import { CardAwakeningScene } from "./CardAwakeningScene";
import { CardEvolutionAnimation } from "./CardEvolutionAnimation";
import { CardEvolutionTree } from "./CardEvolutionTree";
import { CardHistoryPanel } from "./CardHistoryPanel";
import { CardMutationPreview } from "./CardMutationPreview";
import { CorruptionMeter } from "./CorruptionMeter";
import { MentalEchoDisplay } from "./MentalEchoDisplay";

export function CardEvolutionDetail({ cardId }: { cardId: string }) {
  const normalized = normalizeCardId(cardId);
  const card = allCards.find((item) => item.id === normalized) ?? allCards[0];
  const progression = useEvolutionStore((state) => state.cards[normalized]);
  const summary = progression ? summarizeCardEvolution(card, progression) : undefined;
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <Link href="/evolution" className="inline-flex rounded-md border border-white/12 bg-black/45 px-3 py-2 text-sm font-black uppercase text-white/70 hover:bg-white/10">
          Volver a evolucion
        </Link>
        <header className="mt-4 grid gap-5 rounded-lg border border-amber-100/18 bg-black/62 p-6 lg:grid-cols-[320px_1fr]">
          <div className="relative"><Card card={card} /></div>
          <div>
            <p className="text-sm font-black uppercase text-amber-100/65">Expediente individual de carta</p>
            <h1 className="mt-2 text-5xl font-black">{card.name}</h1>
            <p className="mt-3 max-w-3xl text-white/62">{card.effectText}</p>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              <Metric label="Nivel" value={`${progression?.level ?? 1}`} />
              <Metric label="Afinidad" value={progression?.affinity ?? "defensiva"} />
              <Metric label="Estado" value={progression?.awakenState ?? "dormida"} />
              <Metric label="Usos" value={`${progression?.usageCount ?? 0}`} />
            </div>
            <div className="mt-5"><CorruptionMeter value={progression?.corruptionLevel ?? 0} /></div>
            <div className="mt-5"><MentalEchoDisplay text={progression?.mentalEcho ?? card.impactText} /></div>
          </div>
        </header>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <CardEvolutionTree cardId={normalized} progression={progression} />
          <CardMutationPreview mutationIds={progression?.mutations ?? []} />
          <CardHistoryPanel progression={progression} />
          <div className="grid gap-5">
            <CardEvolutionAnimation />
            <CardAwakeningScene cardId={normalized} />
            {summary?.branches.length ? (
              <section className="rounded-lg border border-white/12 bg-black/48 p-5">
                <p className="text-sm font-black uppercase text-white/45">Formas desbloqueadas</p>
                {summary.branches.map((branch) => <p key={branch.id} className="mt-2 rounded bg-white/6 p-3 text-white/65">{branch.name}: {branch.visual}</p>)}
              </section>
            ) : null}
          </div>
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
