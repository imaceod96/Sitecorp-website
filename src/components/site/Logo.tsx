import { useState } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** `light` uses the official contrast variant for dark backgrounds. */
  tone?: "dark" | "light";
}

/** Official Sitecorp assets, served from /public/brand/. */
const LOGO_SRC = {
  dark: "/brand/logo-sitecorp-full.png",
  light: "/brand/logo-sitecorp-full.png",
} as const;

/**
 * Official Sitecorp logo.
 *
 * The original file is used as-is (never redrawn or recoloured) and its
 * proportions are preserved via `w-auto` on a fixed height.
 * If the asset has not been added to /public/brand yet, a neutral text
 * fallback is shown so no broken image ever reaches the page.
 */
export function Logo({ className, tone = "dark" }: LogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        aria-label="Sitecorp"
        className={cn(
          "inline-flex items-baseline font-display text-[1.3rem] font-extrabold leading-none tracking-[-0.02em]",
          tone === "light" ? "text-white" : "text-brand-500",
          className,
        )}
      >
        Site<span className="text-accent-500">corp</span>
      </span>
    );
  }

  return (
    <img
      src={LOGO_SRC[tone]}
      alt="Sitecorp"
      onError={() => setFailed(true)}
      draggable={false}
      className={cn(
        "w-auto select-none",
        tone === "light" ? "h-9" : "h-7 sm:h-8",
        className,
      )}
    />
  );
}