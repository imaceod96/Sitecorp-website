import { cn } from "@/lib/utils";

/* Official palette values used inside the illustration. */
const BRAND_500 = "#1A5F7A";
const BRAND_200 = "#B9D7E3";
const BRAND_100 = "#DCECF2";
const BRAND_50 = "#F1F7FA";

/**
 * Decorative organisational chart illustration.
 * Built from primitives so it stays lightweight and always available.
 */
export function OrgHierarchy({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 440 300"
      role="img"
      aria-label="Ilustración de una estructura organizativa jerárquica"
      className={cn("h-auto w-full", className)}
    >
      {/* connectors */}
      <path
        d="M220 78 V96 M90 96 H350 M90 96 V118 M220 96 V118 M350 96 V118"
        stroke={BRAND_200}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M220 178 V196 M150 196 H290 M150 196 V214 M220 196 V214 M290 196 V214"
        stroke={BRAND_200}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* root */}
      <g>
        <rect x="150" y="24" width="140" height="54" rx="14" fill="#FFFFFF" stroke={BRAND_200} />
        <circle cx="182" cy="51" r="13" fill={BRAND_100} />
        <rect x="203" y="42" width="66" height="8" rx="4" fill={BRAND_500} opacity="0.35" />
        <rect x="203" y="56" width="44" height="6" rx="3" fill={BRAND_50} />
      </g>

      {/* second level */}
      <g>
        <rect x="30" y="118" width="120" height="60" rx="14" fill="#FFFFFF" stroke={BRAND_200} />
        <circle cx="56" cy="148" r="12" fill={BRAND_50} />
        <rect x="76" y="138" width="56" height="7" rx="3.5" fill={BRAND_50} />
        <rect x="76" y="152" width="40" height="6" rx="3" fill={BRAND_50} />

        <rect x="160" y="118" width="120" height="60" rx="14" fill={BRAND_50} stroke={BRAND_200} />
        <circle cx="186" cy="148" r="12" fill={BRAND_200} />
        <rect x="206" y="138" width="56" height="7" rx="3.5" fill={BRAND_200} />
        <rect x="206" y="152" width="40" height="6" rx="3" fill={BRAND_200} />

        <rect x="290" y="118" width="120" height="60" rx="14" fill="#FFFFFF" stroke={BRAND_200} />
        <circle cx="316" cy="148" r="12" fill={BRAND_50} />
        <rect x="336" y="138" width="56" height="7" rx="3.5" fill={BRAND_50} />
        <rect x="336" y="152" width="40" height="6" rx="3" fill={BRAND_50} />
      </g>

      {/* third level */}
      <g>
        <rect x="90" y="214" width="120" height="52" rx="12" fill="#FFFFFF" stroke={BRAND_200} opacity="0.9" />
        <circle cx="114" cy="240" r="11" fill={BRAND_50} />
        <rect x="132" y="232" width="60" height="6" rx="3" fill={BRAND_50} />
        <rect x="132" y="244" width="40" height="5" rx="2.5" fill={BRAND_50} />

        <rect x="160" y="214" width="120" height="52" rx="12" fill="#FFFFFF" stroke={BRAND_200} opacity="0.9" />
        <circle cx="184" cy="240" r="11" fill={BRAND_100} />
        <rect x="202" y="232" width="60" height="6" rx="3" fill={BRAND_100} />
        <rect x="202" y="244" width="40" height="5" rx="2.5" fill={BRAND_50} />

        <rect x="230" y="214" width="120" height="52" rx="12" fill="#FFFFFF" stroke={BRAND_200} opacity="0.9" />
        <circle cx="254" cy="240" r="11" fill={BRAND_50} />
        <rect x="272" y="232" width="60" height="6" rx="3" fill={BRAND_50} />
        <rect x="272" y="244" width="40" height="5" rx="2.5" fill={BRAND_50} />
      </g>
    </svg>
  );
}