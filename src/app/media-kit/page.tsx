import Link from "next/link";
import { KeyArtHero } from "@/components/branding/KeyArtHero";
import { LogoSystem } from "@/components/branding/LogoSystem";
import { PromoCard } from "@/components/branding/PromoCard";
import { SteamCapsuleMock } from "@/components/branding/SteamCapsuleMock";
import { brandingAssets } from "@/data/brandingAssets";

export default function MediaKitPage() {
  return (
    <main className="min-h-screen bg-[#050308] px-4 py-8 text-white">
      <section className="mx-auto max-w-7xl space-y-6">
        <Link className="inline-flex rounded border border-white/10 bg-black/45 px-3 py-2 text-sm" href="/branding">
          Volver a branding
        </Link>
        <KeyArtHero />
        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-white/10 bg-black/45 p-5">
            <h1 className="text-4xl font-black uppercase">Media kit</h1>
            <p className="mt-3 text-white/70">{brandingAssets.shortPitch}</p>
            <p className="mt-3 text-white/60">{brandingAssets.longPitch}</p>
          </article>
          <article className="rounded-lg border border-white/10 bg-black/45 p-5">
            <h2 className="text-2xl font-black uppercase">Generos</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {brandingAssets.genreTags.map((tag) => (
                <span key={tag} className="rounded-full border border-amber-100/20 bg-amber-200/10 px-3 py-1 text-amber-100">{tag}</span>
              ))}
            </div>
            <p className="mt-5 text-sm text-white/55">Contacto mock: press@saboteadores-mentales.invalid</p>
            <p className="mt-2 text-sm text-white/55">Plataformas futuras: Web, Steam, desktop via Tauri/Electron.</p>
          </article>
        </section>
        <LogoSystem />
        <SteamCapsuleMock />
        <section className="grid gap-4 md:grid-cols-3">
          <PromoCard format="horizontal" />
          <PromoCard format="square" />
          <PromoCard format="vertical" />
        </section>
      </section>
    </main>
  );
}
