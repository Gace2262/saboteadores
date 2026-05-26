"use client";

export function UnlockTimeline({ entries }: { entries: string[] }) {
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-4">
      <p className="text-sm font-black uppercase text-amber-100/65">Recompensas desbloqueadas</p>
      <div className="mt-4 space-y-3">
        {entries.map((entry, index) => (
          <div key={`${entry}-${index}`} className="rounded-md border border-white/10 bg-white/6 p-3 text-sm text-white/68">
            {entry}
          </div>
        ))}
      </div>
    </section>
  );
}
