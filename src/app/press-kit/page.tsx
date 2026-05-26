import Link from "next/link";
import { KeyArtPanel } from "@/components/branding/KeyArtPanel";
import { PressQuoteCard } from "@/components/branding/PressQuoteCard";
import { SteamCapsulePreview } from "@/components/branding/SteamCapsulePreview";
import { TaglineDisplay } from "@/components/branding/TaglineDisplay";
import { brandColors, iconography, officialBranding } from "@/data/branding";
import { pressKit } from "@/data/pressKit";
import { futureArchitecture, roadmap } from "@/data/roadmap";

export default function PressKitPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Press Kit / Pitch</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">{officialBranding.name}</h1>
          <p className="mt-4 max-w-4xl text-xl font-bold text-amber-100">{pressKit.shortDescription}</p>
          <p className="mt-3 max-w-4xl text-white/62">{pressKit.longDescription}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {pressKit.mockLinks.map((link) => (
              <Link key={link.href} href={link.href} className="campaign-choice max-w-xs">{link.label}</Link>
            ))}
          </div>
        </header>

        <TaglineDisplay />
        <SteamCapsulePreview />

        <section className="rounded-lg border border-white/10 bg-black/50 p-5">
          <h2 className="text-3xl font-black">Features</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {pressKit.features.map((feature) => (
              <div key={feature} className="rounded border border-white/10 bg-white/5 p-3 text-sm font-bold text-white/68">{feature}</div>
            ))}
          </div>
        </section>

        <KeyArtPanel />

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-white/10 bg-black/50 p-5">
            <h2 className="text-3xl font-black">Branding oficial</h2>
            <p className="mt-3 text-white/62">{officialBranding.longPitch}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {iconography.map((icon) => <span key={icon} className="rounded border border-amber-100/15 bg-amber-100/8 px-2 py-1 text-xs text-amber-100">{icon}</span>)}
            </div>
          </article>
          <article className="rounded-lg border border-white/10 bg-black/50 p-5">
            <h2 className="text-3xl font-black">Paleta</h2>
            <div className="mt-4 grid gap-2">
              {brandColors.map((color) => (
                <div key={color.name} className="flex items-center gap-3 rounded border border-white/10 bg-white/5 p-2">
                  <span className="h-8 w-8 rounded" style={{ backgroundColor: color.hex }} />
                  <div>
                    <p className="font-black text-white">{color.name}</p>
                    <p className="text-xs text-white/50">{color.hex} / {color.use}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {pressKit.mockQuotes.map((quote) => <PressQuoteCard key={quote} quote={quote} />)}
        </section>

        <section className="rounded-lg border border-white/10 bg-black/50 p-5">
          <h2 className="text-3xl font-black">Roadmap</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {roadmap.map((item) => (
              <article key={item.id} className="rounded border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-black uppercase text-amber-100/60">{item.status}</p>
                <h3 className="mt-2 text-xl font-black text-white">{item.stage}</h3>
                <p className="mt-2 text-sm text-white/55">{item.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm text-white/55">Arquitectura futura: {futureArchitecture.join(" / ")}</p>
        </section>
      </section>
    </main>
  );
}
