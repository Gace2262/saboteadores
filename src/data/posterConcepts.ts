export type PosterConcept = {
  id: string;
  title: string;
  subtitle: string;
  visual: string;
  palette: string;
  symbol: string;
};

export const posterConcepts: PosterConcept[] = [
  {
    id: "tribunal-observa",
    title: "El Tribunal Observa",
    subtitle: "Ojo gigante, martillo suspendido y silencio con antecedentes.",
    visual: "Un ojo judicial dorado abre el cielo mental sobre columnas fracturadas.",
    palette: "from-amber-200 via-yellow-700 to-black",
    symbol: "OJO",
  },
  {
    id: "caballeria-burnout",
    title: "Caballeria del Burnout",
    subtitle: "Caballos espectrales atravesando una oficina incendiada.",
    visual: "Papeles vuelan como ceniza mientras cascos rojos rompen escritorios.",
    palette: "from-red-400 via-orange-900 to-black",
    symbol: "CASCO",
  },
  {
    id: "rebelion-catarsis",
    title: "La Rebelion de Catarsis",
    subtitle: "Cadenas explotando en luz blanca.",
    visual: "Una carta luminosa rompe sellos judiciales desde el centro del poster.",
    palette: "from-white via-amber-200 to-cyan-950",
    symbol: "LUZ",
  },
  {
    id: "catedral-casi",
    title: "Catedral del Casi",
    subtitle: "La perfeccion se fractura con simetria sospechosa.",
    visual: "Una torre impecable se abre como vidrio bajo un reloj imposible.",
    palette: "from-zinc-100 via-amber-600 to-stone-950",
    symbol: "CASI",
  },
  {
    id: "archivo-estres",
    title: "El Archivo del Estres",
    subtitle: "Montanas de expedientes y humo rojo.",
    visual: "Archivadores infinitos respiran mientras una alarma pinta el techo.",
    palette: "from-rose-500 via-red-950 to-black",
    symbol: "EXP",
  },
  {
    id: "silencio-responde",
    title: "El Silencio Responde",
    subtitle: "Vacio azul oscuro con una figura minima.",
    visual: "Una silueta diminuta mira una puerta sellada por niebla.",
    palette: "from-blue-300 via-slate-900 to-black",
    symbol: "SIL",
  },
];
