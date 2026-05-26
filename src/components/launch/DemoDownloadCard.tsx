import Link from "next/link";

export function DemoDownloadCard() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 text-white">
      <div className="grid gap-4 rounded-xl border border-amber-100/18 bg-black/62 p-6 md:grid-cols-[1fr_280px]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-100/55">Demo publica</p>
          <h2 className="mt-2 text-4xl font-black">Juega en web ahora. Descarga futura en preparacion.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-white/66">
            Version 0.1.0-public-demo. Duracion estimada: 15 a 25 minutos. Requisitos: navegador moderno,
            audio tras interaccion del usuario y localStorage disponible para progreso/feedback.
          </p>
        </div>
        <div className="grid content-center gap-3">
          <Link href="/demo" className="campaign-action">
            Jugar demo
          </Link>
          <span className="campaign-choice opacity-70">Descarga itch futura</span>
        </div>
      </div>
    </section>
  );
}
