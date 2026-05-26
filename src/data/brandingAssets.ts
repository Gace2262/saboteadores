import { officialTaglines } from "./taglines";

export type LogoVariant = {
  id: string;
  name: string;
  use: string;
  description: string;
};

export type PromoFormat = {
  id: string;
  name: string;
  ratio: string;
  use: string;
};

export const brandingAssets = {
  title: "Saboteadores Mentales",
  subtitle: "Habitantes Invisibles",
  positioning: "Una opera psicologica de cartas con estetica de tribunal mental epico.",
  shortPitch:
    "Un juego de cartas psicologico y cinematografico donde enfrentas Saboteadores Mentales dentro de un tribunal vivo construido por mecanismos emocionales.",
  longPitch:
    "Deckbuilding tactico, bosses colosales, cartas que evolucionan, musica dinamica y humor negro ceremonial dentro de una mente que convierte patrones automaticos en tiranos con martillo.",
  genreTags: ["Deckbuilder", "Roguelike", "Psychological Strategy", "Narrative Card Game", "Dark Fantasy Mental Opera"],
  logoVariants: [
    { id: "full", name: "Full logo", use: "Portadas, key art, press kit", description: "Titulo completo con subtitulo, sello y grietas doradas." },
    { id: "compact", name: "Compact logo", use: "Capsulas pequenas y UI", description: "Solo Saboteadores Mentales con ojo oculto." },
    { id: "icon", name: "Icon only", use: "Avatar, favicon, app icon", description: "Sello judicial fracturado con martillo y ojo." },
    { id: "mono", name: "Monochrome", use: "Documentos, prensa y fondos claros", description: "Version de alto contraste sin particulas." },
    { id: "animated", name: "Cinematic animated logo", use: "Trailer y splash", description: "Humo, cadenas, martillo lejano y ojo dorado." },
  ] satisfies LogoVariant[],
  promoFormats: [
    { id: "steam-main", name: "Steam main capsule", ratio: "616x353", use: "Tienda Steam" },
    { id: "steam-small", name: "Steam small capsule", ratio: "231x87", use: "Listados" },
    { id: "library", name: "Library capsule", ratio: "600x900", use: "Biblioteca" },
    { id: "header", name: "Header art", ratio: "920x430", use: "Pagina Steam" },
    { id: "social-square", name: "Social square", ratio: "1:1", use: "Instagram, Discord" },
    { id: "social-wide", name: "Social wide", ratio: "16:9", use: "X, YouTube, prensa" },
  ] satisfies PromoFormat[],
  taglines: officialTaglines,
};
