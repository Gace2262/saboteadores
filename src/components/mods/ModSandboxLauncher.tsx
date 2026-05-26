"use client";

import Link from "next/link";
import { useModStore } from "@/store/modStore";

export function ModSandboxLauncher() {
  const sandbox = useModStore((state) => state.getSandboxState());
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#47101f,#070408_55%,#010102)] px-4 py-8 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.35em] text-red-200/70">Sandbox avanzado</p>
        <h1 className="mt-2 text-4xl font-black md:text-6xl">Prueba sin manchar el expediente principal</h1>
        <p className="mt-3 max-w-3xl text-white/70">{sandbox.message}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <section className="rounded-lg border border-white/10 bg-black/45 p-5">
            <h2 className="text-2xl font-black">Reglas custom activas</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {Object.entries(sandbox.rules).map(([key, value]) => (
                <div key={key} className="rounded border border-white/10 bg-white/5 p-3">
                  <p className="text-white/50">{key}</p>
                  <p className="text-xl font-black">{value}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-lg border border-amber-300/20 bg-black/45 p-5">
            <h2 className="text-2xl font-black">Expedientes activos</h2>
            <div className="mt-3 space-y-2">
              {sandbox.activeModIds.map((id) => (
                <p key={id} className="rounded border border-white/10 bg-white/5 p-3 text-sm">{id}</p>
              ))}
              {sandbox.activeModIds.length === 0 && <p className="text-white/60">Ningun mod activo. Sandbox limpio, con sospechosa estabilidad.</p>}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link className="rounded border border-amber-300/35 bg-amber-300/10 px-4 py-3 font-bold text-amber-100" href="/battle">
                Probar en batalla
              </Link>
              <Link className="rounded border border-white/15 bg-white/10 px-4 py-3 font-bold" href="/editor/sandbox">
                Abrir sandbox editorial
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
