"use client";

import { useState } from "react";
import { allCards } from "@/data/cards";

export function CardEditor() {
  const [selected, setSelected] = useState(allCards[0]?.id ?? "");
  const card = allCards.find((item) => item.id === selected);
  return (
    <section className="rounded-lg border border-white/10 bg-black/50 p-5 text-white">
      <h2 className="text-2xl font-black">Cartas</h2>
      <select className="mt-3 w-full rounded bg-zinc-950 p-3" value={selected} onChange={(event) => setSelected(event.target.value)}>
        {allCards.slice(0, 40).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
      </select>
      <pre className="mt-3 max-h-72 overflow-auto rounded bg-black/55 p-3 text-xs text-white/65">{JSON.stringify(card, null, 2)}</pre>
      <p className="mt-3 text-xs text-white/45">Edicion real se conectara a `admin_content` tras activar Supabase.</p>
    </section>
  );
}
