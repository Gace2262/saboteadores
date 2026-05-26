import Link from "next/link";
import type { WorkshopContent } from "@/logic/workshop/workshopTypes";
import { WarningSeal } from "./WarningSeal";

export function CampaignShowcase({ content }: { content: WorkshopContent }) {
  return (
    <article className="rounded-2xl border border-cyan-100/18 bg-black/55 p-5 text-white">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-100/55">{content.type}</p>
      <h2 className="mt-2 text-2xl font-black">{content.title}</h2>
      <p className="mt-2 text-sm text-white/58">{content.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {content.tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-2 py-1 text-xs">{tag}</span>)}
      </div>
      <div className="mt-4"><WarningSeal warnings={content.warnings} /></div>
      <Link href={`/workshop/${content.id}`} className="campaign-choice mt-4">Abrir expediente</Link>
    </article>
  );
}
