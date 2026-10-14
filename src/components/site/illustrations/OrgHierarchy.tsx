import { cn } from "@/lib/utils";

/**
 * Decorative organisational chart illustration.
 * Built from primitives so it stays lightweight and always available.
 */
export function OrgHierarchy({ className }: { className?: string }) {
  const stroke = "#BACCFE";
  const soft = "#EEF3FF";

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
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M220 178 V196 M150 196 H290 M150 196 V214 M220 196 V214 M290 196 V214"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* root */}
      <g>
        <rect x="150" y="24" width="140" height="54" rx="14" fill="#FFFFFF" stroke={stroke} />
        <circle cx="182" cy="51" r="13" fill="#DCE6FF" />
        <rect x="203" y="42" width="66" height="8" rx="4" fill="#1B4FD8" opacity="0.25" />
        <rect x="203" y="56" width="44" height="6" rx="3" fill={soft} />
      </g>

      {/* second level */}
      <g>
        <rect x="30" y="118" width="120" height="60" rx="14" fill="#FFFFFF" stroke={stroke} />
        <circle cx="56" cy="148" r="12" fill={soft} />
        <rect x="76" y="138" width="56" height="7" rx="3.5" fill={soft} />
        <rect x="76" y="152" width="40" height="6" rx="3" fill={soft} />

        <rect x="160" y="118" width="120" height="60" rx="14" fill={soft} stroke={stroke} />
        <circle cx="186" cy="148" r="12" fill="#BACCFE" />
        <rect x="206" y="138" width="56" height="7" rx="3.5" fill="#BACCFE" />
        <rect x="206" y="152" width="40" height="6" rx="3" fill="#BACCFE" />

        <rect x="290" y="118" width="120" height="60" rx="14" fill="#FFFFFF" stroke={stroke} />
        <circle cx="316" cy="148" r="12" fill={soft} />
        <rect x="336" y="138" width="56" height="7" rx="3.5" fill={soft} />
        <rect x="336" y="152" width="40" height="6" rx="3" fill={soft} />
      </g>

      {/* third level */}
      <g>
        <rect x="90" y="214" width="120" height="52" rx="12" fill="#FFFFFF" stroke={stroke} opacity="0.9" />
        <circle cx="114" cy="240" r="11" fill={soft} />
        <rect x="132" y="232" width="60" height="6" rx="3" fill={soft} />
        <rect x="132" y="244" width="40" height="5" rx="2.5" fill={soft} />

        <rect x="160" y="214" width="120" height="52" rx="12" fill="#FFFFFF" stroke={stroke} opacity="0.9" />
        <circle cx="184" cy="240" r="11" fill="#DCE6FF" />
        <rect x="202" y="232" width="60" height="6" rx="3" fill="#DCE6FF" />
        <rect x="202" y="244" width="40" height="5" rx="2.5" fill={soft} />

        <rect x="230" y="214" width="120" height="52" rx="12" fill="#FFFFFF" stroke={stroke} opacity="0.9" />
        <circle cx="254" cy="240" r="11" fill={soft} />
        <rect x="272" y="232" width="60" height="6" rx="3" fill={soft} />
        <rect x="272" y="244" width="40" height="5" rx="2.5" fill={soft} />
      </g>
    </svg>
  );
}