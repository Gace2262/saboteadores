"use client";

export function CardCostOrb({ cost, color }: { cost: number; color: string }) {
  return (
    <div
      className="absolute left-3 top-3 z-20 grid h-12 w-12 place-items-center rounded-full border-2 bg-black/72 text-xl font-black text-white shadow-xl"
      style={{ borderColor: color, boxShadow: `0 0 24px ${color}66, inset 0 0 14px ${color}33` }}
    >
      {cost}
    </div>
  );
}
