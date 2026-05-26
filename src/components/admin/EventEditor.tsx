"use client";

import { dynamicEvents } from "@/data/dynamicEvents";

export function EventEditor() {
  return (
    <section className="rounded-lg border border-white/10 bg-black/50 p-5 text-white">
      <h2 className="text-2xl font-black">Eventos</h2>
      <div className="mt-3 grid gap-2">
        {dynamicEvents.slice(0, 5).map((event) => (
          <div key={event.id} className="rounded border border-white/10 bg-white/5 p-3">
            <p className="font-black text-amber-100">{event.title}</p>
            <p className="text-xs text-white/55">{event.narratorLine}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
