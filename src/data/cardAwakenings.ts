export type AwakeningState = "dormida" | "inquieta" | "despierta" | "legendaria";

export type CardAwakening = {
  cardId: string;
  awakenedName: string;
  condition: string;
  impactText: string;
  visual: string;
  newEffect: string;
};

export const cardAwakenings: CardAwakening[] = [
  {
    cardId: "grito-catarsis",
    awakenedName: "Opera de Catarsis Absoluta",
    condition: "Activar Catarsis muchas veces y vencer a El Juez.",
    impactText: "El tribunal perdio el control del escenario.",
    visual: "cadenas explotando, coro completo y particulas blancas",
    newEffect: "Convierte TODO Estres en dano, limpia Ruido Mental y otorga Claridad maxima.",
  },
  {
    cardId: "casco-autoestima",
    awakenedName: "Corona de Autoestima Improbable",
    condition: "Sobrevivir con poca Voluntad y limpiar Ruido Mental.",
    impactText: "La dignidad entro con casco y no pidio permiso.",
    visual: "halo dorado, vidrio roto y luz respirando",
    newEffect: "Inmunidad parcial a Sentencia y Claridad extra.",
  },
  {
    cardId: "ultima-objecion",
    awakenedName: "La Ultima Objecion",
    condition: "Derrotar a El Juez con Catarsis.",
    impactText: "Objecion aceptada. La voz vuelve al cuerpo.",
    visual: "martillo detenido, sello blanco y cadenas cayendo",
    newEffect: "Cancela Martillazo Aleatorio, gana Claridad y limpia corrupcion.",
  },
  {
    cardId: "martillo-medianoche",
    awakenedName: "El Juez Interior",
    condition: "Usar demasiadas Sentencias.",
    impactText: "El martillo ya no cae. Te recuerda.",
    visual: "martillo agrietado, cadenas negras y organo distorsionado",
    newEffect: "Sentencias mas fuertes, corrupcion mas rapida.",
  },
];

export const getAwakening = (cardId: string) => cardAwakenings.find((awakening) => awakening.cardId === cardId);
