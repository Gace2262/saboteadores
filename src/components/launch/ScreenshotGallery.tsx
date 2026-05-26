const screenshots = [
  ["Combate", "Mesa del Tribunal con recursos y mano del jugador."],
  ["Carta", "Marco gotico, orbe de costo y arte abstracto por faccion."],
  ["Boss", "Perfeccionista Ascendido, catedral fracturada y fase tres."],
  ["Mapa", "Contenido en desarrollo; se muestra como roadmap visual, no disponible en demo."],
  ["Evolucion", "Carta recordando para que nacio; previsto para el slice extendido."],
  ["Victoria", "Juicio Suspendido y cadenas cayendo."],
];

export function ScreenshotGallery() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 text-white">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-100/55">Capturas preparadas</p>
      <h2 className="mt-2 text-4xl font-black">Momentos que deberian vender el juicio</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {screenshots.map(([title, description], index) => (
          <article key={title} className="overflow-hidden rounded-xl border border-white/10 bg-black/55">
            <div className="grid aspect-video place-items-center bg-[radial-gradient(circle_at_50%_35%,rgba(242,211,123,0.18),transparent_28%),linear-gradient(135deg,#09050c,#1b0711)]">
              <span className="text-5xl font-black text-amber-100/85">0{index + 1}</span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/62">{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
