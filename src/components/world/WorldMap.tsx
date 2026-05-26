"use client";

import Link from "next/link";
import { worldRegions } from "@/data/worldRegions";
import { globalNarratorLines } from "@/data/worldEvents";
import { useWorldStore } from "@/store/worldStore";
import { CorruptionMeter } from "./CorruptionMeter";
import { GlobalEventOverlay } from "./GlobalEventOverlay";
import { RegionCard } from "./RegionCard";
import { SeasonBanner } from "./SeasonBanner";

export function WorldMap() {
  const world = useWorldStore();
  const summary = world.getSummary();
  const selectedRegion = worldRegions.find((region) => region.id === world.selectedRegionId) ?? worldRegions[0];
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <div className="absolute inset-0 court-fog opacity-65" />
      {!world.reduceParticles ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(242,211,123,0.14),transparent_22%),radial-gradient(circle_at_82%_68%,rgba(124,58,237,0.16),transparent_28%)]" />
      ) : null}
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">El Universo del Tribunal</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">Mapa Mundial Mental</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            Dominios mentales, ruinas emocionales, archivos olvidados y regiones de Catarsis conectan campana,
            bosses, evolucion, eventos dinamicos y temporadas psicologicas.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/world/factions" className="campaign-choice max-w-xs">Facciones</Link>
            <Link href="/world/relics" className="campaign-choice max-w-xs">Reliquias</Link>
            <Link href="/world/seasons" className="campaign-choice max-w-xs">Temporadas</Link>
            <Link href="/world/archive" className="campaign-choice max-w-xs">Archivo universal</Link>
            <button className="campaign-action max-w-xs" onClick={() => world.triggerGlobalEvent()}>
              Activar evento global
            </button>
          </div>
        </header>

        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <section className="relative min-h-[620px] overflow-hidden rounded-lg border border-amber-100/15 bg-black/48 p-5">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {worldRegions.flatMap((region) =>
                region.connectedTo.map((nextId) => {
                  const next = worldRegions.find((item) => item.id === nextId);
                  if (!next) return null;
                  const active = world.unlockedRegionIds.includes(region.id) && world.unlockedRegionIds.includes(next.id);
                  return <line key={`${region.id}-${nextId}`} x1={region.x} y1={region.y} x2={next.x} y2={next.y} stroke={active ? "rgba(242,211,123,0.52)" : "rgba(255,255,255,0.1)"} strokeWidth={active ? 0.42 : 0.2} strokeLinecap="round" />;
                }),
              )}
            </svg>
            {worldRegions.map((region) => {
              const unlocked = world.unlockedRegionIds.includes(region.id);
              const selected = world.selectedRegionId === region.id;
              return (
                <button
                  key={region.id}
                  onClick={() => (unlocked ? world.selectRegion(region.id) : world.unlockRegion(region.id))}
                  className={`absolute grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-center text-[10px] font-black uppercase transition ${selected ? "border-amber-100 bg-amber-100/20 text-amber-100 shadow-[0_0_35px_rgba(242,211,123,.35)]" : unlocked ? "border-cyan-100/35 bg-cyan-300/10 text-cyan-100" : "border-white/10 bg-black/55 text-white/35"}`}
                  style={{ left: `${region.x}%`, top: `${region.y}%` }}
                >
                  {unlocked ? region.name.split(" ").slice(0, 2).join(" ") : "???"}
                </button>
              );
            })}
          </section>

          <aside className="grid gap-4">
            <CorruptionMeter value={summary.corruptionPressure} />
            <div className="rounded-lg border border-white/10 bg-black/50 p-5">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-white/45">Exploracion</p>
              <h2 className="mt-2 text-4xl font-black text-white">{summary.explorationPercent}%</h2>
              <p className="mt-2 text-white/58">{summary.unlockedCount}/{summary.totalRegions} regiones desbloqueadas</p>
              <p className="mt-4 text-sm font-bold text-amber-100">{summary.narratorLine}</p>
              <p className="mt-2 text-xs text-white/45">{globalNarratorLines[(summary.unlockedCount + (world.activeWorldEvent ? 1 : 0)) % globalNarratorLines.length] ?? globalNarratorLines[0]}</p>
            </div>
            <RegionCard region={selectedRegion} />
          </aside>
        </div>

        <SeasonBanner />
      </section>
      <GlobalEventOverlay />
    </main>
  );
}
