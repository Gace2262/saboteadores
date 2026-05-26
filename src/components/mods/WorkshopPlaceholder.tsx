import Link from "next/link";

export function WorkshopPlaceholder() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1e293b,#050308_55%,#010102)] px-4 py-8 text-white">
      <section className="mx-auto max-w-5xl rounded-lg border border-white/10 bg-black/45 p-8 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">Workshop futuro</p>
        <h1 className="mt-2 text-4xl font-black md:text-6xl">El Tribunal acepta expedientes locales</h1>
        <p className="mx-auto mt-4 max-w-3xl text-white/70">
          Workshop aun no conectado. Esta pantalla queda preparada para navegar, publicar, valorar y descargar mods cuando el Tribunal consiga una ventanilla online con menos humo.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link className="rounded-lg border border-amber-300/35 bg-amber-300/10 px-5 py-3 font-bold text-amber-100" href="/mods">
            Ver mods locales
          </Link>
          <Link className="rounded-lg border border-white/15 bg-white/10 px-5 py-3 font-bold" href="/mods/import">
            Importar JSON
          </Link>
        </div>
      </section>
    </main>
  );
}
