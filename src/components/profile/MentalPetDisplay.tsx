"use client";

import { motion } from "framer-motion";
import { getMentalPet } from "@/data/mentalPets";
import { useProfileStore } from "@/store/profileStore";

export function MentalPetDisplay() {
  const pet = getMentalPet(useProfileStore((state) => state.petId));
  return (
    <section className="rounded-lg border border-white/12 bg-black/48 p-5">
      <p className="text-sm font-black uppercase text-white/45">Mascota mental equipada</p>
      <div className="mt-4 flex items-center gap-4">
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, -4, 4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className={`grid size-20 place-items-center rounded-full border border-white/14 bg-white/8 text-2xl font-black ${pet.color}`}
        >
          {pet.sigil}
        </motion.div>
        <div>
          <h2 className="text-2xl font-black">{pet.name}</h2>
          <p className="mt-1 text-sm text-white/60">{pet.behavior}</p>
          <p className="mt-2 text-sm italic text-amber-100/70">{pet.reaction}</p>
        </div>
      </div>
    </section>
  );
}
