"use client";

import { draftEvents, draftPickCount } from "@/data/draftPools";
import { useModeStore } from "@/store/modeStore";

export function DraftSelectionPanel() {
  const { draftDeck, draftPick, draftOffer, startDraft, chooseDraftCard } = useModeStore();
  const activePick = draftPick || 1;
  return (
    <section className="rounded-lg border border-amber-100/16 bg-black/52 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase text-amber-100/65">Draft Mental</p>
          <h2 className="mt-1 text-4xl font-black">Eleccion {activePick}/{draftPickCount}</h2>
          <p className="mt-2 text-white/62">Elige 1 carta entre 3. La coleccion no importa; el Tribunal presta cartas y luego niega responsabilidad.</p>
        </div>
        <button className="campaign-action" onClick={startDraft}>Iniciar draft</button>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {draftOffer.map((card) => (
          <button key={card.id} onClick={() => chooseDraftCard(card.id)} className="rounded-lg border border-white/12 bg-white/6 p-4 text-left transition hover:border-amber-100/45 hover:bg-amber-100/10">
            <p className="text-xs font-black uppercase text-amber-100/60">{card.rarity} - {card.faction}</p>
            <h3 className="mt-2 text-2xl font-black">{card.name}</h3>
            <p className="mt-3 text-sm leading-6 text-white/62">{card.effectText}</p>
            <p className="mt-3 text-sm italic text-white/48">{card.impactText}</p>
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-md border border-white/10 bg-white/6 p-4">
        <p className="text-sm font-black uppercase text-white/48">Eventos Draft</p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {draftEvents.map((event) => (
            <div key={event.id} className="rounded-md bg-black/35 p-3">
              <h3 className="font-black text-amber-100">{event.name}</h3>
              <p className="mt-2 text-sm text-white/58">{event.effect}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm text-white/55">Cartas elegidas: <strong className="text-amber-100">{draftDeck.length}</strong></p>
    </section>
  );
}
