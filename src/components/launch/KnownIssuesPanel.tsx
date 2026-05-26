const issues = [
  ["BUG-001", "El navegador puede bloquear audio hasta que el jugador pulse Activar audio.", "media", "workaround: iniciar audio manualmente."],
  ["BUG-002", "Algunas pantallas futuras existen como preparacion y no representan contenido demo listo.", "menor", "workaround: usar /demo para la experiencia publica."],
  ["BUG-003", "En pantallas muy pequenas la mano de cartas requiere scroll horizontal.", "polish", "workaround: girar dispositivo o jugar en desktop."],
];

export function KnownIssuesPanel() {
  return (
    <section className="rounded-xl border border-white/10 bg-black/55 p-5 text-white">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-100/55">Known issues</p>
      <h2 className="mt-2 text-3xl font-black">Problemas conocidos antes de testers</h2>
      <div className="mt-4 grid gap-3">
        {issues.map(([id, description, severity, workaround]) => (
          <article key={id} className="rounded border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xs font-black uppercase text-amber-100">{id} / {severity}</p>
            <p className="mt-1 text-white/72">{description}</p>
            <p className="mt-1 text-sm text-white/48">{workaround}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
