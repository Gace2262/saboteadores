"use client";

import type { Keyword } from "@/data/keywords";
import { keywordDefinitions } from "@/data/keywords";

const toneClass: Record<(typeof keywordDefinitions)[Keyword]["tone"], string> = {
  gold: "border-amber-200/50 bg-amber-200/12 text-amber-100",
  blue: "border-cyan-200/45 bg-cyan-300/10 text-cyan-100",
  red: "border-rose-200/45 bg-rose-400/10 text-rose-100",
  violet: "border-violet-200/45 bg-violet-400/10 text-violet-100",
  green: "border-emerald-200/45 bg-emerald-300/10 text-emerald-100",
};

export function CardKeywordBadge({ keyword, compact = false }: { keyword: Keyword; compact?: boolean }) {
  const definition = keywordDefinitions[keyword];

  return (
    <span
      title={definition.shortText}
      className={`inline-flex items-center gap-1 rounded border px-2 py-1 font-black uppercase ${
        compact ? "text-[9px]" : "text-[10px]"
      } ${toneClass[definition.tone]}`}
    >
      <span>{definition.icon}</span>
      {definition.label}
    </span>
  );
}
