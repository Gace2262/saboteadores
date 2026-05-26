"use client";

import type { ModValidationReport as ModValidationReportData } from "@/logic/mods/modTypes";

export function ModValidationReport({ report }: { report: ModValidationReportData }) {
  const tone = report.valid ? "border-emerald-400/40 bg-emerald-950/25" : "border-red-400/40 bg-red-950/25";
  return (
    <section className={`rounded-lg border p-4 text-sm text-white ${tone}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-black">{report.valid ? "Expediente valido" : "Expediente rechazado"}</h3>
        <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs uppercase tracking-[0.18em]">
          {report.detectedContent.cards} cartas · {report.detectedContent.bosses} bosses · {report.detectedContent.campaigns} campanas
        </span>
      </div>
      {report.errors.length > 0 && (
        <div className="mt-3">
          <p className="font-bold text-red-100">Errores</p>
          <ul className="mt-1 space-y-1 text-white/75">
            {report.errors.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      {report.warnings.length > 0 && (
        <div className="mt-3">
          <p className="font-bold text-amber-100">Advertencias</p>
          <ul className="mt-1 space-y-1 text-white/75">
            {report.warnings.map((warning) => (
              <li key={warning}>- {warning}</li>
            ))}
          </ul>
        </div>
      )}
      {report.conflicts.length > 0 && (
        <div className="mt-3">
          <p className="font-bold text-sky-100">Conflictos</p>
          <ul className="mt-1 space-y-1 text-white/75">
            {report.conflicts.map((conflict) => (
              <li key={conflict.id}>- {conflict.message}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
