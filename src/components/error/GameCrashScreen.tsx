"use client";

import Link from "next/link";
import { exportSave } from "@/logic/save/saveManager";
import { RecoverSaveButton } from "./RecoverSaveButton";

export function GameCrashScreen({ errorCode }: { errorCode?: string }) {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 w-full max-w-3xl rounded-lg border border-red-100/25 bg-black/72 p-7 text-center">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-red-100/65">Error controlado</p>
        <h1 className="mt-3 text-5xl font-black">El Tribunal tropezo con una cadena</h1>
        <p className="mx-auto mt-4 max-w-xl text-white/68">No perdiste la cordura. Solo encontramos un bug con toga.</p>
        <p className="mt-3 text-xs text-white/45">Codigo: {errorCode ?? "sin-codigo"}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button className="campaign-action max-w-xs" onClick={() => window.location.reload()}>Reintentar</button>
          <Link href="/" className="campaign-choice max-w-xs">Volver al menu</Link>
          <RecoverSaveButton />
          <button className="campaign-choice max-w-xs" onClick={() => navigator.clipboard?.writeText(exportSave())}>Exportar diagnostico</button>
        </div>
      </section>
    </main>
  );
}
