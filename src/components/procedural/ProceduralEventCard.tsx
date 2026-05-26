import { proceduralEvents } from "@/data/procedural/eventPools";

type Props = {
  eventId?: string;
};

export function ProceduralEventCard({ eventId }: Props) {
  const event = proceduralEvents.find((item) => item.id === eventId) ?? proceduralEvents[0];
  return (
    <article className="rounded-2xl border border-cyan-100/20 bg-cyan-100/10 p-5">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-100/60">Evento procedural</p>
      <h2 className="mt-2 text-2xl font-black">{event.title}</h2>
      <p className="mt-2 text-sm text-white/60">{event.text}</p>
      <div className="mt-4 grid gap-2">
        {event.options.map((option) => (
          <p key={option.id} className="rounded-lg border border-white/10 bg-black/25 p-3 text-sm text-white/70">{option.label}: {option.result}</p>
        ))}
      </div>
    </article>
  );
}
