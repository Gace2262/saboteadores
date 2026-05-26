export type MentalPet = {
  id: string;
  name: string;
  unlockCondition: string;
  behavior: string;
  reaction: string;
  sigil: string;
  color: string;
};

export const mentalPets: MentalPet[] = [
  { id: "mini-juez", name: "Mini Juez", unlockCondition: "Derrota a El Juez.", behavior: "Pequeno martillo flotante que juzga silenciosamente.", reaction: "Golpea el aire cuando ganas.", sigil: "J", color: "text-amber-100" },
  { id: "caballo-pendientes", name: "Caballo de Pendientes", unlockCondition: "Activa Estampida 3 veces.", behavior: "Caballo espectral hiperactivo.", reaction: "Galopa cuando sube el Estres.", sigil: "C", color: "text-violet-100" },
  { id: "ansiedraton", name: "Ansiedraton", unlockCondition: "Sobrevive con 10 Estres.", behavior: "Raton nervioso lleno de cafe.", reaction: "Tiembla con cada notificacion.", sigil: "A", color: "text-rose-100" },
  { id: "glitchito", name: "Glitchito", unlockCondition: "Completa Caos Psicologico.", behavior: "Criatura corrupta digital.", reaction: "Parpadea cuando cambian reglas.", sigil: "G", color: "text-fuchsia-100" },
  { id: "cuervo-casi", name: "Cuervo del Casi", unlockCondition: "Vence al Perfeccionista.", behavior: "Aparece cuando fallas por poco.", reaction: "Dice casi con demasiada educacion.", sigil: "Q", color: "text-zinc-200" },
  { id: "terapion", name: "Terapion", unlockCondition: "Usa Catarsis 20 veces.", behavior: "Criatura brillante que rompe cadenas.", reaction: "Brilla cuando limpias Ruido Mental.", sigil: "T", color: "text-yellow-100" },
  { id: "ansiedraton-supremo", name: "Ansiedraton Supremo", unlockCondition: "Cosmetico desbloqueable.", behavior: "Cafe con patas y agenda propia.", reaction: "Celebra victorias revisando si olvidaste algo.", sigil: "AS", color: "text-orange-100" },
];

export const getMentalPet = (id?: string) => mentalPets.find((pet) => pet.id === id) ?? mentalPets[0];
