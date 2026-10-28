"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Play on load. Use for the hero, which is already in view. */
  immediate?: boolean;
};

export function Reveal({ children, className, delay = 0, immediate = false }: Props) {
  const reduced = useReducedMotion();
  const skip = reduced === true;
  const hidden = { opacity: 0, y: 12 };
  const shown = { opacity: 1, y: 0 };
  const transition = { duration: 0.45, delay, ease: "easeOut" as const };

  if (immediate) {
    return (
      <m.div
        className={cn("reveal", className)}
        initial={skip ? false : hidden}
        animate={skip ? undefined : shown}
        transition={transition}
      >
        {children}
      </m.div>
    );
  }

  return (
    <m.div
      className={cn("reveal", className)}
      initial={skip ? false : hidden}
      whileInView={skip ? undefined : shown}
      viewport={{ once: true, amount: 0.25 }}
      transition={transition}
    >
      {children}
    </m.div>
  );
}
