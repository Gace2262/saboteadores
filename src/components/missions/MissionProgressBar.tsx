"use client";

export function MissionProgressBar({ progress, target }: { progress: number; target: number }) {
  const value = Math.min(100, Math.round((progress / Math.max(1, target)) * 100));
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-black uppercase text-white/48">
        <span>Progreso</span>
        <span className="text-amber-100">{Math.min(progress, target)} / {target}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full border border-white/10 bg-black/55">
        <div className="h-full rounded-full bg-[linear-gradient(90deg,#8b1e3f,#f2d37b,#fff6cf)] shadow-[0_0_18px_rgba(242,211,123,0.45)]" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
