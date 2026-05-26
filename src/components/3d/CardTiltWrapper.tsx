"use client";

import { type ReactNode, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useVisualStore } from "@/store/visualStore";

export function CardTiltWrapper({
  children,
  disabled,
  selected,
}: {
  children: ReactNode;
  disabled?: boolean;
  selected?: boolean;
}) {
  const animationMode = useVisualStore((state) => state.animationMode);
  const lowPerformance = useVisualStore((state) => state.lowPerformance);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [9, -9]), { stiffness: 220, damping: 24 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 220, damping: 24 });

  const active3d = !disabled && !lowPerformance && animationMode === "full";

  return (
    <motion.div
      style={{ perspective: 950 }}
      onMouseMove={(event) => {
        if (!active3d) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width);
        y.set((event.clientY - rect.top) / rect.height);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        x.set(0.5);
        y.set(0.5);
      }}
      animate={{ scale: hovered && !disabled ? 1.035 : selected ? 1.015 : 1 }}
      className="relative h-full w-full"
    >
      <motion.div
        style={active3d ? { rotateX, rotateY, transformStyle: "preserve-3d" } : { transformStyle: "preserve-3d" }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
