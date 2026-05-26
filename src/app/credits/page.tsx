import Link from "next/link";

const credits = [
  ["Direccion creativa", "Tribunal de ideas con demasiada cafeina"],
  ["Tecnologias", "Next.js, React, TypeScript, Tailwind CSS, Framer Motion y Zustand"],
  ["Diseno de cartas", "Oficina de martillazos dramaticos"],
  ["Narrativa", "Departamento de ansiedad ceremonial"],
  ["Arte placeholder", "Ministerio del burnout visual, sin assets externos con copyright"],
  ["Audio sintetico", "Web Audio API, rutas mock y coro judicial local sin copyright"],
  ["Demo publica", "Landing, feedback local, roadmap y press kit preparados para testers"],
  ["Publicacion", "Vercel recomendado, Netlify alternativo, itch.io y Steam en preparacion"],
  ["Testing interno", "Comite de casi funciona"],
  ["QA y guardado", "Expediente local con backup, validacion y recuperacion"],
  ["Agradecimientos", "A todos los mecanismos que aprendieron a soltar el martillo"],
];

export default function CreditsPage() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 w-full max-w-5xl rounded-lg border border-amber-100/18 bg-black/66 p-7 text-center">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-amber-100/65">Creditos</p>
        <h1 className="mt-3 text-5xl font-black md:text-7xl">Expediente de Produccion</h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/62">
          Todo es placeholder original, offline y preparado para reemplazo artistico futuro sin assets con copyright.
        </p>
        <div className="mt-8 grid gap-3">
          {credits.map(([role, name]) => (
            <div key={role} className="rounded border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-black uppercase text-white/45">{role}</p>
              <p className="mt-1 text-xl font-black text-amber-100">{name}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/demo" className="campaign-action max-w-xs">Volver a demo</Link>
          <Link href="/landing" className="campaign-choice max-w-xs">Landing publica</Link>
          <Link href="/legal" className="campaign-choice max-w-xs">Aviso legal</Link>
          <Link href="/" className="campaign-choice max-w-xs">Menu principal</Link>
        </div>
      </section>
    </main>
  );
}
