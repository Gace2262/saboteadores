import type { Rarity } from "./cards";

export type CardFrameVariant = {
  id: Rarity;
  label: string;
  description: string;
  cornerGlyph: string;
};

export const cardFrameVariants: Record<Rarity, CardFrameVariant> = {
  comun: { id: "comun", label: "Grimorio simple", description: "Papel oscuro con metal gastado.", cornerGlyph: "·" },
  rara: { id: "rara", label: "Metal mental", description: "Runas suaves y borde frio.", cornerGlyph: "◇" },
  epica: { id: "epica", label: "Fuego oscuro", description: "Marco vivo con humo lateral.", cornerGlyph: "✦" },
  legendaria: { id: "legendaria", label: "Sello dorado", description: "Grietas luminosas y oro ceremonial.", cornerGlyph: "⚖" },
  maldita: { id: "maldita", label: "Marco corrupto", description: "Estatica roja y cadenas negras.", cornerGlyph: "!" },
};
