import Link from "next/link";

export default function ProceduralCampaignPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(242,211,123,0.2),transparent_30%),linear-gradient(135deg,#050308,#130915_55%,#050308)] px-5 py-10 text-white">
      <section className="mx-auto max-w-6xl rounded-2xl border border-amber-100/18 bg-black/60 p-8">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-100/60">Campañas procedurales</p>
        <h1 className="mt-3 text-6xl font-black">El Tribunal reorganiza el juicio</h1>
        <p className="mt-4 max-w-3xl text-xl text-white/65">Cada run genera mapa, rutas, eventos, bosses, recompensas, modificadores y narrativa desde una seed reproducible.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/procedural-campaign/setup" className="campaign-action max-w-xs">Generar expediente</Link>
          <Link href="/procedural-campaign/map" className="campaign-choice max-w-xs">Ver mapa actual</Link>
          <Link href="/procedural-campaign/history" className="campaign-choice max-w-xs">Historial</Link>
        </div>
      </section>
    </main>
  );
}
