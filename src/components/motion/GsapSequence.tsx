"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(useGSAP);

export interface GsapSequenceProps {
  children: ReactNode;
  className?: string;
  /** Elements carrying this selector are revealed in DOM order. */
  selector?: string;
  delay?: number;
  distance?: number;
  duration?: number;
  ease?: string;
  stagger?: number;
}

/**
 * A scoped, finite GSAP reveal. It never owns chart canvases or continuous
 * animation, and useGSAP automatically reverts every tween on unmount.
 */
export function GsapSequence({
  children,
  className,
  selector = "[data-gsap-reveal]",
  delay = 0,
  distance = 16,
  duration = 0.65,
  ease = "power3.out",
  stagger = 0.07,
}: GsapSequenceProps) {
  const container = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>(selector, container.current);

      if (targets.length === 0) return;

      if (shouldReduceMotion) {
        gsap.set(targets, {
          autoAlpha: 1,
          clearProps: "transform,visibility",
        });
        return;
      }

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: distance },
        {
          autoAlpha: 1,
          y: 0,
          delay,
          duration,
          ease,
          stagger,
          clearProps: "transform,visibility",
        },
      );
    },
    {
      scope: container,
      dependencies: [
        delay,
        distance,
        duration,
        ease,
        selector,
        shouldReduceMotion,
        stagger,
      ],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={container}
      className={clsx(className)}
      data-gsap-sequence=""
    >
      {children}
    </div>
  );
}

