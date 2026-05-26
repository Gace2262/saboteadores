"use client";

import { keywordDefinitions, type Keyword } from "@/data/keywords";

export function KeywordSelector({ value, onChange }: { value: Keyword[]; onChange: (value: Keyword[]) => void }) {
  const toggle = (keyword: Keyword) => {
    onChange(value.includes(keyword) ? value.filter((item) => item !== keyword) : [...value, keyword]);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {Object.values(keywordDefinitions).map((keyword) => (
        <button
          key={keyword.id}
          type="button"
          className={`rounded border px-2 py-1 text-xs font-black ${value.includes(keyword.id) ? "border-amber-100 bg-amber-100/20 text-amber-100" : "border-white/10 bg-white/5 text-white/55"}`}
          onClick={() => toggle(keyword.id)}
        >
          {keyword.label}
        </button>
      ))}
    </div>
  );
}
