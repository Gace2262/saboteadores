import { FeaturedExpedients } from "@/components/workshop/FeaturedExpedients";

export default function WorkshopSeedsPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#050308,#10131a_55%,#050308)] px-5 py-8 text-white">
      <section className="mx-auto grid max-w-6xl gap-5">
        <h1 className="text-5xl font-black">Seeds denunciadas por abuso procedural</h1>
        <FeaturedExpedients type="seed" />
      </section>
    </main>
  );
}
