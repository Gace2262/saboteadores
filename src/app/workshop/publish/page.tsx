import { PublishPanel } from "@/components/workshop/PublishPanel";

export default function WorkshopPublishPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#050308,#130915_55%,#050308)] px-5 py-8 text-white">
      <section className="mx-auto max-w-4xl">
        <PublishPanel />
      </section>
    </main>
  );
}
