import { demoCoreCards } from "./cards";
import type { DemoDeckId } from "@/types/game";

export type RealDemoDeck = {
  id: DemoDeckId;
  name: string;
  description: string;
  cardIds: string[];
};

export const realDemoDecks: RealDemoDeck[] = [
  {
    id: "oficina-control",
    name: "Oficina del Control",
    description: "Bloqueo, precision y castigo. Ideal si tu paz interior necesita planilla.",
    cardIds: ["orden-absoluto", "plan-b-plan-c", "cadena-procedimental", "auditoria-menor", "casi-perfecto", "correccion-pulcra", "margen-impecable", "sentencia-de-escritorio"],
  },
  {
    id: "circo-pendientes",
    name: "Circo de Pendientes",
    description: "Velocidad, robo y caos. El mazo corre incluso cuando nadie lo persigue.",
    cardIds: ["caballos-de-agenda", "cafe-sin-frenos", "siguiente-crisis", "estampida-de-pendientes", "alarma-para-alarma", "radar-nervioso", "contraataque-preventivo", "sirena-interior"],
  },
  {
    id: "manual-no-me-pasa",
    name: "Manual del No Me Pasa Nada",
    description: "Defensa, evasion y catarsis. Todo esta bien, salvo el tablero.",
    cardIds: ["capa-de-nada", "silencio-cargado", "boveda-emocional", "manana-flexible", "minimizar-ventana", "accion-directa", "respirar-con-estilo", "objecion-sensata"],
  },
];

export const getRealDemoDeck = (id: DemoDeckId) => realDemoDecks.find((deck) => deck.id === id) ?? realDemoDecks[0];
export const getRealDemoDeckCards = (id: DemoDeckId) => getRealDemoDeck(id).cardIds.map((cardId) => demoCoreCards.find((card) => card.id === cardId)).filter(Boolean);
