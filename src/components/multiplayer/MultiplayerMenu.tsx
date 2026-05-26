"use client";

import Link from "next/link";
import { multiplayerConfig, futureRanks } from "@/data/multiplayerConfig";
import { useMultiplayerStore } from "@/store/multiplayerStore";

export function MultiplayerMenu() {
  const stats = useMultiplayerStore((state) => state.stats);
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Multiplayer arquitectura</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">Duelos entre expedientes</h1>
          <p className="mt-3 max-w-3xl text-white/65">{multiplayerConfig.messageOffline}</p>
        </header>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Mode href="/multiplayer/local" title="Local" available description="Turnos alternados y modo pasar dispositivo." />
          <Mode href="/multiplayer/private" title="Partida privada" description="Sala con codigo preparada para Realtime futuro." />
          <Mode href="/multiplayer/lobby" title="Lobby" description="Mock de matchmaking y ranking futuro." />
          <Mode href="/multiplayer/spectate/demo" title="Espectador" description="Modo cine sin manos ocultas." />
          <Mode title="Ranked" description="Proximamente: validacion servidor, timer y reglas competitivas." />
          <Mode title="Draft PvP" description="Proximamente: cartas ofrecidas por entidades legalmente cuestionables." />
        </div>
        <section className="rounded-lg border border-white/10 bg-black/45 p-5">
          <h2 className="text-2xl font-black">Perfil PvP local</h2>
          <p className="mt-2 text-white/60">Partidas locales: {stats.localMatchesPlayed} / victorias: {stats.localWins} / rango futuro: {stats.futureRank}</p>
          <p className="mt-2 text-sm text-white/45">Rangos futuros: {futureRanks.join(" -> ")}</p>
        </section>
      </section>
    </main>
  );
}

function Mode({ href, title, description, available }: { href?: string; title: string; description: string; available?: boolean }) {
  const content = (
    <div className={`h-full rounded-lg border p-5 ${available ? "border-amber-100/30 bg-amber-100/10" : "border-white/10 bg-black/45"}`}>
      <p className="text-xs font-black uppercase text-white/45">{available ? "Disponible" : "Preparado"}</p>
      <h2 className="mt-2 text-3xl font-black">{title}</h2>
      <p className="mt-3 text-sm text-white/60">{description}</p>
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}
