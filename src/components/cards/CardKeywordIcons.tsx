"use client";

import type { Keyword } from "@/data/keywords";
import { keywordDefinitions } from "@/data/keywords";
import { keywordStyles } from "@/styles/keywordStyles";
import { MentalTooltip } from "@/components/ui/MentalTooltip";
import { translateKeyword } from "@/logic/i18n/translator";
import { useLanguageStore } from "@/store/languageStore";

export function CardKeywordIcons({ keywords, compact = false }: { keywords: Keyword[]; compact?: boolean }) {
  const locale = useLanguageStore((state) => state.locale);
  return (
    <div className="flex flex-wrap gap-1.5">
      {keywords.map((keyword) => {
        const style = keywordStyles[keyword];
        const definition = keywordDefinitions[keyword];
        const text = translateKeyword(definition, locale);
        return (
          <MentalTooltip key={keyword} label={`${text.name}: ${text.description}`}>
            <span
              className={`inline-flex items-center gap-1 rounded border bg-black/42 px-2 py-1 font-black uppercase ${
                compact ? "text-[9px]" : "text-[10px]"
              }`}
              style={{ borderColor: `${style.color}88`, color: style.color, boxShadow: `0 0 10px ${style.glow}` }}
            >
              <span>{style.icon}</span>
              {text.name}
            </span>
          </MentalTooltip>
        );
      })}
    </div>
  );
}
