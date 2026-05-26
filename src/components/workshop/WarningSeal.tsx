import type { WorkshopWarning } from "@/logic/workshop/workshopTypes";

const warningLabels: Record<WorkshopWarning, string> = {
  flashing: "Flashes",
  loud_audio: "Audio intenso",
  psychological_horror: "Horror psicologico",
  intense_corruption: "Corrupcion intensa",
  difficult_gameplay: "Dificultad alta",
  burnout_themes: "Burnout",
};

export function WarningSeal({ warnings }: { warnings: WorkshopWarning[] }) {
  if (warnings.length === 0) return <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/40">Sin sellos</span>;
  return (
    <div className="flex flex-wrap gap-2">
      {warnings.map((warning) => (
        <span key={warning} className="rounded-full border border-rose-200/25 bg-rose-500/12 px-2 py-1 text-xs font-bold text-rose-100">
          {warningLabels[warning]}
        </span>
      ))}
    </div>
  );
}
