import Link from "next/link";

export function PressKitDownload() {
  return (
    <section className="rounded-xl border border-amber-100/18 bg-black/58 p-5 text-white">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-100/55">Press kit</p>
      <h2 className="mt-2 text-3xl font-black">Material para prensa y showcases</h2>
      <p className="mt-3 leading-7 text-white/66">
        Descripciones, features, tags, roadmap y notas legales. Los assets visuales son placeholders propios para reemplazo final.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/press" className="campaign-action max-w-xs">Ver press page</Link>
        <a href="/press-kit.md" className="campaign-choice max-w-xs">Documento markdown</a>
      </div>
    </section>
  );
}
