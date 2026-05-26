"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { demoDialogues } from "@/data/demo/demoDialogues";
import { useDemoStore } from "@/store/demoStore";
import { DemoBuildBadge } from "./DemoBuildBadge";
import { DemoProgressBar } from "./DemoProgressBar";
import { DemoSkipButton } from "./DemoSkipButton";

type Props = {
  trailerMode?: boolean;
};

export function DemoIntroCinematic({ trailerMode = false }: Props) {
  const completeStage = useDemoStore((state) => state.completeStage);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-5 py-8 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(242,211,123,0.28),transparent_18%),radial-gradient(circle_at_50%_55%,rgba(127,29,29,0.28),transparent_36%)]" />
      <div className="absolute inset-x-0 top-8 mx-auto h-44 w-44 rounded-full border border-amber-200/20 bg-amber-200/10 shadow-[0_0_120px_rgba(242,211,123,0.28)]" />
      <motion.div initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: trailerMode ? 0.6 : 1.4 }} className="absolute inset-x-0 top-16 mx-auto h-20 w-36 rounded-[50%] border-4 border-amber-100/70 bg-black shadow-[0_0_80px_rgba(242,211,123,0.45)]" />
      <div className="absolute inset-0 court-fog opacity-70" />
      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl content-between gap-8">
        <div className="flex items-center justify-between gap-4">
          <DemoBuildBadge hidden={trailerMode} />
          <DemoSkipButton current="intro" />
        </div>
        <DemoProgressBar active="intro" trailerMode={trailerMode} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-amber-100/65">El Tribunal del Craneo</p>
          <h1 className="mx-auto mt-4 max-w-5xl text-5xl font-black uppercase leading-none md:text-8xl">Saboteadores Mentales</h1>
          <p className="mt-3 text-2xl font-black text-amber-100">Habitantes Invisibles</p>
          <div className="mx-auto mt-10 max-w-3xl space-y-4 rounded-2xl border border-amber-100/20 bg-black/55 p-6">
            {demoDialogues.intro.map((line) => (
              <p key={line} className="text-xl font-bold text-white/82">
                {line}
              </p>
            ))}
          </div>
          <Link href="/demo/tutorial" onClick={() => completeStage("intro")} className="campaign-action mx-auto mt-8 max-w-sm">
            Entrar a la primera audiencia
          </Link>
        </motion.div>
        <p className="text-center text-xs text-white/45">[CADENAS ARRASTRANDOSE] [MARTILLAZO LEJANO] [CORO JUDICIAL CRECIENDO]</p>
      </section>
    </main>
  );
}
