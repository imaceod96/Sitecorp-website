import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Layout";

const FAQS = [
  {
    question: "¿Qué es Sitecorp?",
    answer:
      "Sitecorp es una plataforma para gestionar la organización de tu empresa: estructuras, trabajadores, puestos, planificación de plantilla y escalas salariales, todo desde un único entorno.",
  },
  {
    question: "¿Cómo se organiza la información dentro de la plataforma?",
    answer:
      "La información se estructura en unidades y niveles jerárquicos. Cada trabajador, puesto y escala se asocia a una parte concreta de la organización, de forma que la estructura sea siempre la referencia común.",
  },
  {
    question: "¿Puedo definir mis propias escalas y niveles salariales?",
    answer:
      "Sí. Puedes configurar niveles, bandas y baremos adaptados a tu convenio y a tu política retributiva, con rangos mínimos y máximos por escala y categoría.",
  },
  {
    question: "¿Qué permisos puedo asignar a cada perfil?",
    answer:
      "Puedes definir accesos por rol y por nivel jerárquico, de manera que cada persona vea únicamente la información que le corresponde. La información sensible queda restringida a los perfiles autorizados.",
  },
  {
    question: "¿Necesito instalar algo para empezar?",
    answer:
      "No. Sitecorp funciona directamente en el navegador, sin instalaciones, y puedes acceder desde cualquier dispositivo con conexión.",
  },
  {
    question: "¿Cómo puedo empezar a trabajar con Sitecorp?",
    answer:
      "Solicita una demostración y te mostraremos cómo trasladar tu organización a la plataforma paso a paso, empezando por tu estructura y tus puestos.",
  },
];

export function Faq() {
  return (
    <Section id="faq" tone="white">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Preguntas frecuentes"
            title="Todo lo que suele preguntarse antes de empezar"
            description="Si necesitas más detalle sobre alguna parte de la plataforma, estaremos encantados de ampliarlo en la demostración."
          />

          <Reveal delay={120} className="mt-8">
            <div className="rounded-2xl border border-surface-line bg-surface-mist p-6">
              <h3 className="text-base font-bold text-ink">
                ¿Tienes otra pregunta?
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                Escríbenos y te ayudamos a valorar si Sitecorp encaja con la
                organización de tu empresa.
              </p>
              <a
                href="#contacto"
                className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                Contactar con Sitecorp
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <Accordion
            type="single"
            collapsible
            className="divide-y divide-surface-line rounded-2xl border border-surface-line bg-white px-5 sm:px-6"
          >
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="border-b-0"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:text-brand-600 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-ink-muted">
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