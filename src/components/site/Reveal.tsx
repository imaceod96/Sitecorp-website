import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in milliseconds before the element animates in. */
  delay?: number;
}

/**
 * Fades and lifts its children into view the first time they enter the viewport.
 * Falls back to visible content when IntersectionObserver is unavailable.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -64px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}