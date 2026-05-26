"use client";

import { useMemo, useState } from "react";
import { useEditorStore } from "@/store/editorStore";
import { compileCardEffects } from "@/logic/editor/effectCompiler";
import { estimateEditorCardBalance } from "@/logic/editor/balanceEstimator";

export function LiveEffectTester() {
  const cards = useEditorStore((state) => state.cards);
  const selectedCardId = useEditorStore((state) => state.selectedCardId);
  const card = cards.find((item) => item.id === selectedCardId) ?? cards[0];
  const [runs, setRuns] = useState(0);
  const compiled = useMemo(() => compileCardEffects(card), [card]);
  const balance = useMemo(() => estimateEditorCardBalance(card), [card]);
  return (
    <section className="rounded-lg border border-amber-100/18 bg-black/62 p-5 text-white">
      <h2 className="text-3xl font-black">Live Effect Tester</h2>
      <p className="mt-2 text-white/60">Ejecuta efectos aislados sin tocar partidas reales. El laboratorio huele a ozono y formularios.</p>
      <button className="campaign-action mt-4 max-w-xs" onClick={() => setRuns((value) => value + 1)}>Repetir efecto</button>
      <div className="mt-4 grid gap-2">
        {compiled.map((line, index) => (
          <p key={`${line.text}-${index}`} className="rounded border border-white/10 bg-white/5 p-3 text-sm text-white/70">Run {runs}: {line.text}</p>
        ))}
      </div>
      <p className="mt-4 font-black text-amber-100">{balance.verdict}</p>
    </section>
  );
}
