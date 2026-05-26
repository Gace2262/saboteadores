"use client";

import Link from "next/link";
import { useEditorStore } from "@/store/editorStore";

export function SandboxBattleLauncher() {
  const cardId = useEditorStore((state) => state.selectedCardId);
  return (
    <section className="rounded-lg border border-cyan-100/20 bg-cyan-300/10 p-5 text-white">
      <h2 className="text-3xl font-black">Sandbox de batalla</h2>
      <p className="mt-2 text-white/65">Carta seleccionada: {cardId}. El lanzamiento usa la batalla actual como entorno de prueba manual.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/battle" className="campaign-action max-w-xs">Probar en batalla</Link>
        <Link href="/cinematics" className="campaign-choice max-w-xs">Probar cinematica</Link>
      </div>
    </section>
  );
}
