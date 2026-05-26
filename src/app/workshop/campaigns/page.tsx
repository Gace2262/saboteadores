import { FeaturedExpedients } from "@/components/workshop/FeaturedExpedients";

export default function WorkshopCampaignsPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#050308,#0c1512_55%,#050308)] px-5 py-8 text-white">
      <section className="mx-auto grid max-w-6xl gap-5">
        <h1 className="text-5xl font-black">Campañas comunitarias</h1>
        <FeaturedExpedients type="campaign" />
      </section>
    </main>
  );
}
