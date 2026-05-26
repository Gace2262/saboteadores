"use client";

import { useMemo } from "react";
import { getCoverageByLocale, getMissingTranslations, scanKeys } from "@/logic/i18n/missingTranslations";
import { useLanguageStore } from "@/store/languageStore";

export function LocalizationDebugPanel() {
  const locale = useLanguageStore((state) => state.locale);
  const translate = useLanguageStore((state) => state.translate);
  const coverage = useMemo(() => getCoverageByLocale("es-CL"), []);
  const missing = getMissingTranslations();
  const keys = scanKeys("es-CL");
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1f1636,#050308_55%,#010102)] px-4 py-8 text-white">
      <section className="mx-auto max-w-7xl space-y-5">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-violet-200/70">i18n</p>
          <h1 className="mt-2 text-5xl font-black">{translate("localization.debug.title")}</h1>
          <p className="mt-2 text-white/65">{translate("localization.debug.subtitle")}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {coverage.map((item) => (
            <div key={item.locale} className="rounded-lg border border-white/10 bg-black/45 p-4">
              <p className="text-sm text-white/55">{item.locale}</p>
              <p className="mt-1 text-3xl font-black text-amber-100">{item.percent}%</p>
              <p className="text-xs text-white/45">{item.translated}/{item.total} {translate("localization.keys")}</p>
            </div>
          ))}
        </div>
        <section className="rounded-lg border border-white/10 bg-black/45 p-4">
          <h2 className="text-2xl font-black">{translate("localization.activeLanguage")}: {locale}</h2>
          <p className="mt-2 text-sm text-white/60">{translate("localization.baseKeys")}: {keys.length}</p>
          <pre className="mt-4 max-h-72 overflow-auto rounded bg-zinc-950 p-3 text-xs text-white/62">{JSON.stringify({ missing, coverage }, null, 2)}</pre>
        </section>
      </section>
    </main>
  );
}
