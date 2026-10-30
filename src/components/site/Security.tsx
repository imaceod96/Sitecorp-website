import { KeyRound, EyeOff, History, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Layout";
import { PermissionsMockup } from "./mockups/PermissionsMockup";

interface SecurityItem {
  icon: typeof KeyRound;
  title: string;
  description: string;
  details: string[];
}

const SECURITY_POINTS: SecurityItem[] = [
  {
    icon: KeyRound,
    title: "Roles y perfiles jerárquicos",
    description:
      "Configura permisos adaptados a cada función directiva y operativa: Superadministrador corporativo, Director de empresa, Gestor de recursos humanos y Responsable de área.",
    details: [
      "Perfiles predefinidos basados en buenas prácticas",
      "Asignación de permisos por nivel y departamento",
      "Control estricto de altas, ediciones y borrados",
    ],
  },
  {
    icon: EyeOff,
    title: "Aislamiento de acceso por entidad",
    description:
      "Si gestionas varias empresas o UEBs, cada usuario accede únicamente a la información de su respectiva unidad. Los datos de una filial nunca son visibles para otra salvo autorización corporativa.",
    details: [
      "Separación estricta de bases de datos por entidad",
      "Visibilidad acotada a la rama del organigrama asignada",
      "Acceso consolidado exclusivo para la alta dirección",
    ],
  },
  {
    icon: Lock,
    title: "Protección de datos sensibles y salarios",
    description:
      "La información salarial, las evaluaciones internas y los expedientes contractuales disponen de capas de visibilidad restringida que los mandos intermedios no pueden consultar.",
    details: [
      "Banda salarial oculta para perfiles no autorizados",
      "Acceso restringido a documentación personal y bancaria",
      "Permisos específicos para la preparación de prenómina",
    ],
  },
  {
    icon: History,
    title: "Historial inmutable y trazabilidad",
    description:
      "Registro de auditoría continuo que conserva quién ha modificado cualquier dato de la organización, en qué momento exacto y cuál era el valor anterior.",
    details: [
      "Log cronológico con fecha, hora y usuario responsable",
      "Trazabilidad completa en cambios de plaza y contratos",
      "Informes de auditoría exportables para comités",
    ],
  },
];

export function Security() {
  return (
    <Section id="seguridad" tone="navy" className="relative overflow-hidden py-20 sm:py-24">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-brand-400/10 blur-3xl" />

      <div className="relative z-10">
        <SectionHeading
          align="center"
          tone="light"
          eyebrow="Seguridad, Permisos y Trazabilidad"
          title="Control riguroso del acceso a la información corporativa"
          description="Cada persona en la organización accede estrictamente a lo que requiere para su cometido, garantizando la total confidencialidad de la estructura y de los datos laborales."
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

        <div className="mt-14 max-w-4xl mx-auto">
          <Reveal delay={120}>
            <PermissionsMockup />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}