import { demoConfig } from "@/data/demoConfig";

export function DemoVersionBadge() {
  return (
    <div className="inline-flex flex-wrap items-center gap-2 rounded-md border border-amber-100/20 bg-black/50 px-3 py-2 text-xs font-black uppercase text-amber-100/75">
      <span>Version {demoConfig.version}</span>
      <span className="text-white/25">/</span>
      <span>Build {demoConfig.buildDate}</span>
      <span className="text-white/25">/</span>
      <span>Modo {demoConfig.buildMode}</span>
    </div>
  );
}
