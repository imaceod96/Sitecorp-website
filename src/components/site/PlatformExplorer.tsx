import { useState, useId } from "react";
import {
  Building2,
  Users,
  Briefcase,
  FileText,
  CalendarCheck2,
  ShieldCheck,
  Check,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Clock,
  Layers,
  ChevronRight,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Section, SectionHeading } from "./Layout";
import { Reveal } from "./Reveal";
import { AppFrame, InitialsAvatar } from "./mockups/AppFrame";
import { Button } from "@/components/ui/button";

export interface PlatformExplorerProps {
  onRequestDemo: (moduleName?: string) => void;
}

interface ModuleData {
  id: string;
  name: string;
  shortLabel: string;
  icon: typeof Building2;
  badge: string;
  title: string;
  description: string;
  capabilities: {
    title: string;
    description: string;
  }[];
  mockupUrl: string;
}

const MODULES: ModuleData[] = [
  {
    id: "organizacion",
    name: "Organización",
    shortLabel: "Estructura",
    icon: Building2,
    badge: "Núcleo Estructural",
    title: "Estructuras jerárquicas multinivel y organigrama vivo",
    description:
      "Modela fielmente tu arquitectura empresarial: grupos, filiales, Unidades Empresariales de Base (UEB), direcciones, áreas y centros de trabajo con dependencias claras y responsables asignados.",
    capabilities: [
      {
        title: "Modelado multi-entidad",
        description: "Gestión simultánea de Grupos Empresariales, Empresas y UEBs descentralizadas.",
      },
      {
        title: "Organigrama dinámico e interactivo",
        description: "Visualización gráfica en árbol o tabular con búsqueda inmediata de cualquier área.",
      },
      {
        title: "Líneas de reporte y mando",
        description: "Identificación unívoca del responsable de cada unidad y jerarquías sin inconsistencias.",
      },
      {
        title: "Centros de costo y plazas asociadas",
        description: "Relación directa entre las unidades organizativas y sus puestos presupuestados.",
      },
    ],
    mockupUrl: "app.sitecorp.com/organizacion/estructura",
  },
  {
    id: "personas",
    name: "Personas",
    shortLabel: "Trabajadores",
    icon: Users,
    badge: "Expediente 360°",
    title: "Ficha integral y trayectoria de cada trabajador",
    description:
      "Centraliza todos los datos laborales, personales y organizativos en una única ficha coherente: puesto ocupado, unidad de adscripción, contrato activo, historial de promociones y línea de reporte.",
    capabilities: [
      {
        title: "Ficha laboral unificada",
        description: "Datos personales, bancarios, contractuales y organizativos sin duplicidades.",
      },
      {
        title: "Historial de movimientos",
        description: "Registro cronológico de ascensos, cambios de plaza, traslados y modificaciones.",
      },
      {
        title: "Gestión de candidatos y altas",
        description: "Incorporación ágil de nuevo personal directamente vinculado a plazas vacantes.",
      },
      {
        title: "Filtros multicriterio instantáneos",
        description: "Segmentación por unidad, nivel salarial, antigüedad, centro y tipo de jornada.",
      },
    ],
    mockupUrl: "app.sitecorp.com/personas/directorio",
  },
  {
    id: "plantillas",
    name: "Plantillas",
    shortLabel: "Plantillas",
    icon: Layers,
    badge: "Control de Plazas",
    title: "Plantilla presupuestada vs. operativa en tiempo real",
    description:
      "Supervisa con exactitud qué plazas están aprobadas, cuántas están efectivamente cubiertas y cuáles permanecen vacantes o en proceso de selección en cada departamento o centro de trabajo.",
    capabilities: [
      {
        title: "Comparativa presupuestada vs. real",
        description: "Monitoreo del porcentaje de cobertura y control del gasto salarial aprobado.",
      },
      {
        title: "Gestión de plazas vacantes",
        description: "Detección inmediata de plazas disponibles para acelerar la cobertura sin sobrecostes.",
      },
      {
        title: "Disponibilidad por puesto y unidad",
        description: "Visibilidad de vacantes asignadas a cada escala y centro operativo.",
      },
      {
        title: "Simulación de escenarios",
        description: "Proyecciones de ampliación de plantilla para nuevos proyectos o unidades de negocio.",
      },
    ],
    mockupUrl: "app.sitecorp.com/plantillas/control-plazas",
  },
  {
    id: "contratacion",
    name: "Contratación",
    shortLabel: "Contratos",
    icon: Briefcase,
    badge: "Ciclo Contractual",
    title: "Gestión integral de contratos, reubicaciones y ceses",
    description:
      "Administra todo el ciclo de vida contractual con rigor jurídico: generación de altas, prórrogas, revisiones salariales, modificaciones de jornada, adscripciones a nuevos puestos y separaciones laborales.",
    capabilities: [
      {
        title: "Tipos de contrato y condiciones",
        description: "Control de contratos indefinidos, formativos, sustituciones y periodos de prueba.",
      },
      {
        title: "Reubicaciones y traslados",
        description: "Trazabilidad formal de cambios de unidad, centro o reestructuraciones operativas.",
      },
      {
        title: "Separaciones y bajas laborales",
        description: "Gestión documentada de desvinculaciones, motivos de cese y liquidaciones.",
      },
      {
        title: "Anexos contractuales vinculados",
        description: "Asociación directa de addendas y pactos especiales al contrato original del empleado.",
      },
    ],
    mockupUrl: "app.sitecorp.com/contratacion/expedientes",
  },
  {
    id: "documentos",
    name: "Documentos",
    shortLabel: "Documentación",
    icon: FileText,
    badge: "Expediente Digital",
    title: "Plantillas estandarizadas y generación documental",
    description:
      "Genera contratos oficiales, notificaciones y anexos a partir de plantillas corporativas homologadas, garantizando que el expediente laboral de cada profesional cumpla con la normativa vigente.",
    capabilities: [
      {
        title: "Plantillas documentales dinámicas",
        description: "Modelos oficiales que se completan automáticamente con los datos del trabajador y la plaza.",
      },
      {
        title: "Control de documentación pendiente",
        description: "Panel de alertas para títulos, certificados y acreditaciones requeridas sin entregar.",
      },
      {
        title: "Expediente digital centralizado",
        description: "Archivo digital ordenado por empleado con acceso restringido por nivel de autorización.",
      },
      {
        title: "Exportación y auditoría rápida",
        description: "Descarga consolidada de expedientes para inspecciones o comités de dirección.",
      },
    ],
    mockupUrl: "app.sitecorp.com/documentos/plantillas",
  },
  {
    id: "gestion-laboral",
    name: "Gestión Laboral",
    shortLabel: "Laboral",
    icon: CalendarCheck2,
    badge: "Operativa Diaria",
    title: "Vacaciones, licencias, incidencias y prenómina",
    description:
      "Centraliza las solicitudes de vacaciones, el cómputo de permisos, los certificados médicos de baja y las alertas contractuales, unificando los datos que alimentan el cierre de nómina mensual.",
    capabilities: [
      {
        title: "Control de vacaciones y festivos",
        description: "Cómputo automático de días devengados, disfrutados y pendientes por trabajador.",
      },
      {
        title: "Bajas médicas y licencias",
        description: "Registro de partes de incapacidad temporal, maternidad y permisos con trazabilidad médica.",
      },
      {
        title: "Alertas de vencimiento",
        description: "Avisos anticipados de fin de contratos temporales o vencimientos de periodos de prueba.",
      },
      {
        title: "Preparación de prenómina",
        description: "Consolidación de incidencias del mes para envío directo a gestoría o software de nómina.",
      },
    ],
    mockupUrl: "app.sitecorp.com/laboral/calendario-incidencias",
  },
  {
    id: "administracion",
    name: "Administración",
    shortLabel: "Seguridad",
    icon: ShieldCheck,
    badge: "Gobernanza",
    title: "Roles granulares, control multi-entidad y trazabilidad",
    description:
      "Garantiza la máxima confidencialidad: define perfiles con accesos restringidos por entidad u organigrama, protege los datos salariales y mantén una auditoría exhaustiva de cualquier modificación.",
    capabilities: [
      {
        title: "Perfiles y permisos por rol",
        description: "Superadministradores, responsables de RR. HH., directores de unidad y consultores.",
      },
      {
        title: "Segregación por organización o UEB",
        description: "Los gestores de una filial solo acceden a la información de su respectiva unidad.",
      },
      {
        title: "Historial completo de auditoría",
        description: "Registro inmutable con fecha, hora, usuario e IP de cada creación, edición o borrado.",
      },
      {
        title: "Protección de datos sensibles",
        description: "Visibilidad restringida para salarios, convenios especiales y notas disciplinarias.",
      },
    ],
    mockupUrl: "app.sitecorp.com/admin/seguridad-auditoria",
  },
];

export function PlatformExplorer({ onRequestDemo }: PlatformExplorerProps) {
  const [selectedId, setSelectedId] = useState("organizacion");
  const tablistId = useId();

  const activeModule = MODULES.find((m) => m.id === selectedId) || MODULES[0];

  return (
    <Section id="explorador" tone="white" className="relative pt-12 pb-24">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 flex justify-center">
        <div className="h-96 w-[800px] rounded-full bg-teal-50/70 blur-3xl" />
      </div>

      <SectionHeading
        eyebrow="Explorador Interactivo de la Plataforma"
        title="Un entorno completo diseñado para gobernar tu organización"
        description="Selecciona cualquiera de los módulos funcionales para explorar cómo Sitecorp resuelve cada fase de la gestión organizativa y del talento."
      />

      {/* Module Selector Tabs */}
      <div className="mt-12">
        <div
          role="tablist"
          id={tablistId}
          aria-label="Módulos de la plataforma Sitecorp"
          className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-surface-line bg-surface-mist p-2 sm:gap-2.5"
        >
          {MODULES.map((m) => {
            const isSelected = m.id === selectedId;
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                role="tab"
                id={`tab-${m.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${m.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelectedId(m.id)}
                className={`group flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                  isSelected
                    ? "bg-brand-500 text-white shadow-soft"
                    : "text-ink-soft hover:bg-white hover:text-brand-600"
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isSelected ? "text-accent-300" : "text-ink-muted"
                  }`}
                  aria-hidden
                />
                <span className="whitespace-nowrap">{m.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Content Panel */}
      <div
        role="tabpanel"
        id={`panel-${activeModule.id}`}
        aria-labelledby={`tab-${activeModule.id}`}
        className="mt-10"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left Column: Descriptive info & capabilities */}
          <div className="lg:col-span-5">
            <Reveal key={`info-${activeModule.id}`} delay={50}>
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-700">
                <Sparkles className="h-3.5 w-3.5 text-accent-500" />
                {activeModule.badge}
              </div>

              <h3 className="mt-3.5 text-2xl font-bold leading-tight text-ink sm:text-[1.85rem] font-display">
                {activeModule.title}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                {activeModule.description}
              </p>

              <div className="mt-8 space-y-4">
                {activeModule.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-teal-100 text-teal-700">
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-ink">{cap.title}</h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">
                        {cap.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => onRequestDemo(activeModule.name)}
                  className="group h-11 rounded-xl bg-brand-500 px-5 text-sm font-semibold text-white shadow-soft hover:bg-brand-600"
                >
                  Solicitar demo de {activeModule.name}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <a
                  href="#funcionalidades"
                  className="inline-flex h-11 items-center rounded-xl border border-surface-line bg-white px-4 text-xs font-semibold text-ink-soft hover:border-brand-300 hover:bg-brand-50"
                >
                  Ver todas las funciones
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Tailored High-Fidelity Interactive Mockup */}
          <div className="lg:col-span-7">
            <Reveal key={`mockup-${activeModule.id}`} delay={100}>
              <ModuleMockupDisplay moduleId={activeModule.id} url={activeModule.mockupUrl} />
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}

/** Specific visual preview for each module that looks like a real enterprise application */
function ModuleMockupDisplay({ moduleId, url }: { moduleId: string; url: string }) {
  switch (moduleId) {
    case "organizacion":
      return <OrganizacionMockup url={url} />;
    case "personas":
      return <PersonasMockup url={url} />;
    case "plantillas":
      return <PlantillasMockup url={url} />;
    case "contratacion":
      return <ContratacionMockup url={url} />;
    case "documentos":
      return <DocumentosMockup url={url} />;
    case "gestion-laboral":
      return <GestionLaboralMockup url={url} />;
    case "administracion":
      return <AdministracionMockup url={url} />;
    default:
      return <OrganizacionMockup url={url} />;
  }
}

/** Mockup: Organización Empresarial */
function OrganizacionMockup({ url }: { url: string }) {
  return (
    <AppFrame url={url} className="w-full">
      <div className="bg-surface-mist p-4 sm:p-5">
        {/* Top actions & filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-line bg-white p-3 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-brand-500/10 p-1.5 text-brand-600">
              <Building2 className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-bold text-ink">Grupo Corporativo Omega, S.A.</p>
              <p className="text-[10px] text-ink-muted">4 Empresas · 12 UEBs · 28 Departamentos</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-teal-50 px-2 py-1 text-[10px] font-semibold text-teal-700">
              Vista Organigrama
            </span>
            <span className="rounded-md bg-surface-mist px-2 py-1 text-[10px] font-medium text-ink-soft border border-surface-line">
              Vista Lista
            </span>
          </div>
        </div>

        {/* Visual Org Tree */}
        <div className="mt-4 flex flex-col items-center space-y-4">
          {/* Level 0: Holding / Consejo */}
          <div className="w-64 rounded-xl border-2 border-brand-500 bg-white p-3 text-center shadow-card">
            <div className="flex items-center justify-between text-[10px] font-semibold text-brand-600">
              <span>NIVEL 1 · CORPORATIVO</span>
              <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-emerald-700">Activo</span>
            </div>
            <p className="mt-1 font-bold text-xs text-ink">Dirección General Corporativa</p>
            <p className="text-[10px] text-ink-muted">Director: Dr. Alejandro Valdés</p>
            <div className="mt-2 flex items-center justify-center gap-4 text-[9px] text-ink-soft border-t border-surface-line pt-1.5">
              <span>Plazas: <strong>6 / 6</strong></span>
              <span>UEBs dependientes: <strong>4</strong></span>
            </div>
          </div>

          <div className="h-4 w-0.5 bg-brand-300" />

          {/* Level 1: Companies / Business Units */}
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                name: "SiteCorp Servicios Centrales",
                type: "Empresa Matriz",
                lead: "Ing. Roberto Maza",
                headcount: "142 personas",
                fill: "96%",
              },
              {
                name: "UEB Producción & Logística",
                type: "Unidad Base Operativa",
                lead: "Msc. Elena Cordero",
                headcount: "480 personas",
                fill: "92%",
              },
              {
                name: "UEB Tecnologías & Desarrollo",
                type: "Unidad de Innovación",
                lead: "Lic. Carlos Navarro",
                headcount: "215 personas",
                fill: "98%",
              },
            ].map((node, i) => (
              <div
                key={i}
                className="rounded-xl border border-surface-line bg-white p-3 shadow-sm hover:border-brand-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-teal-700">
                    {node.type}
                  </span>
                  <span className="rounded bg-teal-50 px-1.5 py-0.5 text-[9px] font-semibold text-teal-800">
                    {node.fill}
                  </span>
                </div>
                <p className="mt-1.5 truncate text-xs font-bold text-ink">{node.name}</p>
                <p className="mt-0.5 text-[10px] text-ink-muted">Resp: {node.lead}</p>
                <div className="mt-2.5 flex items-center justify-between border-t border-surface-line pt-2 text-[10px] text-ink-soft">
                  <span>Plantilla: {node.headcount}</span>
                  <span className="text-brand-600 font-semibold hover:underline">Ver detalle →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Level 2 child nodes preview */}
          <div className="w-full rounded-xl border border-surface-line bg-white p-3">
            <p className="text-[11px] font-bold text-ink">Áreas y Departamentos dependientes</p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4 text-[10px]">
              <div className="rounded-lg bg-surface-mist p-2 border border-surface-line">
                <span className="font-semibold text-ink">Dpto. Recursos Humanos</span>
                <p className="text-ink-muted">14 plazas · Nivel 3</p>
              </div>
              <div className="rounded-lg bg-surface-mist p-2 border border-surface-line">
                <span className="font-semibold text-ink">Dpto. Finanzas y Control</span>
                <p className="text-ink-muted">18 plazas · Nivel 3</p>
              </div>
              <div className="rounded-lg bg-surface-mist p-2 border border-surface-line">
                <span className="font-semibold text-ink">Dpto. Ingeniería & Planta</span>
                <p className="text-ink-muted">95 plazas · Nivel 4</p>
              </div>
              <div className="rounded-lg bg-surface-mist p-2 border border-surface-line">
                <span className="font-semibold text-ink">Dpto. Infraestructura TI</span>
                <p className="text-ink-muted">22 plazas · Nivel 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

/** Mockup: Gestión de Personas */
function PersonasMockup({ url }: { url: string }) {
  return (
    <AppFrame url={url} className="w-full">
      <div className="bg-surface-mist p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 border-b border-surface-line bg-white p-3 rounded-xl">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-ink-muted" />
            <span className="text-xs text-ink-muted">Filtrar por nombre, DNI, puesto, unidad...</span>
          </div>
          <span className="rounded-md bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white">
            + Nuevo trabajador
          </span>
        </div>

        {/* Full Worker Profile Card */}
        <div className="mt-3 rounded-xl border border-surface-line bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <InitialsAvatar name="Laura Méndez" className="h-12 w-12 text-sm" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-ink">Laura Méndez Domínguez</h4>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    Contrato Indefinido
                  </span>
                </div>
                <p className="text-xs text-ink-muted">Especialista Principal de Recursos Humanos · UEB Servicios</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs font-bold text-ink">Expediente #SC-0428</span>
              <p className="text-[10px] text-ink-muted">Alta: 14/03/2021 · 5 años de antigüedad</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 text-[11px] border-t border-surface-line pt-3">
            <div className="rounded-lg bg-surface-mist p-2">
              <p className="text-[10px] text-ink-muted uppercase">Unidad Organizativa</p>
              <p className="font-semibold text-ink">Dpto. Selección y Nómina</p>
            </div>
            <div className="rounded-lg bg-surface-mist p-2">
              <p className="text-[10px] text-ink-muted uppercase">Plaza Presupuestada</p>
              <p className="font-semibold text-ink">PLZ-RH-008 (Cubierta)</p>
            </div>
            <div className="rounded-lg bg-surface-mist p-2">
              <p className="text-[10px] text-ink-muted uppercase">Escala Salarial</p>
              <p className="font-semibold text-brand-600">Escala VII · Categoría Superior</p>
            </div>
            <div className="rounded-lg bg-surface-mist p-2">
              <p className="text-[10px] text-ink-muted uppercase">Reporta a</p>
              <p className="font-semibold text-ink">Carlos Navarro (Director)</p>
            </div>
          </div>

          {/* Timeline of Career Moves */}
          <div className="mt-4 border-t border-surface-line pt-3">
            <p className="text-xs font-bold text-ink mb-2">Historial de movimientos internos</p>
            <div className="space-y-1.5 text-[10px]">
              <div className="flex items-center justify-between rounded bg-surface-mist px-2.5 py-1.5">
                <span className="font-semibold text-ink">Promoción a Especialista Principal</span>
                <span className="text-ink-muted">01/01/2024 · Escala VII</span>
                <span className="text-emerald-700 font-medium">Resolución Aprobada</span>
              </div>
              <div className="flex items-center justify-between rounded bg-surface-mist px-2.5 py-1.5">
                <span className="font-semibold text-ink">Reubicación de sede central a UEB Servicios</span>
                <span className="text-ink-muted">15/06/2022 · Mismo puesto</span>
                <span className="text-teal-700 font-medium">Anexo #2 Firmado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

/** Mockup: Planificación de Plantillas */
function PlantillasMockup({ url }: { url: string }) {
  return (
    <AppFrame url={url} className="w-full">
      <div className="bg-surface-mist p-4 sm:p-5">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-surface-line bg-white p-3">
            <span className="text-[10px] font-semibold uppercase text-ink-muted">Presupuestadas</span>
            <p className="font-display text-xl font-bold text-ink mt-1">1.320</p>
            <span className="text-[9px] text-teal-700 font-medium">Plazas autorizadas</span>
          </div>
          <div className="rounded-xl border border-surface-line bg-white p-3">
            <span className="text-[10px] font-semibold uppercase text-ink-muted">Plazas Cubiertas</span>
            <p className="font-display text-xl font-bold text-brand-600 mt-1">1.248</p>
            <span className="text-[9px] text-emerald-700 font-medium">94.5% de cobertura</span>
          </div>
          <div className="rounded-xl border border-surface-line bg-white p-3">
            <span className="text-[10px] font-semibold uppercase text-ink-muted">Plazas Vacantes</span>
            <p className="font-display text-xl font-bold text-accent-500 mt-1">72</p>
            <span className="text-[9px] text-accent-700 font-medium">42 en selección</span>
          </div>
          <div className="rounded-xl border border-surface-line bg-white p-3">
            <span className="text-[10px] font-semibold uppercase text-ink-muted">Masa Salarial</span>
            <p className="font-display text-xl font-bold text-ink mt-1">98.2%</p>
            <span className="text-[9px] text-teal-700 font-medium">Dentro de previsión</span>
          </div>
        </div>

        {/* Detailed Unit Quota Table */}
        <div className="mt-4 overflow-hidden rounded-xl border border-surface-line bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-surface-line bg-surface-mist px-4 py-2.5">
            <span className="text-xs font-bold text-ink">Estado de Plantillas por Centro de Trabajo</span>
            <span className="text-[10px] text-brand-600 font-medium">Exportar informe oficial (Excel/PDF)</span>
          </div>
          <div className="divide-y divide-surface-line text-[11px]">
            {[
              { unit: "Dirección de Operaciones", pres: 480, cub: 462, vac: 18, pct: "96.2%" },
              { unit: "Planta Industrial & Logística", pres: 390, cub: 362, vac: 28, pct: "92.8%" },
              { unit: "Tecnología, Sistemas y Datos", pres: 185, cub: 178, vac: 7, pct: "96.2%" },
              { unit: "Administración, Legal y RRHH", pres: 165, cub: 154, vac: 11, pct: "93.3%" },
              { unit: "Comercialización y Atención", pres: 100, cub: 92, vac: 8, pct: "92.0%" },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-surface-mist/60">
                <div className="min-w-0">
                  <p className="font-semibold text-ink truncate">{row.unit}</p>
                  <p className="text-[10px] text-ink-muted">Presupuesto anual 2026</p>
                </div>
                <div className="flex items-center gap-6 text-right">
                  <div>
                    <span className="text-ink-muted text-[10px]">Cubiertas</span>
                    <p className="font-bold text-ink">{row.cub} / {row.pres}</p>
                  </div>
                  <div className="w-16">
                    <span className="rounded-full bg-accent-50 px-2 py-0.5 text-[10px] font-bold text-accent-700">
                      {row.vac} vac.
                    </span>
                  </div>
                  <div className="w-12 font-mono font-bold text-teal-700">{row.pct}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

/** Mockup: Contratación */
function ContratacionMockup({ url }: { url: string }) {
  return (
    <AppFrame url={url} className="w-full">
      <div className="bg-surface-mist p-4 sm:p-5">
        <div className="rounded-xl border border-surface-line bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-surface-line pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                Expediente Contractual Activo
              </span>
              <h4 className="text-sm font-bold text-ink">Contrato de Trabajo por Tiempo Indeterminado</h4>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
              Vigente & Visado
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 text-[11px]">
            <div className="bg-surface-mist p-2.5 rounded-lg border border-surface-line">
              <span className="text-[10px] text-ink-muted">Empleado</span>
              <p className="font-semibold text-ink">Manuel Sotomayor Peña</p>
              <p className="text-[10px] text-ink-muted">DNI: 78.432.119-K</p>
            </div>
            <div className="bg-surface-mist p-2.5 rounded-lg border border-surface-line">
              <span className="text-[10px] text-ink-muted">Puesto y Nivel</span>
              <p className="font-semibold text-ink">Jefe de Mantenimiento</p>
              <p className="text-[10px] text-ink-muted">Nivel Grupo V · Plaza #PL-291</p>
            </div>
            <div className="bg-surface-mist p-2.5 rounded-lg border border-surface-line">
              <span className="text-[10px] text-ink-muted">Jornada y Modalidad</span>
              <p className="font-semibold text-ink">Tiempo Completo (40h/sem)</p>
              <p className="text-[10px] text-ink-muted">Turno Rotativo Operativo</p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-surface-line bg-white p-3">
            <p className="text-xs font-bold text-ink mb-2">Cláusulas y Anexos Vinculados</p>
            <div className="space-y-2 text-[10px]">
              <div className="flex items-center justify-between p-2 rounded bg-surface-mist">
                <span className="font-medium text-ink">Addenda 01: Modificación de centro a Planta Sur</span>
                <span className="text-teal-700 font-semibold">Firmado digitalmente</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-surface-mist">
                <span className="font-medium text-ink">Anexo 02: Asignación de responsabilidad de inventario</span>
                <span className="text-emerald-700 font-semibold">Vigente</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

/** Mockup: Documentos */
function DocumentosMockup({ url }: { url: string }) {
  return (
    <AppFrame url={url} className="w-full">
      <div className="bg-surface-mist p-4 sm:p-5">
        <div className="flex items-center justify-between border-b border-surface-line bg-white p-3 rounded-xl mb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-brand-500" />
            <span className="text-xs font-bold text-ink">Repositorio de Modelos y Plantillas Homologadas</span>
          </div>
          <span className="text-[10px] bg-brand-50 text-brand-700 font-semibold px-2 py-1 rounded">
            24 plantillas activas
          </span>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 text-[11px]">
          {[
            {
              title: "Contrato Laboral Indeterminado General",
              type: "Modelo Estándar",
              vars: "28 variables dinámicas vinculadas",
              status: "Aprobado Jurídica",
            },
            {
              title: "Resolución de Nombramiento de Cuadro",
              type: "Alta Dirección",
              vars: "16 variables organizativas",
              status: "Aprobado Dirección",
            },
            {
              title: "Anexo de Modificación Salarial y Escala",
              type: "Retributivo",
              vars: "12 variables salariales",
              status: "Aprobado RRHH",
            },
            {
              title: "Acuerdo de Confidencialidad y Seguridad",
              type: "Legal / Compliance",
              vars: "8 variables de empleado",
              status: "Obligatorio",
            },
          ].map((doc, i) => (
            <div key={i} className="rounded-xl border border-surface-line bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-teal-700 uppercase">{doc.type}</span>
                <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-semibold">
                  {doc.status}
                </span>
              </div>
              <p className="font-bold text-xs text-ink mt-1">{doc.title}</p>
              <p className="text-[10px] text-ink-muted mt-1">{doc.vars}</p>
              <div className="mt-2.5 flex items-center justify-between border-t border-surface-line pt-2 text-[10px]">
                <span className="text-brand-600 font-medium">Generar para empleado...</span>
                <span className="text-ink-muted">PDF / Word</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

/** Mockup: Gestión Laboral e Incidencias */
function GestionLaboralMockup({ url }: { url: string }) {
  return (
    <AppFrame url={url} className="w-full">
      <div className="bg-surface-mist p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2.5 mb-3 text-center">
          <div className="rounded-xl border border-surface-line bg-white p-2.5">
            <span className="text-[9px] uppercase font-bold text-ink-muted">Vacaciones Aprobadas</span>
            <p className="text-lg font-bold text-ink mt-0.5">38 empleados</p>
            <span className="text-[9px] text-teal-700">Este mes</span>
          </div>
          <div className="rounded-xl border border-surface-line bg-white p-2.5">
            <span className="text-[9px] uppercase font-bold text-ink-muted">Bajas Médicas (IT)</span>
            <p className="text-lg font-bold text-accent-600 mt-0.5">14 activas</p>
            <span className="text-[9px] text-ink-muted">Partes confirmados</span>
          </div>
          <div className="rounded-xl border border-surface-line bg-white p-2.5">
            <span className="text-[9px] uppercase font-bold text-ink-muted">Alertas de Vencimiento</span>
            <p className="text-lg font-bold text-rose-600 mt-0.5">6 contratos</p>
            <span className="text-[9px] text-rose-700 font-medium">Próximos 30 días</span>
          </div>
        </div>

        <div className="rounded-xl border border-surface-line bg-white p-3 shadow-sm text-[11px]">
          <p className="font-bold text-ink text-xs mb-2">Incidencias del Periodo para Cierre de Nómina</p>
          <div className="space-y-2">
            {[
              { emp: "Martín Padrón", desc: "Licencia de paternidad (15 días)", date: "10/11 al 25/11", state: "Visado" },
              { emp: "Silvia Quintana", desc: "Baja médica traumatológica (Parte #3)", date: "En curso", state: "Parte recibido" },
              { emp: "Jorge Castillo", desc: "Vencimiento periodo de prueba plaza PL-094", date: "28/11/2026", state: "Evaluación OK" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-surface-mist border border-surface-line">
                <div>
                  <p className="font-bold text-ink">{item.emp}</p>
                  <p className="text-[10px] text-ink-muted">{item.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-ink-soft">{item.date}</span>
                  <p className="text-[9px] text-emerald-700 font-bold">{item.state}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

/** Mockup: Administración y Seguridad */
function AdministracionMockup({ url }: { url: string }) {
  return (
    <AppFrame url={url} className="w-full">
      <div className="bg-surface-mist p-4 sm:p-5">
        <div className="rounded-xl border border-surface-line bg-white p-3 mb-3">
          <div className="flex items-center justify-between border-b border-surface-line pb-2 mb-2">
            <span className="text-xs font-bold text-ink">Perfiles y Roles por Entidad Organizativa</span>
            <span className="rounded bg-teal-50 px-2 py-0.5 text-[9px] font-bold text-teal-700">
              RBAC Jerárquico Activo
            </span>
          </div>
          <div className="space-y-1.5 text-[10px]">
            <div className="flex items-center justify-between p-2 rounded bg-surface-mist">
              <div>
                <span className="font-bold text-ink">Super Administrador Corporativo</span>
                <p className="text-ink-muted">Acceso global a todas las empresas, finanzas y configuración</p>
              </div>
              <span className="rounded-full bg-brand-500 text-white px-2 py-0.5 text-[9px] font-bold">Total</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-surface-mist">
              <div>
                <span className="font-bold text-ink">Gestor de Recursos Humanos (UEB)</span>
                <p className="text-ink-muted">Gestión de trabajadores y contratos solo en su unidad asignada</p>
              </div>
              <span className="rounded-full bg-teal-100 text-teal-800 px-2 py-0.5 text-[9px] font-bold">Acotado UEB</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-surface-mist">
              <div>
                <span className="font-bold text-ink">Mando Intermedio / Responsable de Área</span>
                <p className="text-ink-muted">Visualización de equipo y validación de vacaciones sin datos salariales</p>
              </div>
              <span className="rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-[9px] font-bold">Sin salarios</span>
            </div>
          </div>
        </div>

        {/* Audit Log Preview */}
        <div className="rounded-xl border border-surface-line bg-white p-3 shadow-sm text-[10px]">
          <p className="font-bold text-xs text-ink mb-1.5">Registro de Auditoría en Tiempo Real</p>
          <div className="divide-y divide-surface-line font-mono text-[9px]">
            <div className="py-1.5 flex justify-between text-ink-muted">
              <span>2026-10-30 14:12:05</span>
              <span className="text-ink font-semibold">avaldes@holding.com</span>
              <span className="text-brand-600">Creó nueva plaza en UEB Logística</span>
            </div>
            <div className="py-1.5 flex justify-between text-ink-muted">
              <span>2026-10-30 11:30:19</span>
              <span className="text-ink font-semibold">ecordero@ueb.com</span>
              <span className="text-teal-700">Aprobó contrato #CT-2026-091</span>
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}
