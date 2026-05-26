export type EventOption = {
  id: "a" | "b" | "c";
  label: string;
  result: string;
};

export type MentalEvent = {
  id: string;
  title: string;
  room: string;
  text: string;
  options: EventOption[];
};

export const mentalEvents: MentalEvent[] = [
  {
    id: "espejo-incomodo",
    title: "Espejo incomodo",
    room: "Vestidor de la verdad mal iluminada",
    text: "El reflejo te mira como si hubiera leido tus borradores emocionales.",
    options: [
      { id: "a", label: "Mirar de frente", result: "Ganas carta de Conciencia, pero empiezas proximo combate con +1 Estres." },
      { id: "b", label: "Hacerle un chiste al reflejo", result: "Ganas carta Ironia y reduces Ruido Mental." },
      { id: "c", label: "Taparlo con una toalla emocional", result: "Evitas penalizacion, pero agregas Pendiente toxico al mazo." },
    ],
  },
  {
    id: "cafe-ansiedad",
    title: "Cafe con la ansiedad",
    room: "Cafeteria de los latidos caros",
    text: "La ansiedad pidio doble espresso y te explico que dormir era propaganda.",
    options: [
      { id: "a", label: "Aceptar cafe", result: "Gana 2 Claridad inicial en el proximo combate y 1 Estres." },
      { id: "b", label: "Pedir agua", result: "Recupera 3 Voluntad." },
    ],
  },
  {
    id: "pasillo-pendientes",
    title: "El pasillo de las cosas pendientes",
    room: "Corredor con puertas que suspiran",
    text: "Cada puerta tiene una tarea. Una de ellas dice 'respirar', pero tambien esta atrasada.",
    options: [
      { id: "a", label: "Abrir otra puerta", result: "Agrega Pendiente toxico al mazo." },
      { id: "b", label: "Cerrar una puerta", result: "Elimina una carta comun." },
    ],
  },
  {
    id: "terapia-relampago",
    title: "Terapia relampago",
    room: "Consultorio de cinco minutos eternos",
    text: "Una silla te pregunta como estas. Cometes el error tactico de responder.",
    options: [
      { id: "a", label: "Respirar de verdad", result: "Elimina 2 Estres." },
      { id: "b", label: "Nombrar el patron", result: "Mejora una carta." },
    ],
  },
  {
    id: "funeral-expectativas",
    title: "Funeral de expectativas",
    room: "Capilla del deber imaginario",
    text: "Alguien llora por una version de ti que nunca firmo consentimiento.",
    options: [
      { id: "a", label: "Dejar una carta en el ataud", result: "Sacrifica una carta y gana una rara." },
      { id: "b", label: "Comer pan de molde ceremonial", result: "Recupera Voluntad completa, pero gana Ruido Mental." },
    ],
  },
];

export const getEvent = (id?: string) => mentalEvents.find((event) => event.id === id);
