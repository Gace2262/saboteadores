"use client";

import { getFaction } from "@/data/factions";
import { useAIStore } from "@/store/aiStore";

export function AIDecisionLog() {
  const entries = useAIStore((state) => state.decisionLog);

  return (
    <section className="rounded-2xl border border-white/10 bg-black/40 p-5">
      <p className="text-xs uppercase tracking-[0.28em] text-amber-200/70">Registro de decisiones</p>
      <div className="mt-4 space-y-3">
        {entries.length === 0 ? (
          <p className="text-sm text-zinc-400">Sin decisiones registradas. El expediente esta inquietantemente limpio.</p>
        ) : (
          entries.map((entry) => (
            <article key={entry.id} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
                <span>{getFaction(entry.bossId)?.name ?? entry.bossId}</span>
                <span>{new Date(entry.createdAt).toLocaleTimeString()}</span>
              </div>
              <h4 className="mt-2 text-sm font-semibold text-white">{entry.intent.replace(/_/g, " ")}</h4>
              <p className="mt-1 text-xs text-zinc-300">{entry.reason}</p>
              <p className="mt-2 text-xs italic text-amber-100/80">&quot;{entry.dialogueLine}&quot;</p>
              {entry.fairnessWarnings.length > 0 && <p className="mt-2 text-xs text-rose-200">{entry.fairnessWarnings.join(" / ")}</p>}
            </article>
          ))
        )}
      </div>
    </section>
  );
}
