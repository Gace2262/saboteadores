import Link from "next/link";
import { LevelRewardTrack } from "@/components/progression/LevelRewardTrack";
import { ProgressionCurveView } from "@/components/progression/ProgressionCurveView";

export default function ProgressionPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Progresion saludable</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">Niveles sin condena circular</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            Recompensas previsibles, picos cada 5 y 10 niveles, y objetivos de ritmo para evitar grindeo vacio.
          </p>
          <Link href="/economy" className="campaign-choice mt-5 max-w-xs">Ver economia</Link>
        </header>
        <ProgressionCurveView />
        <LevelRewardTrack />
      </section>
    </main>
  );
}
