"use client";

import { useProceduralCampaignStore } from "@/store/proceduralCampaignStore";
import { ProceduralNode } from "./ProceduralNode";

export function GeneratedCampaignMap() {
  const campaign = useProceduralCampaignStore((state) => state.currentCampaign);
  const visited = useProceduralCampaignStore((state) => state.visitedNodeIds);
  const visitNode = useProceduralCampaignStore((state) => state.visitNode);

  if (!campaign) {
    return (
      <section className="rounded-2xl border border-white/10 bg-black/55 p-6 text-white">
        No hay expediente generado. El Tribunal esta mirando una carpeta vacia con demasiada confianza.
      </section>
    );
  }

  return (
    <section className="relative h-[680px] overflow-hidden rounded-2xl border border-amber-100/18 bg-black/55">
      <div className="absolute inset-0 neural-map-bg opacity-75" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {campaign.nodes.flatMap((node) =>
          node.next.map((nextId) => {
            const next = campaign.nodes.find((item) => item.id === nextId);
            if (!next) return null;
            return <line key={`${node.id}-${nextId}`} x1={node.x} y1={node.y} x2={next.x} y2={next.y} stroke="rgba(242,211,123,0.28)" strokeWidth={0.28} strokeLinecap="round" />;
          }),
        )}
      </svg>
      {campaign.nodes.map((node) => (
        <ProceduralNode key={node.id} node={node} visited={visited.includes(node.id)} onSelect={() => visitNode(node.id)} />
      ))}
    </section>
  );
}
