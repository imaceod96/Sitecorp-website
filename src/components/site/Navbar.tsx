import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./Layout";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Producto", href: "#producto" },
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Soluciones", href: "#soluciones" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-surface-line bg-white/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <a
            href="#top"
            className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <Logo />
          </a>

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href="#contacto"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Iniciar sesión
            </a>
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-brand-600 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              Solicitar demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="grid h-10 w-10 place-items-center rounded-xl border border-surface-line bg-white text-ink transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-surface-line bg-white lg:hidden"
      >
        <Container className="py-4">
          <nav aria-label="Navegación móvil" className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t border-surface-line pt-4">
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-surface-line px-4 py-3 text-center text-sm font-semibold text-ink-soft"
            >
              Iniciar sesión
            </a>
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white shadow-soft"
            >
              Solicitar demo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}