"use client";

import { useEditorStore } from "@/store/editorStore";
import { FactionSelector } from "./FactionSelector";
import { BossPhaseEditor } from "./BossPhaseEditor";
import { JSONPreviewPanel } from "./JSONPreviewPanel";

export function BossEditor() {
  const { bosses, selectedBossId, addBoss, updateSelectedBoss } = useEditorStore();
  const boss = bosses.find((item) => item.id === selectedBossId) ?? bosses[0];
  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_420px]">
      <div className="grid gap-4">
        <section className="rounded-lg border border-amber-100/18 bg-black/55 p-5 text-white">
          <div className="flex flex-wrap justify-between gap-3">
            <h1 className="text-4xl font-black">Editor de bosses</h1>
            <button className="campaign-action max-w-xs" onClick={addBoss}>Crear boss</button>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <input className="editor-input" value={boss.name} onChange={(event) => updateSelectedBoss({ name: event.target.value })} />
            <FactionSelector value={boss.faction} onChange={(faction) => updateSelectedBoss({ faction })} />
            <input className="editor-input" value={boss.room} onChange={(event) => updateSelectedBoss({ room: event.target.value })} />
            <input className="editor-input" value={boss.soundtrack} onChange={(event) => updateSelectedBoss({ soundtrack: event.target.value })} />
            <input className="editor-input" type="number" value={boss.difficulty} onChange={(event) => updateSelectedBoss({ difficulty: Number(event.target.value) })} />
          </div>
        </section>
        <BossPhaseEditor boss={boss} />
      </div>
      <JSONPreviewPanel title="JSON de boss" data={boss} />
    </section>
  );
}
