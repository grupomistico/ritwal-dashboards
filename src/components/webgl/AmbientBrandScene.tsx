"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Group } from "three";

export type AmbientSceneQuality = "low" | "high";

export interface AmbientBrandSceneProps {
  active?: boolean;
  quality?: AmbientSceneQuality;
  reducedMotion?: boolean;
}

const RING_POSITIONS = [
  [0, 0],
  [0.68, 0],
  [-0.68, 0],
  [0.34, 0.59],
  [-0.34, 0.59],
  [0.34, -0.59],
  [-0.34, -0.59],
] as const;

/**
 * Decorative, finite flower-of-life motion. With a demand frameloop it stops
 * requesting frames after its short intro, so it has no steady-state GPU cost.
 */
export function AmbientBrandScene({
  active = true,
  quality = "low",
  reducedMotion = false,
}: AmbientBrandSceneProps) {
  const group = useRef<Group>(null);
  const elapsed = useRef(0);
  const invalidate = useThree((state) => state.invalidate);
  const segments = quality === "high" ? 80 : 48;

  useEffect(() => {
    elapsed.current = 0;
    invalidate();
  }, [active, invalidate, quality, reducedMotion]);

  useFrame((_, delta) => {
    const node = group.current;

    if (!node || !active || reducedMotion) return;

    elapsed.current += Math.min(delta, 0.05);
    const progress = Math.min(elapsed.current / 2.2, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    node.rotation.z = -0.045 + eased * 0.045;
    node.scale.setScalar(0.96 + eased * 0.04);

    if (progress < 1) invalidate();
  });

  return (
    <group
      ref={group}
      position={[1.2, 0, 0]}
      rotation={[0, 0, reducedMotion ? 0 : -0.045]}
      scale={reducedMotion ? 1 : 0.96}
    >
      {RING_POSITIONS.map(([x, y], index) => (
        <mesh key={`${x}-${y}`} position={[x, y, index * 0.0001]}>
          <ringGeometry args={[0.675, 0.688, segments]} />
          <meshBasicMaterial
            color={index === 0 ? "#993921" : "#8B6F4B"}
            depthWrite={false}
            opacity={index === 0 ? 0.24 : 0.18}
            toneMapped={false}
            transparent
          />
        </mesh>
      ))}

      <mesh position={[0, 0, -0.01]}>
        <ringGeometry args={[1.46, 1.475, segments]} />
        <meshBasicMaterial
          color="#656636"
          depthWrite={false}
          opacity={0.13}
          toneMapped={false}
          transparent
        />
      </mesh>

      <mesh position={[0, 0, -0.02]}>
        <circleGeometry args={[1.7, segments]} />
        <meshBasicMaterial
          color="#DDC9A3"
          depthWrite={false}
          opacity={0.025}
          toneMapped={false}
          transparent
        />
      </mesh>
    </group>
  );
}

