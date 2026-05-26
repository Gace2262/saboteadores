export type ChaosRule = {
  id: string;
  name: string;
  effect: string;
  turnCadence: number;
  flavorText: string;
};

export const chaosRules: ChaosRule[] = [
  { id: "todos-hablan", name: "Todos hablan al mismo tiempo", effect: "Las cartas cuestan aleatoriamente mas o menos.", turnCadence: 3, flavorText: "La reunion pudo ser un silencio." },
  { id: "lluvia-intrusivos", name: "Lluvia de pensamientos intrusivos", effect: "Ambos jugadores reciben cartas negativas.", turnCadence: 3, flavorText: "No era una nube. Era tu bandeja de entrada." },
  { id: "terapia-intensiva", name: "Modo terapia intensiva", effect: "Todas las cartas de Catarsis cuestan 0 este turno.", turnCadence: 3, flavorText: "La sanidad entro derrapando." },
  { id: "martillo-hiperactivo", name: "Martillo hiperactivo", effect: "Cada turno ocurre mini martillazo.", turnCadence: 3, flavorText: "Alguien le dio cafe al juez." },
  { id: "sarcasmo-autonomo", name: "El sarcasmo gano autonomia", effect: "Las cartas Ironia activan doble efecto.", turnCadence: 3, flavorText: "El chiste presento declaracion jurada." },
  { id: "silencio-administrativo", name: "Silencio administrativo", effect: "Nadie puede jugar Crisis este turno.", turnCadence: 3, flavorText: "Por fin una prohibicion util." },
];
