import {
  Database,
  ShieldAlert,
  Zap,
  CheckCircle2,
  Layers,
  ArrowRight,
  Eye,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Layout";
import { InitialsAvatar } from "./mockups/AppFrame";
import { useDemo } from "@/context/DemoContext";

interface BenefitPillar {
  id: string;
  tag: string;
  icon: typeof Database;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
}

const PILLARS: BenefitPillar[] = [
  {
    id: "centralizacion",
    tag: "Pilar 1",
    icon: Database,
    title: "Centralización",
    tagline: "Información organizativa y laboral conectada",
    description:
      "Toda la realidad de tu empresa vive en un único repositorio estructurado. Estructuras, trabajadores, puestos, contratos y escalas salariales sincronizados para que nadie trabaje con datos desfasados.",
    bullets: [
      "Ficha laboral unificada sin duplicación de expedientes",
      "Estructuras organizativas y plazas compartidas entre áreas",
      "Actualización inmediata: los cambios se reflejan en toda la plataforma",
    ],
  },
  {
    id: "control",
    tag: "Pilar 2",
    icon: Eye,
    title: "Control",
    tagline: "Visibilidad sobre estructuras, personas y procesos",
    description:
      "Supervisa con claridad qué puestos están autorizados, quién ocupa cada plaza y qué aprobaciones están pendientes. Información contrastable y trazabilidad completa de cada modificación.",
    bullets: [
      "Monitoreo de plantilla presupuestada vs operativa en tiempo real",
      "Permisos por rol y ámbito para salvaguardar datos confidenciales",
      "Historial de movimientos y auditoría completa de operaciones",
    ],
  },
  {
    id: "eficiencia",
    tag: "Pilar 3",
    icon: Zap,
    title: "Eficiencia",
    tagline: "Menos tareas fragmentadas, procesos más organizados",
    description:
      "Sustituye múltiples hojas de cálculo y documentos dispersos por flujos automatizados de gestión. Tu equipo de recursos humanos invierte su tiempo en el valor de las personas y no en cuadrar archivos.",
    bullets: [
      "Generación ágil de contratos, adendas y certificados oficiales",
      "Trámite ordenado de vacaciones, licencias e incidencias laborales",
      "Preparación estructurada de la prenómina sin errores manuales",
    ],
  },
];

const FIELDS = [
  { label: "Unidad", value: "Capital Humano" },
  { label: "Puesto", value: "Especialista Principal" },
  { label: "Nivel", value: "Grupo XXI · Escala B" },
  { label: "Reporta a", value: "Dirección General" },
];

export function Benefits() {
  const { openDemo } = useDemo();

  return (
    <Section id="beneficios" tone="mist" className="relative">
      <SectionHeading
        eyebrow="Propuesta de valor"
        title="Diseñado para resolver la dispersión organizativa"
        description="Sitecorp sustituye la gestión basada en archivos aislados por un modelo integral donde cada dato está conectado y verificado."
      />

      {/* 3 Pillars Grid */}
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {PILLARS.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <Reveal key={pillar.id} delay={index * 100}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-surface-line bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-teal-700">
                      {pillar.tag}
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 text-teal-600">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-ink">
                    {pillar.title}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-brand-600">
                    {pillar.tagline}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-surface-line pt-5">
                  <ul className="space-y-2.5">
                    {pillar.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-ink-soft">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Integrated Live Preview Box */}
      <div className="mt-14 rounded-3xl border border-surface-line bg-white p-6 shadow-card sm:p-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Conexión en tiempo real
            </span>
            <h3 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
              Un único dato, visible en todos los módulos
            </h3>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              Cuando se actualiza el puesto o la unidad de una persona, el organigrama, el cómputo
              de plantilla presupuestada y las escalas salariales se actualizan de forma automática y
              consistente. Sin desajustes ni conciliaciones manuales.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={openDemo}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-xs font-bold text-white shadow-soft transition-all hover:bg-brand-600"
              >
                Solicitar demo de la plataforma
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Visual card */}
          <div className="relative rounded-2xl border border-surface-line bg-surface-mist p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-surface-line pb-3">
              <div className="flex items-center gap-2">
                <InitialsAvatar name="Ana Ruiz" className="h-9 w-9 text-xs" />
                <div>
                  <p className="text-xs font-bold text-ink">Ana Ruiz González</p>
                  <p className="text-[10px] text-ink-muted">Expediente ID: TR-0042</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                Sincronizado
              </span>
            </div>

            <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs">
              {FIELDS.map((f) => (
                <div key={f.label} className="rounded-lg bg-white p-2.5 shadow-xs">
                  <p className="text-[10px] uppercase tracking-wider text-ink-muted">{f.label}</p>
                  <p className="font-semibold text-ink">{f.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-3.5 rounded-lg border border-teal-200 bg-teal-50/70 p-2.5 text-[11px] text-teal-900">
              <span className="font-bold">Efecto automático:</span> Plazas ocupadas en Capital Humano recalculadas y registradas en auditoría interna.
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}