"use client";

import { useMultiplayerStore } from "@/store/multiplayerStore";

export function SpectatorPanel() {
  const match = useMultiplayerStore((state) => state.currentMatch);
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-5 text-white">
      <p className="text-sm font-black uppercase text-white/45">Modo espectador futuro</p>
      <h1 className="mt-2 text-5xl font-black">Cine judicial</h1>
      <p className="mt-3 text-white/60">Ver tablero, log y emotes sin revelar manos ocultas. Chat libre no incluido.</p>
      <div className="mt-4 max-h-96 overflow-auto rounded bg-black/45 p-3 text-xs text-white/55">
        {(match?.eventLog ?? []).map((event) => (
          <p key={event.id}>#{event.sequenceNumber} {event.type} / {event.playerId}</p>
        ))}
      </div>
    </section>
  );
}
