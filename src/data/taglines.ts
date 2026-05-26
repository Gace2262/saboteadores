export type Tagline = {
  id: string;
  text: string;
  use: "hero" | "steam" | "trailer" | "social";
};

export const officialTaglines: Tagline[] = [
  { id: "tribunal-vive", text: "El tribunal vive dentro de ti.", use: "hero" },
  { id: "bandos", text: "Tus pensamientos ya eligieron bando.", use: "steam" },
  { id: "mecanismos", text: "No luchas contra monstruos. Luchas contra mecanismos.", use: "trailer" },
  { id: "cicatriz", text: "Cada juicio deja una cicatriz.", use: "social" },
  { id: "tiranos", text: "La mente tambien construye tiranos.", use: "hero" },
  { id: "armadura", text: "El estres encontro armadura.", use: "social" },
  { id: "cadenas", text: "Las cadenas aprendieron tu nombre.", use: "trailer" },
];
