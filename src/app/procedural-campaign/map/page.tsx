"use client";

import Link from "next/link";
import { GeneratedCampaignMap } from "@/components/procedural/GeneratedCampaignMap";
import { RoutePreview } from "@/components/procedural/RoutePreview";
import { RunModifiersPanel } from "@/components/procedural/RunModifiersPanel";
import { RunSummary } from "@/components/procedural/RunSummary";
import { useProceduralCampaignStore } from "@/store/proceduralCampaignStore";

export default function ProceduralCampaignMapPage() {
  const campaign = useProceduralCampaignStore((state) => state.currentCampaign);
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(242,211,123,0.18),transparent_30%),linear-gradient(135deg,#050308,#0b1018_55%,#050308)] px-5 py-8 text-white">
      <section className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/55 p-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-100/60">Mapa neuronal procedural</p>
              <h1 className="mt-2 text-4xl font-black">Rutas, sinapsis y decisiones dudosas</h1>
            </div>
            <Link href="/procedural-campaign/setup" className="campaign-choice max-w-xs">Nueva seed</Link>
          </div>
          <GeneratedCampaignMap />
        </div>
        <aside className="grid content-start gap-4">
          {campaign ? (
            <>
              <RoutePreview campaign={campaign} />
              <RunModifiersPanel modifiers={campaign.modifiers} />
              <RunSummary />
            </>
          ) : (
            <Link href="/procedural-campaign/setup" className="campaign-action">Crear primer mapa</Link>
          )}
        </aside>
      </section>
    </main>
  );
}
