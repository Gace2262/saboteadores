import type { WorkshopDependency } from "@/logic/workshop/workshopTypes";

export function ModDependencyPanel({ dependencies }: { dependencies: WorkshopDependency[] }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/45 p-4">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-white/40">Dependencias</p>
      {dependencies.length === 0 ? (
        <p className="mt-2 text-sm text-white/55">Sin dependencias. El expediente vino solo, con confianza preocupante.</p>
      ) : (
        <div className="mt-3 grid gap-2">
          {dependencies.map((dependency) => (
            <p key={dependency.id} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/68">
              {dependency.id} v{dependency.version} ({dependency.type})
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
