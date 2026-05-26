"use client";

import { statLabels, type PlayerStatKey } from "@/data/playerStats";
import { useProgressionStore } from "@/store/progressionStore";

const featured: PlayerStatKey[] = [
  "gamesPlayed",
  "victories",
  "defeats",
  "cardsUsed",
  "damageDealt",
  "stressAccumulated",
  "catarsisActivated",
  "hammerSlamsReceived",
  "cardsBlocked",
  "packsOpened",
  "bossesDefeated",
  "timePlayedMinutes",
];

export function PlayerStatistics() {
  const stats = useProgressionStore((state) => state.stats);
  const max = Math.max(1, ...featured.map((key) => stats[key]));
  const winRate = stats.gamesPlayed ? Math.round((stats.victories / stats.gamesPlayed) * 100) : 0;
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 neural-map-bg opacity-80" />
      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Estadisticas globales</p>
          <h1 className="mt-2 text-5xl font-black">Contabilidad del colapso heroico</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            Barras, medidores y cifras para demostrar que hasta el caos puede pedir auditoria.
          </p>
        </header>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Metric label="Tasa de victoria" value={`${winRate}%`} />
          <Metric label="Partidas" value={`${stats.gamesPlayed}`} />
          <Metric label="Tiempo jugado" value={`${stats.timePlayedMinutes} min`} />
        </div>
        <section className="mt-5 rounded-lg border border-white/12 bg-black/50 p-5">
          <h2 className="text-3xl font-black">Historial de progreso</h2>
          <div className="mt-5 grid gap-4">
            {featured.map((key) => {
              const width = Math.max(4, Math.round((stats[key] / max) * 100));
              return (
                <div key={key} className="grid gap-2 md:grid-cols-[220px_1fr_70px] md:items-center">
                  <span className="text-sm font-black uppercase text-white/55">{statLabels[key]}</span>
                  <div className="h-4 overflow-hidden rounded-full border border-white/10 bg-black/55">
                    <div className="h-full bg-[linear-gradient(90deg,#312e81,#8b1e3f,#f2d37b)]" style={{ width: `${width}%` }} />
                  </div>
                  <strong className="text-right text-amber-100">{stats[key]}</strong>
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/48 p-5">
      <p className="text-xs font-black uppercase text-white/45">{label}</p>
      <p className="mt-2 text-4xl font-black text-amber-100">{value}</p>
    </div>
  );
}
