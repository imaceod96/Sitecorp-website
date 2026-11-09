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
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  CONTACT_EMAIL,
  sendDemoRequestEmail,
  type DemoSubmissionResult,
} from "@/config/contactConfig";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultModule?: string;
}

interface DemoFormState {
  nombre: string;
  email: string;
  empresa: string;
  tipoOrganizacion: string;
  empleados: string;
  necesidad: string;
}

const INITIAL_FORM: DemoFormState = {
  nombre: "",
  email: "",
  empresa: "",
  tipoOrganizacion: "empresa",
  empleados: "50-250",
  necesidad: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function DemoModal({ open, onOpenChange, defaultModule }: DemoModalProps) {
  const [values, setValues] = useState<DemoFormState>({
    ...INITIAL_FORM,
    necesidad: defaultModule ? `Interés especial en el módulo de ${defaultModule}.` : "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof DemoFormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<DemoSubmissionResult | null>(null);

  useEffect(() => {
    if (open && !submitted) {
      setValues((prev) => ({
        ...prev,
        necesidad: defaultModule
          ? `Interés especial en el módulo de ${defaultModule}.`
          : prev.necesidad,
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

    if (!values.nombre.trim()) newErrors.nombre = "Por favor indica tu nombre completo.";
    if (!values.email.trim()) {
      newErrors.email = "Indica tu correo corporativo.";
    } else if (!EMAIL_REGEX.test(values.email.trim())) {
      newErrors.email = "Introduce una dirección de correo válida.";
    }
    if (!values.empresa.trim()) newErrors.empresa = "Indica el nombre de tu empresa u organización.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    const result = await sendDemoRequestEmail({
      origen: "Modal de Demostración",
      nombre: values.nombre.trim(),
      email: values.email.trim(),
      empresa: values.empresa.trim(),
      empleados: values.empleados,
      tipoOrganizacion: values.tipoOrganizacion,
      mensaje: values.necesidad.trim(),
      moduloInteres: defaultModule,
    });
    setLoading(false);
    setSubmissionResult(result);
    setSubmitted(true);

    if (!result.deliveredViaAjax && result.mailtoUrl) {
      window.location.href = result.mailtoUrl;
    }
  };

  const handleReset = () => {
    setValues(INITIAL_FORM);
    setErrors({});
    setSubmitted(false);
    setSubmissionResult(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl overflow-hidden rounded-2xl border-surface-line bg-white p-0 shadow-lift sm:max-w-xl">
        <div className="bg-gradient-to-r from-brand-500 to-teal-500 px-6 py-6 text-white sm:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-100">
            <Sparkles className="h-4 w-4 text-accent-300" aria-hidden />
            Demostración guiada de Sitecorp
          </div>
          <DialogHeader className="mt-2 text-left">
            <DialogTitle className="text-xl font-bold text-white sm:text-2xl font-display">
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
              <h3 className="mt-4 text-xl font-bold text-ink">
                ¡Solicitud enviada, {values.nombre.trim().split(" ")[0]}!
              </h3>
              <p className="mt-2 text-sm text-ink-muted">
                Hemos enviado los datos de tu solicitud a{" "}
                <span className="font-semibold text-ink">{CONTACT_EMAIL}</span> y te responderemos a{" "}
                <span className="font-semibold text-ink">{values.email.trim()}</span> en menos de
                24 horas para coordinar la demostración de{" "}
                <span className="font-semibold text-ink">{values.empresa.trim()}</span>.
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

              {submissionResult?.mailtoUrl && (
                <a
                  href={submissionResult.mailtoUrl}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-200 bg-brand-50/60 px-4 py-2.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Enviar también copia directa por correo ({CONTACT_EMAIL})
                </a>
              )}

              <Button
                type="button"
                onClick={handleReset}
                className="mt-3 h-11 w-full rounded-xl bg-brand-500 font-semibold text-white hover:bg-brand-600"
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
                    placeholder="Ej. Carmen Ortiz"
                    className={`h-10 rounded-xl bg-surface-mist text-sm ${
                      errors.nombre ? "border-destructive ring-destructive" : ""
                    }`}
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
                    placeholder="carmen.ortiz@empresa.com"
                    className={`h-10 rounded-xl bg-surface-mist text-sm ${
                      errors.email ? "border-destructive ring-destructive" : ""
                    }`}
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
                    className={`h-10 rounded-xl bg-surface-mist text-sm ${
                      errors.empresa ? "border-destructive ring-destructive" : ""
                    }`}
                  />
                  {errors.empresa && (
                    <p className="text-[11px] font-medium text-destructive">{errors.empresa}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="demo-empleados" className="text-xs font-semibold text-ink-soft">
                    Tamaño de la plantilla
                  </Label>
                  <select
                    id="demo-empleados"
                    name="empleados"
                    value={values.empleados}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-xl border border-input bg-surface-mist px-3 py-1 text-sm text-ink ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="1-50">Menos de 50 empleados</option>
                    <option value="50-250">50 a 250 empleados</option>
                    <option value="250-1000">250 a 1.000 empleados</option>
                    <option value="+1000">Más de 1.000 empleados</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="demo-tipo" className="text-xs font-semibold text-ink-soft">
                  Tipo de estructura organizativa
                </Label>
                <select
                  id="demo-tipo"
                  name="tipoOrganizacion"
                  value={values.tipoOrganizacion}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-xl border border-input bg-surface-mist px-3 py-1 text-sm text-ink ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="empresa">Empresa individual con departamentos</option>
                  <option value="grupo">Grupo empresarial con filiales o subsidiarias</option>
                  <option value="ueb">Organización con Unidades Empresariales de Base (UEB)</option>
                  <option value="multinivel">Estructura jerárquica multinivel compleja</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="demo-necesidad" className="text-xs font-semibold text-ink-soft">
                  ¿Qué retos te gustaría resolver primero?{" "}
                  <span className="font-normal text-ink-muted">(opcional)</span>
                </Label>
                <Textarea
                  id="demo-necesidad"
                  name="necesidad"
                  rows={3}
                  value={values.necesidad}
                  onChange={handleChange}
                  placeholder="Ej. Control de plazas vacantes, gestión de contratos por centros, escalas salariales..."
                  className="rounded-xl bg-surface-mist text-sm"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="group h-11 w-full rounded-xl bg-brand-500 text-sm font-semibold text-white shadow-soft hover:bg-brand-600 focus-visible:ring-brand-500"
              >
                {loading ? "Registrando solicitud..." : "Agendar demostración personalizada"}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <div className="flex items-center justify-between text-[11px] text-ink-muted">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
                  Sin compromiso ni tarjeta
                </span>
                <span className="inline-flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-teal-600" />
                  Respuesta en menos de 24h
                </span>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
