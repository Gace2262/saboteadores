import type { DemoEnemy } from "@/types/game";

export const perfeccionistaAscendido: DemoEnemy = {
  id: "perfeccionista-ascendido",
  name: "Perfeccionista Ascendido",
  maxWill: 45,
  deckIds: ["auditoria-menor", "casi-perfecto", "correccion-pulcra", "margen-impecable", "sentencia-de-escritorio", "cadena-procedimental"],
  phrases: [
    "Casi ganaste. Que tragedia tan pulcra.",
    "Tu error sobrevivio demasiado tiempo.",
    "La excelencia tambien sabe morder.",
  ],
};
