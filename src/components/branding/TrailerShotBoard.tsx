import { trailerFrames } from "@/data/trailerFrames";

export function TrailerShotBoard() {
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-5 text-white">
      <h2 className="text-4xl font-black uppercase">Trailer shot board</h2>
      <div className="mt-5 grid gap-3">
        {trailerFrames.map((frame) => (
          <article key={frame.id} className="grid gap-4 rounded-lg border border-white/10 bg-white/5 p-4 md:grid-cols-[72px_1fr_220px] md:items-center">
            <div className="grid h-16 w-16 place-items-center rounded border border-amber-100/20 bg-black/45 text-2xl font-black text-amber-100">{frame.order}</div>
            <div>
              <h3 className="text-2xl font-black">{frame.title}</h3>
              <p className="mt-1 text-white/60">{frame.description}</p>
            </div>
            <div className="rounded border border-amber-100/15 bg-black/35 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-100/60">{frame.transition}</p>
              <p className="mt-1 text-sm font-bold">{frame.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
