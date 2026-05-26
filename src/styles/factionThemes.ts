import type { DemoFaction } from "@/types/game";

export type VisualFaction =
  | DemoFaction
  | "juez"
  | "complaciente"
  | "hiperracional"
  | "trascendencia"
  | "victima";

export type FactionTheme = {
  label: string;
  shortLabel: string;
  gradient: string;
  glow: string;
  ink: string;
  accent: string;
  symbol: "chains" | "compass" | "lightning" | "eye" | "fog" | "door" | "halo" | "hammer";
  symbols: string[];
  texture: string;
  pattern: string;
  portrait: string;
};

export const factionThemes: Record<VisualFaction, FactionTheme> = {
  controlador: {
    label: "Controlador",
    shortLabel: "CTRL",
    gradient: "from-slate-950 via-zinc-900 to-stone-950",
    glow: "shadow-[0_0_34px_rgba(148,163,184,0.22)]",
    ink: "#c9ced8",
    accent: "#a78b45",
    symbol: "chains",
    symbols: ["§", "□", "⌁"],
    texture: "linear-grid",
    pattern: "cadenas ordenadas / sello administrativo",
    portrait: "linear-gradient(135deg,#020617,#18181b 54%,#292524)",
  },
  perfeccionista: {
    label: "Perfeccionista",
    shortLabel: "CASI",
    gradient: "from-stone-950 via-zinc-900 to-amber-950",
    glow: "shadow-[0_0_36px_rgba(242,211,123,0.2)]",
    ink: "#f2d37b",
    accent: "#e7dfcf",
    symbol: "compass",
    symbols: ["◇", "⌖", "◷"],
    texture: "fractured-marble",
    pattern: "marmol agrietado / compas / reloj",
    portrait: "linear-gradient(135deg,#1c1917,#09090b 54%,#78350f)",
  },
  inquieto: {
    label: "Inquieto",
    shortLabel: "RUIDO",
    gradient: "from-violet-950 via-fuchsia-950 to-orange-950",
    glow: "shadow-[0_0_34px_rgba(217,70,239,0.24)]",
    ink: "#f0abfc",
    accent: "#fb923c",
    symbol: "lightning",
    symbols: ["↯", "!", "≋"],
    texture: "fast-smoke",
    pattern: "humo rapido / papeles / rayos",
    portrait: "linear-gradient(135deg,#4c1d95,#09090b 54%,#7c2d12)",
  },
  hipervigilante: {
    label: "Hipervigilante",
    shortLabel: "ALRMA",
    gradient: "from-red-950 via-zinc-950 to-cyan-950",
    glow: "shadow-[0_0_36px_rgba(239,68,68,0.24)]",
    ink: "#fecaca",
    accent: "#67e8f9",
    symbol: "eye",
    symbols: ["◉", "△", "!!"],
    texture: "radar",
    pattern: "ojo / radar / alarma roja",
    portrait: "radial-gradient(circle,#7f1d1d,#030712 62%)",
  },
  reservado: {
    label: "Reservado",
    shortLabel: "NIEBLA",
    gradient: "from-slate-950 via-blue-950 to-black",
    glow: "shadow-[0_0_34px_rgba(96,165,250,0.2)]",
    ink: "#bfdbfe",
    accent: "#64748b",
    symbol: "fog",
    symbols: ["…", "◌", "▥"],
    texture: "quiet-fog",
    pattern: "niebla azul / silueta / vidrio oscuro",
    portrait: "linear-gradient(135deg,#020617,#172554 52%,#020617)",
  },
  evitador: {
    label: "Evitador",
    shortLabel: "MANANA",
    gradient: "from-zinc-950 via-neutral-900 to-slate-950",
    glow: "shadow-[0_0_34px_rgba(148,163,184,0.18)]",
    ink: "#cbd5e1",
    accent: "#94a3b8",
    symbol: "door",
    symbols: ["▯", "◷", "░"],
    texture: "closed-door",
    pattern: "puerta cerrada / reloj derretido",
    portrait: "linear-gradient(135deg,#18181b,#030712 54%,#334155)",
  },
  conciencia: {
    label: "Conciencia",
    shortLabel: "LUZ",
    gradient: "from-amber-50 via-cyan-100 to-white",
    glow: "shadow-[0_0_42px_rgba(255,255,255,0.28)]",
    ink: "#ffffff",
    accent: "#f2d37b",
    symbol: "halo",
    symbols: ["✧", "○", "╱"],
    texture: "broken-halo",
    pattern: "luz blanca / cadenas rotas / halo imperfecto",
    portrait: "radial-gradient(circle,#ffffff,#bae6fd 40%,#0f172a 78%)",
  },
  juez: {
    label: "El Juez",
    shortLabel: "JUICIO",
    gradient: "from-black via-amber-950 to-zinc-950",
    glow: "shadow-[0_0_42px_rgba(242,211,123,0.26)]",
    ink: "#f2d37b",
    accent: "#b91c1c",
    symbol: "hammer",
    symbols: ["⚖", "◉", "▣"],
    texture: "judgment-seal",
    pattern: "martillo / ojo dorado / sello judicial",
    portrait: "radial-gradient(circle,#f2d37b,#451a03 38%,#030303 72%)",
  },
  complaciente: {
    label: "Complaciente",
    shortLabel: "FAVOR",
    gradient: "from-rose-950 via-zinc-950 to-amber-950",
    glow: "shadow-[0_0_34px_rgba(251,146,60,0.2)]",
    ink: "#ffd5c4",
    accent: "#ff9f7a",
    symbol: "halo",
    symbols: ["♡", "✧", "⛓"],
    texture: "broken-halo",
    pattern: "halos rotos / manos / deuda emocional",
    portrait: "linear-gradient(135deg,#7f1d1d,#09090b 54%,#78350f)",
  },
  hiperracional: {
    label: "Hiperracional",
    shortLabel: "EXCEL",
    gradient: "from-slate-950 via-blue-950 to-zinc-950",
    glow: "shadow-[0_0_34px_rgba(127,183,255,0.22)]",
    ink: "#d4e9ff",
    accent: "#7fb7ff",
    symbol: "compass",
    symbols: ["∑", "□", "⌁"],
    texture: "linear-grid",
    pattern: "cuadricula / simbolos / interfaz fria",
    portrait: "linear-gradient(135deg,#0f172a,#172554 54%,#020617)",
  },
  trascendencia: {
    label: "Trascendencia",
    shortLabel: "AIRE",
    gradient: "from-amber-50 via-cyan-100 to-white",
    glow: "shadow-[0_0_42px_rgba(255,255,255,0.28)]",
    ink: "#ffffff",
    accent: "#7fffd4",
    symbol: "halo",
    symbols: ["✦", "○", "╳"],
    texture: "broken-halo",
    pattern: "catarsis / aire / claridad viva",
    portrait: "radial-gradient(circle,#ffffff,#a7f3d0 42%,#052e2b 78%)",
  },
  victima: {
    label: "Victima",
    shortLabel: "DRAMA",
    gradient: "from-violet-950 via-zinc-950 to-slate-950",
    glow: "shadow-[0_0_34px_rgba(184,135,255,0.22)]",
    ink: "#ead8ff",
    accent: "#b887ff",
    symbol: "fog",
    symbols: ["☹", "◌", "☂"],
    texture: "quiet-fog",
    pattern: "teatro / lluvia / mascara triste",
    portrait: "linear-gradient(135deg,#2e1065,#09090b 54%,#1e1b4b)",
  },
};

export const getFactionTheme = (faction: string): FactionTheme =>
  factionThemes[(faction as VisualFaction) in factionThemes ? (faction as VisualFaction) : "juez"];
