import {
  Network,
  Users,
  Briefcase,
  CalendarRange,
  Coins,
  ShieldCheck,
  FileText,
  CalendarCheck2,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Layout";

interface Feature {
  icon: LucideIcon;
  category: string;
  title: string;
  description: string;
  capabilities: string[];
}

const FEATURES: Feature[] = [
  {
    icon: Network,
    category: "Arquitectura",
    title: "Estructuras organizativas y jerarquías",
    description:
      "Crea grupos empresariales, filiales, empresas y Unidades Empresariales de Base (UEB) que reflejen la realidad operativa con líneas de mando exactas.",
    capabilities: [
      "Organigrama jerárquico multinivel",
      "Centros de costo y unidades operativas",
      "Asignación formal de responsables",
    ],
  },
  {
    icon: Users,
    category: "Personal",
    title: "Ficha 360° del trabajador y trayectoria",
    description:
      "Información unificada de cada profesional: datos personales, adscripción organizativa, contrato vigente, historial de promociones y plaza ocupada.",
    capabilities: [
      "Directorio centralizado con filtros",
      "Historial de traslados y ascensos",
      "Gestión de candidatos y reingresos",
    ],
  },
  {
    icon: CalendarRange,
    category: "Planificación",
    title: "Plantilla presupuestada vs. operativa",
    description:
      "Compara en tiempo real las plazas aprobadas en presupuesto frente a las ocupadas efectivamente, gestionando vacantes y proyectando necesidades.",
    capabilities: [
      "Control de porcentaje de cobertura",
      "Detección inmediata de plazas vacantes",
      "Disponibilidad por puesto y centro",
    ],
  },
  {
    icon: Briefcase,
    category: "Legal",
    title: "Gestión contractual y movimientos",
    description:
      "Administra altas, prórrogas, revisiones, cambios de puesto, reubicaciones entre unidades y separaciones laborales con pleno rigor documental.",
    capabilities: [
      "Seguimiento de periodos de prueba",
      "Trazabilidad de traslados y addendas",
      "Registro de causas de cese y liquidación",
    ],
  },
  {
    icon: Coins,
    category: "Retribución",
    title: "Escalas salariales y política retributiva",
    description:
      "Configura bandas salariales presupuestadas y empresariales asociadas a cada grupo, categoría y plaza para mantener la equidad retributiva.",
    capabilities: [
      "Bandas mínimas y máximas por escala",
      "Vigencia y adaptación a convenios",
      "Relación directa cargo-plaza-salario",
    ],
  },
  {
    icon: FileText,
    category: "Gestión",
    title: "Expedientes y plantillas documentales",
    description:
      "Homologa los modelos de contratos, resoluciones y anexos para que se generen automáticamente y audita la documentación obligatoria pendiente.",
    capabilities: [
      "Generación automatizada de contratos",
      "Panel de documentos pendientes de firma",
      "Repositorio digital con control de versiones",
    ],
  },
  {
    icon: CalendarCheck2,
    category: "Operativa",
    title: "Control laboral, ausencias y prenómina",
    description:
      "Gestiona solicitudes de vacaciones, cómputo de permisos, partes médicos de baja (IT) y consolida las incidencias para el cierre de nómina.",
    capabilities: [
      "Saldos de vacaciones en tiempo real",
      "Alertas de fin de contrato anticipadas",
      "Consolidado listo para software de nómina",
    ],
  },
  {
    icon: ShieldCheck,
    category: "Seguridad",
    title: "Roles granulares y trazabilidad de auditoría",
    description:
      "Aislamiento de acceso por entidad u organización, protección estricta de salarios y registro inmutable de cada cambio realizado en la plataforma.",
    capabilities: [
      "Permisos por rol y nivel jerárquico",
      "Segregación por empresa o UEB",
      "Log exhaustivo con fecha y usuario",
    ],
  },
];

export function Features({ onRequestDemo }: { onRequestDemo?: (module?: string) => void }) {
  return (
    <Section id="funcionalidades" tone="white" className="py-20 sm:py-24">
      <SectionHeading
        eyebrow="Capacidades de la Plataforma"
        title="Todo lo necesario para gobernar tu organización sin fisuras"
        description="Cada módulo está interconectado con los demás: cualquier actualización en la estructura o en una plaza se refleja al instante en los contratos, escalas y expedientes."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Reveal key={feature.title} delay={index * 60}>
              <article className="group flex h-full flex-col justify-between rounded-2xl border border-surface-line bg-surface-mist p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:bg-white hover:shadow-card">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-brand-600 shadow-sm border border-surface-line group-hover:bg-brand-500 group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                      {feature.category}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-base font-bold text-ink group-hover:text-brand-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-surface-line pt-4">
                  <ul className="space-y-1.5 text-[11px] text-ink-soft">
                    {feature.capabilities.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3 shrink-0 text-teal-600" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {onRequestDemo && (
                    <button
                      type="button"
                      onClick={() => onRequestDemo(feature.title)}
                      className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:text-brand-700 group-hover:translate-x-0.5 transition-transform"
                    >
                      Conocer más <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}