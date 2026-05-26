"use client";

import type { TranslationParams } from "@/i18n/config";
import { useLanguageStore } from "@/store/languageStore";

export function LocalizedText({ k, params, fallback }: { k: string; params?: TranslationParams; fallback?: string }) {
  const translate = useLanguageStore((state) => state.translate);
  return <>{translate(k, params, fallback)}</>;
}
