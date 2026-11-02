import { useState } from "react";
import { KeyRound, EyeOff, History, Lock, CheckCircle2, Expand, X, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Layout";
import { PRODUCT_SCREENSHOTS } from "@/lib/screenshots";

interface SecurityItem {
  icon: typeof KeyRound;
  title: string;
  description: string;
  details: string[];
}

const SECURITY_POINTS: SecurityItem[] = [
  {
    icon: KeyRound,
    title: "Catálogo de 47 permisos internos",
    description:
      "Configura roles internos por entidad seleccionando permisos granulares controlados por base de datos: Organización, Usuarios, Roles, Candidatos, Plantilla, Trabajadores y Contratación.",
    details: [
      "Separación entre permisos .view y .manage",
      "Permisos específicos de invitación (users.invite)",
      "Control de importación inicial (workers.initial_import)",
    ],
  },
  {
    icon: EyeOff,
    title: "Aislamiento por Entidad y UEB",
    description:
      "En grupos empresariales con múltiples empresas y UEBs, cada usuario opera estrictamente dentro de las entidades autorizadas, con selector rápido de espacio de trabajo.",
    details: [
      "13+ entidades jerárquicas (Grupo, Empresas y UEBs)",
      "Alcance acotado a la unidad o incluyendo descendientes",
      "Roles internos independientes por cada entidad",
    ],
  },
  {
    icon: Lock,
    title: "Protección de escalas y contratos",
    description:
      "La modificación de escalas salariales (Grupos I al XXIV), plantillas del Anexo 14B y modelos documentales Word está restringida a perfiles con autorización explícita.",
    details: [
      "Control de edición sobre tarifas salariales en CUP",
      "Custodia de certificados médicos y modelos SC-4-04",
      "Acceso restringido a configuración de plantilla",
    ],
  },
  {
    icon: History,
    title: "Historial salarial y trazabilidad",
    description:
      "Cada cambio en la escala salarial, movimiento de trabajador o generación documental conserva su registro histórico para auditorías internas e inspecciones.",
    details: [
      "Botón 'Ver historial' en cada grupo de escala salarial",
      "Trazabilidad de altas, migraciones y bajas",
      "Respaldo documental en PDF por cada evento laboral",
    ],
  },
];

export function Security() {
  const [zoomedImage, setZoomedImage] = useState<{ src: string; title: string } | null>(null);

  const rolesShot = PRODUCT_SCREENSHOTS.rolesPermisos;
  const entitiesShot = PRODUCT_SCREENSHOTS.entidades;

  return (
    <Section id="seguridad" tone="navy" className="relative overflow-hidden py-20 sm:py-24">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-brand-400/10 blur-3xl" />

      <div className="relative z-10">
        <SectionHeading
          align="center"
          tone="light"
          eyebrow="Seguridad, Roles y Aislamiento Multi-Entidad"
          title="Control riguroso con 47 permisos internos y espacios por entidad"
          description="Así funciona el control de acceso real en SiteCorp: matriz de permisos controlada por base de datos y selector jerárquico para aislar cada Grupo, Empresa y UEB."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SECURITY_POINTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 80}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-teal-400/30 hover:bg-white/[0.08]">
                  <div>
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-accent-300">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-teal-100/80">
                      {item.description}
                    </p>
                  </div>

                  <ul className="mt-5 space-y-1.5 border-t border-white/10 pt-4 text-[11px] text-teal-100/90">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3 shrink-0 text-accent-400" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Real Screenshots of Selector de Entidades + Matriz de Permisos por Rol */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Card 1: Matriz de Permisos por Rol (47 permisos internos) */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.06] p-5 sm:p-6 backdrop-blur-md">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-300">
                      <Sparkles className="h-3.5 w-3.5" />
                      1. Matriz de Permisos por Rol (47 Permisos)
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setZoomedImage({ src: rolesShot.src, title: rolesShot.title })
                      }
                      className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-white hover:bg-white/20"
                    >
                      <Expand className="h-3.5 w-3.5" />
                      Ampliar
                    </button>
                  </div>
                  <h4 className="mt-3 font-display text-lg font-bold text-white">
                    {rolesShot.title}
                  </h4>
                  <p className="mt-1 text-xs text-teal-100/80">
                    {rolesShot.subtitle}
                  </p>
                </div>

                <div
                  onClick={() =>
                    setZoomedImage({ src: rolesShot.src, title: rolesShot.title })
                  }
                  className="group relative mt-4 cursor-zoom-in overflow-hidden rounded-xl border border-white/15 bg-white p-2 shadow-lg"
                >
                  <img
                    src={rolesShot.src}
                    alt={rolesShot.title}
                    className="mx-auto max-h-[380px] w-auto object-contain"
                  />
                  <div className="absolute bottom-3 right-3 rounded-lg bg-ink/85 px-3 py-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Clic para ampliar matriz de permisos
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Card 2: Selector Jerárquico de Entidades */}
          <div className="lg:col-span-5">
            <Reveal delay={180}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.06] p-5 sm:p-6 backdrop-blur-md">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-400/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-200">
                      <Sparkles className="h-3.5 w-3.5" />
                      2. Selector de Entidades y UEBs
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setZoomedImage({ src: entitiesShot.src, title: entitiesShot.title })
                      }
                      className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-white hover:bg-white/20"
                    >
                      <Expand className="h-3.5 w-3.5" />
                      Ampliar
                    </button>
                  </div>
                  <h4 className="mt-3 font-display text-lg font-bold text-white">
                    {entitiesShot.title}
                  </h4>
                  <p className="mt-1 text-xs text-teal-100/80">
                    {entitiesShot.subtitle}
                  </p>
                </div>

                <div
                  onClick={() =>
                    setZoomedImage({ src: entitiesShot.src, title: entitiesShot.title })
                  }
                  className="group relative mt-4 cursor-zoom-in overflow-hidden rounded-xl border border-white/15 bg-white p-2 shadow-lg"
                >
                  <img
                    src={entitiesShot.src}
                    alt={entitiesShot.title}
                    className="mx-auto max-h-[380px] w-auto object-contain"
                  />
                  <div className="absolute bottom-3 right-3 rounded-lg bg-ink/85 px-3 py-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Clic para ampliar selector de entidades
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setZoomedImage(null)}
        >
          <div
            className="relative max-h-[92vh] max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl"
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