"use client";

type Tone = "gold" | "blue" | "red" | "violet";

export function ResourceBar({
  label,
  value,
  max,
  tone,
}: {
  label: string;
  value: number;
  max: number;
  tone: Tone;
}) {
  const colors: Record<Tone, { fill: string; orb: string; text: string }> = {
    gold: {
      fill: "from-amber-100 via-yellow-300 to-amber-600",
      orb: "bg-[radial-gradient(circle_at_35%_25%,#fff8d6,#f2d37b_45%,#7c4a12)]",
      text: "text-amber-100",
    },
    blue: {
      fill: "from-white via-cyan-200 to-blue-500",
      orb: "bg-[radial-gradient(circle_at_35%_25%,#ffffff,#93c5fd_45%,#1d4ed8)]",
      text: "text-cyan-100",
    },
    red: {
      fill: "from-rose-300 via-red-500 to-red-950",
      orb: "bg-[radial-gradient(circle_at_35%_25%,#fecdd3,#ef4444_45%,#450a0a)]",
      text: "text-rose-100",
    },
    violet: {
      fill: "from-slate-300 via-violet-500 to-fuchsia-950",
      orb: "bg-[radial-gradient(circle_at_35%_25%,#e9d5ff,#8b5cf6_45%,#3b0764)]",
      text: "text-violet-100",
    },
  };
  const theme = colors[tone];
  const percent = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className="rounded-lg border border-white/10 bg-black/42 p-3 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)]">
      <div className="flex items-center gap-3">
        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/30 ${theme.orb} text-sm font-black text-black shadow-[0_0_22px_rgba(255,255,255,0.14)]`}>
          {value}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between gap-2 text-xs font-black uppercase text-white/58">
            <span className={theme.text}>{label}</span>
            <span className="text-white/50">{max}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full border border-white/10 bg-white/10">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${theme.fill} shadow-[0_0_18px_rgba(242,211,123,0.24)]`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
