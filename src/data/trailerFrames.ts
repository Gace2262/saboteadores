export type TrailerFrame = {
  id: string;
  order: number;
  title: string;
  description: string;
  transition: "humo" | "glitch" | "sello" | "grieta" | "coro";
  caption: string;
};

export const trailerFrames: TrailerFrame[] = [
  { id: "martillo", order: 1, title: "Martillo cayendo", description: "El cielo mental se oscurece y el sello judicial vibra.", transition: "sello", caption: "Cada pensamiento deja huella." },
  { id: "carta", order: 2, title: "Carta despertando", description: "Una carta legendaria gira en 3D con grietas doradas.", transition: "grieta", caption: "Cada mecanismo exige obediencia." },
  { id: "catarsis", order: 3, title: "Catarsis explotando", description: "Cadenas se rompen en una explosion blanca.", transition: "coro", caption: "La claridad resiste." },
  { id: "caballos", order: 4, title: "Caballos espectrales", description: "Sombras cruzan el tablero como una agenda poseida.", transition: "humo", caption: "El estres encontro armadura." },
  { id: "tribunal", order: 5, title: "Tribunal fracturandose", description: "Columnas, UI y cartas tiemblan al mismo compas.", transition: "grieta", caption: "Cada juicio tiene un precio." },
  { id: "boss", order: 6, title: "Boss gigante apareciendo", description: "El Juez Supremo invade el fondo del combate.", transition: "glitch", caption: "El Tribunal despierta." },
  { id: "cartas", order: 7, title: "Cartas hablando", description: "Ecos mentales aparecen sobre cartas evolucionadas.", transition: "humo", caption: "Las cartas recuerdan." },
  { id: "blanco", order: 8, title: "Pantalla blanca final", description: "El ruido cae y solo queda respiracion.", transition: "coro", caption: "No era absolucion. Era libertad." },
  { id: "logo", order: 9, title: "Logo apareciendo lentamente", description: "Ojo dorado, cadenas y sello roto cierran el trailer.", transition: "sello", caption: "Saboteadores Mentales: Habitantes Invisibles." },
];
