import type { CreatorProfileData } from "@/logic/workshop/workshopTypes";

export function CreatorProfile({ creator }: { creator: CreatorProfileData }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-black/55 p-5 text-white">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-white/38">Perfil creativo</p>
      <h2 className="mt-2 text-2xl font-black">{creator.name}</h2>
      <p className="mt-1 text-amber-100">{creator.title}</p>
      <p className="mt-3 text-sm text-white/55">Expedientes publicados: {creator.publishedCount}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {creator.frequentTags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-2 py-1 text-xs">{tag}</span>)}
      </div>
    </article>
  );
}
