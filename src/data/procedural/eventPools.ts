import type { ProceduralEvent } from "@/logic/procedural/proceduralTypes";

export const proceduralEvents: ProceduralEvent[] = [
  {
    id: "ascensor-subconsciente",
    title: "Ascensor al Subconsciente",
    category: "memoria",
    text: "El ascensor no tiene botones. Solo una nota: sube quien finge estar listo.",
    options: [
      { id: "a", label: "Subir sin mirar botones", result: "Recompensa rara, +2 Estres." },
      { id: "b", label: "Bajar al archivo", result: "Desbloquea lore de la run." },
      { id: "c", label: "Salir por mantenimiento", result: "Curacion pequeña." },
    ],
  },
  {
    id: "cafe-burnout",
    title: "Maquina de Cafe del Burnout",
    category: "burnout",
    text: "La maquina tiembla. No por falla tecnica: por ambicion.",
    options: [
      { id: "a", label: "Tomar cafe doble", result: "+2 Claridad proximo combate, +2 Estres." },
      { id: "b", label: "Desenchufarla", result: "Elimina una carta Pendiente toxico." },
      { id: "c", label: "Hablarle", result: "Evento secreto posible." },
    ],
  },
  {
    id: "objetos-perdidos",
    title: "Oficina de Objetos Perdidos",
    category: "recompensa peligrosa",
    text: "Una ventanilla guarda todo lo que perdiste: llaves, cartas y convicciones temporales.",
    options: [
      { id: "a", label: "Recuperar una carta olvidada", result: "Ganas carta comun o rara." },
      { id: "b", label: "Dejar una carta", result: "Quita una carta del mazo." },
      { id: "c", label: "Robar una reliquia sospechosa", result: "Reliquia rara y anomalia futura." },
    ],
  },
  {
    id: "espejo-sindicalizado",
    title: "El Espejo Sindicalizado",
    category: "espejo",
    text: "El reflejo pide condiciones laborales antes de darte feedback.",
    options: [
      { id: "a", label: "Negociar con el reflejo", result: "Reduce Estres y pierde Fragmentos." },
      { id: "b", label: "Romperlo", result: "Ganas recompensa, sube corrupcion." },
      { id: "c", label: "Pedirle feedback", result: "Revela nodo secreto." },
    ],
  },
  {
    id: "sala-silencio",
    title: "Sala donde nadie opina",
    category: "catarsis",
    text: "El silencio es tan raro que parece contenido premium. Pero no lo es. Tranquilo.",
    options: [
      { id: "a", label: "Descansar", result: "Recuperas Voluntad." },
      { id: "b", label: "Escuchar silencio", result: "Limpias Ruido Mental." },
      { id: "c", label: "Sospechar del silencio", result: "Encuentro secreto posible." },
    ],
  },
];
