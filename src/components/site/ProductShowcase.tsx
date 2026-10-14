import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Layout";
import { OrgChartMockup } from "./mockups/OrgChartMockup";
import { PeopleMockup } from "./mockups/PeopleMockup";
import { PlanningMockup } from "./mockups/PlanningMockup";
import { SalaryMockup } from "./mockups/SalaryMockup";

interface ShowcaseItem {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  visual: ReactNode;
}

const ITEMS: ShowcaseItem[] = [
  {
    eyebrow: "Estructuras organizativas",
    title: "Diseña tu estructura organizativa en minutos",
    description:
      "Construye y mantén tu organigrama con unidades, departamentos y relaciones jerárquicas. Visualiza la estructura completa y localiza a cada equipo en cuestión de segundos.",
    points: [
      "Jerarquías con tantos niveles como necesites",
      "Vista de organigrama y vista de lista",
      "Responsables asignados a cada unidad",
    ],
    visual: <OrgChartMockup />,
  },
  {
    eyebrow: "Trabajadores",
    title: "Una ficha única y completa para cada persona",
    description:
      "Toda la información de tu plantilla, centralizada y estructurada: datos personales, puesto, unidad, contrato y línea de reporte. Sin duplicidades ni versiones desactualizadas.",
    points: [
      "Búsqueda y filtros instantáneos",
      "Historial organizativo de cada persona",
      "Datos coherentes en toda la plataforma",
    ],
    visual: <PeopleMockup />,
  },
  {
    eyebrow: "Plantillas",
    title: "Planifica la plantilla con datos, no con intuiciones",
    description:
      "Proyecta las necesidades de personal de cada área, define escenarios y anticipa altas y bajas. Todo comparado sobre la misma estructura organizativa.",
    points: [
      "Previsión de plantilla por unidad",
      "Altas, bajas y vacantes en un único panel",
      "Comparativa entre áreas y niveles",
    ],
    visual: <PlanningMockup />,
  },
  {
    eyebrow: "Escalas salariales",
    title: "Escalas salariales claras, de un vistazo",
    description:
      "Configura niveles, bandas y baremos adaptados a tus convenios y a tu política retributiva. Visualiza los rangos y mantén la coherencia en toda la organización.",
    points: [
      "Bandas salariales por nivel y categoría",
      "Rangos mínimos y máximos por escala",
      "Referencias comparables entre grupos",
    ],
    visual: <SalaryMockup />,
  },
];

function ShowcaseRow({ item, index }: { item: ShowcaseItem; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal
        className={reversed ? "lg:order-2" : "lg:order-1"}
        delay={reversed ? 0 : 100}
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
            {item.eyebrow}
          </span>
          <h3 className="mt-3 text-2xl font-bold leading-snug text-ink sm:text-3xl">
            {item.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            {item.description}
          </p>
          <ul className="mt-6 space-y-3">
            {item.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                  <Check className="h-3 w-3" aria-hidden />
                </span>
                <span className="text-sm font-medium text-ink-soft">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal
        className={reversed ? "lg:order-1" : "lg:order-2"}
        delay={reversed ? 100 : 0}
      >
        {item.visual}
      </Reveal>
    </div>
  );
}

export function ProductShowcase() {
  return (
    <Section id="producto" tone="white">
      <SectionHeading
        eyebrow="Producto"
        title="Diseñado para entender tu organización de un vistazo"
        description="Interfaces claras, información estructurada y todo lo importante siempre a la vista. Así se ve Sitecorp por dentro."
      />

      <div className="mt-16 flex flex-col gap-20 lg:gap-28">
        {ITEMS.map((item, index) => (
          <ShowcaseRow key={item.title} item={item} index={index} />
        ))}
      </div>
    </Section>
  );
}