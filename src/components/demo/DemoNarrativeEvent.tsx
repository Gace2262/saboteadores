"use client";

import Link from "next/link";
import { demoRewards } from "@/data/demo/demoRewards";
import { useDemoStore } from "@/store/demoStore";
import { DemoProgressBar } from "./DemoProgressBar";

const choices = [
  { id: "mirror" as const, title: "Mirar de frente", result: demoRewards.event.mirror },
  { id: "laugh" as const, title: "Reirte del reflejo", result: demoRewards.event.laugh },
  { id: "towel" as const, title: "Taparlo con una toalla emocional", result: demoRewards.event.towel },
];

export function DemoNarrativeEvent() {
  const eventChoice = useDemoStore((state) => state.eventChoice);
  const chooseEvent = useDemoStore((state) => state.chooseEvent);
  const completeStage = useDemoStore((state) => state.completeStage);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_50%_8%,rgba(127,255,212,0.16),transparent_28%),linear-gradient(135deg,#050308,#0f101a_55%,#050308)] px-5 py-8 text-white">
      <section className="mx-auto grid max-w-6xl gap-6">
        <DemoProgressBar active="event" />
        <header className="rounded-2xl border border-cyan-100/20 bg-black/60 p-6 text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-100/60">Evento narrativo</p>
          <h1 className="mt-2 text-5xl font-black">Espejo incomodo</h1>
          <p className="mx-auto mt-3 max-w-3xl text-xl font-bold text-white/76">
            El espejo no refleja tu cara. Refleja tus mecanismos, con iluminacion cruelmente honesta.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              onClick={() => chooseEvent(choice.id)}
              className={`rounded-2xl border p-5 text-left transition ${eventChoice === choice.id ? "border-cyan-200 bg-cyan-200/15" : "border-white/10 bg-black/45 hover:border-cyan-200/40"}`}
            >
              <h2 className="text-2xl font-black">{choice.title}</h2>
              <p className="mt-3 text-sm text-white/62">{choice.result}</p>
            </button>
          ))}
        </div>
        <Link href="/demo/evolution" onClick={() => completeStage("event")} className={`campaign-action justify-self-end ${eventChoice ? "" : "pointer-events-none opacity-45"}`}>
          Aceptar consecuencia
        </Link>
      </section>
    </main>
  );
}
