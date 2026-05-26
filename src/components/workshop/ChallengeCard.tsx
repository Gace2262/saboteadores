import type { WorkshopContent } from "@/logic/workshop/workshopTypes";
import { WarningSeal } from "./WarningSeal";

export function ChallengeCard({ content }: { content: WorkshopContent }) {
  return (
    <article className="rounded-2xl border border-rose-100/18 bg-rose-950/20 p-5 text-white">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-rose-100/55">Desafio comunitario</p>
      <h2 className="mt-2 text-2xl font-black">{content.title}</h2>
      <p className="mt-2 text-sm text-white/58">{content.description}</p>
      <div className="mt-4 grid gap-2">
        {content.challenge?.rules.map((rule) => (
          <p key={rule} className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-sm text-white/70">{rule}</p>
        ))}
      </div>
      <p className="mt-3 text-sm font-bold text-amber-100">Titulo: {content.challenge?.rewardTitle}</p>
      <div className="mt-4"><WarningSeal warnings={content.warnings} /></div>
    </article>
  );
}
