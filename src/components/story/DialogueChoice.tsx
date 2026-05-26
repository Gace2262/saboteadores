"use client";

export function DialogueChoice({ label, result, onChoose }: { label: string; result: string; onChoose: () => void }) {
  return (
    <button
      onClick={onChoose}
      className="min-h-36 rounded-lg border border-white/12 bg-white/6 p-5 text-left transition hover:border-amber-100/50 hover:bg-amber-100/10"
    >
      <h2 className="text-2xl font-black text-amber-100">{label}</h2>
      <p className="mt-3 leading-7 text-white/68">{result}</p>
    </button>
  );
}
