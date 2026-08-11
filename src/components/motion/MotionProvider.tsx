"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

export type ReducedMotionPolicy = "user" | "always" | "never";

export interface MotionProviderProps {
  children: ReactNode;
  reducedMotion?: ReducedMotionPolicy;
}

/**
 * Applies one motion-accessibility policy to every Motion component below it.
 * The default follows the visitor's operating-system preference.
 */
export function MotionProvider({
  children,
  reducedMotion = "user",
}: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion={reducedMotion}>{children}</MotionConfig>
  );
}

