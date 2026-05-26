"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SeedInput({ value, onChange }: Props) {
  return (
    <label className="grid gap-2 text-sm font-bold text-white/70">
      Seed o frase del expediente
      <input value={value} onChange={(event) => onChange(event.target.value)} className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-3 text-white outline-none focus:border-amber-200/60" />
      <span className="text-xs font-normal text-white/40">La misma frase genera el mismo mapa. El Tribunal odia la improvisacion no documentada.</span>
    </label>
  );
}
