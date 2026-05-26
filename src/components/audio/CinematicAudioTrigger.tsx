"use client";

import { audioEvents } from "@/data/audioEvents";
import { audioEngine } from "@/logic/audio/audioEngine";

export function CinematicAudioTrigger() {
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-4 text-white">
      <h2 className="text-2xl font-black uppercase">Eventos cinematicos</h2>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {Object.values(audioEvents).map((event) => (
          <button key={event.id} className="rounded border border-white/10 bg-white/5 p-3 text-left hover:border-amber-100/45" onClick={() => void audioEngine.unlock().then(() => audioEngine.trigger(event.id))}>
            <strong>{event.title}</strong>
            <span className="mt-1 block text-xs text-white/55">{event.transition} · {event.subtitle}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
