import type { Keyword } from "@/data/keywords";

export type KeywordStyle = {
  icon: string;
  color: string;
  glow: string;
  animation: string;
};

export const keywordStyles: Record<Keyword, KeywordStyle> = {
  Sentencia: { icon: "⚖", color: "#f2d37b", glow: "rgba(242,211,123,0.35)", animation: "martillo leve" },
  Cadena: { icon: "#", color: "#c4b5fd", glow: "rgba(196,181,253,0.3)", animation: "eslabon vibrante" },
  Culpa: { icon: "◉", color: "#93c5fd", glow: "rgba(147,197,253,0.3)", animation: "ojo triste" },
  Derrumbe: { icon: "╱", color: "#fb7185", glow: "rgba(251,113,133,0.3)", animation: "grieta descendente" },
  Estampida: { icon: ">>", color: "#f97316", glow: "rgba(249,115,22,0.3)", animation: "paso rapido" },
  Mascara: { icon: "◐", color: "#ddd6fe", glow: "rgba(221,214,254,0.25)", animation: "velo" },
  Despertar: { icon: "✦", color: "#86efac", glow: "rgba(134,239,172,0.32)", animation: "cristal" },
  Obsesion: { icon: "∞", color: "#d8b4fe", glow: "rgba(216,180,254,0.32)", animation: "bucle distorsionado" },
  Ironia: { icon: "☻", color: "#fde68a", glow: "rgba(253,230,138,0.28)", animation: "sonrisa rota" },
  Catarsis: { icon: "✹", color: "#ffffff", glow: "rgba(255,255,255,0.42)", animation: "explosion luminosa" },
  Aceptacion: { icon: "A", color: "#bbf7d0", glow: "rgba(187,247,208,0.3)", animation: "pulso suave" },
  Limites: { icon: "L", color: "#fef3c7", glow: "rgba(254,243,199,0.3)", animation: "candado abierto" },
  Enfoque: { icon: "◎", color: "#bae6fd", glow: "rgba(186,230,253,0.3)", animation: "punto fijo" },
  Confianza: { icon: "△", color: "#86efac", glow: "rgba(134,239,172,0.3)", animation: "alarma apagada" },
  Intuicion: { icon: "◇", color: "#c4b5fd", glow: "rgba(196,181,253,0.3)", animation: "chispa interior" },
  Responsabilidad: { icon: "R", color: "#fcd34d", glow: "rgba(252,211,77,0.28)", animation: "sello firme" },
  "Accion Directa": { icon: ">", color: "#fb7185", glow: "rgba(251,113,133,0.3)", animation: "corte frontal" },
  Expresion: { icon: "E", color: "#67e8f9", glow: "rgba(103,232,249,0.3)", animation: "voz visible" },
  Silencio: { icon: "_", color: "#cbd5e1", glow: "rgba(203,213,225,0.25)", animation: "onda apagada" },
  Caos: { icon: "?", color: "#f0abfc", glow: "rgba(240,171,252,0.3)", animation: "glitch jugueton" },
};
