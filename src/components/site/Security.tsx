import {
  EyeOff,
  History,
  KeyRound,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Layout";
import { PermissionsMockup } from "./mockups/PermissionsMockup";
import { SecurityShield } from "./illustrations/SecurityShield";

interface SecurityPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

const POINTS: SecurityPoint[] = [
  {
    icon: KeyRound,
    title: "Permisos por rol y nivel",
    description:
      "Define accesos distintos para dirección, mandos intermedios y el equipo de RR. HH.",
  },
  {
    icon: EyeOff,
    title: "Visibilidad acotada",
    description:
      "Cada unidad puede limitar qué información se comparte fuera de su ámbito.",
  },
  {
    icon: Lock,
    title: "Datos sensibles protegidos",
    description:
      "La información salarial y contractual solo es accesible para perfiles autorizados.",
  },
  {
    icon: History,
    title: "Cambios trazables",
    description:
      "Consulta quién ha modificado la información de la organización y cuándo.",
  },
];

export function Security() {
  return (
    <Section id="seguridad" tone="navy" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-16 top-10 hidden w-[420px] opacity-[0.16] lg:block"
        aria-hidden
      >
        <SecurityShield />
      </div>

      <div className="relative z-10 grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            tone="light"
            eyebrow="Seguridad y permisos"
            title="Acceso jerárquico, información siempre protegida"
            description="Sitecorp aplica un control de acceso jerárquico: cada persona ve únicamente la información que le corresponde según su rol y su posición en la organización."
          />

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {POINTS.map((point, index) => (
              <Reveal key={point.title} delay={index * 80}>
                <div className="h-full rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-brand-100">
                    <point.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-white">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-100">
                    {point.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <PermissionsMockup />
        </Reveal>
      </div>
    </Section>
  );
}