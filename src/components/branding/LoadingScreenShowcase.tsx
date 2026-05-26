import { loadingQuotes } from "@/data/loadingQuotes";

export function LoadingScreenShowcase() {
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-5 text-white">
      <h2 className="text-4xl font-black uppercase">Pantallas de carga</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {loadingQuotes.slice(0, 6).map((quote) => (
          <article key={quote.id} className="relative min-h-48 overflow-hidden rounded-lg border border-amber-100/15 bg-[radial-gradient(circle_at_50%_0%,rgba(214,170,69,0.18),transparent_35%),#050308] p-5">
            <div className="absolute left-6 top-6 h-14 w-14 rounded-full border border-amber-100/25" />
            <div className="relative flex h-full flex-col justify-end">
              <p className="text-xs uppercase tracking-[0.25em] text-amber-100/50">{quote.mood}</p>
              <p className="mt-2 text-xl font-black">{quote.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
