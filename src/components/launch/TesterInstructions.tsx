const steps = [
  "Abrir /demo y elegir uno de los tres mazos.",
  "Activar o silenciar audio desde el panel superior.",
  "Jugar hasta ganar o perder contra el Perfeccionista Ascendido.",
  "Probar reiniciar demo y elegir otro mazo.",
  "Completar /feedback y exportar el reporte local.",
];

export function TesterInstructions() {
  return (
    <section className="rounded-xl border border-white/10 bg-black/55 p-5 text-white">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-100/55">Guia rapida tester</p>
      <h2 className="mt-2 text-3xl font-black">Que probar primero</h2>
      <ol className="mt-4 grid gap-3">
        {steps.map((step, index) => (
          <li key={step} className="rounded border border-white/10 bg-white/[0.04] p-3 text-white/70">
            <strong className="mr-2 text-amber-100">{index + 1}.</strong>
            {step}
          </li>
        ))}
      </ol>
    </section>
  );
}
