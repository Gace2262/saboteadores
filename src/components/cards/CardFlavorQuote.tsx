"use client";

import type { Card } from "@/data/cards";
import { translateCard } from "@/logic/i18n/translator";
import { useLanguageStore } from "@/store/languageStore";

const fallbackQuotes: Record<string, string> = {
  "el-juez": "Condeno incluso al silencio por sospechoso.",
  "perfeccion-o-funeral": "El error fue microscopico. El castigo trajo telescopio.",
  "caballeria-pendientes": "El calendario pidio refuerzos montados.",
  "autoengano-deluxe": "Negar la realidad tambien cuenta como cardio.",
  "casco-autoestima": "Resistente a criticas, sarcasmo y reuniones familiares.",
};

export function CardFlavorQuote({ card }: { card: Card }) {
  const locale = useLanguageStore((state) => state.locale);
  const text = translateCard(card, locale);
  return (
    <p className="rounded-md border border-amber-100/10 bg-black/35 p-2 text-xs italic leading-5 text-amber-100/68">
      &quot;{text.flavorQuote ?? fallbackQuotes[card.id] ?? card.flavorQuote ?? card.darkHumorText}&quot;
    </p>
  );
}
