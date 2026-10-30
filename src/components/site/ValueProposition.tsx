import { Database, Eye, Zap, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "./Layout";
import { Reveal } from "./Reveal";

interface ValuePillar {
  icon: typeof Database;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
}

const PILLARS: ValuePillar[] = [
  {
    icon: Database,
    title: "Centralización",
    tagline: "Información organizativa y laboral conectada",
    description:
      "Une en una única fuente de verdad la arquitectura organizativa, las plazas presupuestadas, los expedientes de personal y las escalas salariales. Sin dispersión en hojas de cálculo ni datos desactualizados.",
    bullets: [
      "Estructuras, personas y contratos vinculados entre sí",
      "Actualización inmediata: un cambio en el puesto repercute en toda la ficha",
      "Eliminación de duplicidades y versiones locales obsoletas",
    ],
  },
  {
    icon: Eye,
    title: "Control",
    tagline: "Visibilidad integral sobre estructuras, personas y procesos",
    description:
      "Proporciona a la dirección, a recursos humanos y a los responsables de área la información exacta que precisan para decidir, con niveles de visibilidad acotados a cada rol y permisos por unidad.",
    bullets: [
      "Monitoreo en tiempo real de plazas cubiertas y vacantes",
      "Líneas de mando y responsabilidades jerárquicas transparentes",
      "Trazabilidad completa con registro inmutable de movimientos",
    ],
  },
  {
    icon: Zap,
    title: "Eficiencia",
    tagline: "Menos tareas fragmentadas, procesos más organizados",
    description:
      "Sustituye correos cruzados y procesos manuales por flujos sistemáticos para altas de personal, cambios de puesto, solicitudes de vacaciones y preparación de la prenómina mensual.",
    bullets: [
      "Generación automática de contratos y anexos homologados",
      "Alertas proactivas de vencimientos contractuales y periodos de prueba",
      "Cierre mensual de incidencias laborales ágil y sin errores",
    ],
  },
];

export function ValueProposition() {
  return (
    <Section id="propuesta-de-valor" tone="white" className="py-20 sm:py-24">
      <SectionHeading
        eyebrow="Propuesta de Valor"
        title="Diseñado para resolver la dispersión organizativa"
        description="Sitecorp sustituye las herramientas desconectadas por un sistema integral donde cada elemento de la organización tiene su lugar y propósito."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {PILLARS.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <Reveal key={pillar.title} delay={index * 100}>
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-surface-line bg-surface-mist p-7 transition-all duration-300 hover:border-brand-300 hover:bg-white hover:shadow-card">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-brand-600 shadow-sm border border-surface-line group-hover:bg-brand-500 group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                      Pilar {index + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-teal-700">
                    {pillar.tagline}
                  </p>

                  <p className="mt-3.5 text-sm leading-relaxed text-ink-muted">
                    {pillar.description}
                  </p>
                </div>

                <ul className="mt-6 space-y-2.5 border-t border-surface-line pt-5 text-xs text-ink-soft">
                  {pillar.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                      <span className="leading-normal">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
