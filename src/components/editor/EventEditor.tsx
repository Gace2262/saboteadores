"use client";

import { useEditorStore } from "@/store/editorStore";
import { CardEffectBuilder } from "./CardEffectBuilder";
import { JSONPreviewPanel } from "./JSONPreviewPanel";

export function EventEditor() {
  const { events, selectedEventId, addEvent, updateSelectedEvent } = useEditorStore();
  const event = events.find((item) => item.id === selectedEventId) ?? events[0];
  const pseudoCard = {
    id: event.id,
    name: event.title,
    faction: "conciencia" as const,
    rarity: "rara" as const,
    cost: 0,
    keywords: [],
    effects: event.effects,
    effectText: event.description,
    flavorText: event.narratorLine,
    visualEffect: event.visual,
    soundEffect: event.visual,
    animationType: "rain" as const,
    cinematic: event.visual,
    version: event.version,
    createdAt: "",
    updatedAt: "",
    author: "Evento",
    changelog: [],
  };
  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_420px]">
      <div className="grid gap-4">
        <section className="rounded-lg border border-amber-100/18 bg-black/55 p-5 text-white">
          <div className="flex flex-wrap justify-between gap-3">
            <h1 className="text-4xl font-black">Editor de eventos</h1>
            <button className="campaign-action max-w-xs" onClick={addEvent}>Crear evento</button>
          </div>
          <div className="mt-4 grid gap-3">
            <input className="editor-input" value={event.title} onChange={(change) => updateSelectedEvent({ title: change.target.value })} />
            <textarea className="editor-input min-h-24" value={event.description} onChange={(change) => updateSelectedEvent({ description: change.target.value })} />
            <textarea className="editor-input min-h-20" value={event.narratorLine} onChange={(change) => updateSelectedEvent({ narratorLine: change.target.value })} />
          </div>
        </section>
        <CardEffectBuilder card={pseudoCard} onEffectsChange={(effects) => updateSelectedEvent({ effects })} />
      </div>
      <JSONPreviewPanel title="JSON de evento" data={event} />
    </section>
  );
}
