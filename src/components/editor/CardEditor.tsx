"use client";

import { useEditorStore } from "@/store/editorStore";
import { validateEditorCard } from "@/logic/editor/cardValidator";
import { CardEffectBuilder } from "./CardEffectBuilder";
import { CardPreview } from "./CardPreview";
import { FactionSelector } from "./FactionSelector";
import { KeywordSelector } from "./KeywordSelector";
import { RaritySelector } from "./RaritySelector";
import { JSONPreviewPanel } from "./JSONPreviewPanel";

export function CardEditor() {
  const { cards, selectedCardId, selectCard, updateSelectedCard, addCard, duplicateCard } = useEditorStore();
  const card = cards.find((item) => item.id === selectedCardId) ?? cards[0];
  const validation = validateEditorCard(card, cards.map((item) => item.id));
  return (
    <section className="grid gap-5 xl:grid-cols-[280px_1fr_360px]">
      <aside className="rounded-lg border border-white/10 bg-black/45 p-4">
        <button className="campaign-action mb-3 w-full" onClick={addCard}>Crear carta</button>
        <div className="grid max-h-[720px] gap-2 overflow-auto">
          {cards.map((item) => (
            <button key={item.id} className={`rounded border p-3 text-left ${item.id === card.id ? "border-amber-100 bg-amber-100/10" : "border-white/10 bg-white/5"}`} onClick={() => selectCard(item.id)}>
              <p className="font-black text-white">{item.name}</p>
              <p className="text-xs text-white/45">{item.id}</p>
            </button>
          ))}
        </div>
      </aside>
      <div className="grid gap-4">
        <section className="rounded-lg border border-amber-100/18 bg-black/55 p-5">
          <div className="flex flex-wrap justify-between gap-3">
            <h1 className="text-4xl font-black text-white">Editor de carta</h1>
            <button className="campaign-choice max-w-xs" onClick={() => duplicateCard(card.id)}>Duplicar</button>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Field label="ID"><input className="editor-input" value={card.id} onChange={(event) => updateSelectedCard({ id: event.target.value })} /></Field>
            <Field label="Nombre"><input className="editor-input" value={card.name} onChange={(event) => updateSelectedCard({ name: event.target.value })} /></Field>
            <Field label="Costo"><input className="editor-input" type="number" value={card.cost} onChange={(event) => updateSelectedCard({ cost: Number(event.target.value) })} /></Field>
            <Field label="Faccion"><FactionSelector value={card.faction} onChange={(faction) => updateSelectedCard({ faction })} /></Field>
            <Field label="Rareza"><RaritySelector value={card.rarity} onChange={(rarity) => updateSelectedCard({ rarity })} /></Field>
            <Field label="Cinematica"><input className="editor-input" value={card.cinematic} onChange={(event) => updateSelectedCard({ cinematic: event.target.value as typeof card.cinematic })} /></Field>
          </div>
          <Field label="Keywords"><KeywordSelector value={card.keywords} onChange={(keywords) => updateSelectedCard({ keywords })} /></Field>
          <Field label="Texto de efecto"><textarea className="editor-input min-h-24" value={card.effectText} onChange={(event) => updateSelectedCard({ effectText: event.target.value })} /></Field>
          <Field label="Flavor"><textarea className="editor-input min-h-24" value={card.flavorText} onChange={(event) => updateSelectedCard({ flavorText: event.target.value })} /></Field>
          <div className="mt-4 rounded border border-white/10 bg-white/5 p-3 text-sm">
            <p className={validation.valid ? "font-black text-emerald-100" : "font-black text-red-100"}>{validation.valid ? "Carta estable" : "Errores detectados"}</p>
            {[...validation.errors, ...validation.warnings].map((item) => <p key={item} className="text-white/60">{item}</p>)}
          </div>
        </section>
        <CardEffectBuilder card={card} />
        <JSONPreviewPanel title="JSON de carta" data={card} />
      </div>
      <CardPreview card={card} />
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mt-3 block text-sm font-black uppercase text-white/50">
      {label}
      <div className="mt-2 normal-case">{children}</div>
    </label>
  );
}
