import { defaultLocale, dictionaries, supportedLocales, type Locale } from "@/i18n/config";

const missingKeys = new Set<string>();

export function reportMissingKey(locale: Locale, key: string) {
  missingKeys.add(`${locale}:${key}`);
}

export function getMissingTranslations() {
  return Array.from(missingKeys).map((entry) => {
    const [locale, ...keyParts] = entry.split(":");
    return { locale: locale as Locale, key: keyParts.join(":") };
  });
}

export function clearMissingTranslations() {
  missingKeys.clear();
}

export function scanKeys(locale: Locale = defaultLocale) {
  return Object.keys(dictionaries[locale]).sort();
}

export function getCoverageByLocale(referenceLocale: Locale = defaultLocale) {
  const referenceKeys = scanKeys(referenceLocale);
  return supportedLocales.map((locale) => {
    const dictionary = dictionaries[locale.id];
    const translated = referenceKeys.filter((key) => Boolean(dictionary[key])).length;
    return {
      locale: locale.id,
      translated,
      total: referenceKeys.length,
      percent: referenceKeys.length ? Math.round((translated / referenceKeys.length) * 100) : 0,
      missing: referenceKeys.filter((key) => !dictionary[key]),
    };
  });
}
