import {
  ArrowRight,
  Briefcase,
  CalendarRange,
  Coins,
  Network,
  Users,
} from "lucide-react";
import { Container } from "./Layout";
import { DashboardMockup } from "./mockups/DashboardMockup";

const CAPABILITIES = [
  { icon: Network, label: "Estructuras" },
  { icon: Users, label: "Trabajadores" },
  { icon: Briefcase, label: "Puestos" },
  { icon: CalendarRange, label: "Plantillas" },
  { icon: Coins, label: "Escalas" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-surface-mist" />
                <div className="absolute inset-x-0 top-0 h-[680px] bg-grid bg-grid-fade opacity-60" />
        <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-brand-200/50 blur-3xl" />
        <div className="absolute -right-20 top-40 h-72 w-72 rounded-full bg-brand-100 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center">
          <span
            className="text-eyebrow animate-fade-up"
            style={{ animationDelay: "40ms" }}
          >
            Plataforma de RR. HH. y organización
          </span>

          <h1
            className="mt-6 max-w-4xl text-balance text-4xl font-extrabold leading-[1.08] text-ink animate-fade-up sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "120ms" }}
          >
            Toda tu organización.{" "}
            <span className="text-brand-500">Una sola plataforma.</span>
          </h1>

          <p
            className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted animate-fade-up sm:text-lg"
            style={{ animationDelay: "200ms" }}
          >
            Centraliza la gestión de tus estructuras organizativas, trabajadores,
            puestos, plantillas y escalas salariales en una plataforma inteligente
            y fácil de utilizar.
          </p>

          <div
            className="mt-9 flex w-full flex-col items-center gap-3 animate-fade-up sm:w-auto sm:flex-row"
            style={{ animationDelay: "280ms" }}
          >
            <a
              href="#contacto"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 text-base font-semibold text-white shadow-soft transition-all hover:bg-brand-600 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:w-auto"
            >
              Solicitar demo
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
            <a
              href="#funcionalidades"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-200 bg-white px-6 py-3.5 text-base font-semibold text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:w-auto"
            >
              Explorar funcionalidades
            </a>
          </div>

          <ul
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 animate-fade-up"
            style={{ animationDelay: "360ms" }}
          >
            {CAPABILITIES.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 text-sm font-semibold text-ink-soft"
              >
                <item.icon className="h-4 w-4 text-brand-500" aria-hidden />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="relative mt-14 animate-fade-up sm:mt-16 lg:mt-20"
          style={{ animationDelay: "440ms" }}
        >
          <div
            className="pointer-events-none absolute inset-x-8 -bottom-6 top-10 rounded-[2rem] bg-brand-200/40 blur-2xl"
            aria-hidden
          />
          <div className="relative">
            <DashboardMockup />
          </div>
        </div>
      </Container>

      <div className="h-16 sm:h-20" aria-hidden />
    </section>
  );
}