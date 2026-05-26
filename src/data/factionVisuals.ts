import type { FactionId } from "./factions";
import { factionThemes } from "@/styles/factionThemes";

export const factionVisuals = factionThemes;

export const getFactionVisual = (id: FactionId) => factionVisuals[id];
