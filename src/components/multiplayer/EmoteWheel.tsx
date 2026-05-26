"use client";

import { multiplayerEmotes } from "@/data/emotes";
import { useMultiplayerStore } from "@/store/multiplayerStore";

export function EmoteWheel() {
  const sendEmote = useMultiplayerStore((state) => state.sendEmote);
  const lastEmote = useMultiplayerStore((state) => state.lastEmote);
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-4 text-white">
      <h2 className="text-2xl font-black">Emotes seguros</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {multiplayerEmotes.map((emote) => (
          <button key={emote.id} className="rounded border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-white/70 hover:bg-white/10" onClick={() => sendEmote(emote)}>
            {emote.label}
          </button>
        ))}
      </div>
      {lastEmote ? <p className="mt-3 text-sm text-amber-100">{lastEmote.label}: {lastEmote.flavor}</p> : null}
    </section>
  );
}
