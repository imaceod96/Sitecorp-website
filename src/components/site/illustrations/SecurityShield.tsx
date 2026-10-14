import { cn } from "@/lib/utils";

/** Decorative hierarchical-access shield illustration. */
export function SecurityShield({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 360"
      role="img"
      aria-label="Ilustración de control de acceso jerárquico"
      className={cn("h-auto w-full", className)}
    >
      <path
        d="M160 20 L286 68 V184 C286 262 232 322 160 344 C88 322 34 262 34 184 V68 Z"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
      />
      <path
        d="M160 58 L252 94 V184 C252 244 212 292 160 310 C108 292 68 244 68 184 V94 Z"
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1.5"
      />

      {/* lock */}
      <rect x="132" y="166" width="56" height="46" rx="10" fill="#FFFFFF" opacity="0.9" />
      <path
        d="M144 166 V152 a16 16 0 0 1 32 0 V166"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx="160" cy="189" r="5" fill="#1B4FD8" />

      {/* role nodes */}
      <circle cx="160" cy="106" r="14" fill="#8FAEFC" />
      <path
        d="M160 120 V134 M96 134 H224 M96 134 V146 M160 134 V146 M224 134 V146"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="96" cy="160" r="11" fill="rgba(255,255,255,0.55)" />
      <circle cx="160" cy="160" r="9" fill="rgba(255,255,255,0.35)" />
      <circle cx="224" cy="160" r="8" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}