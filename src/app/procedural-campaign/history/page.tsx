import Link from "next/link";
import { RunHistoryList } from "@/components/procedural/RunHistoryList";

export default function ProceduralCampaignHistoryPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#050308,#130915_55%,#050308)] px-5 py-8 text-white">
      <section className="mx-auto grid max-w-6xl gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/55 p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-100/60">Historial de runs</p>
            <h1 className="mt-2 text-4xl font-black">Expedientes archivados</h1>
          </div>
          <Link href="/procedural-campaign/setup" className="campaign-action max-w-xs">Nueva run</Link>
        </div>
        <RunHistoryList />
      </section>
    </main>
  );
}
