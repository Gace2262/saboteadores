"use client";

import type { EditorCardDraft, EditorEffectType, EditorTarget } from "@/data/editorTemplates";
import { compileCardEffects } from "@/logic/editor/effectCompiler";
import { useEditorStore } from "@/store/editorStore";

const effectTypes: EditorEffectType[] = ["damage", "heal", "draw", "discard", "gain_stress", "reduce_stress", "apply_chain", "remove_chain", "gain_clarity", "reduce_clarity", "summon", "transform", "copy", "trigger_keyword", "cinematic", "corruption", "catarsis", "random"];
const targets: EditorTarget[] = ["self", "enemy", "both", "board", "random"];

export function CardEffectBuilder({ card, onEffectsChange }: { card: EditorCardDraft; onEffectsChange?: (effects: EditorCardDraft["effects"]) => void }) {
  const updateSelectedCard = useEditorStore((state) => state.updateSelectedCard);
  const addEffect = useEditorStore((state) => state.addEffectToSelectedCard);
  const removeEffect = useEditorStore((state) => state.removeEffectFromSelectedCard);
  const compiled = compileCardEffects(card);
  const setEffects = (effects: EditorCardDraft["effects"]) => {
    if (onEffectsChange) onEffectsChange(effects);
    else updateSelectedCard({ effects });
  };
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-black text-white">Efectos</h2>
        <button className="campaign-choice max-w-xs" onClick={() => {
          const next = [...card.effects, { type: "damage" as const, target: "enemy" as const, value: 1, animation: "hammer_slam" as const, sound: "hammer_slam" as const }];
          if (onEffectsChange) onEffectsChange(next);
          else addEffect();
        }}>Agregar efecto</button>
      </div>
      <div className="mt-4 grid gap-3">
        {card.effects.map((effect, index) => (
          <div key={`${effect.type}-${index}`} className="rounded border border-white/10 bg-white/5 p-3">
            <div className="grid gap-2 md:grid-cols-[1fr_1fr_100px_auto]">
              <select className="editor-input" value={effect.type} onChange={(event) => {
                const effects = [...card.effects];
                effects[index] = { ...effect, type: event.target.value as EditorEffectType };
                setEffects(effects);
              }}>
                {effectTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
              <select className="editor-input" value={effect.target} onChange={(event) => {
                const effects = [...card.effects];
                effects[index] = { ...effect, target: event.target.value as EditorTarget };
                setEffects(effects);
              }}>
                {targets.map((target) => <option key={target} value={target}>{target}</option>)}
              </select>
              <input className="editor-input" type="number" value={effect.value} onChange={(event) => {
                const effects = [...card.effects];
                effects[index] = { ...effect, value: Number(event.target.value) };
                setEffects(effects);
              }} />
              <button className="campaign-danger" onClick={() => {
                if (onEffectsChange) onEffectsChange(card.effects.filter((_, effectIndex) => effectIndex !== index));
                else removeEffect(index);
              }}>Quitar</button>
            </div>
            <p className="mt-2 text-xs text-white/55">{compiled[index]?.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
