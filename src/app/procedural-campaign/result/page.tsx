import Link from "next/link";
import { RunHistoryList } from "@/components/procedural/RunHistoryList";

export default function ProceduralCampaignResultPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#050308,#17090a_55%,#050308)] px-5 py-8 text-white">
      <section className="mx-auto grid max-w-6xl gap-5">
        <div className="rounded-2xl border border-amber-100/18 bg-black/60 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-100/60">Resultado procedural</p>
          <h1 className="mt-2 text-5xl font-black">El expediente termino. La tinta sigue nerviosa.</h1>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/procedural-campaign/setup" className="campaign-action max-w-xs">Otra seed</Link>
            <Link href="/procedural-campaign/history" className="campaign-choice max-w-xs">Ver historial</Link>
          </div>
        </div>
        <RunHistoryList />
      </section>
    </main>
  );
}
