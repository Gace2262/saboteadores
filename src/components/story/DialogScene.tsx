"use client";

import { motion } from "framer-motion";
import type { DialogueSceneData } from "@/data/story/dialogues";
import { DialogueBox } from "./DialogueBox";

export function DialogScene({ scene }: { scene: DialogueSceneData }) {
  return (
    <section className="rounded-lg border border-amber-100/18 bg-black/62 p-5">
      <p className="text-sm font-black uppercase text-amber-100/65">Dialogo</p>
      <h2 className="mt-1 text-3xl font-black">{scene.title}</h2>
      <div className="mt-4 grid gap-3">
        {scene.lines.map((line, index) => (
          <motion.div key={`${line.speaker}-${index}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
            <DialogueBox line={line} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
