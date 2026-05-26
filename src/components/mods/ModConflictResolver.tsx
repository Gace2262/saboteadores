"use client";

import { useModStore } from "@/store/modStore";

export function ModConflictResolver() {
  const conflicts = useModStore((state) => state.getConflicts());
  const resolveConflict = useModStore((state) => state.resolveConflict);
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-4 text-white">
      <h2 className="text-xl font-black">Conflictos</h2>
      <p className="mt-1 text-sm text-white/60">IDs duplicados. Dos cartas reclaman el mismo trauma.</p>
      <div className="mt-3 space-y-2">
        {conflicts.map((conflict) => (
          <div key={conflict.id} className="rounded border border-amber-300/20 bg-amber-300/10 p-3 text-sm">
            <p className="font-bold">{conflict.affectedId}</p>
            <p className="text-white/65">{conflict.message}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button className="rounded border border-white/15 bg-black/25 px-2 py-1" onClick={() => resolveConflict(conflict, conflict.modA)}>
                Gana {conflict.modA}
              </button>
              {conflict.modB && (
                <button className="rounded border border-white/15 bg-black/25 px-2 py-1" onClick={() => resolveConflict(conflict, conflict.modB as string)}>
                  Gana {conflict.modB}
                </button>
              )}
            </div>
          </div>
        ))}
        {conflicts.length === 0 && <p className="text-sm text-white/55">Sin conflictos. El caos presento papeles correctos.</p>}
      </div>
    </section>
  );
}
