import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  WORKER_COUNT_OPTIONS,
  submitToGoogleForms,
} from "@/config/contactConfig";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultModule?: string;
  onOpenPrivacy?: () => void;
}

interface DemoFormState {
  nombre: string;
  email: string;
  empresa: string;
  empleados: string;
  mensaje: string;
}

const INITIAL_FORM: DemoFormState = {
  nombre: "",
  email: "",
  empresa: "",
  empleados: WORKER_COUNT_OPTIONS[1].value,
  mensaje: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function DemoModal({
  open,
  onOpenChange,
  defaultModule,
  onOpenPrivacy,
}: DemoModalProps) {
  const [values, setValues] = useState<DemoFormState>({
    ...INITIAL_FORM,
    mensaje: defaultModule ? `Interés especial en el módulo de ${defaultModule}.` : "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof DemoFormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && !submitted) {
      setValues((prev) => ({
        ...prev,
        mensaje: defaultModule
          ? `Interés especial en el módulo de ${defaultModule}.`
          : prev.mensaje,
      }));
    }
  }, [open, defaultModule, submitted]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof DemoFormState, string>> = {};

    if (!values.nombre.trim()) newErrors.nombre = "Indica tu nombre completo.";
    if (!values.email.trim()) {
      newErrors.email = "Indica tu email corporativo.";
    } else if (!EMAIL_REGEX.test(values.email.trim())) {
      newErrors.email = "Introduce un email corporativo válido.";
    }
    if (!values.empresa.trim()) {
      newErrors.empresa = "Indica el nombre de tu empresa u organización.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

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

  const handleReset = () => {
    setValues(INITIAL_FORM);
    setErrors({});
    setSubmitted(false);
    onOpenChange(false);
  };

  const errorClass = (field: keyof DemoFormState) =>
    errors[field] ? "border-destructive focus-visible:ring-destructive" : "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl overflow-hidden rounded-2xl border-surface-line bg-white p-0 shadow-lift sm:max-w-xl">
        <div className="bg-gradient-to-r from-brand-500 to-teal-500 px-6 py-6 text-white sm:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-100">
            <Sparkles className="h-4 w-4 text-accent-300" aria-hidden />
            Solicita una demostración guiada
          </div>
          <DialogHeader className="mt-2 text-left">
            <DialogTitle className="font-display text-xl font-bold text-white sm:text-2xl">
              Descubre cómo ordenar toda tu organización
            </DialogTitle>
            <DialogDescription className="text-sm text-teal-100/90">
              Un especialista preparará un recorrido práctico adaptado a tu sector y estructura.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-4 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-ink">
                Gracias, {values.nombre.trim().split(" ")[0]}.
              </h3>
              <p className="mt-2 text-sm text-ink-muted">
                Hemos registrado tu solicitud de demostración para{" "}
                <span className="font-semibold text-ink">{values.empresa.trim()}</span>. Nos
                pondremos en contacto a la dirección{" "}
                <span className="font-semibold text-ink">{values.email.trim()}</span> en menos de
                24 horas laborables.
              </p>

              <div className="mt-6 rounded-xl border border-surface-line bg-surface-mist p-4 text-left text-xs text-ink-soft">
                <div className="flex items-center gap-2 font-semibold text-brand-600">
                  <ShieldCheck className="h-4 w-4" />
                  ¿Qué veremos durante la sesión?
                </div>
                <ul className="mt-2 space-y-1 text-ink-muted">
                  <li>• Configuración del organigrama y centros de trabajo</li>
                  <li>• Carga y control de plazas presupuestadas vs ocupadas</li>
                  <li>• Centralización de contratos, expedientes y escalas</li>
                </ul>
              </div>

              <Button
                type="button"
                onClick={handleReset}
                className="mt-6 h-11 w-full rounded-xl bg-brand-500 font-semibold text-white hover:bg-brand-600"
              >
                Cerrar ventana
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="demo-nombre" className="text-xs font-semibold text-ink-soft">
                    Nombre y apellidos *
                  </Label>
                  <Input
                    id="demo-nombre"
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
                  <Label htmlFor="demo-email" className="text-xs font-semibold text-ink-soft">
                    Email corporativo *
                  </Label>
                  <Input
                    id="demo-email"
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
                  <Label htmlFor="demo-empresa" className="text-xs font-semibold text-ink-soft">
                    Empresa u organización *
                  </Label>
                  <Input
                    id="demo-empresa"
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
                  <Label htmlFor="demo-empleados" className="text-xs font-semibold text-ink-soft">
                    Cantidad de trabajadores
                  </Label>
                  <select
                    id="demo-empleados"
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
                <Label htmlFor="demo-mensaje" className="text-xs font-semibold text-ink-soft">
                  Retos organizativos a resolver{" "}
                  <span className="font-normal text-ink-muted">(opcional)</span>
                </Label>
                <Textarea
                  id="demo-mensaje"
                  name="mensaje"
                  rows={3}
                  value={values.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntanos brevemente cómo se estructura tu empresa y qué módulos deseas ver."
                  className="rounded-xl bg-surface-mist text-xs"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="group h-11 w-full rounded-xl bg-brand-500 text-xs font-semibold text-white shadow-soft hover:bg-brand-600 focus-visible:ring-brand-500 sm:text-sm"
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
                    onClick={() => {
                      onOpenChange(false);
                      onOpenPrivacy();
                    }}
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
      </DialogContent>
    </Dialog>
  );
}
