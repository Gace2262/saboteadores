import type { CommunityRunReplay } from "@/logic/workshop/workshopTypes";
import { replaySummary } from "@/logic/workshop/runReplaySerializer";

export function CommunityRunViewer({ replay }: { replay: CommunityRunReplay }) {
  const summary = replaySummary(replay);
  return (
    <section className="rounded-2xl border border-violet-100/20 bg-violet-950/20 p-5 text-white">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-violet-100/55">Replay serializado</p>
      <h2 className="mt-2 text-2xl font-black">Seed {summary.seed}</h2>
      <div className="mt-4 grid gap-2 text-sm text-white/65 md:grid-cols-2">
        <span>Eventos: {summary.events}</span>
        <span>Decisiones: {summary.decisions}</span>
        <span>Ruta: {summary.routeLength} nodos</span>
        <span>Checksum: {summary.checksum}</span>
      </div>
    </section>
  );
}
