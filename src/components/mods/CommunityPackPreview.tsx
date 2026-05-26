"use client";

import { useModStore } from "@/store/modStore";

export function CommunityPackPreview() {
  const active = useModStore((state) => state.installedMods.filter((mod) => mod.enabled && mod.validation.valid));
  const exportActivePack = useModStore((state) => state.exportActivePack);
  const totals = active.reduce(
    (acc, mod) => ({
      cards: acc.cards + (mod.package.cards?.length ?? 0),
      bosses: acc.bosses + (mod.package.bosses?.length ?? 0),
      events: acc.events + (mod.package.events?.length ?? 0),
      campaigns: acc.campaigns + (mod.package.campaigns?.length ?? 0),
    }),
    { cards: 0, bosses: 0, events: 0, campaigns: 0 },
  );
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-4 text-white">
      <h2 className="text-xl font-black">Pack comunitario activo</h2>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <span className="rounded bg-white/5 p-3">{totals.cards} cartas</span>
        <span className="rounded bg-white/5 p-3">{totals.bosses} bosses</span>
        <span className="rounded bg-white/5 p-3">{totals.events} eventos</span>
        <span className="rounded bg-white/5 p-3">{totals.campaigns} campanas</span>
      </div>
      <details className="mt-3">
        <summary className="cursor-pointer text-sm font-bold text-amber-100">Ver JSON de exportacion</summary>
        <pre className="mt-2 max-h-56 overflow-auto rounded bg-zinc-950 p-3 text-xs text-white/60">{exportActivePack()}</pre>
      </details>
    </section>
  );
}
