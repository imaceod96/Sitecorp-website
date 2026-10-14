import type { LucideIcon } from "lucide-react";
import { Lock } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Browser-style chrome used to frame every product mockup. */
export function AppFrame({
  children,
  className,
  url = "app.sitecorp.com",
}: {
  children: ReactNode;
  className?: string;
  url?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-surface-line bg-surface-mist px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-300" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" aria-hidden />
        <div className="mx-auto hidden max-w-[260px] flex-1 items-center justify-center gap-1.5 rounded-md bg-white px-3 py-1 font-mono text-[11px] font-medium text-ink-muted ring-1 ring-surface-line sm:flex">
          <Lock className="h-3 w-3 shrink-0" aria-hidden />
          <span className="truncate">{url}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

const AVATAR_TONES = [
  "bg-brand-100 text-brand-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-violet-100 text-violet-700",
  "bg-sky-100 text-sky-700",
  "bg-rose-100 text-rose-700",
];

/** Initial-based avatar used across mockups instead of photographs. */
export function InitialsAvatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const tone = AVATAR_TONES[name.length % AVATAR_TONES.length];

  return (
    <span
      className={cn(
        "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
        tone,
        className,
      )}
      aria-hidden
    >
      {initials}
    </span>
  );
}

/** Sidebar navigation item. */
export function MockNavItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px]",
        active
          ? "bg-brand-50 font-semibold text-brand-700"
          : "font-medium text-ink-muted",
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span className="truncate">{label}</span>
    </div>
  );
}

/** Small metric tile used inside mockups. */
export function StatTile({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border px-3 py-2.5",
        accent
          ? "border-brand-200 bg-brand-50"
          : "border-surface-line bg-white",
      )}
    >
      <p className="text-[10px] font-medium uppercase tracking-wide text-ink-muted">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 font-display text-lg font-bold",
          accent ? "text-brand-700" : "text-ink",
        )}
      >
        {value}
      </p>
    </div>
  );
}

/** Sidebar shell shared by the dashboard-style mockups. */
export function MockSidebar({
  items,
  activeIndex = 0,
}: {
  items: { icon: LucideIcon; label: string }[];
  activeIndex?: number;
}) {
  return (
    <aside className="hidden w-44 shrink-0 flex-col gap-3 border-r border-surface-line bg-white p-3 lg:flex">
      <div className="flex items-center gap-2 px-1">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-brand-500 text-[11px] font-extrabold text-white">
          S
        </span>
        <span className="font-display text-xs font-bold text-ink">Sitecorp</span>
      </div>
      <nav className="space-y-0.5">
        {items.map((item, index) => (
          <MockNavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={index === activeIndex}
          />
        ))}
      </nav>
      <div className="mt-auto rounded-xl bg-surface-mist p-2.5">
        <p className="text-[10px] font-semibold text-ink">Plan organización</p>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-brand-100">
          <div className="h-full w-2/3 rounded-full bg-brand-500" />
        </div>
      </div>
    </aside>
  );
}