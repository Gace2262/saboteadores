"use client";

import Link from "next/link";
import { modWarningLabels } from "@/data/modPermissions";
import type { InstalledMod } from "@/logic/mods/modTypes";
import { useModStore } from "@/store/modStore";

export function ModCard({ mod }: { mod: InstalledMod }) {
  const toggleMod = useModStore((state) => state.toggleMod);
  const removeMod = useModStore((state) => state.removeMod);
  const status = mod.enabled ? "Activo" : "Archivado";
  return (
    <article className="rounded-lg border border-amber-300/20 bg-black/45 p-4 text-white shadow-[0_0_28px_rgba(180,130,40,0.12)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-200/70">{mod.manifest.author}</p>
          <h3 className="mt-1 text-2xl font-black">{mod.manifest.name}</h3>
          <p className="mt-1 text-sm text-white/65">{mod.manifest.description}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${mod.enabled ? "bg-emerald-400/20 text-emerald-100" : "bg-zinc-700/60 text-white/70"}`}>{status}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded border border-white/10 bg-white/5 px-2 py-1">v{mod.manifest.version}</span>
        <span className="rounded border border-white/10 bg-white/5 px-2 py-1">{mod.trustState}</span>
        <span className="rounded border border-white/10 bg-white/5 px-2 py-1">checksum {mod.checksum}</span>
      </div>
      {(mod.manifest.contentWarnings ?? []).length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {mod.manifest.contentWarnings?.map((warning) => (
            <span key={warning} className="rounded-full border border-red-300/25 bg-red-950/35 px-2 py-1 text-xs text-red-100">
              {modWarningLabels[warning]}
            </span>
          ))}
        </div>
      )}
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
        <button className="rounded border border-amber-300/30 bg-amber-300/10 px-3 py-2 font-bold text-amber-100" onClick={() => toggleMod(mod.manifest.id)}>
          {mod.enabled ? "Desactivar" : "Activar"}
        </button>
        <Link className="rounded border border-white/10 bg-white/5 px-3 py-2 text-center font-bold" href={`/mods/${mod.manifest.id}`}>
          Detalles
        </Link>
        <Link className="rounded border border-violet-300/25 bg-violet-400/10 px-3 py-2 text-center font-bold text-violet-100" href="/mods/sandbox">
          Probar
        </Link>
        <button className="rounded border border-red-300/25 bg-red-500/10 px-3 py-2 font-bold text-red-100" onClick={() => removeMod(mod.manifest.id)}>
          Eliminar
        </button>
      </div>
    </article>
  );
}
