"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultLocale, supportedLocales, type Locale, type TranslationParams } from "@/i18n/config";
import { createTranslator } from "@/logic/i18n/translator";

type LanguageStore = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translate: (key: string, params?: TranslationParams, fallbackText?: string) => string;
};

function isSupportedLocale(locale: string): locale is Locale {
  return supportedLocales.some((item) => item.id === locale);
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      locale: defaultLocale,
      setLocale: (locale) => {
        if (isSupportedLocale(locale)) set({ locale });
      },
      translate: (key, params, fallbackText) => createTranslator(get().locale)(key, params, { fallbackText }),
    }),
    { name: "saboteadores-language-v1" },
  ),
);
