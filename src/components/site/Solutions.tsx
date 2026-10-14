import { Building2, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Layout";
import { OrgHierarchy } from "./illustrations/OrgHierarchy";

interface Solution {
  icon: LucideIcon;
  audience: string;
  title: string;
  points: string[];
}

const SOLUTIONS: Solution[] = [
  {
    icon: Building2,
    audience: "Dirección",
    title: "Visión completa de la organización",
    points: [
      "Estructura, áreas y responsables en un solo mapa",
      "Previsiones de plantilla por unidad",
      "Comparativa de niveles y escalas salariales",
    ],
  },
  {
    icon: Users,
    audience: "Equipo de RR. HH.",
    title: "Menos trabajo manual y más control",
    points: [
      "Fichas de trabajador siempre completas y consistentes",
      "Puestos y escalas definidos una sola vez",
      "Procesos repetitivos simplificados",
    ],
  },
  {
    icon: ShieldCheck,
    audience: "Mandos intermedios",
    title: "Cada uno ve lo que le corresponde",
    points: [
      "Acceso limitado a su unidad y sus dependientes",
      "Consulta de su equipo sin datos sensibles",
      "Información actualizada sin pedir reportes",
    ],
  },
];

export function Solutions() {
  return (
    <Section id="soluciones" tone="mist">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Soluciones"
            title="Una plataforma, distintas formas de trabajar"
            description="Sitecorp se adapta al papel que cada persona desempeña en la organización, con la misma información como base."
          />

          <Reveal delay={120} className="mt-10">
            <div className="rounded-2xl border border-surface-line bg-white p-5 shadow-soft sm:p-7">
              <OrgHierarchy />
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4">
          {SOLUTIONS.map((solution, index) => (
            <Reveal key={solution.audience} delay={index * 100}>
              <article className="rounded-2xl border border-surface-line bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-200 hover:shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500 text-white">
                    <solution.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">
                      {solution.audience}
                    </p>
                    <h3 className="text-lg font-bold text-ink">
                      {solution.title}
                    </h3>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {solution.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"
                        aria-hidden
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}