import Link from "next/link";
import { AnimatedLogoReveal } from "@/components/branding/AnimatedLogoReveal";
import { FactionBanner } from "@/components/branding/FactionBanner";
import { KeyArtHero } from "@/components/branding/KeyArtHero";
import { LoadingScreenShowcase } from "@/components/branding/LoadingScreenShowcase";
import { LogoSystem } from "@/components/branding/LogoSystem";
import { PromoCard } from "@/components/branding/PromoCard";
import { SteamCapsuleMock } from "@/components/branding/SteamCapsuleMock";
import { TaglineCarousel } from "@/components/branding/TaglineCarousel";
import { brandingAssets } from "@/data/brandingAssets";
import { brandColors } from "@/data/branding";

export default function BrandingPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#2b1809,#050308_48%,#010102)] px-4 py-8 text-white">
      <section className="mx-auto max-w-7xl space-y-6">
        <nav className="flex flex-wrap gap-2 text-sm">
          {[
            ["/media-kit", "Media kit"],
            ["/key-art", "Key art"],
            ["/posters", "Posters"],
            ["/trailer-assets", "Trailer assets"],
          ].map(([href, label]) => (
            <Link key={href} className="rounded border border-white/10 bg-black/45 px-3 py-2" href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <KeyArtHero />
        <section className="rounded-lg border border-white/10 bg-black/45 p-5">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-100/65">identidad oficial</p>
          <h1 className="mt-2 text-5xl font-black uppercase md:text-7xl">{brandingAssets.title}</h1>
          <p className="mt-3 max-w-3xl text-xl text-white/70">{brandingAssets.shortPitch}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {brandingAssets.genreTags.map((tag) => (
              <span key={tag} className="rounded-full border border-amber-100/20 bg-amber-200/10 px-3 py-1 text-sm text-amber-100">
                {tag}
              </span>
            ))}
          </div>
        </section>
        <AnimatedLogoReveal />
        <LogoSystem />
        <TaglineCarousel />
        <section className="grid gap-4 md:grid-cols-3">
          <PromoCard format="horizontal" />
          <PromoCard format="square" />
          <PromoCard format="vertical" />
        </section>
        <section className="rounded-lg border border-white/10 bg-black/45 p-5">
          <h2 className="text-4xl font-black uppercase">Paleta oficial</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {brandColors.map((color) => (
              <article key={color.hex} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="h-20 rounded" style={{ background: color.hex }} />
                <h3 className="mt-3 text-xl font-black">{color.name}</h3>
                <p className="text-sm text-white/60">{color.hex} · {color.use}</p>
              </article>
            ))}
          </div>
        </section>
        <SteamCapsuleMock />
        <LoadingScreenShowcase />
        <FactionBanner />
      </section>
    </main>
  );
}
