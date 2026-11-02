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
  Layers,
  Sparkles,
  Coins,
  Expand,
  X,
} from "lucide-react";
import { Section, SectionHeading } from "./Layout";
import { Reveal } from "./Reveal";
import { AppFrame } from "./mockups/AppFrame";
import { Button } from "@/components/ui/button";
import { PRODUCT_SCREENSHOTS, ScreenshotKey } from "@/lib/screenshots";

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
  screenshots: {
    key: ScreenshotKey;
    tabLabel: string;
  }[];
}

const MODULES: ModuleData[] = [
  {
    id: "organizacion",
    name: "Organización",
    shortLabel: "Estructura",
    icon: Building2,
    badge: "Arquitectura Multi-Entidad",
    title: "Grupos Empresariales, Empresas y UEBs en una estructura viva",
    description:
      "Modela con total fidelidad tu jerarquía corporativa: alterna en un clic entre el Grupo Empresarial, sus Empresas filiales y sus Unidades Empresariales de Base (UEB), o consolida indicadores incluyendo todas las entidades descendientes.",
    capabilities: [
      {
        title: "Selector jerárquico de entidades (Grupo → Empresa → UEB)",
        description:
          "Navegación en árbol por todas las entidades disponibles con buscador rápido y etiquetas por nivel.",
      },
      {
        title: "Alcance 'Esta entidad' vs 'Entidad + descendientes'",
        description:
          "Consulta el resumen ejecutivo de una unidad aislada o consolida automáticamente todas sus UEBs subordinadas.",
      },
      {
        title: "Distribución por área y categoría ocupacional",
        description:
          "Visualiza al instante el desglose de trabajadores por dirección corporativa y categoría (Cuadro, Técnico, etc.).",
      },
      {
        title: "Espacios de trabajo independientes y seguros",
        description:
          "Cada entidad mantiene su propia plantilla, contratos y configuración bajo una misma plataforma.",
      },
    ],
    screenshots: [
      { key: "entidades", tabLabel: "Selector de Entidades (UEBs)" },
      { key: "resumen", tabLabel: "Resumen Consolidado" },
    ],
  },
  {
    id: "personas",
    name: "Personas",
    shortLabel: "Trabajadores",
    icon: Users,
    badge: "Directorio & Expediente",
    title: "Directorio de trabajadores, candidatos y reingresos",
    description:
      "Centraliza el padrón de personas que pertenecen a cada entidad con su código único de trabajador, carné de identidad, datos de contacto, estado de completitud de su ficha y vínculo directo con la plantilla autorizada.",
    capabilities: [
      {
        title: "Estado de expediente y vínculo a plantilla",
        description:
          "Indicadores inmediatos que confirman si el trabajador está 'Vinculado a plantilla' y tiene 'Ficha completa'.",
      },
      {
        title: "Gestión diferenciada: Candidatos, Trabajadores y Reingresos",
        description:
          "Flujo ordenado desde la bolsa de candidatos activos hasta el alta definitiva o reincorporación.",
      },
      {
        title: "Codificación unívoca y búsqueda rápida",
        description:
          "Localiza cualquier persona al instante por nombre, código interno (ej. TRB-050BA5), CI o correo.",
      },
      {
        title: "Filtros multicriterio por entidad",
        description:
          "Segmentación ágil del personal activo dentro de cada empresa o Unidad Empresarial de Base.",
      },
    ],
    screenshots: [{ key: "trabajadores", tabLabel: "Directorio de Trabajadores" }],
  },
  {
    id: "plantillas",
    name: "Plantilla & Anexo 14B",
    shortLabel: "Plantilla",
    icon: Layers,
    badge: "Control de Plazas",
    title: "Estructura del Anexo 14B: plazas autorizadas, ocupadas y vacantes",
    description:
      "Controla la estructura organizativa exacta de la entidad (Área → Cargo/Puesto → capacidad autorizada, ocupación y vacantes), con soporte nativo para exportar el Anexo 14B oficial y migrar trabajadores entre plazas.",
    capabilities: [
      {
        title: "Estructura idéntica al Anexo 14B oficial",
        description:
          "Organización por Direcciones y Áreas con el detalle de cada cargo, categoría ocupacional y grupo escala.",
      },
      {
        title: "Exportación directa del Anexo 14B",
        description:
          "Genera y descarga el reporte oficial del Anexo 14B listo para auditorías, comités y organismos superiores.",
      },
      {
        title: "Control de capacidad autorizada vs ocupación real",
        description:
          "Supervisa en tiempo real cuántas plazas están aprobadas, cuántas ocupadas y cuántas vacantes quedan por área.",
      },
      {
        title: "Migración guiada de trabajadores",
        description:
          "Reubica o migra trabajadores entre plazas y áreas manteniendo la coherencia salarial y estructural.",
      },
    ],
    screenshots: [{ key: "plantilla", tabLabel: "Plantilla y Anexo 14B" }],
  },
  {
    id: "contratacion",
    name: "Contratación",
    shortLabel: "Contratos",
    icon: Briefcase,
    badge: "Cobertura de Vacantes",
    title: "Cobertura controlada de vacantes sobre la plantilla autorizada",
    description:
      "Incorpora trabajadores cubriendo directamente las plazas disponibles en la plantilla autorizada de la entidad. El sistema impide sobrecupos y vincula cada contrato al puesto, categoría ocupacional y salario oficial correspondiente.",
    capabilities: [
      {
        title: "Panel en vivo de puestos con vacantes",
        description:
          "Identifica al instante qué cargos tienen plazas libres ('CON VACANTES') y cuáles están al 100% ('CUBIERTO').",
      },
      {
        title: "Flujo directo 'Cubrir puesto'",
        description:
          "Inicia la contratación desde la propia plaza vacante heredando automáticamente su área, escala y salario.",
      },
      {
        title: "Control de contratos vigentes y vencimientos",
        description:
          "Seguimiento de contratos por tiempo indeterminado, determinado y alertas de próximos a vencer.",
      },
      {
        title: "Trazabilidad de movimientos y anexos",
        description:
          "Cada alta, cambio de plaza o suplemento queda registrado en el historial contractual del trabajador.",
      },
    ],
    screenshots: [{ key: "contratacion", tabLabel: "Cobertura de Vacantes" }],
  },
  {
    id: "escalas",
    name: "Escalas Salariales",
    shortLabel: "Escalas",
    icon: Coins,
    badge: "Clasificador 24 Grupos",
    title: "Clasificador salarial de complejidad (Grupos I al XXIV)",
    description:
      "Configura la escala salarial oficial de la entidad según su régimen (Empresarial o Presupuestado) a través de los 24 grupos de complejidad, con actualización inmediata en los cargos de la plantilla y registro histórico de modificaciones.",
    capabilities: [
      {
        title: "24 Grupos de complejidad (I al XXIV)",
        description:
          "Gestión completa del clasificador salarial (ej. de 2 800,00 a 16 200,00 CUP) con estado activo por grupo.",
      },
      {
        title: "Adaptación por Régimen (Empresarial / Presupuestado)",
        description:
          "Define las tarifas salariales propias de cada grupo o empresa manteniendo la estructura normativa.",
      },
      {
        title: "Actualización salarial con historial",
        description:
          "Modifica el salario de cualquier grupo escala ('Cambiar salario') conservando la trazabilidad en 'Ver historial'.",
      },
      {
        title: "Sincronización automática con la Plantilla",
        description:
          "Cada cargo en el Anexo 14B refleja automáticamente el salario vigente de su Grupo Escala asignado.",
      },
    ],
    screenshots: [{ key: "escalaSalarial", tabLabel: "Escala Salarial (Grupos I–XXIV)" }],
  },
  {
    id: "documentos",
    name: "Documentos",
    shortLabel: "Documentación",
    icon: FileText,
    badge: "Plantillas Word Dinámicas",
    title: "Plantillas Word (.doc / .docx) con autocompletado de datos reales",
    description:
      "Sube los modelos oficiales de tu entidad en formato Word (.doc o .docx) con marcadores dinámicos como {{{worker.full_name}}} para generar contratos, anexos, resoluciones y el modelo SC-4-04 listos para firmar.",
    capabilities: [
      {
        title: "Catálogo completo de documentos laborales",
        description:
          "Contratos Determinados e Indeterminados, Anexos, Modelo SC-4-04, Resoluciones y Movimientos de Nómina.",
      },
      {
        title: "Respeta el diseño Word original de tu empresa",
        description:
          "Carga tus propios archivos .doc y .docx con tus encabezados, logos y cláusulas jurídicas específicas.",
      },
      {
        title: "Marcadores dinámicos inteligentes",
        description:
          "El sistema sustituye automáticamente variables del trabajador, cargo, salario y entidad al generar el documento.",
      },
      {
        title: "Control de documentos pendientes",
        description:
          "Módulo dedicado en el menú lateral para dar seguimiento a la documentación laboral pendiente de firma o entrega.",
      },
    ],
    screenshots: [{ key: "documentos", tabLabel: "Plantillas Word (.docx)" }],
  },
  {
    id: "gestion-laboral",
    name: "Gestión Laboral",
    shortLabel: "Laboral",
    icon: CalendarCheck2,
    badge: "Vacaciones, Licencias & SC-4-04",
    title: "Saldos de vacaciones, certificados médicos y prenómina",
    description:
      "Administra con precisión los saldos y devengos mensuales de vacaciones (+1.92 días), controla el límite de 24 días acumulados y registra certificados médicos en PDF generando automáticamente el Modelo SC-4-04.",
    capabilities: [
      {
        title: "Saldos, devengos (+1.92) y proyección de vacaciones",
        description:
          "Visualiza por trabajador el saldo disponible, próximo devengo, saldo proyectado y alertas del límite de 24 días.",
      },
      {
        title: "Registro de Certificados Médicos con respaldo PDF",
        description:
          "Almacena fechas de salida y reincorporación, días de afectación y el archivo PDF digitalizado del certificado.",
      },
      {
        title: "Generación directa del Modelo SC-4-04",
        description:
          "Emite en un clic la Notificación oficial de Vacaciones, Deducciones, Licencias y Subsidios (SC-4-04).",
      },
      {
        title: "Integración con Capacitación, SST y Prenómina",
        description:
          "Conecta las incidencias del período con la preparación de la prenómina, capacitación y seguridad y salud (SST).",
      },
    ],
    screenshots: [
      { key: "vacaciones", tabLabel: "Saldos de Vacaciones" },
      { key: "licencias", tabLabel: "Certificados Médicos & SC-4-04" },
    ],
  },
  {
    id: "administracion",
    name: "Seguridad y Roles",
    shortLabel: "Seguridad",
    icon: ShieldCheck,
    badge: "RBAC · 47 Permisos",
    title: "Roles internos a medida con catálogo de 47 permisos granulares",
    description:
      "Define roles específicos por entidad seleccionando con precisión quirúrgica entre 47 permisos internos controlados por base de datos: desde lectura de organigrama hasta gestión de plantilla, contratación o importación inicial.",
    capabilities: [
      {
        title: "Catálogo controlado de 47 permisos internos",
        description:
          "Permisos granulares agrupados por dominio: Organización, Usuarios, Roles, Candidatos, Plantilla, Trabajadores y Contratación.",
      },
      {
        title: "Separación estricta entre .view y .manage",
        description:
          "Otorga acceso de solo consulta (ej. workers.view) o capacidad de edición (workers.manage) según el cargo.",
      },
      {
        title: "Roles internos aislados por entidad",
        description:
          "Cada empresa o UEB puede contar con sus propios roles operativos sin comprometer otras entidades del grupo.",
      },
      {
        title: "Control de invitaciones e importación masiva",
        description:
          "Permisos dedicados para invitar usuarios (users.invite) o ejecutar cargas iniciales (workers.initial_import).",
      },
    ],
    screenshots: [{ key: "rolesPermisos", tabLabel: "Matriz de 47 Permisos" }],
  },
];

export function PlatformExplorer({ onRequestDemo }: PlatformExplorerProps) {
  const [selectedId, setSelectedId] = useState("organizacion");
  const [subShotIndex, setSubShotIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<{ src: string; title: string } | null>(null);
  const tablistId = useId();

  const activeModule = MODULES.find((m) => m.id === selectedId) || MODULES[0];
  const currentScreenshotEntry =
    activeModule.screenshots[subShotIndex] || activeModule.screenshots[0];
  const currentShot = PRODUCT_SCREENSHOTS[currentScreenshotEntry.key];

  const handleModuleChange = (id: string) => {
    setSelectedId(id);
    setSubShotIndex(0);
  };

  return (
    <Section id="explorador" tone="white" className="relative pt-12 pb-24">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 flex justify-center">
        <div className="h-96 w-[800px] rounded-full bg-teal-50/70 blur-3xl" />
      </div>

      <SectionHeading
        eyebrow="Explorador Interactivo con Capturas Reales"
        title="Así luce y funciona SiteCorp por dentro"
        description="Selecciona cualquiera de los 8 módulos reales del sistema para inspeccionar su interfaz, sus flujos de trabajo y la información exacta que gestiona."
      />

      {/* Module Selector Tabs */}
      <div className="mt-12">
        <div
          role="tablist"
          id={tablistId}
          aria-label="Módulos de la plataforma Sitecorp"
          className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-surface-line bg-surface-mist p-2 sm:gap-2"
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
                onClick={() => handleModuleChange(m.id)}
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

              <h3 className="mt-3.5 text-2xl font-bold leading-tight text-ink sm:text-[1.75rem] font-display">
                {activeModule.title}
              </h3>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink-muted">
                {activeModule.description}
              </p>

              <div className="mt-7 space-y-4">
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

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => onRequestDemo(activeModule.name)}
                  className="group h-11 rounded-xl bg-brand-500 px-5 text-sm font-semibold text-white shadow-soft hover:bg-brand-600"
                >
                  Solicitar demo de {activeModule.name}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <button
                  type="button"
                  onClick={() =>
                    setZoomedImage({ src: currentShot.src, title: currentShot.title })
                  }
                  className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-surface-line bg-white px-4 text-xs font-semibold text-ink-soft hover:border-brand-300 hover:bg-brand-50"
                >
                  <Expand className="h-3.5 w-3.5" />
                  Ampliar captura real
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Real Product Screenshot inside AppFrame */}
          <div className="lg:col-span-7">
            <Reveal key={`mockup-${activeModule.id}-${currentShot.id}`} delay={100}>
              <AppFrame url={currentShot.url} className="w-full shadow-lift">
                <div className="bg-surface-mist p-3 sm:p-4">
                  {/* Sub-view switcher if module has multiple screenshots */}
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-surface-line bg-white px-3 py-2">
                    {activeModule.screenshots.length > 1 ? (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {activeModule.screenshots.map((shotItem, idx) => (
                          <button
                            key={shotItem.key}
                            type="button"
                            onClick={() => setSubShotIndex(idx)}
                            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                              subShotIndex === idx
                                ? "bg-brand-500 text-white shadow-sm"
                                : "bg-surface-mist text-ink-soft hover:bg-teal-50 hover:text-teal-800"
                            }`}
                          >
                            {shotItem.tabLabel}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-ink">{currentShot.title}</span>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setZoomedImage({ src: currentShot.src, title: currentShot.title })
                      }
                      className="inline-flex items-center gap-1 rounded-md bg-surface-mist px-2.5 py-1 text-[11px] font-semibold text-brand-600 hover:bg-brand-50"
                    >
                      <Expand className="h-3 w-3" />
                      Ver grande
                    </button>
                  </div>

                  {/* Screenshot Image Container */}
                  <div
                    onClick={() =>
                      setZoomedImage({ src: currentShot.src, title: currentShot.title })
                    }
                    className="group relative cursor-zoom-in overflow-hidden rounded-xl border border-surface-line bg-white shadow-sm"
                  >
                    <img
                      src={currentShot.src}
                      alt={currentShot.title}
                      className={`mx-auto h-auto ${
                        currentShot.id === "entidades" ||
                        currentShot.id === "documentos" ||
                        currentShot.id === "rolesPermisos"
                          ? "max-h-[480px] w-auto object-contain p-2"
                          : "w-full object-cover"
                      }`}
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-ink/80 px-3 py-1.5 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                      <Expand className="h-3.5 w-3.5" />
                      Clic para ampliar imagen
                    </div>
                  </div>

                  {/* Highlights Footer */}
                  <div className="mt-3 rounded-xl border border-surface-line bg-white p-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                      Detalles visibles en esta pantalla real:
                    </p>
                    <ul className="mt-1.5 space-y-1">
                      {currentShot.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-ink-soft">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AppFrame>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setZoomedImage(null)}
        >
          <div
            className="relative max-h-[92vh] max-w-6xl overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-surface-line bg-surface-mist px-4 py-3">
              <p className="text-xs font-bold text-ink sm:text-sm">{zoomedImage.title}</p>
              <button
                type="button"
                onClick={() => setZoomedImage(null)}
                className="rounded-lg p-1 text-ink-muted hover:bg-white hover:text-ink"
                aria-label="Cerrar vista ampliada"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[82vh] overflow-auto bg-surface-mist p-2 sm:p-4">
              <img
                src={zoomedImage.src}
                alt={zoomedImage.title}
                className="mx-auto h-auto max-w-full rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
