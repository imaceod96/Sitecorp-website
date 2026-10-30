import { useEffect, useState } from "react";
import { ArrowRight, Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./Layout";
import { Logo } from "./Logo";
import { LoginModal } from "./LoginModal";

interface NavbarProps {
  onRequestDemo?: () => void;
}

const NAV_LINKS = [
  { label: "Inicio", href: "#top" },
  { label: "Plataforma", href: "#explorador" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Soluciones", href: "#soluciones" },
  { label: "Seguridad", href: "#seguridad" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar({ onRequestDemo }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled || open
            ? "border-b border-surface-line bg-white/95 shadow-sm backdrop-blur-md"
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
              className="hidden items-center gap-1 xl:gap-2 lg:flex"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-teal-50 hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={() => setLoginModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-ink-soft transition-colors hover:bg-surface-mist hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <User className="h-3.5 w-3.5" />
                Iniciar sesión
              </button>

              <button
                type="button"
                onClick={onRequestDemo}
                className="group inline-flex items-center gap-1.5 rounded-xl bg-brand-500 px-4 py-2.5 text-xs font-semibold text-white shadow-soft transition-all hover:bg-brand-600 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Solicitar demo
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </button>
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

        {/* Mobile Dropdown Nav */}
        <div
          id="mobile-nav"
          hidden={!open}
          className="border-t border-surface-line bg-white lg:hidden shadow-lg"
        >
          <Container className="py-4">
            <nav aria-label="Navegación móvil" className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-teal-50 hover:text-teal-800"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 flex flex-col gap-2 border-t border-surface-line pt-4">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setLoginModalOpen(true);
                }}
                className="w-full rounded-xl border border-surface-line py-2.5 text-center text-xs font-semibold text-ink-soft hover:bg-surface-mist"
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onRequestDemo?.();
                }}
                className="w-full rounded-xl bg-brand-500 py-2.5 text-xs font-semibold text-white shadow-soft hover:bg-brand-600"
              >
                Solicitar demostración
              </button>
            </div>
          </Container>
        </div>
      </header>

      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
}