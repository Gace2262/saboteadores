"use client";

import { useMemo } from "react";
import { useModStore } from "@/store/modStore";
import { ModValidationReport } from "./ModValidationReport";
import { JSONPreviewPanel } from "@/components/editor/JSONPreviewPanel";

export function ModDetailsPanel({ modId }: { modId?: string }) {
  const installedMods = useModStore((state) => state.installedMods);
  const selectedModId = useModStore((state) => state.selectedModId);
  const exportMod = useModStore((state) => state.exportMod);
  const mod = useMemo(() => installedMods.find((item) => item.manifest.id === (modId ?? selectedModId)), [installedMods, modId, selectedModId]);
  if (!mod) {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-8 text-white">
        <section className="mx-auto max-w-4xl rounded-lg border border-white/10 bg-black/45 p-8 text-center">
          <h1 className="text-3xl font-black">Expediente no encontrado</h1>
          <p className="mt-2 text-white/65">Este archivo no esta cargado o se fue a declarar contra otro mod.</p>
        </section>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#3b260f,#060408_55%,#010102)] px-4 py-8 text-white">
      <section className="mx-auto max-w-6xl space-y-5">
        <div className="rounded-lg border border-amber-300/20 bg-black/45 p-5">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200/70">Expediente comunitario</p>
          <h1 className="mt-2 text-4xl font-black">{mod.manifest.name}</h1>
          <p className="mt-2 max-w-3xl text-white/70">{mod.manifest.description}</p>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-4">
            <span className="rounded border border-white/10 bg-white/5 p-3">Autor: {mod.manifest.author}</span>
            <span className="rounded border border-white/10 bg-white/5 p-3">Version: {mod.manifest.version}</span>
            <span className="rounded border border-white/10 bg-white/5 p-3">Estado: {mod.enabled ? "activo" : "archivado"}</span>
            <span className="rounded border border-white/10 bg-white/5 p-3">Checksum: {mod.checksum}</span>
          </div>
        </div>
        <ModValidationReport report={mod.validation} />
        <JSONPreviewPanel title="JSON exportable" data={JSON.parse(exportMod(mod.manifest.id) || "{}") as unknown} />
      </section>
    </main>
  );
}
