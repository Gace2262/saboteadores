"use client";

import { supportedLocales } from "@/i18n/config";
import { useLanguageStore } from "@/store/languageStore";

export function LanguageSelector() {
  const locale = useLanguageStore((state) => state.locale);
  const setLocale = useLanguageStore((state) => state.setLocale);
  const translate = useLanguageStore((state) => state.translate);
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-5 text-white">
      <p className="text-sm uppercase tracking-[0.3em] text-amber-200/70">{translate("settings.language")}</p>
      <h1 className="mt-2 text-4xl font-black">{translate("settings.languageTitle")}</h1>
      <p className="mt-2 max-w-2xl text-white/65">{translate("settings.languageSubtitle")}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {supportedLocales.map((item) => (
          <button
            key={item.id}
            disabled={!item.enabled}
            onClick={() => setLocale(item.id)}
            className={`rounded-lg border p-4 text-left transition ${
              locale === item.id ? "border-amber-200 bg-amber-200/15 text-amber-50" : "border-white/10 bg-white/5 text-white/75"
            } ${item.enabled ? "hover:border-amber-100" : "cursor-not-allowed opacity-45"}`}
          >
            <span className="block text-lg font-black">{item.nativeName}</span>
            <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-white/45">{item.enabled ? item.id : translate("localization.comingSoon")}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
