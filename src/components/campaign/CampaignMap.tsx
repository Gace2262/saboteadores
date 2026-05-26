"use client";

import { useRouter } from "next/navigation";
import { campaignNodes } from "@/data/campaignNodes";
import { useCampaignStore } from "@/store/campaignStore";
import { CampaignNode } from "./CampaignNode";
import { CampaignSummary } from "./CampaignSummary";
import { DynamicBackground } from "@/components/ui/DynamicBackground";

const routeForStatus = {
  map: "/campaign",
  event: "/campaign/event",
  reward: "/campaign/reward",
  boss: "/campaign/boss",
  finale: "/campaign/finale",
  defeat: "/campaign/finale",
};

export function CampaignMap() {
  const router = useRouter();
  const { unlockedNodeIds, completedNodeIds, enterNode } = useCampaignStore();

  const selectNode = (nodeId: string) => {
    const node = enterNode(nodeId);
    if (!node) return;
    const status = useCampaignStore.getState().status;
    router.push(routeForStatus[status]);
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 text-white">
      <DynamicBackground id="tribunal-craneo" />
      <div className="absolute inset-0 neural-map-bg" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-4 lg:grid-cols-[1fr_300px]">
        <div className="rounded-lg border border-amber-100/15 bg-black/42 p-5">
          <header className="mb-5">
            <p className="text-sm font-black uppercase text-amber-100/68">Modo campana offline</p>
            <h1 className="mt-2 text-4xl font-black md:text-6xl">Mapa mental: ruta hacia El Juez</h1>
            <p className="mt-3 max-w-3xl text-white/62">
              Avanza por salas internas, acepta recompensas peligrosamente utiles y procura que la mente no convierta
              cada pasillo en una audiencia publica.
            </p>
          </header>
          <div className="relative h-[620px] overflow-hidden rounded-lg border border-white/10 bg-black/45">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {campaignNodes.flatMap((node) =>
                node.next.map((nextId) => {
                  const next = campaignNodes.find((item) => item.id === nextId);
                  if (!next) return null;
                  const active = completedNodeIds.includes(node.id) || unlockedNodeIds.includes(next.id);
                  return (
                    <line
                      key={`${node.id}-${nextId}`}
                      x1={node.x}
                      y1={node.y}
                      x2={next.x}
                      y2={next.y}
                      stroke={active ? "rgba(242,211,123,0.48)" : "rgba(255,255,255,0.1)"}
                      strokeWidth={active ? 0.45 : 0.25}
                      strokeLinecap="round"
                    />
                  );
                }),
              )}
            </svg>
            {campaignNodes.map((node) => (
              <CampaignNode
                key={node.id}
                node={node}
                unlocked={unlockedNodeIds.includes(node.id)}
                completed={completedNodeIds.includes(node.id)}
                onSelect={() => selectNode(node.id)}
              />
            ))}
          </div>
        </div>
        <CampaignSummary />
      </section>
    </main>
  );
}
