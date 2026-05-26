import Link from "next/link";
import { AnimatedLogoReveal } from "@/components/branding/AnimatedLogoReveal";
import { LoadingScreenShowcase } from "@/components/branding/LoadingScreenShowcase";
import { TrailerShotBoard } from "@/components/branding/TrailerShotBoard";

export default function TrailerAssetsPage() {
  return (
    <main className="min-h-screen bg-[#050308] px-4 py-8 text-white">
      <section className="mx-auto max-w-7xl space-y-6">
        <Link className="inline-flex rounded border border-white/10 bg-black/45 px-3 py-2 text-sm" href="/branding">Volver a branding</Link>
        <AnimatedLogoReveal />
        <TrailerShotBoard />
        <LoadingScreenShowcase />
      </section>
    </main>
  );
}
