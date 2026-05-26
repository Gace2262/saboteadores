"use client";

import { useState } from "react";
import { communityTags } from "@/data/communityTags";
import type { CommunityTag } from "@/data/communityTags";
import type { WorkshopContent } from "@/logic/workshop/workshopTypes";
import { calculateWorkshopChecksum } from "@/logic/workshop/workshopExporter";
import { validateWorkshopContent } from "@/logic/workshop/workshopValidator";
import { generateChallengeFromSeed } from "@/logic/workshop/challengeGenerator";
import { useWorkshopStore } from "@/store/workshopStore";

export function PublishPanel() {
  const publishContent = useWorkshopStore((state) => state.publishContent);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("Expediente 992: La Catedral Respira");
  const [description, setDescription] = useState("Campaña procedural donde El Juez aparece demasiado temprano y el Burnout encontró esteroides.");
  const [tag, setTag] = useState<CommunityTag>("procedural");

  const publish = () => {
    const draft = {
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "expediente-local",
      title,
      description,
      type: "challenge" as const,
      creatorId: "creador-local",
      creatorName: "Constructor de Ansiedad",
      tags: [tag],
      difficulty: "juicio-serio" as const,
      warnings: ["difficult_gameplay" as const],
      language: "es-CL" as const,
      dependencies: [],
      challenge: generateChallengeFromSeed(title),
      payload: { source: "publish-panel-local" },
      createdAt: new Date().toISOString(),
    };
    const content = { ...draft, checksum: calculateWorkshopChecksum(draft) } as WorkshopContent;
    const report = validateWorkshopContent(content);
    if (!report.valid) {
      setMessage(report.errors.join(" "));
      return;
    }
    publishContent(content);
    setMessage("Expediente publicado localmente. El Archivo Publico levanto una ceja.");
  };

  return (
    <section className="rounded-2xl border border-amber-100/18 bg-black/60 p-5 text-white">
      <h2 className="text-3xl font-black">Publicar expediente local</h2>
      <div className="mt-4 grid gap-3">
        <input value={title} onChange={(event) => setTitle(event.target.value)} className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-white" />
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="min-h-28 rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-white" />
        <select value={tag} onChange={(event) => setTag(event.target.value as CommunityTag)} className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-white">
          {communityTags.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <button type="button" onClick={publish} className="campaign-action max-w-xs">Publicar</button>
        {message && <p className="text-sm text-amber-100">{message}</p>}
      </div>
    </section>
  );
}
