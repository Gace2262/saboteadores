import Link from "next/link";
import { RoadmapPreview } from "@/components/launch/RoadmapPreview";

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#141009,#050308_55%,#010102)] py-10 text-white">
      <section className="mx-auto max-w-6xl px-5">
        <Link href="/landing" className="campaign-choice max-w-xs">Volver a landing</Link>
        <div className="mt-6 rounded-xl border border-amber-100/18 bg-black/62 p-7">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-100/60">Roadmap publico</p>
          <h1 className="mt-3 text-5xl font-black">El Tribunal abre por etapas</h1>
          <p className="mt-4 max-w-3xl text-white/66">
            Esta pagina distingue lo jugable hoy de lo planeado. Nada incompleto se presenta como disponible.
          </p>
        </div>
      </section>
      <RoadmapPreview />
    </main>
  );
}
