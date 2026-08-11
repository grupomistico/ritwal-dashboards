"use client";

import { useMemo, type ReactNode } from "react";
import type { LenisOptions } from "lenis";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

export interface SmoothScrollProviderProps {
  children: ReactNode;
  /** Keep false on operational/table-heavy routes. */
  enabled?: boolean;
  options?: LenisOptions;
}

function belongsToNativeScrollRegion(node: HTMLElement) {
  return Boolean(node.closest("[data-lenis-prevent]"));
}

/**
 * Opt-in Lenis provider for long-form executive views. Reduced-motion users
 * receive native browser scrolling, and nested operational regions can opt out
 * with `data-lenis-prevent`.
 */
export function SmoothScrollProvider({
  children,
  enabled = false,
  options,
}: SmoothScrollProviderProps) {
  const shouldReduceMotion = useReducedMotion();

  const resolvedOptions = useMemo<LenisOptions>(() => {
    const customPrevent = options?.prevent;

    return {
      autoRaf: true,
      anchors: true,
      duration: 1.05,
      lerp: 0.1,
      overscroll: true,
      respectReducedMotion: true,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
      syncTouch: false,
      ...options,
      prevent: (node) =>
        belongsToNativeScrollRegion(node) || Boolean(customPrevent?.(node)),
    };
  }, [options]);

  if (!enabled || shouldReduceMotion) return children;

  return (
    <ReactLenis root options={resolvedOptions}>
      {children}
    </ReactLenis>
  );
}

