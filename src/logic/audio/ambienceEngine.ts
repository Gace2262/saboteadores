export type AmbienceId = "tribunal" | "catedral" | "archivo" | "burnout" | "vacio";

export type AmbienceDefinition = {
  id: AmbienceId;
  label: string;
  frequencies: [number, number, number];
  texture: string;
};

export const ambienceDefinitions: Record<AmbienceId, AmbienceDefinition> = {
  tribunal: { id: "tribunal", label: "Tribunal", frequencies: [55, 110, 220], texture: "murmullos, cadenas leves y eco judicial" },
  catedral: { id: "catedral", label: "Catedral", frequencies: [49, 98, 196], texture: "viento, organo lejano y grietas" },
  archivo: { id: "archivo", label: "Archivo", frequencies: [62, 124, 248], texture: "hojas, maquina mecanica y ventilacion" },
  burnout: { id: "burnout", label: "Burnout", frequencies: [70, 140, 280], texture: "teclados, impresora y respiracion cansada" },
  vacio: { id: "vacio", label: "Vacio", frequencies: [41, 82, 164], texture: "frecuencias bajas y casi silencio" },
};

export function ambienceForRoute(route: string): AmbienceId {
  if (route.includes("battle")) return "catedral";
  if (route.includes("demo")) return "tribunal";
  if (route.includes("audio")) return "archivo";
  return "tribunal";
}
