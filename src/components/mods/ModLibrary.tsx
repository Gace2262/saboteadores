"use client";

import Link from "next/link";
import { useModStore } from "@/store/modStore";
import { ModCard } from "./ModCard";
import { ModConflictResolver } from "./ModConflictResolver";
import { ModLoadOrderPanel } from "./ModLoadOrderPanel";
import { CommunityPackPreview } from "./CommunityPackPreview";

export function ModLibrary() {
  const installedMods = useModStore((state) => state.installedMods);
  const installSampleMod = useModStore((state) => state.installSampleMod);
  const importMessage = useModStore((state) => state.importMessage);
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#392110,#080509_45%,#030204)] px-4 py-8 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-200/70">Archivo de Expedientes No Autorizados</p>
            <h1 className="mt-2 text-4xl font-black md:text-6xl">Mods locales</h1>
            <p className="mt-3 max-w-3xl text-white/70">
              Importa, activa y prueba contenido comunitario en JSON. Nada de scripts, nada de telemetria, nada de cuchillos escondidos en el expediente.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link className="rounded-lg border border-amber-300/40 bg-amber-300/10 px-4 py-3 font-bold text-amber-100" href="/mods/import">
              Importar JSON
            </Link>
            <button className="rounded-lg border border-white/15 bg-white/10 px-4 py-3 font-bold" onClick={installSampleMod}>
              Crear ejemplo
            </button>
          </div>
        </div>
        <p className="mt-5 rounded-lg border border-white/10 bg-black/35 p-3 text-sm text-white/70">{importMessage}</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {installedMods.length === 0 ? (
              <section className="rounded-lg border border-dashed border-white/20 bg-black/35 p-8 text-center">
                <h2 className="text-2xl font-black">No hay expedientes cargados</h2>
                <p className="mt-2 text-white/65">El Tribunal acepta JSON local, pero todavia no acepta excusas en ZIP.</p>
              </section>
            ) : (
              installedMods.map((mod) => <ModCard key={mod.manifest.id} mod={mod} />)
            )}
          </div>
          <aside className="space-y-4">
            <CommunityPackPreview />
            <ModLoadOrderPanel />
            <ModConflictResolver />
          </aside>
        </div>
      </section>
    </main>
  );
}
