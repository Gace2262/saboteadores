"use client";

type CorruptionMeterProps = {
  value: number;
  label?: string;
};

export function CorruptionMeter({ value, label = "Presion universal" }: CorruptionMeterProps) {
  const safeValue = Math.max(0, Math.min(100, value));
  return (
    <div className="rounded-lg border border-red-100/15 bg-black/45 p-4">
      <div className="flex justify-between gap-3 text-xs font-black uppercase text-white/50">
        <span>{label}</span>
        <span className="text-red-100">{safeValue}%</span>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-gradient-to-r from-amber-200 via-red-400 to-violet-500" style={{ width: `${safeValue}%` }} />
      </div>
      <p className="mt-3 text-xs text-white/50">
        {safeValue > 75 ? "El universo mental suena como una audiencia con demasiados amplificadores." : safeValue > 45 ? "Las regiones respiran raro, pero aun respetan algunas leyes fisicas." : "El Tribunal finge estabilidad con sorprendente confianza."}
      </p>
    </div>
  );
}
