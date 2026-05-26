"use client";

import { motion } from "framer-motion";
import type { WorldRegion } from "@/data/worldRegions";
import { useWorldStore } from "@/store/worldStore";

type RegionCardProps = {
  region: WorldRegion;
  compact?: boolean;
};

const climateColor: Record<WorldRegion["dominantClimate"], string> = {
  juicio: "border-amber-100/25 bg-amber-300/10 text-amber-100",
  caos: "border-fuchsia-100/25 bg-fuchsia-300/10 text-fuchsia-100",
  agotamiento: "border-zinc-100/20 bg-zinc-300/10 text-zinc-100",
  claridad: "border-cyan-100/25 bg-cyan-300/10 text-cyan-100",
  corrupcion: "border-red-100/25 bg-red-500/10 text-red-100",
  catarsis: "border-white/30 bg-white/10 text-white",
};

export function RegionCard({ region, compact }: RegionCardProps) {
  const { unlockedRegionIds, selectedRegionId, selectRegion, unlockRegion } = useWorldStore();
  const unlocked = unlockedRegionIds.includes(region.id);
  const selected = selectedRegionId === region.id;
  return (
    <motion.article
      whileHover={{ y: compact ? 0 : -4 }}
      className={`rounded-lg border p-4 transition ${selected ? "border-amber-100/50 bg-amber-100/12" : "border-white/10 bg-black/48"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={`rounded border px-2 py-1 text-[10px] font-black uppercase ${climateColor[region.dominantClimate]}`}>{region.dominantClimate}</span>
          <h3 className="mt-3 text-2xl font-black text-white">{unlocked ? region.name : "???"}</h3>
          <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-white/42">{region.subtitle}</p>
        </div>
        <span className="rounded bg-black/55 px-2 py-1 text-xs font-black text-red-100">{region.danger}</span>
      </div>
      <p className="mt-4 text-sm text-white/62">{unlocked ? region.description : region.unlockRequirement}</p>
      {compact ? null : (
        <>
          <div className="mt-4 flex flex-wrap gap-2">
            {region.factionPressure.map((faction) => (
              <span key={faction} className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/55">
                {faction}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="campaign-choice max-w-xs" onClick={() => selectRegion(region.id)}>
              Inspeccionar region
            </button>
            {!unlocked ? (
              <button className="campaign-action max-w-xs" onClick={() => unlockRegion(region.id)}>
                Desbloquear exploracion
              </button>
            ) : null}
          </div>
        </>
      )}
    </motion.article>
  );
}
