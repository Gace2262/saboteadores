"use client";

import { motion } from "framer-motion";
import { getAvatar } from "@/data/avatars";
import { getProfileBorder } from "@/data/profileBorders";
import { useProfileStore } from "@/store/profileStore";
import { PlayerAura } from "./PlayerAura";

export function AnimatedAvatar({ size = "large" }: { size?: "large" | "small" }) {
  const { avatarId, borderId } = useProfileStore();
  const avatar = getAvatar(avatarId);
  const border = getProfileBorder(borderId);
  const dimension = size === "large" ? "size-44 text-7xl" : "size-24 text-4xl";
  return (
    <PlayerAura>
      <motion.div
        className={`${dimension} relative grid place-items-center overflow-hidden rounded-full border-4 bg-gradient-to-br ${avatar.palette} ${border.className}`}
        animate={{ y: [0, -6, 0], rotate: [0, 1, -1, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.35),transparent_18%),radial-gradient(circle_at_70%_72%,rgba(0,0,0,0.45),transparent_28%)]" />
        <motion.span className="relative font-black text-black/70 mix-blend-screen" animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.8, repeat: Infinity }}>
          {avatar.sigil}
        </motion.span>
        <div className="absolute bottom-4 h-1 w-16 rounded-full bg-white/45 blur-sm" />
      </motion.div>
    </PlayerAura>
  );
}
