import { Building2, Users2, LineChart, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "./Layout";
import { Reveal } from "./Reveal";

interface Step {
  number: string;
  badge: string;
  icon: typeof Building2;
  title: string;
  description: string;
  details: string[];
}

const STEPS: Step[] = [
  {
    number: "01",
    badge: "Estructuración",
    icon: Building2,
    title: "Configura tu modelo organizativo",
    description:
      "Dibuja la realidad de tu empresa: define grupos corporativos, empresas filiales, Unidades Empresariales de Base (UEB), direcciones y departamentos con sus niveles jerárquicos y dependencias.",
    details: [
      "Diseño del organigrama en niveles de mando",
      "Definición de centros de trabajo y unidades operativas",
      "Asignación de directores y líneas de reporte",
    ],
  },
  {
    number: "02",
    badge: "Consolidación",
    icon: Users2,
    title: "Centraliza la plantilla y las plazas",
    description:
      "Carga la plantilla presupuestada aprobada y asocia cada trabajador a su puesto, escala salarial y contrato vigente, eliminando duplicidades y versiones dispersas en hojas de cálculo.",
    details: [
      "Plazas presupuestadas vs ocupadas en tiempo real",
      "Ficha digital 360° para cada profesional",
      "Expedientes contractuales y anexos unificados",
    ],
  },
  {
    number: "03",
    badge: "Gobernanza",
    icon: LineChart,
    title: "Gestiona y controla desde un único lugar",
    description:
      "Supervisa movimientos de personal, vacaciones, incidencias para la nómina y vencimientos contractuales con permisos acotados por rol y trazabilidad inmutable de cada acción.",
    details: [
      "Alertas automáticas de vencimiento y cobertura",
      "Generación inmediata de documentación oficial",
      "Auditoría completa e informes consolidados",
    ],
  },
];

export function HowItWorks({ onRequestDemo }: { onRequestDemo?: () => void }) {
  return (
    <Section id="como-funciona" tone="mist" className="relative py-20 sm:py-24">
      <SectionHeading
        eyebrow="Cómo funciona Sitecorp"
        title="El camino más directo hacia el orden organizativo"
        description="Un flujo metodológico y tecnológico contrastado para transformar la fragmentación operativa en una estructura corporativa sólida y eficiente."
      />

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.number} delay={index * 120}>
              <div className="relative flex h-full flex-col rounded-2xl border border-surface-line bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card">
                {/* Step indicator top */}
                <div className="flex items-center justify-between border-b border-surface-line pb-4">
                  <span className="font-display text-3xl font-extrabold text-brand-500/20">
                    {step.number}
                  </span>
                  <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700">
                    {step.badge}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">{step.title}</h3>
                </div>

                <p className="mt-3.5 text-sm leading-relaxed text-ink-muted">
                  {step.description}
                </p>

                <ul className="mt-6 space-y-2 border-t border-surface-line pt-4 text-xs text-ink-soft">
                  {step.details.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-14 text-center">
        <p className="text-sm text-ink-muted">
          ¿Deseas conocer cómo adaptar este flujo a la estructura particular de tu organización?
        </p>
        {onRequestDemo && (
          <button
            type="button"
            onClick={onRequestDemo}
            className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 hover:underline"
          >
            Solicitar sesión de consultoría organizativa inicial
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </Section>
  );
}
