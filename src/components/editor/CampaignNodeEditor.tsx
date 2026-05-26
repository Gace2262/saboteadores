"use client";

import { useEditorStore } from "@/store/editorStore";
import { JSONPreviewPanel } from "./JSONPreviewPanel";

export function CampaignNodeEditor() {
  const nodes = useEditorStore((state) => state.campaignNodes);
  const addCampaignNode = useEditorStore((state) => state.addCampaignNode);
  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_420px]">
      <div className="rounded-lg border border-amber-100/18 bg-black/55 p-5 text-white">
        <div className="flex flex-wrap justify-between gap-3">
          <h1 className="text-4xl font-black">Editor de campanas</h1>
          <button className="campaign-action max-w-xs" onClick={addCampaignNode}>Crear nodo</button>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {nodes.map((node) => (
            <div key={node.id} className="rounded border border-white/10 bg-white/5 p-4">
              <p className="font-black text-amber-100">{node.title}</p>
              <p className="text-xs text-white/50">{node.type} / {node.x},{node.y}</p>
              <p className="mt-2 text-xs text-white/45">Conecta: {node.connections.join(", ") || "sin rutas"}</p>
            </div>
          ))}
        </div>
      </div>
      <JSONPreviewPanel title="JSON de nodos" data={nodes} />
    </section>
  );
}
