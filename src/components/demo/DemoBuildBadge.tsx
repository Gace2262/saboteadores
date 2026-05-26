import { demoVerticalConfig } from "@/data/demo/demoConfig";

type Props = {
  hidden?: boolean;
};

export function DemoBuildBadge({ hidden = false }: Props) {
  if (hidden) return null;
  return (
    <div className="inline-flex flex-wrap items-center gap-2 rounded-md border border-amber-100/20 bg-black/55 px-3 py-2 text-xs font-black uppercase text-amber-100/75">
      <span>v{demoVerticalConfig.version}</span>
      <span className="text-white/25">/</span>
      <span>{demoVerticalConfig.buildMode}</span>
      <span className="text-white/25">/</span>
      <span>vertical slice</span>
    </div>
  );
}
