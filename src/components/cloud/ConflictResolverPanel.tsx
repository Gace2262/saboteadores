"use client";

import { useCloudStore } from "@/store/cloudStore";

export function ConflictResolverPanel() {
  const { conflict, sync } = useCloudStore();
  if (!conflict) {
    return (
      <section className="rounded-lg border border-white/10 bg-black/45 p-5 text-white">
        <h2 className="text-2xl font-black">Conflictos</h2>
        <p className="mt-2 text-white/60">No hay conflicto activo. El Tribunal no encontro dos expedientes peleando por la misma silla.</p>
      </section>
    );
  }
  return (
    <section className="rounded-lg border border-red-100/20 bg-red-950/25 p-5 text-white">
      <h2 className="text-2xl font-black">Conflicto de progreso</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Summary title="Local" updatedAt={conflict.localUpdatedAt} data={conflict.localSummary} />
        <Summary title="Nube" updatedAt={conflict.cloudUpdatedAt} data={conflict.cloudSummary} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="campaign-choice max-w-xs" onClick={() => sync("use_local")}>Usar local</button>
        <button className="campaign-choice max-w-xs" onClick={() => sync("use_cloud")}>Usar nube</button>
        <button className="campaign-action max-w-xs" onClick={() => sync("merge_safe")}>Fusion segura</button>
      </div>
    </section>
  );
}

function Summary({ title, updatedAt, data }: { title: string; updatedAt: string; data: Record<string, unknown> }) {
  return (
    <div className="rounded border border-white/10 bg-black/35 p-4">
      <p className="text-xs font-black uppercase text-white/45">{title}</p>
      <p className="mt-1 text-xs text-white/50">{updatedAt}</p>
      <pre className="mt-3 overflow-auto rounded bg-black/50 p-3 text-xs text-white/68">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
