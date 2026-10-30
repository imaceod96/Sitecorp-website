import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Layout";

interface FaqProps {
  onRequestDemo?: () => void;
}

const FAQS = [
  {
    question: "¿Qué es exactamente Sitecorp y a quién está dirigido?",
    answer:
      "Sitecorp es una plataforma de software empresarial para centralizar la gestión organizativa y los recursos humanos. Está diseñada para directores generales, responsables de RR. HH., directores de operaciones y administradores de empresas medianas, grupos corporativos y entidades con Unidades Empresariales de Base (UEB).",
  },
  {
    question: "¿Cómo se traslada nuestra estructura actual y los datos de personal a la plataforma?",
    answer:
      "El proceso comienza con la carga guiada de tu organigrama y niveles de mando. A continuación, se importan las plazas presupuestadas aprobadas y las fichas de trabajadores mediante plantillas estandarizadas. Nuestro equipo de consultoría acompaña a tu organización durante toda la fase de configuración inicial.",
  },
  {
    question: "¿Permite gestionar varias empresas filiales o UEBs en una misma cuenta?",
    answer:
      "Sí. Sitecorp cuenta con arquitectura multi-entidad nativa. Permite modelar simultáneamente holdings, empresas subsidiarias y Unidades Empresariales de Base, aplicando separación estricta de permisos para que cada gestor vea únicamente su unidad, mientras la dirección general mantiene una visión consolidada transversal.",
  },
  {
    question: "¿Cómo funciona el control de plantillas presupuestadas frente a las operativas?",
    answer:
      "La plataforma permite fijar el cuadro de plazas autorizadas por presupuesto para cada departamento o unidad. Conforme se producen contrataciones, promociones o bajas, el sistema actualiza en tiempo real el porcentaje de cobertura y señala con exactitud qué plazas permanecen vacantes o en proceso de selección.",
  },
  {
    question: "¿Se pueden definir escalas salariales personalizadas y políticas retributivas?",
    answer:
      "Absolutamente. Puedes configurar escalas salariales con sus respectivos niveles, grupos y bandas (mínimos y máximos), adaptándolas tanto a convenios colectivos como a baremos corporativos específicos. La información salarial solo es visible para perfiles debidamente autorizados.",
  },
  {
    question: "¿Qué garantías de seguridad y trazabilidad ofrece el sistema?",
    answer:
      "Sitecorp incorpora control de acceso granular basado en roles (RBAC), restricción estricta de visibilidad para datos retributivos sensibles y un registro de auditoría inmutable que documenta la fecha, el usuario y el detalle de cada cambio efectuado en la organización.",
  },
  {
    question: "¿Cómo es el proceso de demostración y evaluación?",
    answer:
      "Tras solicitar la demo, coordinamos una sesión práctica por videoconferencia guiada por un especialista. En ella analizamos la estructura organizativa de tu empresa y mostramos sobre un entorno real cómo se gestionarían tus departamentos, plantillas y contratos.",
  },
];

export function Faq({ onRequestDemo }: FaqProps) {
  return (
    <Section id="faq" tone="white" className="py-20 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Preguntas Frecuentes"
            title="Claridad sobre cómo Sitecorp se adapta a tu entidad"
            description="Respuestas directas a las dudas habituales sobre modelos organizativos, implantación, seguridad y gestión de plantillas."
          />

          <Reveal delay={120} className="mt-8">
            <div className="rounded-2xl border border-surface-line bg-surface-mist p-6">
              <div className="flex items-center gap-2 text-brand-600">
                <HelpCircle className="h-5 w-5" />
                <h3 className="font-display text-base font-bold text-ink">
                  ¿Tienes una consulta específica sobre tu sector?
                </h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                Nuestro equipo de especialistas organizativos analiza sin compromiso el encaje de
                tu organigrama y volumen de plantilla.
              </p>
              {onRequestDemo ? (
                <button
                  type="button"
                  onClick={onRequestDemo}
                  className="group mt-4 inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700"
                >
                  Solicitar consulta personalizada
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              ) : (
                <a
                  href="#contacto"
                  className="group mt-4 inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700"
                >
                  Contactar con nuestro equipo
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <Accordion
            type="single"
            collapsible
            className="divide-y divide-surface-line rounded-2xl border border-surface-line bg-white px-5 sm:px-6 shadow-sm"
          >
            {FAQS.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`} className="border-b-0">
                <AccordionTrigger className="py-5 text-left font-display text-sm font-bold text-ink hover:text-brand-600 hover:no-underline sm:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-xs leading-relaxed text-ink-muted sm:text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}