"use client";

import { multiplayerConfig } from "@/data/multiplayerConfig";

export function LobbyScreen() {
  return (
    <section className="rounded-lg border border-amber-100/18 bg-black/62 p-6 text-white">
      <p className="text-sm font-black uppercase text-amber-100/65">Lobby futuro</p>
      <h1 className="mt-2 text-5xl font-black">Sala de espera del Tribunal</h1>
      <p className="mt-3 text-white/65">{multiplayerConfig.messageOffline}</p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {["createQueueTicket()", "cancelQueue()", "acceptMatch()", "declineMatch()"].map((item) => (
          <div key={item} className="rounded border border-white/10 bg-white/5 p-3 text-sm font-black text-white/70">{item}</div>
        ))}
      </div>
    </section>
  );
}
