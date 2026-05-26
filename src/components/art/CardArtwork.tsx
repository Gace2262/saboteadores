import { FactionSymbol } from "./FactionSymbol";
import { getFactionTheme } from "@/styles/factionThemes";

type Props = {
  faction: string;
  rarity: string;
  compact?: boolean;
};

export function CardArtwork({ faction, rarity, compact }: Props) {
  const theme = getFactionTheme(faction);
  const isBright = faction === "conciencia";

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-white/12 bg-gradient-to-br ${theme.gradient} ${
        compact ? "h-24" : "h-36"
      }`}
    >
      <div
        className="absolute inset-0 opacity-65"
        style={{
          background:
            theme.texture === "radar"
              ? "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18) 0 1px, transparent 1px 24px)"
              : theme.texture === "fractured-marble"
                ? "linear-gradient(42deg, transparent 0 47%, rgba(255,255,255,0.22) 48%, transparent 49% 100%), linear-gradient(118deg, transparent 0 60%, rgba(242,211,123,0.2) 61%, transparent 62% 100%)"
                : theme.texture === "fast-smoke"
                  ? "repeating-linear-gradient(112deg, transparent 0 18px, rgba(255,255,255,0.12) 19px, transparent 21px)"
                  : "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 22px)",
        }}
      />
      <div
        className="absolute -left-8 -top-10 h-36 w-36 rounded-full blur-2xl"
        style={{ background: `${theme.ink}33` }}
      />
      <div
        className="absolute -bottom-12 right-0 h-40 w-40 rounded-full blur-2xl"
        style={{ background: `${theme.accent}2f` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.2),transparent_28%)]" />
      <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/28">
        <FactionSymbol faction={faction} className="h-14 w-14 border-white/20" />
      </div>
      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-black uppercase text-white/52">
        <span>{theme.shortLabel}</span>
        <span>{rarity}</span>
      </div>
      {isBright ? <div className="absolute inset-0 bg-white/12 mix-blend-screen" /> : null}
    </div>
  );
}
