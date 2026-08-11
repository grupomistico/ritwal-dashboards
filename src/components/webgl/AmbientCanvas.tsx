"use client";

import {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import clsx from "clsx";
import { useReducedMotion } from "motion/react";
import {
  AmbientBrandScene,
  type AmbientSceneQuality,
} from "./AmbientBrandScene";
import { AmbientFallback } from "./AmbientFallback";

type AmbientMode = "pending" | "webgl" | "fallback";
type AmbientQuality = "auto" | AmbientSceneQuality;

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

interface AmbientErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
  onError: () => void;
}

interface AmbientErrorBoundaryState {
  failed: boolean;
}

class AmbientErrorBoundary extends Component<
  AmbientErrorBoundaryProps,
  AmbientErrorBoundaryState
> {
  state: AmbientErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): AmbientErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function browserSupportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2", { powerPreference: "low-power" }) ??
      canvas.getContext("webgl", { powerPreference: "low-power" });

    if (!context) return false;

    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export interface AmbientCanvasProps {
  className?: string;
  deferMs?: number;
  disableOnSaveData?: boolean;
  enabled?: boolean;
  fallback?: ReactNode;
  quality?: AmbientQuality;
}

/**
 * Lazy-friendly WebGL decoration with static-first rendering. It never blocks
 * content, honors reduced motion/Save-Data, pauses in hidden tabs and falls
 * back if capability, runtime or context checks fail.
 */
export function AmbientCanvas({
  className,
  deferMs = 0,
  disableOnSaveData = true,
  enabled = true,
  fallback,
  quality = "auto",
}: AmbientCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [mode, setMode] = useState<AmbientMode>("pending");
  const [pageVisible, setPageVisible] = useState(true);
  const [adaptiveDpr, setAdaptiveDpr] = useState<number | null>(null);

  const fallbackNode = useMemo(
    () => fallback ?? <AmbientFallback />,
    [fallback],
  );

  useEffect(() => {
    if (!enabled || shouldReduceMotion) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    const detect = () => {
      const connection = (navigator as NavigatorWithConnection).connection;
      const saveDataBlocked = disableOnSaveData && connection?.saveData;

      if (!cancelled) {
        setMode(
          !saveDataBlocked && browserSupportsWebGL() ? "webgl" : "fallback",
        );
      }
    };

    const scheduleDetection = () => {
      const browserWindow = window as unknown as {
        cancelIdleCallback?: (handle: number) => void;
        requestIdleCallback?: (
          callback: IdleRequestCallback,
          options?: IdleRequestOptions,
        ) => number;
      };

      if (browserWindow.requestIdleCallback) {
        idleId = browserWindow.requestIdleCallback(detect, { timeout: 900 });
      } else {
        timeoutId = setTimeout(detect, 1);
      }
    };

    if (deferMs > 0) {
      timeoutId = setTimeout(scheduleDetection, deferMs);
    } else {
      scheduleDetection();
    }

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      const cancelIdleCallback = (
        window as unknown as {
          cancelIdleCallback?: (handle: number) => void;
        }
      ).cancelIdleCallback;
      if (idleId !== undefined && cancelIdleCallback) {
        cancelIdleCallback(idleId);
      }
    };
  }, [deferMs, disableOnSaveData, enabled, shouldReduceMotion]);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (mode !== "webgl") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setMode("fallback");
    };

    canvas.addEventListener("webglcontextlost", handleContextLost);
    return () =>
      canvas.removeEventListener("webglcontextlost", handleContextLost);
  }, [mode]);

  const handleRuntimeError = useCallback(() => setMode("fallback"), []);
  const handlePerformanceDecline = useCallback(
    () => setAdaptiveDpr(0.75),
    [],
  );
  const handlePerformanceIncline = useCallback(() => {
    if (quality !== "low") {
      setAdaptiveDpr(quality === "high" ? 1.25 : 1);
    }
  }, [quality]);

  const requestedDpr = quality === "high" ? 1.25 : quality === "low" ? 0.75 : 1;
  const dpr = adaptiveDpr ?? requestedDpr;
  const sceneQuality: AmbientSceneQuality =
    quality === "high" || (quality === "auto" && dpr >= 1) ? "high" : "low";
  const renderWebGL =
    mode === "webgl" && enabled && !Boolean(shouldReduceMotion);

  return (
    <div
      aria-hidden="true"
      className={clsx(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      data-ambient-mode={renderWebGL ? "webgl" : "fallback"}
    >
      {!renderWebGL ? (
        fallbackNode
      ) : (
        <AmbientErrorBoundary
          fallback={fallbackNode}
          onError={handleRuntimeError}
        >
          <Canvas
            ref={canvasRef}
            camera={{ far: 10, near: 0.1, position: [0, 0, 6], zoom: 80 }}
            className="h-full w-full"
            dpr={dpr}
            fallback={fallbackNode}
            flat
            frameloop="demand"
            gl={{
              alpha: true,
              antialias: sceneQuality === "high",
              depth: false,
              powerPreference: "low-power",
              stencil: false,
            }}
            onCreated={({ gl }) => gl.setClearColor("#000000", 0)}
            orthographic
            performance={{ max: 1, min: 0.5 }}
          >
            <PerformanceMonitor
              flipflops={2}
              onDecline={handlePerformanceDecline}
              onFallback={handlePerformanceDecline}
              onIncline={handlePerformanceIncline}
            />
            <AmbientBrandScene
              active={pageVisible}
              quality={sceneQuality}
              reducedMotion={Boolean(shouldReduceMotion)}
            />
          </Canvas>
        </AmbientErrorBoundary>
      )}
    </div>
  );
}
