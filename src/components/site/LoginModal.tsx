import { useState, type FormEvent } from "react";
import { Lock, Mail, X, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Por favor completa tus credenciales corporativas.");
      return;
    }
    setLoading(true);
    setError(null);

    // Simulate authentic access portal check
    setTimeout(() => {
      setLoading(false);
      setError(
        "Acceso restringido a organizaciones activas en Sitecorp. Si tu entidad aún no tiene cuenta habilitada, solicita una demostración comercial.",
      );
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#061720]/70 backdrop-blur-sm transition-opacity"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-surface-line bg-white p-7 shadow-lift sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar ventana"
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-xl border border-surface-line bg-white text-ink-muted transition-colors hover:bg-surface-mist hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Lock className="h-5 w-5" />
          </span>
          <div>
            <h3 id="login-modal-title" className="text-xl font-bold text-ink">
              Acceso a la plataforma
            </h3>
            <p className="text-xs text-ink-muted">Portal seguro de clientes Sitecorp</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-xs text-amber-900">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="login-email" className="text-xs font-semibold text-ink-soft">
              Email corporativo
            </Label>
            <div className="relative">
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@tuorganizacion.com"
                className="h-11 rounded-xl bg-surface-mist pl-10"
              />
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-ink-muted" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="login-password" className="text-xs font-semibold text-ink-soft">
                Contraseña
              </Label>
              <a
                href="#contacto"
                onClick={onClose}
                className="text-[11px] font-semibold text-brand-600 hover:underline"
              >
                ¿Olvidaste tu acceso?
              </a>
            </div>
            <div className="relative">
              <Input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="h-11 rounded-xl bg-surface-mist pl-10"
              />
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-ink-muted" />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-brand-500 font-semibold text-white shadow-soft hover:bg-brand-600"
          >
            {loading ? "Verificando credenciales..." : "Iniciar sesión en Sitecorp"}
            {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-ink-muted pt-1">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
            <span>Acceso protegido con cifrado de grado empresarial</span>
          </div>
        </form>
      </div>
    </div>
  );
}
