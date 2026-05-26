import type { BossIntent } from "@/logic/ai/advancedAITypes";

type Props = {
  intent: BossIntent;
  preview: string;
};

const intentTone: Record<BossIntent, string> = {
  attack: "border-rose-300/30 bg-rose-950/30 text-rose-100",
  block: "border-amber-300/30 bg-amber-950/30 text-amber-100",
  heal: "border-emerald-300/30 bg-emerald-950/30 text-emerald-100",
  prepare_combo: "border-violet-300/30 bg-violet-950/30 text-violet-100",
  invoke_crisis: "border-red-300/30 bg-red-950/30 text-red-100",
  punish_stress: "border-yellow-300/30 bg-yellow-950/30 text-yellow-100",
  protect: "border-cyan-300/30 bg-cyan-950/30 text-cyan-100",
  transform: "border-fuchsia-300/30 bg-fuchsia-950/30 text-fuchsia-100",
};

export function BossIntentPreview({ intent, preview }: Props) {
  return (
    <aside className={`rounded-2xl border p-4 ${intentTone[intent]}`}>
      <p className="text-xs uppercase tracking-[0.28em] opacity-70">Intencion del boss</p>
      <h3 className="mt-2 text-lg font-semibold">{intent.replace(/_/g, " ")}</h3>
      <p className="mt-1 text-sm opacity-85">{preview}</p>
    </aside>
  );
}
