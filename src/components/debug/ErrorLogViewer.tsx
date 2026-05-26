"use client";

import { useEffect } from "react";
import { useErrorStore } from "@/store/errorStore";

export function ErrorLogViewer() {
  const { errors, refreshErrors, clearErrors, recordError } = useErrorStore();
  useEffect(() => {
    refreshErrors();
  }, [refreshErrors]);
  return (
    <section className="rounded-lg border border-red-100/15 bg-black/52 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-3xl font-black">Errores recientes</h2>
        <div className="flex gap-2">
          <button className="campaign-choice max-w-xs" onClick={() => recordError({ type: "unknown_error", message: "Error simulado QA", screen: "/debug" })}>Simular error</button>
          <button className="campaign-danger max-w-xs" onClick={clearErrors}>Limpiar</button>
        </div>
      </div>
      <div className="mt-4 grid gap-2">
        {errors.length ? errors.map((error) => (
          <article key={error.id} className="rounded border border-white/10 bg-white/5 p-3">
            <p className="text-xs font-black uppercase text-red-100">{error.type} / {error.screen}</p>
            <p className="mt-1 text-white/70">{error.message}</p>
            <p className="mt-1 text-xs text-white/35">{error.timestamp}</p>
          </article>
        )) : <p className="text-white/55">Sin errores recientes. El bug con toga no firmo asistencia.</p>}
      </div>
    </section>
  );
}
