export type LoadingQuote = {
  id: string;
  text: string;
  mood: "judgment" | "stress" | "catarsis" | "burnout" | "absurd";
};

export const loadingQuotes: LoadingQuote[] = [
  { id: "errores", text: "El Tribunal esta organizando tus errores...", mood: "judgment" },
  { id: "cadenas", text: "Las cadenas requieren mantenimiento.", mood: "judgment" },
  { id: "estres", text: "El estres esta calentando motores.", mood: "stress" },
  { id: "objeciones", text: "Revisando objeciones pendientes...", mood: "judgment" },
  { id: "ansiedad", text: "La ansiedad encontro estacionamiento.", mood: "absurd" },
  { id: "mazo", text: "Tu mazo esta discutiendo consigo mismo.", mood: "absurd" },
  { id: "burnout", text: "El burnout pidio otra expansion.", mood: "burnout" },
];
