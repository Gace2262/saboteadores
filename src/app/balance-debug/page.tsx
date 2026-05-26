import Link from "next/link";
import { notFound } from "next/navigation";
import { BalanceDebugTable } from "@/components/balance/BalanceDebugTable";
import { CardPowerPanel } from "@/components/balance/CardPowerPanel";
import { DeckPowerMeter } from "@/components/balance/DeckPowerMeter";
import { DifficultyPreview } from "@/components/balance/DifficultyPreview";
import { requireDebugEnabled } from "@/lib/debugGate";

export default function BalanceDebugPage() {
  if (!requireDebugEnabled()) notFound();
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Balance Debug visible en desarrollo</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">Mesa de ajuste del Tribunal</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            Poder de cartas, mazos, dificultad y alertas. Aqui el Excel emocional por fin sirve para algo.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/economy" className="campaign-choice max-w-xs">Economia</Link>
            <Link href="/progression" className="campaign-choice max-w-xs">Progresion</Link>
          </div>
        </header>
        <CardPowerPanel />
        <DeckPowerMeter />
        <DifficultyPreview />
        <BalanceDebugTable />
      </section>
    </main>
  );
}
