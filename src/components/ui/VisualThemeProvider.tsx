"use client";

import { useEffect } from "react";
import { cardThemes } from "@/styles/cardThemes";
import { useVisualStore } from "@/store/visualStore";

export function VisualThemeProvider() {
  const visualTheme = useVisualStore((state) => state.visualTheme);
  const textScale = useVisualStore((state) => state.textScale);
  const lowPerformance = useVisualStore((state) => state.lowPerformance);

  useEffect(() => {
    const root = document.documentElement;
    Object.values(cardThemes).forEach((theme) => root.classList.remove(theme.appClass));
    root.classList.add(cardThemes[visualTheme].appClass);
    root.style.setProperty("--sab-text-scale", `${textScale}`);
    root.classList.toggle("theme-low-performance", lowPerformance);
  }, [lowPerformance, textScale, visualTheme]);

  return null;
}
