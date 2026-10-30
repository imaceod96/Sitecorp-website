import { useState } from "react";
import { Building2, Layers, Network, Briefcase, CheckCircle2, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "./Layout";
import { Reveal } from "./Reveal";
import { Button } from "@/components/ui/button";

interface OrgSolution {
  id: string;
  badge: string;
  icon: typeof Building2;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  caseExample: {
    label: string;
    description: string;
  };
}

const ORG_SOLUTIONS: OrgSolution[] = [
  {
    id: "grupos",
    badge: "Estructura Corporativa",
    icon: Building2,
    title: "Grupos Empresariales y Holdings",
    tagline: "Gestión consolidada de múltiples razones sociales y filiales",
    description:
      "Gobierna de forma unificada varias empresas pertenecientes a un mismo grupo, manteniendo la independencia de cada sociedad mientras la dirección corporativa supervisa plantillas consolidadas, costes salariales globales y movilidad interempresarial.",
    features: [
      "Visión consolidada transversal de toda la corporación",
      "Modelado de relaciones de dependencia matriz-filial",
      "Control unificado de directores de cada sociedad",
      "Movilidad y traslados de personal entre empresas del grupo",
    ],
    caseExample: {
      label: "Caso de aplicación habitual",
      description: "Grupos industriales o de servicios con 2 a 10 empresas filiales que precisan reportar a un consejo común sin duplicar herramientas de gestión.",
    },
  },
  {
    id: "empresas",
    badge: "Empresa Individual",
    icon: Briefcase,
    title: "Empresas con Estructura Funcional",
    tagline: "Organización ágil por direcciones, áreas y departamentos",
    description:
      "Diseñada para organizaciones que operan bajo una única entidad jurídica pero que cuentan con múltiples centros de trabajo, áreas operativas y niveles jerárquicos definidos.",
    features: [
      "Mapa claro de áreas funcionales y centros de costo",
      "Cuotas de plazas presupuestadas por departamento",
      "Líneas de mando y aprobación de vacaciones transparentes",
      "Fichas completas de trabajadores con histórico contractual",
    ],
    caseExample: {
      label: "Caso de aplicación habitual",
      description: "Empresas de mediana o gran escala que buscan erradicar el descontrol de fichas en Excel y profesionalizar sus políticas salariales.",
    },
  },
  {
    id: "ueb",
    badge: "Descentralización Operativa",
    icon: Layers,
    title: "Unidades Empresariales de Base (UEB)",
    tagline: "Autonomía de gestión con gobierno y supervisión central",
    description:
      "Específicamente adaptado al modelo de Unidades Empresariales de Base: permite a cada unidad gestionar operativamente sus plazas y contratos, mientras la entidad central mantiene el control de la política retributiva y las auditorías.",
    features: [
      "Segregación estricta de permisos: cada UEB ve únicamente sus plazas",
      "Consolidación automática hacia la empresa cabecera",
      "Homologación de escalas salariales y convenios aplicables",
      "Gestión de bajas e incidencias operativas descentralizadas",
    ],
    caseExample: {
      label: "Caso de aplicación habitual",
      description: "Entidades con fábricas, centros territoriales o unidades de producción distribuidas que precisan delegar sin perder la visión unificada.",
    },
  },
  {
    id: "multinivel",
    badge: "Alta Complejidad",
    icon: Network,
    title: "Organizaciones con Jerarquías Multinivel",
    tagline: "Tantos niveles como requiera la escala del negocio",
    description:
      "Sin limitaciones arbitrarias de niveles de profundidad. Modela desde el consejo rector hasta el último equipo de campo, con líneas de reporte directas, funcionales y matriciales.",
    features: [
      "Profundidad jerárquica ilimitada sin degradar rendimiento",
      "Visualización en organigrama navegable o árbol tabular",
      "Herencia de permisos y visibilidad descendente automática",
      "Detección inmediata de plazas o unidades sin responsable asignado",
    ],
    caseExample: {
      label: "Caso de aplicación habitual",
      description: "Estructuras complejas con múltiples directores de área, jefes de departamento, supervisores de equipo y personal operativo de campo.",
    },
  },
];

export function Solutions({ onRequestDemo }: { onRequestDemo?: () => void }) {
  const [activeId, setActiveId] = useState("grupos");
  const activeSolution = ORG_SOLUTIONS.find((s) => s.id === activeId) || ORG_SOLUTIONS[0];

  return (
    <Section id="soluciones" tone="mist" className="py-20 sm:py-24">
      <SectionHeading
        eyebrow="Soluciones Organizativas"
        title="Diseñado para adaptarse a la estructura real de tu negocio"
        description="Sitecorp no impone una estructura rígida: se adapta al modelo de gobierno de tu organización, ya sea un grupo corporativo, una empresa individual o una red de UEBs descentralizadas."
      />

      <div className="mt-14">
        {/* Solution tabs */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ORG_SOLUTIONS.map((item) => {
            const isSelected = item.id === activeId;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`flex flex-col items-start rounded-2xl border p-4 text-left transition-all ${
                  isSelected
                    ? "border-brand-500 bg-white shadow-soft ring-1 ring-brand-500"
                    : "border-surface-line bg-white/70 hover:bg-white hover:border-brand-300"
                }`}
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-xl transition-colors ${
                    isSelected ? "bg-brand-500 text-white" : "bg-surface-mist text-brand-600"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="mt-3 text-xs font-bold uppercase tracking-wider text-teal-700">
                  {item.badge}
                </span>
                <span className="mt-1 font-display text-sm font-bold text-ink">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Solution Detail Card */}
        <div className="mt-6 rounded-3xl border border-surface-line bg-white p-7 shadow-card sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
                {activeSolution.badge}
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
                {activeSolution.title}
              </h3>
              <p className="mt-1 text-sm font-semibold text-teal-700">
                {activeSolution.tagline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                {activeSolution.description}
              </p>

              <div className="mt-6 space-y-2.5">
                {activeSolution.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-ink-soft">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {onRequestDemo && (
                <div className="mt-8">
                  <Button
                    onClick={onRequestDemo}
                    className="h-11 rounded-xl bg-brand-500 px-6 font-semibold text-white hover:bg-brand-600 shadow-soft"
                  >
                    Valorar encaje en mi organización
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-surface-line bg-surface-mist p-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                  {activeSolution.caseExample.label}
                </span>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                  {activeSolution.caseExample.description}
                </p>

                <div className="mt-5 rounded-xl border border-surface-line bg-white p-4">
                  <p className="text-xs font-bold text-ink">Beneficios clave comprobados</p>
                  <ul className="mt-2 space-y-1.5 text-[11px] text-ink-muted">
                    <li>• Puesta en marcha modular por empresas o centros</li>
                    <li>• Respeto riguroso de la jerarquía existente</li>
                    <li>• Cero necesidad de desarrollos a medida</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}