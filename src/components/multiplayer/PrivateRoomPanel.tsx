"use client";

import { useState } from "react";

const generatedRoomCode = () => `TRIB-${Date.now().toString(36).slice(-5).toUpperCase()}`;

export function PrivateRoomPanel() {
  const [roomCode, setRoomCode] = useState("");
  const [generated] = useState(generatedRoomCode);
  return (
    <section className="rounded-lg border border-amber-100/18 bg-black/62 p-6 text-white">
      <p className="text-sm font-black uppercase text-amber-100/65">Partida privada futura</p>
      <h1 className="mt-2 text-5xl font-black">Sala privada</h1>
      <p className="mt-3 text-white/65">Crear sala, unirse por codigo y copiar invitacion quedan preparados para Realtime futuro.</p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-white/45">Codigo mock</p>
          <p className="mt-2 text-3xl font-black text-amber-100">{generated}</p>
          <button className="campaign-choice mt-3 max-w-xs" onClick={() => navigator.clipboard?.writeText(generated)}>Copiar invitacion</button>
        </div>
        <div className="rounded border border-white/10 bg-white/5 p-4">
          <input className="w-full rounded bg-zinc-950 p-3" value={roomCode} onChange={(event) => setRoomCode(event.target.value)} placeholder="Codigo de sala" />
          <p className="mt-3 text-sm text-white/50">Estado: waiting / ready / in_match / finished</p>
        </div>
      </div>
    </section>
  );
}
