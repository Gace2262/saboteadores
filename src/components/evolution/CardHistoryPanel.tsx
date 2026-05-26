"use client";

import type { CardProgression } from "@/store/evolutionStore";

export function CardHistoryPanel({ progression }: { progression?: CardProgression }) {
  return (
    <section className="rounded-lg border border-white/12 bg-black/48 p-5">
      <p className="text-sm font-black uppercase text-white/45">Historia de carta</p>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <Metric label="Usos" value={`${progression?.usageCount ?? 0}`} />
        <Metric label="Dano" value={`${progression?.damageDealt ?? 0}`} />
        <Metric label="Estres" value={`${progression?.stressGenerated ?? 0}`} />
        <Metric label="Claridad" value={`${progression?.clarityGenerated ?? 0}`} />
      </div>
      <div className="mt-4 grid gap-2">
        {(progression?.history.length ? progression.history : ["La carta aun no tiene expediente. Esta esperando hacer algo dramatico."]).map((line) => (
          <p key={line} className="rounded-md border border-white/10 bg-white/6 p-3 text-sm text-white/62">{line}</p>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/35 p-3">
      <p className="text-xs font-black uppercase text-white/42">{label}</p>
      <p className="mt-1 text-2xl font-black text-amber-100">{value}</p>
    </div>
  );
}
