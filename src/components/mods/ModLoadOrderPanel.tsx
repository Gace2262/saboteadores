"use client";

import { useModStore } from "@/store/modStore";

export function ModLoadOrderPanel() {
  const mods = useModStore((state) => state.installedMods);
  const moveModUp = useModStore((state) => state.moveModUp);
  const moveModDown = useModStore((state) => state.moveModDown);
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-4 text-white">
      <h2 className="text-xl font-black">Orden de carga</h2>
      <p className="mt-1 text-sm text-white/60">Si dos mods pisan el mismo ID, el ultimo en prioridad gana la audiencia.</p>
      <div className="mt-3 space-y-2">
        {[...mods].sort((a, b) => a.loadOrder - b.loadOrder).map((mod) => (
          <div key={mod.manifest.id} className="flex items-center justify-between gap-2 rounded border border-white/10 bg-white/5 p-2 text-sm">
            <span className="truncate">{mod.loadOrder + 1}. {mod.manifest.name}</span>
            <div className="flex gap-1">
              <button className="rounded border border-white/10 px-2" onClick={() => moveModUp(mod.manifest.id)} aria-label={`Subir ${mod.manifest.name}`}>
                Subir
              </button>
              <button className="rounded border border-white/10 px-2" onClick={() => moveModDown(mod.manifest.id)} aria-label={`Bajar ${mod.manifest.name}`}>
                Bajar
              </button>
            </div>
          </div>
        ))}
        {mods.length === 0 && <p className="text-sm text-white/55">Sin mods. Sin disputas. Raro.</p>}
      </div>
    </section>
  );
}
