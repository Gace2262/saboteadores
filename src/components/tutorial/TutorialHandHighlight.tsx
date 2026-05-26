"use client";

export function TutorialHandHighlight({ active }: { active: boolean }) {
  return (
    <div className={`pointer-events-none absolute inset-x-4 bottom-4 h-40 rounded-lg border-2 ${active ? "border-cyan-100/75 shadow-[0_0_36px_rgba(125,211,252,.35)]" : "border-white/8"}`}>
      <span className="absolute -top-4 left-4 rounded bg-cyan-200 px-2 py-1 text-xs font-black uppercase text-black">mano guiada</span>
    </div>
  );
}
