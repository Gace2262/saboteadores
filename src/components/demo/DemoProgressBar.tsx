"use client";

import Link from "next/link";
import { demoStages, type DemoStageId } from "@/data/demo/demoFlow";
import { getDemoProgressPercent } from "@/logic/demo/demoProgress";
import { useDemoStore } from "@/store/demoStore";

type Props = {
  active: DemoStageId;
  trailerMode?: boolean;
};

export function DemoProgressBar({ active, trailerMode = false }: Props) {
  const completed = useDemoStore((state) => state.completedStages);
  const progress = getDemoProgressPercent(completed);

  if (trailerMode) return null;

  return (
    <nav className="rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-100/65">Demo vertical {progress}%</p>
        <Link href="/demo" className="text-xs font-bold uppercase text-white/55 hover:text-amber-100">
          Expediente demo
        </Link>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-gradient-to-r from-amber-200 via-red-400 to-cyan-200" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-3 grid gap-2 md:grid-cols-4 xl:grid-cols-8">
        {demoStages
          .filter((stage) => stage.id !== "home")
          .map((stage) => {
            const done = completed.includes(stage.id);
            const current = active === stage.id;
            return (
              <Link
                key={stage.id}
                href={stage.route}
                className={`rounded-lg border px-2 py-2 text-xs font-bold transition ${
                  current ? "border-amber-200 bg-amber-200/15 text-amber-50" : done ? "border-emerald-200/25 bg-emerald-200/10 text-emerald-100" : "border-white/10 bg-white/[0.03] text-white/45"
                }`}
              >
                {stage.title}
              </Link>
            );
          })}
      </div>
    </nav>
  );
}
