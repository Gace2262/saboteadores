export type LoreEntry = {
  id: string;
  title: string;
  excerpt: string;
  text: string;
};

export const loreEntries: LoreEntry[] = [
  {
    id: "origen-saboteadores",
    title: "Origen de los Saboteadores",
    excerpt: "Nacieron como protectores. Ese fue el primer problema.",
    text: "Los Saboteadores no llegaron como invasores. Nacieron cuando la mente necesitaba sobrevivir al miedo, al rechazo, al error, al abandono, al caos y a la verguenza. Fueron armaduras utiles. Luego pidieron trono, sello y presupuesto.",
  },
  {
    id: "nacimiento-juez",
    title: "El nacimiento del Juez",
    excerpt: "Alguien tenia que organizar la culpa. Lo hizo demasiado bien.",
    text: "El Juez aparecio cuando todos los mecanismos necesitaron una voz comun. Tomo notas de cada error, las ordeno por dolor y llamo a eso identidad. Desde entonces confunde proteccion con condena preventiva.",
  },
  {
    id: "infancia-fortaleza",
    title: "La infancia como fortaleza",
    excerpt: "Las murallas funcionaron. Luego se negaron a abrir la puerta.",
    text: "Durante la infancia, una defensa puede parecer salvacion. Controlar, complacer, ocultarse o correr pueden mantenerte a salvo. La mente premia lo que funciona una vez. Si nadie revisa el mecanismo, la fortaleza se convierte en ciudadela ocupada.",
  },
  {
    id: "guardian-carcelero",
    title: "Cuando el guardian se vuelve carcelero",
    excerpt: "Funciono. Ese fue el problema.",
    text: "Al principio, cada Saboteador fue una armadura. El Controlador ordeno el caos. El Complaciente compro afecto. El Evitador apago incendios cerrando puertas. Funciono. Ese fue el problema. La mente premio el mecanismo hasta convertirlo en ley.",
  },
  {
    id: "cadenas-culpa",
    title: "Las cadenas de la culpa",
    excerpt: "No pesan por metal. Pesan por contrato.",
    text: "La culpa no siempre grita. A veces llega con voz amable, una factura doblada y la frase 'despues de todo lo que hice'. Sus cadenas no atan las manos: atan el permiso interno para elegir.",
  },
  {
    id: "ruido-mental",
    title: "El ruido mental",
    excerpt: "Pensamientos haciendo mudanza a las tres de la manana.",
    text: "El Ruido Mental es el eco de sistemas defensivos hablando todos a la vez. Uno pide huir. Otro pide revisar. Otro pide agradar. Otro pide no sentir. Ninguno escucha. Por eso suena a reunion con ansiedad y catering.",
  },
  {
    id: "claridad",
    title: "La Claridad",
    excerpt: "No es calma perfecta. Es ver donde esta la puerta.",
    text: "La Claridad no elimina el miedo, pero le quita el microfono principal. Es la luz suficiente para notar que un pensamiento automatico no es una orden divina, aunque venga con martillo y tipografia gotica.",
  },
  {
    id: "catarsis",
    title: "La Catarsis",
    excerpt: "Cuando la jaula aprende a cantar.",
    text: "La Catarsis no es explotar por deporte. Es convertir energia atrapada en movimiento consciente. A veces parece llanto. A veces parece risa absurda. A veces parece un coro power metal expulsando cadenas por la ventana.",
  },
  {
    id: "voluntad",
    title: "La Voluntad",
    excerpt: "No es dureza. Es volver sin insultarte por caer.",
    text: "La Voluntad del juego no mide perfeccion. Mide la capacidad de regresar al centro despues del golpe. El Juez odia eso, porque no puede condenar facilmente a alguien que aprende a levantarse sin pedirle permiso.",
  },
  {
    id: "tribunal-craneo",
    title: "El Tribunal del Craneo",
    excerpt: "El lugar donde toda duda aprendio procedimiento.",
    text: "El Tribunal del Craneo es la sala donde el Juez convierte pensamientos en pruebas. Tiene vitrales rotos, cadenas administrativas y una acustica perfecta para exagerar errores. No se destruye. Se deja de asistir.",
  },
];

export const getLoreEntry = (id?: string) => loreEntries.find((entry) => entry.id === id);
