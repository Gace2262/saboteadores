"use client";

import { currencyDefinitions, type CurrencyWallet } from "@/data/economyConfig";
import { useEconomyStore } from "@/store/economyStore";

export function CurrencyDisplay({ wallet }: { wallet?: CurrencyWallet }) {
  const storeWallet = useEconomyStore((state) => state.wallet);
  const displayWallet = wallet ?? storeWallet;
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      {Object.entries(currencyDefinitions).map(([key, definition]) => (
        <article key={key} className="rounded-lg border border-white/10 bg-black/50 p-4">
          <p className="text-xs font-black uppercase text-white/45">{definition.name}</p>
          <p className="mt-2 text-3xl font-black text-amber-100">{displayWallet[key as keyof CurrencyWallet]}</p>
          <p className="mt-2 text-xs text-white/50">{definition.use}</p>
        </article>
      ))}
    </section>
  );
}
