"use client";

import { corruptionMutations } from "@/data/corruptions";

export function CardMutationPreview({ mutationIds }: { mutationIds: string[] }) {
  return (
    <section className="rounded-lg border border-rose-100/15 bg-black/48 p-5">
      <p className="text-sm font-black uppercase text-rose-100/65">Mutaciones</p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {(mutationIds.length ? mutationIds : ["sin-mutacion"]).map((id) => {
          const mutation = corruptionMutations.find((item) => item.id === id);
          return (
            <div key={id} className="rounded-md border border-white/10 bg-white/6 p-3">
              <h3 className="font-black">{mutation?.name ?? "Sin mutaciones activas"}</h3>
              <p className="mt-1 text-sm text-white/55">{mutation?.effect ?? "La carta todavia no susurra en idiomas administrativos."}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
