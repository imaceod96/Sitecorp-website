import {
  Database,
  Eye,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Layout";
import { InitialsAvatar } from "./mockups/AppFrame";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: Database,
    title: "Información centralizada",
    description:
      "Todos los datos de personas, puestos y unidades en un mismo lugar, sin duplicidades ni versiones desactualizadas.",
  },
  {
    icon: Eye,
    title: "Visibilidad organizativa",
    description:
      "Entiende cómo se organiza tu empresa y quién depende de quién en cualquier momento.",
  },
  {
    icon: Zap,
    title: "Más eficiencia",
    description:
      "Reduce tareas manuales y consultas recurrentes para que tu equipo se centre en las personas.",
  },
  {
    icon: TrendingUp,
    title: "Mejor gestión de la plantilla",
    description:
      "Planifica, compara y decide con información estructurada y siempre disponible.",
  },
];

const FIELDS = [
  { label: "Unidad", value: "Personas" },
  { label: "Puesto", value: "Dirección" },
  { label: "Nivel", value: "2 · Escala B" },
  { label: "Reporta a", value: "Dirección General" },
];

function CentralizedVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md sm:pb-14 sm:pt-12">
      <div className="rounded-2xl border border-surface-line bg-white p-5 shadow-card">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Ficha unificada
          </p>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
            Actualizada
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <InitialsAvatar name="Ana Ruiz" className="h-11 w-11 text-xs" />
          <div>
            <p className="text-sm font-bold text-ink">Ana Ruiz</p>
            <p className="text-xs text-ink-muted">
              Directora de Personas · Nivel 2
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {FIELDS.map((field) => (
            <div
              key={field.label}
              className="rounded-xl border border-surface-line bg-surface-mist px-3 py-2.5"
            >
              <p className="text-[10px] font-medium uppercase tracking-wide text-ink-muted">
                {field.label}
              </p>
              <p className="truncate text-xs font-semibold text-ink">
                {field.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-0 top-0 hidden w-44 animate-float rounded-2xl border border-surface-line bg-white p-3 shadow-card sm:block">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
          Estructura
        </p>
        <div className="mt-2 space-y-1.5">
          {["Dirección", "Operaciones", "Personas"].map((unit, index) => (
            <div
              key={unit}
              className="flex items-center gap-2 rounded-lg bg-surface-mist px-2 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              <span className="truncate text-[10px] font-medium text-ink-soft">
                {unit}
              </span>
              <span className="ml-auto text-[9px] text-ink-muted">
                N{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 hidden w-48 rounded-2xl border border-surface-line bg-white p-3 shadow-card sm:block">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
          Escala B
        </p>
        <p className="mt-1 text-xs font-bold text-ink">46.000 € – 74.000 €</p>
        <div className="relative mt-2 h-2.5 w-full rounded-full bg-surface-mist">
          <div className="absolute inset-y-0 left-[35%] w-[45%] rounded-full bg-brand-500" />
        </div>
        <p className="mt-2 text-[10px] text-ink-muted">
          Banda aplicada a 4 niveles
        </p>
      </div>
    </div>
  );
}

export function Benefits() {
  return (
    <Section tone="mist">
      <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Beneficios"
            title="Menos hojas de cálculo. Más control."
            description="Cuando la información de tu organización vive en un único lugar, todo lo demás se vuelve más sencillo."
          />

          <div className="mt-10 space-y-3">
            {BENEFITS.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 80}>
                <div className="flex gap-4 rounded-2xl border border-transparent bg-white/70 p-4 transition-colors hover:border-brand-100 hover:bg-white">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <benefit.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-ink">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <CentralizedVisual />
        </Reveal>
      </div>
    </Section>
  );
}