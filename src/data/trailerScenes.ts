export type TrailerScene = {
  id: string;
  title: string;
  text: string;
  visual: string;
  duration: number;
  intensity: number;
};

export const trailerScenes: TrailerScene[] = [
  { id: "martillazo", title: "Martillazo gigante", text: "Cada pensamiento deja huella.", visual: "martillo celestial golpeando sello dorado", duration: 4, intensity: 92 },
  { id: "maldita", title: "Carta maldita despertando", text: "Cada mecanismo exige obediencia.", visual: "carta roja con estatico y cadenas negras", duration: 4, intensity: 88 },
  { id: "estampida", title: "Estampida de caballos", text: "Cada juicio tiene un precio.", visual: "sombras de caballos cruzan tablero en polvo oscuro", duration: 3, intensity: 84 },
  { id: "juez", title: "El Juez aparece", text: "El Tribunal despierta.", visual: "ojo dorado, martillo suspendido, documentos rotos", duration: 5, intensity: 98 },
  { id: "cartas-hablan", title: "Cartas hablando", text: "El mazo recuerda tus habitos.", visual: "cartas flotantes discuten en el aire", duration: 3, intensity: 70 },
  { id: "catarsis", title: "Catarsis explotando", text: "La claridad rompe el vidrio.", visual: "luz blanca y dorada rompe cadenas", duration: 4, intensity: 86 },
  { id: "colapso", title: "Tribunal colapsando", text: "No luchas contra monstruos.", visual: "escenario fracturado, UI invadida por grietas", duration: 4, intensity: 95 },
  { id: "logo", title: "Logo final", text: "Saboteadores Mentales: Habitantes Invisibles", visual: "logo oro roto sobre humo negro", duration: 5, intensity: 76 },
];
