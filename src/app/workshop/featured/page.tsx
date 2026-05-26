import { FeaturedExpedients } from "@/components/workshop/FeaturedExpedients";
import { WorkshopFilterBar } from "@/components/workshop/WorkshopFilterBar";
import { WorkshopSearch } from "@/components/workshop/WorkshopSearch";

export default function WorkshopFeaturedPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#050308,#130915_55%,#050308)] px-5 py-8 text-white">
      <section className="mx-auto grid max-w-7xl gap-5">
        <h1 className="text-5xl font-black">Expedientes destacados</h1>
        <WorkshopSearch />
        <WorkshopFilterBar />
        <FeaturedExpedients />
      </section>
    </main>
  );
}
