const features = [
  ["Combate tactico", "Cartas, Claridad, Estres y decisiones con consecuencias visibles."],
  ["Saboteadores Mentales", "Patrones internos convertidos en enemigos teatrales y absurdamente solemnes."],
  ["Boss demo", "Perfeccionista Ascendido con fases, frases y presion creciente."],
  ["Audio dinamico", "Martillos, cadenas, coro sintetico y silencio antes del impacto."],
  ["Humor negro simbolico", "Sarcástico contra mecanismos mentales, no contra personas reales."],
  ["Efectos visuales", "Cartas tipo tarot oscuro, overlays de impacto y UI de tribunal gotico."],
];

export function FeatureGrid() {
  return (
    <section className="mx-auto grid max-w-6xl gap-4 px-5 py-14 text-white md:grid-cols-3">
      {features.map(([title, description]) => (
        <article key={title} className="rounded-xl border border-amber-100/16 bg-black/55 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-100/55">Feature</p>
          <h2 className="mt-2 text-2xl font-black">{title}</h2>
          <p className="mt-3 leading-7 text-white/66">{description}</p>
        </article>
      ))}
    </section>
  );
}
