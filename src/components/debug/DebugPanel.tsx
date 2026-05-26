"use client";

import Link from "next/link";
import { useEconomyStore } from "@/store/economyStore";
import { useCollectionStore } from "@/store/collectionStore";
import { SystemHealthPanel } from "./SystemHealthPanel";
import { TestScenarioLauncher } from "./TestScenarioLauncher";
import { ErrorLogViewer } from "./ErrorLogViewer";

export function DebugPanel() {
  const grantCurrencies = useEconomyStore((state) => state.grantCurrencies);
  const grantCard = useCollectionStore((state) => state.grantCard);
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Debug interno offline</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">Sala QA del Tribunal</h1>
          <p className="mt-3 max-w-3xl text-white/62">Herramientas locales, sin telemetria externa. El bug con toga sera interrogado en privado.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/debug/saves" className="campaign-choice max-w-xs">Saves</Link>
            <Link href="/debug/diagnostics" className="campaign-choice max-w-xs">Diagnosticos</Link>
            <button className="campaign-action max-w-xs" onClick={() => grantCurrencies({ clarityFragments: 500, mentalKeys: 2, catarsisEchoes: 3 })}>Agregar monedas</button>
            <button className="campaign-action max-w-xs" onClick={() => grantCard("autoestima-con-casco", "DebugPanel")}>Desbloquear carta</button>
          </div>
        </header>
        <SystemHealthPanel />
        <TestScenarioLauncher />
        <ErrorLogViewer />
      </section>
    </main>
  );
}
