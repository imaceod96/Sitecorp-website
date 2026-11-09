import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "./Reveal";
import { Section } from "./Layout";
import {
  CONTACT_EMAIL,
  WORKER_COUNT_OPTIONS,
  submitToGoogleForms,
} from "@/config/contactConfig";

interface FinalCtaProps {
  onOpenPrivacy?: () => void;
}

interface FormState {
  nombre: string;
  email: string;
  empresa: string;
  empleados: string;
  mensaje: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
  nombre: "",
  email: "",
  empresa: "",
  empleados: WORKER_COUNT_OPTIONS[1].value,
  mensaje: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HIGHLIGHTS = [
  "Recorrido guiado enfocado en las necesidades reales de tu entidad",
  "Demostración de organigramas jerárquicos y control de vacantes",
  "Resolución de dudas sobre migración, permisos y escalas salariales",
];

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.nombre.trim()) {
    errors.nombre = "Indica tu nombre completo.";
  }
  if (!values.email.trim()) {
    errors.email = "Indica tu email corporativo.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Introduce un email corporativo válido.";
  }
  if (!values.empresa.trim()) {
    errors.empresa = "Indica el nombre de tu empresa u organización.";
  }
  return errors;
}

export function FinalCta({ onOpenPrivacy }: FinalCtaProps) {
  const [values, setValues] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLoading(true);
    await submitToGoogleForms({
      nombre: values.nombre,
      empresa: values.empresa,
      email: values.email,
      empleados: values.empleados,
      mensaje: values.mensaje,
    });
    setLoading(false);
    setSubmitted(true);
  };

  const errorClass = (field: keyof FormState) =>
    errors[field] ? "border-destructive focus-visible:ring-destructive" : "";

  return (
    <Section id="contacto" tone="white" className="py-20 sm:py-24">
      <Reveal>
        <div className="overflow-hidden rounded-3xl bg-brand-500 shadow-lift">
          <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
            <div className="flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-100">
                  <Sparkles className="h-3.5 w-3.5 text-accent-400" />
                  Solicita una demostración guiada
                </span>

                <h2 className="mt-5 font-display text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                  Una forma más clara de gestionar tu organización.
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-teal-100 sm:text-base">
                  Descubre cómo sustituir la dispersión de datos y el trabajo manual por un entorno
                  inteligente, seguro y conectado para toda tu empresa.
                </p>

                <ul className="mt-8 space-y-3">
                  {HIGHLIGHTS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-xs font-medium text-white sm:text-sm"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent-300"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex items-center gap-3 border-t border-white/15 pt-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white">
                  <Mail className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-teal-100">
                    Contacto corporativo directo
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-sm font-bold text-white hover:text-teal-200"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
              {submitted ? (
                <div
                  role="status"
                  className="flex h-full flex-col items-start justify-center py-6"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">
                    Gracias, {values.nombre.trim().split(" ")[0]}.
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-sm">
                    Hemos registrado tu solicitud de demostración para{" "}
                    <span className="font-semibold text-ink">{values.empresa.trim()}</span>. Nos
                    pondremos en contacto a la dirección{" "}
                    <span className="font-semibold text-ink">{values.email.trim()}</span> en menos de
                    24 horas laborables.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-6 h-10 rounded-xl border-brand-200 px-5 text-xs font-semibold text-brand-700 hover:bg-brand-50"
                    onClick={() => {
                      setValues(EMPTY_FORM);
                      setErrors({});
                      setSubmitted(false);
                    }}
                  >
                    Enviar otra solicitud
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="cta-nombre" className="text-xs font-semibold text-ink-soft">
                        Nombre y apellidos *
                      </Label>
                      <Input
                        id="cta-nombre"
                        name="nombre"
                        value={values.nombre}
                        onChange={handleChange}
                        placeholder="Ana Ruiz"
                        autoComplete="name"
                        aria-invalid={Boolean(errors.nombre)}
                        className={`h-10 rounded-xl bg-surface-mist text-xs ${errorClass("nombre")}`}
                      />
                      {errors.nombre && (
                        <p className="text-[11px] font-medium text-destructive">{errors.nombre}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="cta-email" className="text-xs font-semibold text-ink-soft">
                        Email corporativo *
                      </Label>
                      <Input
                        id="cta-email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="ana.ruiz@empresa.com"
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                        className={`h-10 rounded-xl bg-surface-mist text-xs ${errorClass("email")}`}
                      />
                      {errors.email && (
                        <p className="text-[11px] font-medium text-destructive">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="cta-empresa" className="text-xs font-semibold text-ink-soft">
                        Empresa u organización *
                      </Label>
                      <Input
                        id="cta-empresa"
                        name="empresa"
                        value={values.empresa}
                        onChange={handleChange}
                        placeholder="Nombre de la entidad"
                        autoComplete="organization"
                        aria-invalid={Boolean(errors.empresa)}
                        className={`h-10 rounded-xl bg-surface-mist text-xs ${errorClass("empresa")}`}
                      />
                      {errors.empresa && (
                        <p className="text-[11px] font-medium text-destructive">{errors.empresa}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="cta-empleados" className="text-xs font-semibold text-ink-soft">
                        Cantidad de trabajadores
                      </Label>
                      <select
                        id="cta-empleados"
                        name="empleados"
                        value={values.empleados}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-xl border border-input bg-surface-mist px-3 py-1 text-xs text-ink ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {WORKER_COUNT_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="cta-mensaje" className="text-xs font-semibold text-ink-soft">
                      Retos organizativos a resolver{" "}
                      <span className="font-normal text-ink-muted">(opcional)</span>
                    </Label>
                    <Textarea
                      id="cta-mensaje"
                      name="mensaje"
                      value={values.mensaje}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Cuéntanos brevemente cómo se estructura tu empresa y qué módulos deseas ver."
                      className="rounded-xl bg-surface-mist text-xs"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="group h-11 w-full rounded-xl bg-brand-500 text-xs font-semibold text-white shadow-soft hover:bg-brand-600 sm:text-sm"
                  >
                    {loading ? "Registrando solicitud..." : "Solicitar demostración guiada"}
                    <ArrowRight
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Button>

                  <p className="text-center text-[11px] leading-relaxed text-ink-muted">
                    Tratamos tus datos conforme a nuestra{" "}
                    {onOpenPrivacy ? (
                      <button
                        type="button"
                        onClick={onOpenPrivacy}
                        className="font-semibold text-brand-600 hover:underline"
                      >
                        política de privacidad corporativa
                      </button>
                    ) : (
                      <a href="#contacto" className="font-semibold text-brand-600 hover:underline">
                        política de privacidad corporativa
                      </a>
                    )}
                    . Sin compromiso ni spam.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}