"use client";

export function CharacterPortrait({ glyph, color = "#f2d37b" }: { glyph: string; color?: string }) {
  return (
    <div
      className="grid h-20 w-20 shrink-0 place-items-center rounded-lg border bg-black/55 text-4xl font-black shadow-2xl"
      style={{ borderColor: `${color}88`, color, boxShadow: `0 0 28px ${color}33` }}
    >
      {glyph}
    </div>
  );
}
