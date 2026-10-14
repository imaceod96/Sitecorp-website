import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "white" | "mist" | "navy";
}

export function Section({ id, children, className, tone = "white" }: SectionProps) {
  const tones = {
    white: "bg-white",
    mist: "bg-surface-mist",
    navy: "bg-brand-900 text-white",
  } as const;

  return (
    <section
      id={id}
      className={cn("py-20 sm:py-24 lg:py-28", tones[tone], className)}
    >
      <Container>{children}</Container>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "text-eyebrow",
            tone === "light" && "border-white/20 bg-white/10 text-brand-100",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "max-w-3xl text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-[2.75rem]",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            tone === "light" ? "text-brand-100" : "text-ink-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}