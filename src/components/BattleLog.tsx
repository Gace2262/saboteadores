"use client";

import { ScrollText } from "lucide-react";

const isImportant = (line: string) => /fase|boss|gano|perdio|bloque|dano|cura|estres/i.test(line);

export function BattleLog({ entries }: { entries: string[] }) {
  return (
    <section className="rounded-xl border border-amber-100/20 bg-[linear-gradient(180deg,rgba(30,22,14,0.78),rgba(5,3,8,0.72))] p-4 shadow-[inset_0_0_30px_rgba(242,211,123,0.05)]">
      <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-amber-100/78">
        <ScrollText size={16} />
        Expediente de audiencia
      </div>
      <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
        {entries.map((line, index) => (
          <p
            key={`${line}-${index}`}
            className={`rounded-md border p-3 text-sm leading-5 ${
              isImportant(line)
                ? "border-amber-100/18 bg-amber-100/8 text-amber-50"
                : "border-white/8 bg-black/22 text-white/62"
            }`}
          >
            <span className="mr-2 font-black text-white/38">{String(index + 1).padStart(2, "0")}</span>
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
