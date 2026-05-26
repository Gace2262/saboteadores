import Link from "next/link";
import { SpectatorPanel } from "@/components/multiplayer/SpectatorPanel";

export default function SpectatePage({ params }: { params: { id: string } }) {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto w-full max-w-6xl">
        <Link href="/multiplayer" className="campaign-choice mb-5 max-w-xs">Salir de espectador</Link>
        <div className="mb-5 rounded border border-white/10 bg-black/45 p-3 text-white/55">Match observado: {params.id}</div>
        <SpectatorPanel />
      </section>
    </main>
  );
}
