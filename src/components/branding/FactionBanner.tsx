import { factionVisualGuide } from "@/data/factionVisualGuide";

export function FactionBanner() {
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-5 text-white">
      <h2 className="text-4xl font-black uppercase">Banners por faccion</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {factionVisualGuide.map((faction) => (
          <article key={faction.id} className={`relative min-h-56 overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br ${faction.gradient} p-5`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.18),transparent_32%),linear-gradient(180deg,transparent,#000_92%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/55">{faction.symbol}</p>
                  <h3 className="mt-1 text-3xl font-black uppercase">{faction.title}</h3>
                </div>
                <span className="rounded-full border border-white/25 bg-black/35 px-3 py-2 text-xs font-black">{faction.id}</span>
              </div>
              <div>
                <p className="text-sm text-white/62">{faction.texture}</p>
                <p className="mt-2 text-lg font-black text-white">{faction.phrase}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
