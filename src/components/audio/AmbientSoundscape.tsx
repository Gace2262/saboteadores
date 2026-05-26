"use client";

const soundscapes = [
  ["Tribunal", "cadenas, ecos, murmullos"],
  ["Archivo", "hojas, maquinas lejanas, ventilacion fria"],
  ["Catedral", "viento, campanas, coro distante"],
  ["Burnout", "teclados, impresoras, respiracion cansada"],
  ["Vacio", "silencio parcial, frecuencias bajas, eco largo"],
] as const;

export function AmbientSoundscape() {
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-4 text-white">
      <h2 className="text-2xl font-black uppercase">Ambientes psicologicos</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-5">
        {soundscapes.map(([name, design]) => (
          <article key={name} className="rounded-lg border border-white/10 bg-white/5 p-3">
            <h3 className="font-black">{name}</h3>
            <p className="mt-2 text-sm text-white/58">{design}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
