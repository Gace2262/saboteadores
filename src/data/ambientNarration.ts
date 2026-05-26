import type { MentalWeather } from "./tribunalAnomalies";

export type NarrationTone = "contextual" | "humor-negro" | "psicologico" | "ceremonial" | "absurdo";

export type AmbientNarration = {
  id: string;
  tone: NarrationTone;
  weather: MentalWeather;
  text: string;
  conditionHint: string;
};

export const ambientNarrations: AmbientNarration[] = [
  { id: "estres-estacionamiento", tone: "absurdo", weather: "ansiedad", text: "El estres encontro estacionamiento.", conditionHint: "Estres alto o uso repetido de Crisis." },
  { id: "archivo-crisis", tone: "humor-negro", weather: "juicio", text: "El tribunal archivo otra crisis con eficiencia cuestionable.", conditionHint: "Derrotas o eventos de Juez." },
  { id: "claridad-sindicato", tone: "absurdo", weather: "catarsis", text: "La claridad esta intentando sindicalizarse.", conditionHint: "Uso frecuente de Catarsis o Conciencia." },
  { id: "burnout-capa", tone: "humor-negro", weather: "corrupcion", text: "El burnout ya trae capa.", conditionHint: "Corrupcion promedio alta." },
  { id: "silencio-ejecutivo", tone: "ceremonial", weather: "calma", text: "El silencio acaba de tomar decisiones ejecutivas.", conditionHint: "Baja actividad o modo estable." },
  { id: "ansiedad-decorada", tone: "psicologico", weather: "ansiedad", text: "La ansiedad ya decoro el lugar.", conditionHint: "Historial alto de Estres." },
  { id: "ausencias-evitador", tone: "psicologico", weather: "agotamiento", text: "El tribunal noto tus ausencias.", conditionHint: "Uso alto de Evitador." },
  { id: "apelacion-rechazada", tone: "ceremonial", weather: "juicio", text: "La apelacion fue rechazada otra vez.", conditionHint: "Derrotas repetidas contra El Juez." },
];

export const getNarrationsForWeather = (weather: MentalWeather) => ambientNarrations.filter((line) => line.weather === weather);
