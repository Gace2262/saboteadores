"use client";

import type { EditorCardDraft } from "@/data/editorTemplates";
import { editorCardToRuntimeCard } from "@/logic/editor/cardSerializer";
import { estimateEditorCardBalance } from "@/logic/editor/balanceEstimator";
import { Card } from "@/components/Card";

export function CardPreview({ card }: { card: EditorCardDraft }) {
  const runtimeCard = editorCardToRuntimeCard(card);
  const balance = estimateEditorCardBalance(card);
  return (
    <section className="rounded-lg border border-amber-100/18 bg-black/50 p-5">
      <h2 className="text-2xl font-black text-white">Preview ceremonial</h2>
      <div className="mt-4 max-w-sm">
        <Card card={runtimeCard} compact />
      </div>
      <div className="mt-4 rounded border border-white/10 bg-white/5 p-3 text-sm text-white/70">
        <p className="font-black text-amber-100">{balance.verdict}</p>
        <p>Power {balance.powerScore} / eficiencia {balance.efficiency} / riesgo {balance.risk}</p>
      </div>
    </section>
  );
}
