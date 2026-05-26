import Link from "next/link";
import { workshopCategories } from "@/data/workshopCategories";
import { FeaturedExpedients } from "./FeaturedExpedients";
import { WorkshopFilterBar } from "./WorkshopFilterBar";
import { WorkshopSearch } from "./WorkshopSearch";

export function WorkshopHome() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(242,211,123,0.18),transparent_30%),linear-gradient(135deg,#050308,#130915_55%,#050308)] px-5 py-8 text-white">
      <section className="mx-auto grid max-w-7xl gap-6">
        <header className="rounded-2xl border border-amber-100/18 bg-black/65 p-7">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-100/60">Archivo Publico del Tribunal</p>
          <h1 className="mt-3 text-6xl font-black">Algunos expedientes respiran.</h1>
          <p className="mt-4 max-w-3xl text-xl text-white/65">Bienvenido al Archivo Público del Tribunal. Comparte seeds, campañas, bosses, desafíos, runs y expansiones sin ejecutar código externo.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/workshop/publish" className="campaign-action max-w-xs">Publicar expediente</Link>
            <Link href="/mods" className="campaign-choice max-w-xs">Gestionar mods</Link>
          </div>
        </header>
        <div className="grid gap-3">
          <WorkshopSearch />
          <WorkshopFilterBar />
        </div>
        <section className="grid gap-3 md:grid-cols-4">
          {workshopCategories.map((category) => (
            <Link key={category.id} href={category.id === "seed" ? "/workshop/seeds" : category.id === "challenge" ? "/workshop/challenges" : category.id === "campaign" ? "/workshop/campaigns" : "/workshop/featured"} className="rounded-2xl border border-white/10 bg-black/45 p-4 hover:border-amber-100/35">
              <h2 className="font-black">{category.label}</h2>
              <p className="mt-2 text-sm text-white/55">{category.description}</p>
            </Link>
          ))}
        </section>
        <FeaturedExpedients />
      </section>
    </main>
  );
}
