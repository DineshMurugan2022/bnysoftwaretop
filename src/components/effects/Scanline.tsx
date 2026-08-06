"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

export function Scanline() {
  const reduce = useReducedMotion();
  const isMounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isMounted) return null;

  if (reduce) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 mix-blend-screen">
      <motion.div
        initial={{ y: "-10%" }}
        animate={{ y: "110%" }}
        transition={{
          duration: 3.5,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 5,
        }}
        className="w-full h-[2px] bg-brand-accent/50 shadow-[0_0_15px_2px_rgba(163,230,53,0.4)]"
      />
    </div>
  );
}
