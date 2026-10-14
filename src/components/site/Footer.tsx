import { Linkedin, Mail, Twitter, Youtube } from "lucide-react";
import { Container } from "./Layout";
import { Logo } from "./Logo";

const COLUMNS = [
  {
    title: "Producto",
    links: [
      { label: "Producto", href: "#producto" },
      { label: "Funcionalidades", href: "#funcionalidades" },
      { label: "Soluciones", href: "#soluciones" },
      { label: "Seguridad y permisos", href: "#seguridad" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Preguntas frecuentes", href: "#faq" },
      { label: "Solicitar demo", href: "#contacto" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Aviso legal", href: "#" },
      { label: "Política de privacidad", href: "#" },
      { label: "Política de cookies", href: "#" },
      { label: "Términos de uso", href: "#" },
    ],
  },
];

const SOCIALS = [
  { label: "LinkedIn de Sitecorp", icon: Linkedin, href: "#" },
  { label: "X de Sitecorp", icon: Twitter, href: "#" },
  { label: "YouTube de Sitecorp", icon: Youtube, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-coal">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-8">
          <div>
            {/* Official contrast logo for the dark background */}
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              La plataforma para centralizar la gestión de tus estructuras
              organizativas, trabajadores, puestos, plantillas y escalas
              salariales.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-accent-500/40 hover:bg-white/10 hover:text-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                >
                  <social.icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-white">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="font-display text-sm font-bold text-white">Contacto</h3>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <a
              href="mailto:hola@sitecorp.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-accent-400"
            >
              <Mail className="h-4 w-4 text-accent-400" aria-hidden />
              hola@sitecorp.com
            </a>
            <a
              href="#contacto"
              className="text-sm font-semibold text-accent-400 transition-colors hover:text-accent-300"
            >
              Solicitar una demostración
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Sitecorp. Todos los derechos
            reservados.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {["Aviso legal", "Privacidad", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-white/50 transition-colors hover:text-accent-400"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}