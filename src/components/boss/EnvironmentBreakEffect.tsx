"use client";

import { motion } from "framer-motion";
import type { EnvironmentState } from "@/logic/boss/environmentController";

type EnvironmentBreakEffectProps = {
  environment: EnvironmentState;
  reduceFlashes?: boolean;
  reduceShake?: boolean;
};

export function EnvironmentBreakEffect({ environment, reduceFlashes, reduceShake }: EnvironmentBreakEffectProps) {
  const shake = reduceShake ? 0 : environment.uiCollapse * 8;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: [-shake, shake, 0], y: [0, shake * 0.35, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(circle at 50% 35%, rgba(242,211,123,${environment.cracks * 0.24}), transparent 30%), radial-gradient(circle at 18% 78%, rgba(220,38,38,${environment.fire * 0.32}), transparent 28%)`,
          }}
        />
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: environment.cracks,
            backgroundImage:
              "linear-gradient(118deg, transparent 0 42%, rgba(255,255,255,.32) 42.3%, transparent 43%), linear-gradient(72deg, transparent 0 55%, rgba(242,211,123,.26) 55.4%, transparent 56%), linear-gradient(156deg, transparent 0 64%, rgba(255,255,255,.18) 64.2%, transparent 65%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 flex justify-around opacity-50">
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.span
              key={index}
              animate={{ y: [-(index * 18), 900], rotate: [0, 12, -8] }}
              transition={{ duration: 7 + index, repeat: Infinity, delay: index * 0.25 }}
              className="h-28 w-1 rounded-full bg-gradient-to-b from-amber-100/0 via-amber-100/50 to-amber-100/0"
              style={{ opacity: environment.chains }}
            />
          ))}
        </div>
        {reduceFlashes ? null : (
          <motion.div
            animate={{ opacity: [0, environment.distortion * 0.22, 0] }}
            transition={{ duration: 2.6, repeat: Infinity }}
            className="absolute inset-0 bg-white"
          />
        )}
      </motion.div>
    </div>
  );
}
