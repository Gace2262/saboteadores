import esClCommon from "./dictionaries/es-CL/common.json";
import esClCards from "./dictionaries/es-CL/cards.json";
import esClEffects from "./dictionaries/es-CL/effects.json";
import esClStory from "./dictionaries/es-CL/story.json";
import esClUi from "./dictionaries/es-CL/ui.json";
import esCommon from "./dictionaries/es/common.json";
import enCommon from "./dictionaries/en/common.json";
import enCards from "./dictionaries/en/cards.json";
import enEffects from "./dictionaries/en/effects.json";
import enStory from "./dictionaries/en/story.json";
import enUi from "./dictionaries/en/ui.json";
import ptBrCommon from "./dictionaries/pt-BR/common.json";

export type Locale = "es-CL" | "es" | "en" | "pt-BR";
export type TranslationParams = Record<string, string | number | boolean | undefined>;
export type TranslationDictionary = Record<string, string>;

export const defaultLocale: Locale = "es-CL";

export const supportedLocales: Array<{ id: Locale; nativeName: string; enabled: boolean }> = [
  { id: "es-CL", nativeName: "Espanol Chile", enabled: true },
  { id: "es", nativeName: "Espanol", enabled: true },
  { id: "en", nativeName: "English", enabled: true },
  { id: "pt-BR", nativeName: "Portugues Brasil", enabled: false },
];

export const fallbackChains: Record<Locale, Locale[]> = {
  "es-CL": ["es-CL", "es", "en"],
  es: ["es", "es-CL", "en"],
  en: ["en", "es-CL", "es"],
  "pt-BR": ["pt-BR", "es-CL", "es", "en"],
};

export const dictionaries: Record<Locale, TranslationDictionary> = {
  "es-CL": { ...esClCommon, ...esClUi, ...esClCards, ...esClStory, ...esClEffects },
  es: { ...esCommon, ...esClUi, ...esClCards, ...esClStory, ...esClEffects },
  en: { ...enCommon, ...enUi, ...enCards, ...enStory, ...enEffects },
  "pt-BR": { ...ptBrCommon },
};
