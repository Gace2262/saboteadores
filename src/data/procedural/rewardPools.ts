import type { ProceduralReward } from "@/logic/procedural/proceduralTypes";

export const proceduralRewards: ProceduralReward[] = [
  { id: "fragmentos-claridad", type: "fragmentos", label: "80 Fragmentos de Claridad", rarity: "comun" },
  { id: "llave-mental", type: "llave", label: "Llave Mental", rarity: "rara" },
  { id: "carta-sinergica", type: "carta", label: "Carta sinergica del mazo", rarity: "rara" },
  { id: "reliquia-cadena-domesticada", type: "reliquia", label: "Reliquia: Cadena Domesticada", rarity: "epica" },
  { id: "cura-voluntad", type: "cura", label: "Recuperar 6 Voluntad", rarity: "comun" },
  { id: "limpiar-estres", type: "limpiar_estres", label: "Reducir 3 Estres", rarity: "rara" },
  { id: "evolucion-carta", type: "evolucion", label: "Evolucionar una carta", rarity: "epica" },
  { id: "quitar-carta", type: "quitar_carta", label: "Quitar carta del mazo", rarity: "rara" },
  { id: "mejora-carta", type: "mejora", label: "Mejorar carta comun", rarity: "comun" },
  { id: "cosmetico-raro", type: "cosmetico", label: "Cosmetico raro de run", rarity: "legendaria" },
];
