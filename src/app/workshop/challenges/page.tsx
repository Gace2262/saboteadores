import { FeaturedExpedients } from "@/components/workshop/FeaturedExpedients";

export default function WorkshopChallengesPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#050308,#190909_55%,#050308)] px-5 py-8 text-white">
      <section className="mx-auto grid max-w-6xl gap-5">
        <h1 className="text-5xl font-black">Desafíos absurdamente oficiales</h1>
        <FeaturedExpedients type="challenge" />
      </section>
    </main>
  );
}
