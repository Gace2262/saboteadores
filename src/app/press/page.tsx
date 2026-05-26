import Link from "next/link";
import { ScreenshotGallery } from "@/components/launch/ScreenshotGallery";

const features = [
  "Deckbuilding tactico con recursos de Voluntad, Claridad, Estres y Ruido Mental.",
  "Boss demo multi-fase: Perfeccionista Ascendido.",
  "Cartas con efectos visuales y feedback sonoro procedural.",
  "Humor negro simbolico enfocado en mecanismos mentales.",
  "Audio dinamico con martillo, cadenas, coro sintetico y ambientes.",
  "Offline-first, sin monetizacion ni datos personales obligatorios.",
];

export default function PressPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1c1308,#050308_55%,#010102)] px-5 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <Link href="/landing" className="campaign-choice max-w-xs">Volver a landing</Link>
        <div className="mt-6 rounded-xl border border-amber-100/18 bg-black/62 p-7">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-100/60">Press kit</p>
          <h1 className="mt-3 text-5xl font-black">Saboteadores Mentales: Habitantes Invisibles</h1>
          <p className="mt-5 max-w-4xl text-xl leading-9 text-white/72">
            Saboteadores Mentales: Habitantes Invisibles es un deckbuilder psicologico y cinematografico donde enfrentas
            patrones mentales convertidos en jefes teatrales dentro de un Tribunal vivo.
          </p>
          <p className="mt-4 max-w-4xl leading-8 text-white/62">
            Juego de cartas tactico con humor negro, narrativa psicologica, bosses visuales, audio reactivo y una campana
            futura sobre mecanismos internos que alguna vez protegieron la mente, pero ahora la gobiernan.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <section className="rounded-xl border border-white/10 bg-black/52 p-5">
            <h2 className="text-3xl font-black">Features</h2>
            <ul className="mt-4 grid gap-3">
              {features.map((feature) => (
                <li key={feature} className="rounded border border-white/10 bg-white/[0.04] p-3 text-white/70">{feature}</li>
              ))}
            </ul>
          </section>
          <section className="rounded-xl border border-white/10 bg-black/52 p-5">
            <h2 className="text-3xl font-black">Datos rapidos</h2>
            <div className="mt-4 grid gap-3 text-white/70">
              <p>Genero: Deckbuilder, Card Battler, Psychological Strategy, Narrative Roguelite futuro.</p>
              <p>Plataformas objetivo: Web demo, itch.io futuro, Steam futuro.</p>
              <p>Version actual: 0.1.0-public-demo.</p>
              <p>Estado: demo vertical publica para testers.</p>
            </div>
          </section>
        </div>
      </section>
      <ScreenshotGallery />
    </main>
  );
}
