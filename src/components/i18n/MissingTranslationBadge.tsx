"use client";

import { useLanguageStore } from "@/store/languageStore";

export function MissingTranslationBadge({ translationKey }: { translationKey: string }) {
  const translate = useLanguageStore((state) => state.translate);
  return (
    <span className="inline-flex rounded-full border border-red-300/35 bg-red-950/40 px-2 py-1 text-xs font-bold text-red-100">
      {translate("localization.missing")}: {translationKey}
    </span>
  );
}
