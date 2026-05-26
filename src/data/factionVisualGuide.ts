import type { FactionId } from "./factions";

export type FactionVisualGuide = {
  id: FactionId;
  title: string;
  symbol: string;
  texture: string;
  particles: string;
  phrase: string;
  gradient: string;
};

export const factionVisualGuide: FactionVisualGuide[] = [
  { id: "juez", title: "El Juez", symbol: "Martillo y ojo", texture: "Vitrales rotos, oro oscuro y sellos.", particles: "Ceniza dorada y cadenas lentas.", phrase: "El tribunal no duerme. Solo cambia de victima.", gradient: "from-amber-200 via-yellow-800 to-black" },
  { id: "controlador", title: "Controlador", symbol: "Regla y cadena", texture: "Lineas rectas, formularios y geometria rigida.", particles: "Sellos administrativos.", phrase: "Improvisar fue eliminado del presupuesto.", gradient: "from-yellow-200 via-stone-700 to-black" },
  { id: "inquieto", title: "Inquieto", symbol: "Rayo y humo", texture: "Capas rapidas, luces rotas y velocidad.", particles: "Chispas rojas en diagonal.", phrase: "La agenda aprendio a galopar.", gradient: "from-fuchsia-400 via-red-700 to-black" },
  { id: "hipervigilante", title: "Hipervigilante", symbol: "Radar y ojo", texture: "Alarmas, triangulos y pantallas de alerta.", particles: "Pulsos rojos concentricos.", phrase: "La calma es claramente una emboscada.", gradient: "from-red-400 via-rose-950 to-black" },
  { id: "reservado", title: "Reservado", symbol: "Puerta sellada", texture: "Cristal oscuro, humo azul y figuras ocultas.", particles: "Niebla lenta.", phrase: "Estoy bien. Solo tiembla el edificio interno.", gradient: "from-blue-300 via-slate-900 to-black" },
  { id: "conciencia", title: "Conciencia", symbol: "Luz y grieta", texture: "Blanco catarsis, oro vivo y cadenas oxidadas.", particles: "Fragmentos ascendentes.", phrase: "La claridad rompio el vidrio.", gradient: "from-white via-emerald-200 to-cyan-950" },
];
