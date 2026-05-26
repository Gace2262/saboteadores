"use client";

import { bossRushOrder } from "@/data/bossRushData";
import { useModeStore } from "@/store/modeStore";

export function BossRushTracker() {
  const record = useModeStore((state) => state.records["boss-rush"]);
  const completeModeRun = useModeStore((state) => state.completeModeRun);
  return (
    <section className="rounded-lg border border-rose-100/16 bg-black/52 p-5">
      <p className="text-sm font-black uppercase text-rose-100/65">Boss Rush</p>
      <h2 className="mt-1 text-4xl font-black">Festival de problemas</h2>
      <div className="mt-5 grid gap-3">
        {bossRushOrder.map((entry) => {
          const defeated = entry.order <= record.bossRushBestIndex;
          return (
            <div key={entry.bossId} className={`grid gap-2 rounded-md border p-3 md:grid-cols-[60px_1fr_1fr] ${defeated ? "border-emerald-100/25 bg-emerald-950/20" : "border-white/10 bg-white/6"}`}>
              <strong className="text-amber-100">#{entry.order}</strong>
              <span className="font-black">{entry.room}</span>
              <span className="text-sm text-white/58">{entry.modifier}</span>
            </div>
          );
        })}
      </div>
      <button
        className="campaign-action mt-5"
        onClick={() => completeModeRun("boss-rush", { bossIndex: Math.min(10, record.bossRushBestIndex + 1), score: (record.bossRushBestIndex + 1) * 130, reward: "Marco de festival interno" })}
      >
        Registrar jefe vencido
      </button>
    </section>
  );
}
