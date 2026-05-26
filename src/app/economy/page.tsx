import Link from "next/link";
import { CurrencyDisplay } from "@/components/economy/CurrencyDisplay";
import { PackCostPreview } from "@/components/economy/PackCostPreview";
import { RewardBreakdown } from "@/components/economy/RewardBreakdown";

export default function EconomyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Economia interna transparente</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">Recursos del expediente</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            Sin dinero real, sin lootboxes monetizadas y con probabilidades visibles. El Tribunal cobra en metaforas, no en tarjeta.
          </p>
          <Link href="/balance-debug" className="campaign-choice mt-5 max-w-xs">Ver balance debug</Link>
        </header>
        <CurrencyDisplay />
        <RewardBreakdown />
        <PackCostPreview />
      </section>
    </main>
  );
}
