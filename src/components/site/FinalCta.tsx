import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "./Reveal";
import { Section } from "./Layout";

interface FormState {
  nombre: string;
  email: string;
  empresa: string;
  mensaje: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
  nombre: "",
  email: "",
  empresa: "",
  mensaje: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HIGHLIGHTS = [
  "Recorrido guiado por las funcionalidades clave",
  "Resolución de dudas sobre permisos y escalas salariales",
  "Valoración conjunta de tu estructura organizativa",
];

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.nombre.trim()) {
    errors.nombre = "Indica tu nombre.";
  }
  if (!values.email.trim()) {
    errors.email = "Indica tu email corporativo.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Introduce un email válido.";
  }
  if (!values.empresa.trim()) {
    errors.empresa = "Indica el nombre de tu empresa.";
  }
  return errors;
}

export function FinalCta() {
  const [values, setValues] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    setSubmitted(true);
  };

  const errorClass = (field: keyof FormState) =>
    errors[field] ? "border-destructive focus-visible:ring-destructive" : "";

  return (
    <Section id="contacto" tone="white">
      <Reveal>
        <div className="overflow-hidden rounded-3xl bg-brand-900 shadow-lift">
          <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
            <div>
              <span className="text-eyebrow border-white/20 bg-white/10 text-brand-100">
                              <span
                                className="h-1.5 w-1.5 rounded-full bg-accent-400"
                                aria-hidden
                              />
                              Solicita una demo
                            </span>
                            <h2 className="mt-5 text-[1.75rem] font-bold leading-tight text-white sm:text-[2rem]">
                ¿Quieres ver Sitecorp en acción?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-100">
                Solicita una demostración y te mostraremos cómo centralizar la
                gestión de tu organización en una sola plataforma.
              </p>

              <ul className="mt-8 space-y-3">
                {HIGHLIGHTS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm font-medium text-white"
                  >
                    <CheckCircle2
                                          className="mt-0.5 h-4 w-4 shrink-0 text-accent-300"
                                          aria-hidden
                                        />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-brand-100">
                  <Mail className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-brand-100">
                    Escríbenos
                  </p>
                  <a
                    href="mailto:hola@sitecorp.com"
                    className="text-sm font-semibold text-white hover:text-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    hola@sitecorp.com
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-card sm:p-7">
              {submitted ? (
                <div
                  role="status"
                  className="flex h-full flex-col items-start justify-center py-6"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-ink">
                    Gracias, {values.nombre.trim().split(" ")[0]}.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    Hemos registrado tu solicitud de demostración. Te
                    contactaremos en la dirección {values.email.trim()}.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-6 h-11 rounded-xl border-brand-200 px-5 text-brand-700 hover:bg-brand-50"
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
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-ink-soft">
                        Nombre y apellidos
                      </Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        value={values.nombre}
                        onChange={handleChange}
                        placeholder="Ana Ruiz"
                        autoComplete="name"
                        aria-invalid={Boolean(errors.nombre)}
                        aria-describedby={
                          errors.nombre ? "error-nombre" : undefined
                        }
                        className={`h-11 rounded-xl bg-surface-mist ${errorClass("nombre")}`}
                      />
                      {errors.nombre ? (
                        <p
                          id="error-nombre"
                          className="text-xs font-medium text-destructive"
                        >
                          {errors.nombre}
                        </p>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-ink-soft">
                        Email corporativo
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="ana.ruiz@empresa.com"
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? "error-email" : undefined
                        }
                        className={`h-11 rounded-xl bg-surface-mist ${errorClass("email")}`}
                      />
                      {errors.email ? (
                        <p
                          id="error-email"
                          className="text-xs font-medium text-destructive"
                        >
                          {errors.email}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="empresa" className="text-ink-soft">
                      Empresa
                    </Label>
                    <Input
                      id="empresa"
                      name="empresa"
                      value={values.empresa}
                      onChange={handleChange}
                      placeholder="Nombre de tu empresa"
                      autoComplete="organization"
                      aria-invalid={Boolean(errors.empresa)}
                      aria-describedby={
                        errors.empresa ? "error-empresa" : undefined
                      }
                      className={`h-11 rounded-xl bg-surface-mist ${errorClass("empresa")}`}
                    />
                    {errors.empresa ? (
                      <p
                        id="error-empresa"
                        className="text-xs font-medium text-destructive"
                      >
                        {errors.empresa}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje" className="text-ink-soft">
                      ¿Qué te gustaría resolver?{" "}
                      <span className="font-normal text-ink-muted">
                        (opcional)
                      </span>
                    </Label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      value={values.mensaje}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Cuéntanos brevemente cómo está organizada tu empresa hoy."
                      className="rounded-xl bg-surface-mist"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="group h-12 w-full rounded-xl text-base font-semibold shadow-soft"
                  >
                    Solicitar demo
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Button>

                  <p className="text-center text-xs leading-relaxed text-ink-muted">
                    Al enviar el formulario aceptas nuestra{" "}
                    <a
                      href="#"
                      className="font-semibold text-brand-600 hover:text-brand-700"
                    >
                      política de privacidad
                    </a>
                    .
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