import { CreatorProfile } from "@/components/workshop/CreatorProfile";
import type { CreatorProfileData } from "@/logic/workshop/workshopTypes";

const creators: CreatorProfileData[] = [
  { id: "archivista-burnout", name: "Archivista del Burnout", title: "Archivista del Burnout", frequentTags: ["burnout", "procedural"], publishedCount: 12 },
  { id: "magistrado-caos", name: "Magistrado del Caos", title: "Magistrado del Caos", frequentTags: ["chaos", "cinematic"], publishedCount: 9 },
  { id: "inspector-catarsis", name: "Inspector de Catarsis", title: "Inspector de Catarsis", frequentTags: ["catarsis", "hardcore"], publishedCount: 7 },
  { id: "constructor-ansiedad", name: "Constructor de Ansiedad", title: "Constructor de Ansiedad", frequentTags: ["tactical", "psychological"], publishedCount: 5 },
];

export default function WorkshopCreatorsPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#050308,#130915_55%,#050308)] px-5 py-8 text-white">
      <section className="mx-auto grid max-w-6xl gap-5">
        <h1 className="text-5xl font-black">Creadores del Archivo Público</h1>
        <div className="grid gap-4 md:grid-cols-2">
          {creators.map((creator) => <CreatorProfile key={creator.id} creator={creator} />)}
        </div>
      </section>
    </main>
  );
}
