"use client";

import { balanceConfig, balanceWarnings } from "@/data/balanceConfig";

export function BalanceEditor() {
  return (
    <section className="rounded-lg border border-white/10 bg-black/50 p-5 text-white">
      <h2 className="text-2xl font-black">Balance</h2>
      <pre className="mt-3 max-h-80 overflow-auto rounded bg-black/55 p-3 text-xs text-white/65">{JSON.stringify({ balanceConfig, balanceWarnings }, null, 2)}</pre>
      <p className="mt-3 text-xs text-white/45">Sin escritura peligrosa. Primero miramos el Excel emocional, luego le damos botones.</p>
    </section>
  );
}
