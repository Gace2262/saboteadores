import { getFactionTheme } from "@/styles/factionThemes";

type Props = {
  faction: string;
  className?: string;
};

export function FactionSymbol({ faction, className = "" }: Props) {
  const theme = getFactionTheme(faction);
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <span
      className={`inline-grid place-items-center rounded-full border border-white/15 bg-black/45 ${className}`}
      style={{ color: theme.ink, boxShadow: `0 0 20px ${theme.ink}33` }}
      aria-label={theme.label}
      title={theme.label}
    >
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
        {theme.symbol === "chains" ? (
          <>
            <path d="M18 16l-5 5a7 7 0 0 0 10 10l4-4" {...common} />
            <path d="M30 32l5-5a7 7 0 0 0-10-10l-4 4" {...common} />
            <path d="M18 30l12-12" {...common} />
          </>
        ) : null}
        {theme.symbol === "compass" ? (
          <>
            <circle cx="24" cy="24" r="16" {...common} />
            <path d="M24 8v8M24 32v8M8 24h8M32 24h8" {...common} />
            <path d="M18 31l7-15 5 14-12 1z" {...common} />
          </>
        ) : null}
        {theme.symbol === "lightning" ? (
          <path d="M27 5L12 27h11l-2 16 15-24H25l2-14z" {...common} />
        ) : null}
        {theme.symbol === "eye" ? (
          <>
            <path d="M5 24s7-11 19-11 19 11 19 11-7 11-19 11S5 24 5 24z" {...common} />
            <circle cx="24" cy="24" r="5" {...common} />
            <path d="M24 6v5M24 37v5M39 11l-3 4M9 11l3 4" {...common} />
          </>
        ) : null}
        {theme.symbol === "fog" ? (
          <>
            <path d="M8 17h24M14 24h26M7 31h31" {...common} />
            <path d="M16 38h16M28 10c6 2 7 5 8 9" {...common} />
          </>
        ) : null}
        {theme.symbol === "door" ? (
          <>
            <path d="M15 42V8h20v34" {...common} />
            <path d="M19 38h20M30 25h1" {...common} />
            <path d="M14 13l-5 4M14 31l-5 4" {...common} />
          </>
        ) : null}
        {theme.symbol === "halo" ? (
          <>
            <path d="M11 18c3-5 21-5 26 0M14 24c3 6 17 9 24 0" {...common} />
            <path d="M24 7v12M18 36l-5 5M30 36l5 5M16 29l16-10" {...common} />
          </>
        ) : null}
        {theme.symbol === "hammer" ? (
          <>
            <path d="M16 10l10 10M21 5l12 12M27 18L11 34" {...common} />
            <path d="M8 37l7 7M30 10l9 9" {...common} />
            <circle cx="35" cy="35" r="7" {...common} />
          </>
        ) : null}
      </svg>
    </span>
  );
}
