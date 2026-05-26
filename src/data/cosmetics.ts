export type CosmeticKind = "avatar" | "marco" | "fondo" | "aura" | "mascota" | "entrada" | "efecto";

export type CosmeticDefinition = {
  id: string;
  name: string;
  kind: CosmeticKind;
  rarity: "comun" | "raro" | "epico" | "legendario" | "maldito";
  unlockSource: string;
  flavorText: string;
};

export const cosmetics: CosmeticDefinition[] = [
  { id: "ruinas-autoengano", name: "Ruinas del Autoengano", kind: "fondo", rarity: "epico", unlockSource: "Misiones epicas", flavorText: "Negar la realidad tambien dejo escombros decorativos." },
  { id: "electricidad-emocional", name: "Electricidad emocional", kind: "aura", rarity: "raro", unlockSource: "Logros de Estres", flavorText: "La ansiedad encontro instalacion electrica." },
  { id: "ansiedraton-supremo", name: "Ansiedraton Supremo", kind: "mascota", rarity: "legendario", unlockSource: "Supervivencia", flavorText: "Bebe cafe desde una taza que tambien tiembla." },
  { id: "libre-bajo-protesta", name: "Libre bajo protesta", kind: "marco", rarity: "legendario", unlockSource: "Juicio Extremo", flavorText: "El tribunal apela. Tu perfil posa igual." },
  { id: "tribunal-observa", name: "El Tribunal observa", kind: "entrada", rarity: "epico", unlockSource: "Boss Rush", flavorText: "Sello gigante, humo dorado y cero privacidad mental." },
  { id: "dejo-obedecer", name: "El que dejo de obedecer", kind: "avatar", rarity: "legendario", unlockSource: "Final secreto", flavorText: "No rompio el sistema. Dejo de presentarse." },
  { id: "borde-borrador-corrupto", name: "Borde borrador corrupto", kind: "marco", rarity: "raro", unlockSource: "Draft Mental", flavorText: "Aprobado por entidades legalmente cuestionables." },
  { id: "aura-cooperativa", name: "Aura cooperativa", kind: "aura", rarity: "raro", unlockSource: "Cooperativo local", flavorText: "Dos cerebros compartiendo presupuesto y extintor." },
];
