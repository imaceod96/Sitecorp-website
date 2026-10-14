import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Renders the wordmark in a light colour for dark backgrounds. */
  tone?: "dark" | "light";
}

/**
 * Temporary typographic wordmark.
 * Placeholder for the official Sitecorp logo asset, which will replace this component.
 */
export function Logo({ className, tone = "dark" }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-display text-[1.35rem] font-extrabold leading-none tracking-[-0.03em]",
        tone === "light" ? "text-white" : "text-ink",
        className,
      )}
      aria-label="Sitecorp"
    >
      Site
      <span
        className={cn(
          "relative",
          tone === "light" ? "text-brand-200" : "text-brand-500",
        )}
      >
        corp
      </span>
    </span>
  );
}