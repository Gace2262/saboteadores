export type AdvancedMusicLayerId = "base" | "tension" | "stress" | "choir" | "corruption" | "climax";

export type MusicLayerDefinition = {
  id: AdvancedMusicLayerId;
  label: string;
  description: string;
  threshold: number;
  bus: "music" | "ambience" | "choir" | "corruption";
};

export const advancedMusicLayers: MusicLayerDefinition[] = [
  { id: "base", label: "Base", description: "Organo oscuro, piano minimo o ambiente principal.", threshold: 0, bus: "ambience" },
  { id: "tension", label: "Tension", description: "Cuerdas tensas, reloj mecanico y respiracion contenida.", threshold: 22, bus: "music" },
  { id: "stress", label: "Estres", description: "Percusion judicial, latido y subgrave.", threshold: 42, bus: "music" },
  { id: "choir", label: "Coro", description: "Coros goticos y voces judiciales creciendo.", threshold: 58, bus: "choir" },
  { id: "corruption", label: "Corrupcion", description: "Glitch industrial, ruido blanco y pitch inestable.", threshold: 72, bus: "corruption" },
  { id: "climax", label: "Climax", description: "Doble bombo, martillazos sincronizados y coro completo.", threshold: 86, bus: "music" },
];
