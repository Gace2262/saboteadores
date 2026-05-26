"use client";

import { motion } from "framer-motion";
import type { BossTransformation } from "@/data/bossTransformations";
import { useBossStore } from "@/store/bossStore";

type BossTransformationSceneProps = {
  transformations: BossTransformation[];
};

export function BossTransformationScene({ transformations }: BossTransformationSceneProps) {
  const { transformationsSeen, recordTransformation } = useBossStore();
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {transformations.map((item) => {
        const seen = transformationsSeen.includes(item.id);
        return (
          <motion.article
            key={item.id}
            whileHover={{ y: -4, scale: 1.01 }}
            className={`rounded-lg border p-5 ${item.rarity === "final" ? "border-red-200/30 bg-red-950/25" : item.rarity === "fusion" ? "border-violet-200/25 bg-violet-950/22" : "border-amber-100/18 bg-black/45"}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/45">{item.rarity}</p>
                <h3 className="mt-2 text-2xl font-black text-white">{item.name}</h3>
              </div>
              <span className={seen ? "rounded bg-emerald-300/15 px-2 py-1 text-xs font-black text-emerald-100" : "rounded bg-white/10 px-2 py-1 text-xs font-black text-white/55"}>
                {seen ? "Vista" : "Oculta"}
              </span>
            </div>
            <p className="mt-4 text-sm font-bold text-amber-100">{item.trigger}</p>
            <p className="mt-3 text-sm text-white/65">{item.visual}</p>
            <p className="mt-3 text-sm text-white/55">{item.mechanic}</p>
            <blockquote className="mt-4 border-l-2 border-amber-100/35 pl-3 text-sm font-black text-white/80">{item.quote}</blockquote>
            <button onClick={() => recordTransformation(item.id)} className="campaign-choice mt-4">
              Registrar transformacion
            </button>
          </motion.article>
        );
      })}
    </section>
  );
}
