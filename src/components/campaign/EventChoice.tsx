"use client";

import { useRouter } from "next/navigation";
import { getCampaignNode } from "@/data/campaignNodes";
import { getEvent, type EventOption } from "@/data/events";
import { useCampaignStore } from "@/store/campaignStore";

export function EventChoice() {
  const router = useRouter();
  const { currentNodeId, chooseEventOption, goToMap } = useCampaignStore();
  const event = getEvent(getCampaignNode(currentNodeId)?.eventId);

  if (!event) {
    return (
      <main className="grid min-h-screen place-items-center text-white">
        <button onClick={() => { goToMap(); router.push("/campaign"); }}>Volver al mapa</button>
      </main>
    );
  }

  const choose = (optionId: EventOption["id"]) => {
    chooseEventOption(optionId);
    router.push("/campaign");
  };

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 court-fog opacity-80" />
      <section className="relative z-10 w-full max-w-4xl rounded-lg border border-amber-100/18 bg-black/58 p-6">
        <p className="text-sm font-black uppercase text-amber-100/65">Evento mental</p>
        <h1 className="mt-2 text-5xl font-black">{event.title}</h1>
        <p className="mt-2 text-lg text-violet-100/80">{event.room}</p>
        <p className="mt-5 text-xl leading-8 text-white/70">{event.text}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {event.options.map((option) => (
            <button
              key={option.id}
              onClick={() => choose(option.id)}
              className="min-h-44 rounded-lg border border-white/12 bg-white/6 p-5 text-left transition hover:border-amber-100/50 hover:bg-amber-100/10"
            >
              <h2 className="text-2xl font-black text-amber-100">{option.label}</h2>
              <p className="mt-4 leading-7 text-white/68">{option.result}</p>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
