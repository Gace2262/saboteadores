"use client";

import { exportWorkshopContent } from "@/logic/workshop/workshopExporter";
import { useWorkshopStore } from "@/store/workshopStore";
import { CommunityRunViewer } from "./CommunityRunViewer";
import { ExpedientRating } from "./ExpedientRating";
import { ModDependencyPanel } from "./ModDependencyPanel";
import { WarningSeal } from "./WarningSeal";

export function WorkshopDetail({ id }: { id: string }) {
  const content = useWorkshopStore((state) => state.contents.find((item) => item.id === id));
  const markExported = useWorkshopStore((state) => state.markExported);

  if (!content) {
    return <main className="min-h-screen bg-black p-8 text-white">Expediente no encontrado. El Archivo Público niega haberlo visto.</main>;
  }

  const exportText = exportWorkshopContent(content);

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#050308,#130915_55%,#050308)] px-5 py-8 text-white">
      <section className="mx-auto grid max-w-6xl gap-5">
        <header className="rounded-2xl border border-amber-100/18 bg-black/65 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-100/60">{content.type}</p>
          <h1 className="mt-2 text-5xl font-black">{content.title}</h1>
          <p className="mt-3 max-w-3xl text-white/62">{content.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">{content.tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-2 py-1 text-xs">{tag}</span>)}</div>
        </header>
        <WarningSeal warnings={content.warnings} />
        <ModDependencyPanel dependencies={content.dependencies} />
        {content.replay && <CommunityRunViewer replay={content.replay} />}
        <ExpedientRating contentId={content.id} />
        <a onClick={() => markExported(content.id)} href={`data:application/json;charset=utf-8,${encodeURIComponent(exportText)}`} download={`${content.id}.workshop.json`} className="campaign-action max-w-xs">
          Exportar expediente
        </a>
      </section>
    </main>
  );
}
