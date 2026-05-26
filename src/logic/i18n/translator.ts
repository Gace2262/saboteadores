import type { Card } from "@/data/cards";
import type { Faction } from "@/data/factions";
import type { KeywordDefinition } from "@/data/keywords";
import { defaultLocale, dictionaries, fallbackChains, type Locale, type TranslationParams } from "@/i18n/config";
import { reportMissingKey } from "./missingTranslations";

type TranslateOptions = {
  fallbackText?: string;
  productionSafe?: boolean;
};

function interpolate(template: string, params: TranslationParams = {}) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => String(params[key] ?? ""));
}

function pluralKey(key: string, params?: TranslationParams) {
  if (typeof params?.count !== "number") return key;
  return `${key}_${params.count === 1 ? "one" : "other"}`;
}

export function translate(locale: Locale, key: string, params?: TranslationParams, options: TranslateOptions = {}) {
  const chain = fallbackChains[locale] ?? fallbackChains[defaultLocale];
  const namespaceStripped = key.includes(".") ? key.slice(key.indexOf(".") + 1) : key;
  const candidateKeys = Array.from(new Set([pluralKey(key, params), key, pluralKey(namespaceStripped, params), namespaceStripped]));
  for (const currentLocale of chain) {
    const dictionary = dictionaries[currentLocale];
    for (const candidate of candidateKeys) {
      const value = dictionary[candidate];
      if (value) return interpolate(value, params);
    }
  }
  reportMissingKey(locale, key);
  if (options.fallbackText) return interpolate(options.fallbackText, params);
  if (options.productionSafe || process.env.NODE_ENV === "production") {
    const base = dictionaries[defaultLocale][key] ?? dictionaries.es[key] ?? dictionaries.en[key];
    return base ? interpolate(base, params) : "";
  }
  return key;
}

export function t(key: string, params?: TranslationParams, locale: Locale = defaultLocale) {
  return translate(locale, key, params);
}

export function createTranslator(locale: Locale) {
  return (key: string, params?: TranslationParams, options?: TranslateOptions) => translate(locale, key, params, options);
}

export function translateCard(card: Card, locale: Locale) {
  return {
    name: translate(locale, card.nameKey, undefined, { fallbackText: card.name }),
    effectText: translate(locale, card.effectKey, undefined, { fallbackText: card.effectText }),
    flavorQuote: translate(locale, card.flavorKey, undefined, { fallbackText: card.flavorQuote ?? card.darkHumorText }),
    impactText: translate(locale, card.impactKey, undefined, { fallbackText: card.impactText }),
  };
}

export function translateFaction(faction: Faction, locale: Locale) {
  return {
    name: translate(locale, faction.nameKey, undefined, { fallbackText: faction.name }),
    description: translate(locale, faction.descriptionKey, undefined, { fallbackText: faction.thesis }),
    tagline: translate(locale, faction.taglineKey, undefined, { fallbackText: faction.doctrine }),
  };
}

export function translateKeyword(keyword: KeywordDefinition, locale: Locale) {
  return {
    name: translate(locale, keyword.nameKey, undefined, { fallbackText: keyword.label }),
    description: translate(locale, keyword.descriptionKey, undefined, { fallbackText: keyword.shortText }),
  };
}
