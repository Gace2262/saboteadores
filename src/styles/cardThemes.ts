export type VisualThemeId = "dark-court" | "high-contrast" | "competitive" | "light-experimental";

export type CardTheme = {
  id: VisualThemeId;
  name: string;
  description: string;
  appClass: string;
  panelClass: string;
};

export const cardThemes: Record<VisualThemeId, CardTheme> = {
  "dark-court": {
    id: "dark-court",
    name: "Tribunal oscuro",
    description: "Grimorio psicologico, metal ceremonial y humo mental.",
    appClass: "theme-dark-court",
    panelClass: "border-amber-100/15 bg-black/52",
  },
  "high-contrast": {
    id: "high-contrast",
    name: "Alto contraste",
    description: "Lectura fuerte, menos niebla y bordes claros.",
    appClass: "theme-high-contrast",
    panelClass: "border-white/45 bg-black/82",
  },
  competitive: {
    id: "competitive",
    name: "Competitivo limpio",
    description: "Menos particulas, keywords visibles y lectura rapida.",
    appClass: "theme-competitive",
    panelClass: "border-cyan-100/25 bg-zinc-950/78",
  },
  "light-experimental": {
    id: "light-experimental",
    name: "Claro experimental",
    description: "Papel envejecido, tinta oscura y oro gastado.",
    appClass: "theme-light-experimental",
    panelClass: "border-stone-700/35 bg-stone-100/88 text-stone-950",
  },
};
