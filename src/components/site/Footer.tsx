import { Linkedin, Mail, Twitter, Youtube, ShieldCheck } from "lucide-react";
import { Container } from "./Layout";
import { Logo } from "./Logo";

interface FooterProps {
  onRequestDemo?: () => void;
}

const COLUMNS = [
  {
    title: "Plataforma",
    links: [
      { label: "Organización y Estructuras", href: "#explorador" },
      { label: "Gestión de Personas", href: "#explorador" },
      { label: "Planificación de Plantillas", href: "#explorador" },
      { label: "Gestión Contractual", href: "#explorador" },
      { label: "Escalas Salariales", href: "#explorador" },
      { label: "Documentos y Expedientes", href: "#explorador" },
    ],
  },
  {
    title: "Soluciones",
    links: [
      { label: "Grupos Empresariales", href: "#soluciones" },
      { label: "Empresas Funcionales", href: "#soluciones" },
      { label: "Unidades de Base (UEB)", href: "#soluciones" },
      { label: "Estructuras Multinivel", href: "#soluciones" },
      { label: "Seguridad y Roles (RBAC)", href: "#seguridad" },
    ],
  },
  {
    title: "Recursos y Legal",
    links: [
      { label: "Cómo funciona", href: "#como-funciona" },
      { label: "Preguntas frecuentes", href: "#faq" },
      { label: "Solicitar demostración", href: "#contacto" },
      { label: "Aviso legal", href: "#" },
      { label: "Política de privacidad", href: "#" },
      { label: "Política de cookies", href: "#" },
    ],
  },
];

const SOCIALS = [
  { label: "LinkedIn de Sitecorp", icon: Linkedin, href: "#" },
  { label: "X de Sitecorp", icon: Twitter, href: "#" },
  { label: "YouTube de Sitecorp", icon: Youtube, href: "#" },
];

export function Footer({ onRequestDemo }: FooterProps) {
  return (
    <footer className="bg-coal text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-8">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-xs leading-relaxed text-teal-100/70 sm:text-sm">
              La plataforma de software empresarial para centralizar la gestión de estructuras
              organizativas, trabajadores, puestos, plantillas presupuestadas y escalas salariales.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-teal-400/40 hover:bg-white/10 hover:text-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                >
                  <social.icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="font-display text-xs font-bold uppercase tracking-[0.14em] text-white">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-teal-100/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Corporate contact strip */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-teal-300">
                <Mail className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-teal-100/70">
                  Consultas y soporte corporativo
                </p>
                <a
                  href="mailto:hola@sitecorp.com"
                  className="text-xs font-semibold text-white hover:text-teal-300"
                >
                  hola@sitecorp.com
                </a>
              </div>
            </div>

            {onRequestDemo && (
              <button
                type="button"
                onClick={onRequestDemo}
                className="text-xs font-semibold text-accent-400 hover:text-accent-300 hover:underline text-left sm:text-right"
              >
                Solicitar una demostración para tu entidad →
              </button>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Sitecorp. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/50">
            <a href="#" className="hover:text-teal-300">Aviso legal</a>
            <a href="#" className="hover:text-teal-300">Privacidad</a>
            <a href="#" className="hover:text-teal-300">Cookies</a>
            <a href="#" className="hover:text-teal-300">Seguridad</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}