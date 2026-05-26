import Link from "next/link";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";
import { LocalizedText } from "@/components/i18n/LocalizedText";

export default function LanguageSettingsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#3b260f,#050308_55%,#010102)] px-4 py-8 text-white">
      <section className="mx-auto max-w-6xl space-y-5">
        <Link className="inline-flex rounded border border-white/10 bg-black/45 px-3 py-2 text-sm" href="/settings">
          <LocalizedText k="settings.back" />
        </Link>
        <LanguageSelector />
      </section>
    </main>
  );
}
