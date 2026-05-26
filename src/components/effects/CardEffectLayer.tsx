"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { VisualEffect } from "@/data/cards";
import { ImpactText } from "./ImpactText";
import { ScreenShake } from "./ScreenShake";

const guiltWords = ["debiste", "casi", "fallaste", "otra vez", "sonrie", "produce"];

export function CardEffectLayer({
  effect,
  impactText,
  reducedMotion,
}: {
  effect?: VisualEffect;
  impactText?: string;
  reducedMotion: boolean;
}) {
  const violent =
    effect === "hammer_slam" ||
    effect === "horse_stampede" ||
    effect === "panic_pulse" ||
    effect === "judgment_flash" ||
    effect === "cursed_static";

  return (
    <>
      <ScreenShake active={Boolean(violent && effect)} reducedMotion={reducedMotion} />
      <ImpactText text={impactText} reducedMotion={reducedMotion} />
      <AnimatePresence>
        {effect ? (
          <motion.div
            key={effect}
            className={`pointer-events-none fixed inset-0 z-30 overflow-hidden ${effect}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.22 }}
          >
            {effect === "hammer_slam" ? (
              <>
                <motion.div className="absolute inset-0 bg-amber-200/30" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.34 }} />
                <motion.div
                  className="absolute left-1/2 top-1/2 grid h-56 w-56 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-8 border-amber-200/80 text-7xl font-black text-amber-100"
                  initial={{ scale: 2.2, opacity: 0, rotate: -16 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                >
                  JUICIO
                </motion.div>
              </>
            ) : null}

            {effect === "chains" ? (
              <>
                <motion.div className="chain-stripe absolute left-[-10%] top-[28%] h-8 w-[120%] rotate-12" animate={{ x: ["-20%", "0%"] }} />
                <motion.div className="chain-stripe absolute left-[-10%] top-[60%] h-8 w-[120%] -rotate-12" animate={{ x: ["20%", "0%"] }} />
              </>
            ) : null}

            {effect === "horse_stampede" ? (
              <div className="absolute inset-0">
                {[0, 1, 2, 3, 4].map((item) => (
                  <motion.div
                    key={item}
                    className="absolute bottom-[18%] h-28 w-44 rounded-[50%] bg-black/70 blur-sm"
                    initial={{ x: "-30vw", opacity: 0 }}
                    animate={{ x: "120vw", opacity: [0, 0.9, 0] }}
                    transition={{ duration: reducedMotion ? 0.25 : 1, delay: item * 0.08 }}
                    style={{ bottom: `${14 + item * 10}%` }}
                  />
                ))}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-stone-950 via-stone-900/55 to-transparent" />
              </div>
            ) : null}

            {effect === "guilt_rain" ? (
              <div className="absolute inset-0 bg-blue-950/25">
                {Array.from({ length: 18 }).map((_, index) => (
                  <motion.span
                    key={index}
                    className="absolute text-sm font-black uppercase text-blue-100/55"
                    initial={{ y: -80, opacity: 0 }}
                    animate={{ y: "110vh", opacity: [0, 1, 0] }}
                    transition={{ duration: reducedMotion ? 0.3 : 1.4, delay: index * 0.04 }}
                    style={{ left: `${(index * 13) % 96}%` }}
                  >
                    {guiltWords[index % guiltWords.length]}
                  </motion.span>
                ))}
              </div>
            ) : null}

            {effect === "panic_pulse" ? (
              <div className="absolute inset-0 grid place-items-center bg-rose-950/20">
                {[0, 1, 2].map((item) => (
                  <motion.div
                    key={item}
                    className="absolute h-40 w-40 rounded-full border-4 border-fuchsia-300/45"
                    animate={{ scale: [0.8, 6], opacity: [0.9, 0] }}
                    transition={{ duration: reducedMotion ? 0.25 : 0.9, delay: item * 0.14 }}
                  />
                ))}
              </div>
            ) : null}

            {effect === "sarcasm_spark" ? (
              <div className="absolute inset-0 bg-lime-400/5">
                {["brillante", "claro", "genial", "perfecto"].map((word, index) => (
                  <motion.span
                    key={word}
                    className="absolute rounded bg-lime-300 px-3 py-1 text-sm font-black uppercase text-black"
                    initial={{ scale: 0, rotate: -12, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 1], rotate: 8, opacity: [0, 1, 0] }}
                    transition={{ duration: 0.7, delay: index * 0.08 }}
                    style={{ left: `${18 + index * 19}%`, top: `${28 + (index % 2) * 24}%` }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            ) : null}

            {effect === "void_laugh" ? (
              <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle,rgba(20,0,30,0.1),rgba(0,0,0,0.88))]"
                animate={reducedMotion ? {} : { filter: ["blur(0px)", "blur(5px)", "blur(0px)"], scale: [1, 1.03, 1] }}
              />
            ) : null}

            {effect === "liberation_burst" ? (
              <div className="absolute inset-0 grid place-items-center bg-amber-50/10">
                <motion.div
                  className="h-24 w-24 rounded-full bg-white shadow-[0_0_100px_rgba(255,255,255,0.95)]"
                  animate={{ scale: reducedMotion ? 5 : [0.4, 8], opacity: [1, 0] }}
                  transition={{ duration: reducedMotion ? 0.25 : 0.85 }}
                />
                <motion.div className="chain-stripe absolute top-1/2 h-8 w-full rotate-12" animate={{ opacity: [1, 0], scaleX: [1, 0.2] }} />
              </div>
            ) : null}

            {effect === "judgment_flash" ? (
              <div className="absolute inset-0 grid place-items-center bg-black/55">
                <motion.div className="absolute inset-0 bg-amber-300/35" animate={{ opacity: [0, 1, 0, 1, 0] }} transition={{ duration: reducedMotion ? 0.25 : 0.7 }} />
                <motion.div
                  className="grid h-72 w-72 place-items-center rounded-full border-[10px] border-amber-200 text-center text-6xl font-black text-amber-100 shadow-[0_0_90px_rgba(252,211,77,0.7)]"
                  animate={reducedMotion ? { scale: 1 } : { scale: [0.7, 1.15, 1], rotate: [-5, 5, 0] }}
                >
                  FALLO
                </motion.div>
              </div>
            ) : null}

            {effect === "cursed_static" ? (
              <div className="absolute inset-0 bg-black/80">
                {Array.from({ length: 16 }).map((_, index) => (
                  <motion.div
                    key={index}
                    className="absolute h-1 w-full bg-rose-300/35"
                    animate={reducedMotion ? { opacity: 0.4 } : { x: ["-20%", "20%", "-10%"], opacity: [0, 0.8, 0] }}
                    transition={{ duration: 0.28, repeat: reducedMotion ? 0 : 3, delay: index * 0.025 }}
                    style={{ top: `${index * 7}%` }}
                  />
                ))}
                <motion.p
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-5xl font-black uppercase text-rose-100"
                  animate={reducedMotion ? {} : { opacity: [0, 1, 0.4, 1], skewX: [0, 8, -8, 0] }}
                >
                  expediente corrupto
                </motion.p>
              </div>
            ) : null}

            {effect === "mental_spark" ? (
              <div className="absolute inset-0 bg-cyan-400/5">
                {Array.from({ length: 20 }).map((_, index) => (
                  <motion.span
                    key={index}
                    className="absolute h-2 w-2 rounded-full bg-cyan-100 shadow-[0_0_20px_rgba(125,211,252,0.9)]"
                    animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: reducedMotion ? 0.25 : 0.65, delay: index * 0.03 }}
                    style={{ left: `${(index * 23) % 100}%`, top: `${(index * 37) % 100}%` }}
                  />
                ))}
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
