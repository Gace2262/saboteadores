"use client";

import { motion } from "framer-motion";

type Variant = "tribunal" | "catedral" | "battle";

type Props = {
  variant?: Variant;
  reducedMotion?: boolean;
};

const variantClass: Record<Variant, string> = {
  tribunal:
    "bg-[radial-gradient(circle_at_50%_18%,rgba(242,211,123,0.22),transparent_13%),radial-gradient(circle_at_16%_72%,rgba(124,58,237,0.18),transparent_24%),linear-gradient(135deg,#050308,#120713_55%,#030104)]",
  catedral:
    "bg-[linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px),radial-gradient(circle_at_50%_16%,rgba(242,211,123,0.19),transparent_19%),linear-gradient(135deg,#11100d,#050308)] bg-[length:46px_46px,auto,auto]",
  battle:
    "bg-[radial-gradient(circle_at_50%_44%,rgba(242,211,123,0.12),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(185,28,28,0.18),transparent_22%),linear-gradient(135deg,#050308,#0f0710_52%,#020102)]",
};

export function AnimatedBackground({ variant = "tribunal", reducedMotion }: Props) {
  const animate = reducedMotion ? {} : { opacity: [0.32, 0.62, 0.32], y: [0, -12, 0] };

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${variantClass[variant]}`} aria-hidden="true">
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(115deg,transparent_0_46%,rgba(242,211,123,0.16)_47%,transparent_48%_100%),linear-gradient(66deg,transparent_0_54%,rgba(255,255,255,0.08)_55%,transparent_56%_100%)]" />
      <motion.div
        className="absolute left-1/2 top-8 h-44 w-44 -translate-x-1/2 rounded-full border border-amber-100/25 shadow-[0_0_80px_rgba(242,211,123,0.18)]"
        animate={animate}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-20 top-24 h-24 w-[120vw] rotate-[-8deg] border-y border-amber-100/10 bg-[repeating-linear-gradient(90deg,rgba(242,211,123,0.18)_0_14px,transparent_14px_42px)] opacity-35"
        animate={reducedMotion ? {} : { x: [-18, 18, -18] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 bottom-28 h-20 w-[110vw] rotate-[10deg] border-y border-white/8 bg-[repeating-linear-gradient(90deg,rgba(148,163,184,0.12)_0_16px,transparent_16px_46px)] opacity-35"
        animate={reducedMotion ? {} : { x: [16, -16, 16] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0_36%,rgba(0,0,0,0.62)_78%)]" />
    </div>
  );
}
