import type { ProceduralCampaign } from "@/logic/procedural/proceduralTypes";

type Props = {
  campaign: ProceduralCampaign;
};

export function RoutePreview({ campaign }: Props) {
  const counts = campaign.nodes.reduce<Record<string, number>>((acc, node) => {
    acc[node.type] = (acc[node.type] ?? 0) + 1;
    return acc;
  }, {});
  return (
    <section className="rounded-2xl border border-white/10 bg-black/55 p-5">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-white/40">Vista de rutas</p>
      <h2 className="mt-2 text-2xl font-black">{campaign.narrative.title}</h2>
      <p className="mt-2 text-sm text-white/58">{campaign.narrative.openingLine}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {Object.entries(counts).map(([type, count]) => (
          <span key={type} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">{type}: {count}</span>
        ))}
      </div>
    </section>
  );
}
