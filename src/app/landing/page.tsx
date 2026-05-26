import Link from "next/link";
import { DemoDownloadCard } from "@/components/launch/DemoDownloadCard";
import { FeatureGrid } from "@/components/launch/FeatureGrid";
import { LandingHero } from "@/components/launch/LandingHero";
import { PressKitDownload } from "@/components/launch/PressKitDownload";
import { RoadmapPreview } from "@/components/launch/RoadmapPreview";
import { ScreenshotGallery } from "@/components/launch/ScreenshotGallery";
import { TrailerEmbed } from "@/components/launch/TrailerEmbed";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#050308] text-white">
      <LandingHero />
      <FeatureGrid />
      <TrailerEmbed />
      <ScreenshotGallery />
      <DemoDownloadCard />
      <RoadmapPreview />
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-14 md:grid-cols-2">
        <PressKitDownload />
        <div className="rounded-xl border border-white/10 bg-black/55 p-5">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-100/55">Aviso breve</p>
          <h2 className="mt-2 text-3xl font-black">Ficcion psicologica, no terapia</h2>
          <p className="mt-3 leading-7 text-white/66">
            Obra de ficcion psicologica. No reemplaza terapia, diagnostico ni apoyo profesional. No hay compras reales.
          </p>
          <Link href="/legal" className="campaign-choice mt-5 max-w-xs">Leer legal</Link>
        </div>
      </section>
    </main>
  );
}
