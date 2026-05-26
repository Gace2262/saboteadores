import Link from "next/link";
import { KeyArtHero } from "@/components/branding/KeyArtHero";
import { SteamCapsuleMock } from "@/components/branding/SteamCapsuleMock";

export default function KeyArtPage() {
  return (
    <main className="min-h-screen bg-[#050308] px-4 py-8 text-white">
      <section className="mx-auto max-w-7xl space-y-6">
        <Link className="inline-flex rounded border border-white/10 bg-black/45 px-3 py-2 text-sm" href="/branding">Volver a branding</Link>
        <KeyArtHero />
        <section className="grid gap-4 md:grid-cols-3">
          {["Horizontal 16:9", "Vertical poster", "Mobile splash", "Social banner", "Wallpaper UHD", "Steam capsule"].map((format) => (
            <article key={format} className="rounded-lg border border-white/10 bg-black/45 p-4">
              <h2 className="text-xl font-black uppercase">{format}</h2>
              <p className="mt-2 text-sm text-white/60">Composicion derivada del key art principal, lista para export PNG/WEBP cuando se agreguen assets finales.</p>
            </article>
          ))}
        </section>
        <SteamCapsuleMock />
      </section>
    </main>
  );
}
