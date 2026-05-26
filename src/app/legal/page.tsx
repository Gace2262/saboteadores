import Link from "next/link";

const points = [
  "Saboteadores Mentales: Habitantes Invisibles es una obra interactiva de ficcion psicologica.",
  "No ofrece diagnostico, tratamiento ni consejo medico o psicologico.",
  "Este juego representa patrones mentales de forma simbolica y narrativa. No ofrece diagnostico, tratamiento ni consejo medico o psicologico.",
  "Sus sistemas representan patrones mentales de forma simbolica y narrativa.",
  "No hay compras reales, dinero real ni monetizacion de sobres.",
  "El progreso se guarda localmente en el dispositivo mediante localStorage y puede exportarse como JSON.",
  "El feedback de la demo se guarda localmente y se exporta manualmente; no se envia automaticamente.",
  "La analitica, si se activa en el futuro, sera opcional y claramente indicada.",
  "Los assets actuales son placeholders originales o generativos simples, preparados para reemplazo futuro.",
  "Contacto publico futuro: pendiente de definir antes de pagina Steam o itch.io.",
];

export default function LegalPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto max-w-5xl rounded-lg border border-amber-100/18 bg-black/66 p-7">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-amber-100/65">Aviso legal</p>
        <h1 className="mt-3 text-5xl font-black md:text-7xl">Expediente de ficcion</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/68">
          Saboteadores Mentales: Habitantes Invisibles es una obra interactiva de ficcion psicologica. No ofrece
          diagnostico, tratamiento ni consejo medico. Sus sistemas representan patrones mentales de forma simbolica y
          narrativa.
        </p>
        <div className="mt-7 grid gap-3">
          {points.map((point) => (
            <div key={point} className="rounded border border-white/10 bg-white/5 p-4 text-white/70">
              {point}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="campaign-choice max-w-xs">Menu principal</Link>
          <Link href="/landing" className="campaign-choice max-w-xs">Landing</Link>
          <Link href="/credits" className="campaign-choice max-w-xs">Creditos</Link>
        </div>
      </section>
    </main>
  );
}
