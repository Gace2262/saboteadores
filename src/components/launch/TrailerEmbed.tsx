export function TrailerEmbed() {
  return (
    <section id="trailer" className="mx-auto max-w-6xl px-5 py-14 text-white">
      <div className="rounded-xl border border-amber-100/18 bg-black/62 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.44)]">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-100/55">Trailer placeholder</p>
            <h2 className="mt-2 text-4xl font-black">Cada pensamiento deja huella.</h2>
          </div>
          <a href="/trailer-mode?trailer=true" className="campaign-choice max-w-xs">
            Abrir modo trailer
          </a>
        </div>
        <div className="mt-5 grid min-h-80 place-items-center overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_center,rgba(242,211,123,0.18),transparent_30%),linear-gradient(135deg,#050308,#190812)]">
          <div className="text-center">
            <p className="text-6xl font-black text-amber-100">[MARTILLAZO]</p>
            <p className="mt-4 max-w-xl text-white/68">
              Trailer final pendiente. Esta escena sirve como placeholder para capturas, storyboard y grabacion de la demo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
