import clsx from "clsx";

export interface AmbientFallbackProps {
  className?: string;
}

/** Static sacred-geometry treatment used before WebGL and on constrained devices. */
export function AmbientFallback({ className }: AmbientFallbackProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      data-ambient-fallback=""
    >
      <svg
        aria-hidden="true"
        className="h-full w-full text-[#8B6F4B]"
        focusable="false"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 480"
      >
        <g
          fill="none"
          opacity="0.22"
          stroke="currentColor"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        >
          <circle cx="870" cy="240" r="92" />
          <circle cx="962" cy="240" r="92" />
          <circle cx="916" cy="160" r="92" />
          <circle cx="916" cy="320" r="92" />
          <circle cx="824" cy="160" r="92" />
          <circle cx="824" cy="320" r="92" />
          <circle cx="1008" cy="160" r="92" />
          <circle cx="1008" cy="320" r="92" />
          <circle cx="916" cy="240" r="184" opacity="0.7" />
          <circle cx="916" cy="240" r="218" opacity="0.35" />
        </g>
        <path
          d="M64 402H1136"
          fill="none"
          opacity="0.13"
          stroke="currentColor"
          strokeDasharray="2 12"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

