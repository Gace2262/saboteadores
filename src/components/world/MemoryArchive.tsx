"use client";

import { archiveEntries } from "@/data/archiveEntries";
import { useWorldStore } from "@/store/worldStore";

export function MemoryArchive() {
  const { archiveLog, recordArchive, discoveredSecrets } = useWorldStore();
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {archiveEntries.map((entry) => {
        const count = archiveLog[entry.id] ?? 0;
        return (
          <article key={entry.id} className="rounded-lg border border-white/10 bg-black/50 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-100/55">{entry.category}</p>
            <h3 className="mt-2 text-2xl font-black text-white">{entry.title}</h3>
            <p className="mt-3 text-sm text-white/62">{entry.summary}</p>
            <p className="mt-3 text-sm font-bold text-amber-100/80">{entry.unlockHint}</p>
            <p className="mt-4 border-l-2 border-white/15 pl-3 text-sm text-white/52">{entry.flavor}</p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="rounded bg-white/8 px-2 py-1 text-xs font-black text-white/60">Registros: {count}</span>
              <button className="campaign-choice max-w-xs" onClick={() => recordArchive(entry.id)}>
                Registrar memoria
              </button>
            </div>
          </article>
        );
      })}
      <article className="rounded-lg border border-violet-100/16 bg-violet-950/20 p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-violet-100/55">secretos</p>
        <h3 className="mt-2 text-2xl font-black text-white">Secretos descubiertos</h3>
        <p className="mt-3 text-sm text-white/62">{discoveredSecrets.length ? discoveredSecrets.join(" / ") : "El archivo no encontro secretos. Eso le parece ofensivo."}</p>
      </article>
    </section>
  );
}
