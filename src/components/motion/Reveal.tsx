"use client";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "h2" | "h3" | "li" | "h1" | "p";
  intensity?: "bold" | "subtle";
};

export function Reveal({ children, className, delay = 0, y, as = "div", intensity = "subtle" }: RevealProps) {
  const reduce = useReducedMotion();
  const distance = y ?? (intensity === "bold" ? 32 : 14);
  const duration = intensity === "bold" ? 0.7 : 0.4;
  const Component = motion[as as keyof typeof motion] as React.ElementType;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}

export function RevealGroup({ children, className, stagger = 0.08 }: { children: React.ReactNode; className?: string; stagger?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}
