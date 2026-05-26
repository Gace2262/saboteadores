import type { Locale } from "@/i18n/config";

export function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatDate(value: Date | string | number, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(value));
}

export function formatPercent(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0 }).format(value);
}

export function formatList(values: string[], locale: Locale) {
  return new Intl.ListFormat(locale, { style: "long", type: "conjunction" }).format(values);
}
