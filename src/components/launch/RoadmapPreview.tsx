const roadmap = [
  ["Fase 1", "Demo vertical publica", "Disponible en web para testers externos."],
  ["Fase 2", "Campana completa", "Nueve Saboteadores, historia central y finales."],
  ["Fase 3", "Mas bosses", "Jefes teatrales, fases y mejores recompensas."],
  ["Fase 4", "Arte/audio final", "Ilustraciones finales, mezcla y soundtrack original."],
  ["Fase 5", "Steam/itch", "Pagina publica, trailer final y build descargable."],
  ["Fase 6", "Comunidad/mods", "Contenido comunitario validado y seguro."],
  ["Fase 7", "Multiplayer futuro", "Arquitectura preparada, no prometida para demo."],
];

export function RoadmapPreview() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 text-white">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-100/55">Roadmap publico</p>
      <h2 className="mt-2 text-4xl font-black">Lo disponible y lo que aun esta en construccion</h2>
      <div className="mt-6 grid gap-3">
        {roadmap.map(([phase, title, description]) => (
          <article key={phase} className="grid gap-3 rounded-lg border border-white/10 bg-black/52 p-4 md:grid-cols-[120px_1fr]">
            <p className="font-black uppercase text-amber-100">{phase}</p>
            <div>
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-1 text-white/62">{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
