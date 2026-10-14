import {
  Briefcase,
  CalendarRange,
  Coins,
  Network,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Layout";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Network,
    title: "Estructuras organizativas",
    description:
      "Crea unidades, departamentos y niveles jerárquicos que reflejen cómo funciona tu empresa de verdad.",
  },
  {
    icon: Users,
    title: "Gestión de trabajadores",
    description:
      "Cada persona con su ficha completa: datos, contrato, puesto y trayectoria, siempre actualizados.",
  },
  {
    icon: Briefcase,
    title: "Puestos de trabajo",
    description:
      "Define y estandariza puestos, responsabilidades y requisitos para toda la organización.",
  },
  {
    icon: CalendarRange,
    title: "Planificación de plantillas",
    description:
      "Anticipa las necesidades de personal de cada área y planifica el crecimiento con una visión clara.",
  },
  {
    icon: Coins,
    title: "Escalas salariales",
    description:
      "Configura niveles, bandas y baremos adaptados a tus convenios y a tu política retributiva.",
  },
  {
    icon: ShieldCheck,
    title: "Permisos y accesos",
    description:
      "Define qué puede ver y hacer cada perfil en cada nivel de la organización, sin excepciones manuales.",
  },
];

export function Features() {
  return (
    <Section id="funcionalidades" tone="white">
      <SectionHeading
        eyebrow="Funcionalidades"
        title="Todo lo que necesitas para gestionar tu organización"
        description="Un único lugar para estructurar, planificar y entender tu plantilla, con la información siempre coherente y a tu alcance."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 80}>
            <article className="group h-full rounded-2xl border border-surface-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                <feature.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                {feature.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}