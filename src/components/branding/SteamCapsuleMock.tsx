import { brandingAssets } from "@/data/brandingAssets";

export function SteamCapsuleMock() {
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-5 text-white">
      <h2 className="text-4xl font-black uppercase">Mockups Steam</h2>
      <p className="mt-2 text-white/60">Capsulas promocionales con jerarquia clara: ojo, martillo, logo y promesa de juego.</p>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="relative aspect-[616/353] overflow-hidden rounded-lg border border-amber-100/20 bg-[radial-gradient(circle_at_70%_20%,rgba(214,170,69,0.32),transparent_30%),linear-gradient(135deg,#050308,#230a12,#000)] p-6">
          <div className="absolute right-10 top-8 h-36 w-36 rounded-full border border-amber-100/35 bg-black/45" />
          <div className="relative z-10 flex h-full flex-col justify-end">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-amber-100/70">Psychological Deckbuilding Opera</p>
            <h3 className="mt-2 max-w-xl text-5xl font-black uppercase leading-none">{brandingAssets.title}</h3>
            <p className="mt-3 text-xl font-bold text-white/70">{brandingAssets.subtitle}</p>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="aspect-[231/87] rounded-lg border border-white/10 bg-gradient-to-r from-black via-amber-950 to-black p-4">
            <p className="text-2xl font-black uppercase text-amber-100">Saboteadores Mentales</p>
          </div>
          <div className="aspect-[600/900] rounded-lg border border-white/10 bg-[radial-gradient(circle_at_50%_12%,rgba(214,170,69,0.24),transparent_28%),linear-gradient(180deg,#090509,#000)] p-5">
            <div className="grid h-full place-items-center rounded border border-amber-100/15">
              <p className="max-w-xs text-center text-4xl font-black uppercase">Deckbuilding Inside a Living Tribunal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
