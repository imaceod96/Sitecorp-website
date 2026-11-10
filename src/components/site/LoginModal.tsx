import { useState, useEffect, type FormEvent } from "react";
import {
  Lock,
  Mail,
  X,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Server,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { APP_BASE_URL, DIRECT_LOGIN_URL } from "@/config/authConfig";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ConnectionMode = "redirect" | "api";

interface ServerConfig {
  enabled: boolean;
  baseUrl: string;
  loginPath: string;
  mode: ConnectionMode;
}

const STORAGE_KEY = "sitecorp_app_server_config_v1";

const DEFAULT_CONFIG: ServerConfig = {
  enabled: true,
  baseUrl: APP_BASE_URL,
  loginPath: "/login",
  mode: "redirect",
};

const DOCKER_MOCK_SNIPPET = `# docker-compose.yml (Servidor de prueba Sitecorp Login)
services:
  sitecorp-mock-auth:
    image: node:20-alpine
    ports:
      - "8080:8080"
    command:
      - node
      - -e
      - |
        const http = require("http");
        http.createServer((req, res) => {
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
          res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
          res.setHeader("Access-Control-Allow-Private-Network", "true");
          if (req.method === "OPTIONS") { res.writeHead(204); return res.end(); }
          if (req.url === "/health" || req.method === "GET") {
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ status: "ok", service: "Sitecorp App Local Server" }));
          }
          if (req.method === "POST") {
            let body = "";
            req.on("data", c => body += c);
            req.on("end", () => {
              const data = JSON.parse(body || "{}");
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({
                ok: true,
                message: "Sesión iniciada en tu contenedor Docker local",
                user: data.email || "admin@sitecorp.cu",
                redirectUrl: "/resumen"
              }));
            });
          }
        }).listen(8080, () => console.log("Servidor listo en http://localhost:8080"));`;

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [redirectTarget, setRedirectTarget] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Server configuration state for local/Docker/Tunnel testing
  const [showConfig, setShowConfig] = useState(false);
  const [showDockerHelp, setShowDockerHelp] = useState(false);
  const [config, setConfig] = useState<ServerConfig>(DEFAULT_CONFIG);
  const [pingStatus, setPingStatus] = useState<"idle" | "testing" | "online" | "offline">("idle");
  const [pingMessage, setPingMessage] = useState<string | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<ServerConfig>;
        setConfig((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  if (!isOpen) return null;

  const normalizeUrl = (url: string) => url.trim().replace(/\/+$/, "");

  const saveConfig = (nextConfig: ServerConfig) => {
    setConfig(nextConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextConfig));
    } catch {
      // Ignore storage errors
    }
  };

  const handleTestConnection = async () => {
    const cleanBase = normalizeUrl(config.baseUrl);
    if (!cleanBase) {
      setPingStatus("offline");
      setPingMessage("Ingresa una URL válida (ej. http://localhost:8080 o tu URL de Dev Tunnel).");
      return;
    }

    setPingStatus("testing");
    setPingMessage(null);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4500);

      const response = await fetch(cleanBase, {
        method: "GET",
        mode: "cors",
        signal: controller.signal,
      });
      clearTimeout(timeout);

      setPingStatus("online");
      setPingMessage(
        `Servidor detectado correctamente (HTTP ${response.status}). Listo para vincular el inicio de sesión.`,
      );
    } catch {
      // Check if HTTPS -> HTTP mixed content is the reason
      const isHttpsPage = window.location.protocol === "https:";
      const isHttpTarget = cleanBase.startsWith("http://");

      setPingStatus("offline");
      if (isHttpsPage && isHttpTarget) {
        setPingMessage(
          "El navegador bloqueó la petición directa de HTTPS a HTTP local (Mixed Content) o el contenedor no tiene CORS activo. Usa el 'Modo Redirección' o expón el puerto en HTTPS con 'Puertos (Dev Tunnels)' de Visual Studio Code.",
        );
      } else {
        setPingMessage(
          "No se pudo conectar por API directa. Verifica que el contenedor Docker esté encendido y tenga cabeceras CORS, o utiliza el 'Modo Redirección'.",
        );
      }
    }
  };

  const handleCopyDocker = async () => {
    try {
      await navigator.clipboard.writeText(DOCKER_MOCK_SNIPPET);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2500);
    } catch {
      // Ignore clipboard error
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setRedirectTarget(null);

    if (!email.trim() || !password.trim()) {
      setError("Por favor completa tus credenciales corporativas.");
      return;
    }

    const cleanBase = normalizeUrl(config.baseUrl);
    const cleanPath = config.loginPath.startsWith("/")
      ? config.loginPath
      : `/${config.loginPath}`;

    // If local/remote server linking is enabled
    if (config.enabled && cleanBase) {
      setLoading(true);

      if (config.mode === "redirect") {
        const targetUrl = `${cleanBase}${cleanPath}?email=${encodeURIComponent(email.trim())}`;
        setLoading(false);
        setRedirectTarget(targetUrl);
        setSuccessMsg(
          "Credenciales listas para enviarse a tu servidor configurado. Haz clic debajo para abrir tu aplicación.",
        );
        return;
      }

      // Mode: API POST to Docker/Visual Studio server
      try {
        const endpoint = `${cleanBase}${cleanPath}`;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
            source: "sitecorp-web",
          }),
        });

        const data = await response.json().catch(() => ({}));
        setLoading(false);

        if (!response.ok) {
          setError(
            data?.message ||
              data?.error ||
              `Tu servidor respondió con error (HTTP ${response.status}). Verifica tus credenciales en la app.`,
          );
          return;
        }

        const nextRedirect = data?.redirectUrl
          ? data.redirectUrl.startsWith("http")
            ? data.redirectUrl
            : `${cleanBase}${data.redirectUrl.startsWith("/") ? "" : "/"}${data.redirectUrl}`
          : cleanBase;

        setRedirectTarget(nextRedirect);
        setSuccessMsg(
          data?.message ||
            "¡Autenticación exitosa con tu servidor! Tu contenedor respondió correctamente.",
        );
      } catch {
        setLoading(false);
        const fallbackUrl = `${cleanBase}${cleanPath}?email=${encodeURIComponent(email.trim())}`;
        setRedirectTarget(fallbackUrl);
        setError(
          "No se pudo conectar por petición fetch directa (posible bloqueo CORS o Mixed Content HTTPS→HTTP). Puedes abrir tu servidor directamente con el botón inferior o usar Dev Tunnels en VS Code.",
        );
      }
      return;
    }

    // Default behavior when no custom server is enabled
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError(
        "Acceso restringido a organizaciones activas en Sitecorp. Si estás haciendo pruebas locales con Docker o Visual Studio, activa el icono de Servidor arriba a la derecha.",
      );
    }, 600);
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

      <div className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-surface-line bg-white p-6 shadow-lift sm:p-8">
        <div className="absolute right-5 top-5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowConfig((v) => !v)}
            title="Configurar conexión con servidor local (Docker / Visual Studio)"
            className={`inline-flex h-9 items-center gap-1.5 rounded-xl border px-2.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
              config.enabled
                ? "border-teal-300 bg-teal-50 text-teal-800"
                : "border-surface-line bg-white text-ink-muted hover:bg-surface-mist hover:text-ink"
            }`}
          >
            <Server className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">
              {config.enabled ? "Servidor vinculado" : "Vincular servidor"}
            </span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="grid h-9 w-9 place-items-center rounded-xl border border-surface-line bg-white text-ink-muted transition-colors hover:bg-surface-mist hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2.5 pr-28">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Lock className="h-5 w-5" />
          </span>
          <div>
            <h3 id="login-modal-title" className="text-xl font-bold text-ink">
              Acceso a la plataforma
            </h3>
            <p className="text-xs text-ink-muted">
              {config.enabled
                ? `Conectado a: ${normalizeUrl(config.baseUrl)}`
                : "Portal seguro de clientes Sitecorp"}
            </p>
          </div>
        </div>

        {/* Panel de Configuración para Pruebas Locales (Docker / Visual Studio) */}
        {showConfig && (
          <div className="mt-5 rounded-2xl border border-teal-200 bg-teal-50/50 p-4 text-xs">
            <div className="flex items-center justify-between gap-2">
              <div className="font-bold text-teal-950 flex items-center gap-1.5">
                <Server className="h-4 w-4 text-teal-700" />
                Conexión con tu Servidor de Pruebas (Docker / VS Code)
              </div>
              <label className="inline-flex cursor-pointer items-center gap-1.5 font-semibold text-teal-900">
                <input
                  type="checkbox"
                  checked={config.enabled}
                  onChange={(e) =>
                    saveConfig({ ...config, enabled: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-teal-300 text-brand-600 focus:ring-brand-500"
                />
                Activar vínculo
              </label>
            </div>

            <p className="mt-1 text-[11px] text-teal-800 leading-relaxed">
              Vincula este botón con tu contenedor <strong>Docker</strong> o túnel de{" "}
              <strong>Visual Studio</strong> sin necesidad de tener un servidor en la nube contratado.
            </p>

            <div className="mt-3 space-y-3">
              <div>
                <Label className="text-[11px] font-semibold text-teal-950">
                  URL de tu Servidor Local o Dev Tunnel
                </Label>
                <div className="mt-1 flex gap-2">
                  <Input
                    type="text"
                    value={config.baseUrl}
                    onChange={(e) =>
                      saveConfig({ ...config, baseUrl: e.target.value, enabled: true })
                    }
                    placeholder="https://xxxx-8080.brs.devtunnels.ms o http://localhost:8080"
                    className="h-9 rounded-xl bg-white text-xs"
                  />
                  <Button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={pingStatus === "testing"}
                    className="h-9 shrink-0 rounded-xl bg-teal-700 px-3 text-xs font-semibold text-white hover:bg-teal-800"
                  >
                    <RefreshCw
                      className={`mr-1.5 h-3.5 w-3.5 ${
                        pingStatus === "testing" ? "animate-spin" : ""
                      }`}
                    />
                    Probar
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <Label className="text-[11px] font-semibold text-teal-950">
                    Ruta de Login / Endpoint
                  </Label>
                  <Input
                    type="text"
                    value={config.loginPath}
                    onChange={(e) =>
                      saveConfig({ ...config, loginPath: e.target.value, enabled: true })
                    }
                    placeholder="/login o /api/auth/login"
                    className="mt-1 h-9 rounded-xl bg-white text-xs"
                  />
                </div>

                <div>
                  <Label className="text-[11px] font-semibold text-teal-950">
                    Modo de integración
                  </Label>
                  <select
                    value={config.mode}
                    onChange={(e) =>
                      saveConfig({
                        ...config,
                        mode: e.target.value as ConnectionMode,
                        enabled: true,
                      })
                    }
                    className="mt-1 h-9 w-full rounded-xl border border-surface-line bg-white px-2.5 text-xs font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="redirect">Redirigir a la pantalla de mi App</option>
                    <option value="api">Enviar POST JSON (/api/auth/login)</option>
                  </select>
                </div>
              </div>

              {pingMessage && (
                <div
                  className={`flex items-start gap-2 rounded-xl border p-2.5 text-[11px] ${
                    pingStatus === "online"
                      ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                      : "border-amber-300 bg-amber-50 text-amber-900"
                  }`}
                >
                  {pingStatus === "online" ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  )}
                  <span>{pingMessage}</span>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-teal-200/80 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDockerHelp((v) => !v)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-800 hover:underline"
                >
                  <Terminal className="h-3.5 w-3.5" />
                  {showDockerHelp
                    ? "Ocultar contenedor Docker de prueba"
                    : "Ver docker-compose.yml de prueba listo para usar"}
                </button>

                {config.baseUrl && (
                  <a
                    href={normalizeUrl(config.baseUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:underline"
                  >
                    Abrir URL directa
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              {showDockerHelp && (
                <div className="rounded-xl bg-[#071923] p-3 text-[11px] text-slate-200">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold text-teal-300">
                      docker-compose.yml (Ejecutar con: docker compose up)
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyDocker}
                      className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2 py-1 text-[10px] font-semibold text-white hover:bg-white/20"
                    >
                      {copiedSnippet ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copiar archivo
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="max-h-36 overflow-x-auto overflow-y-auto font-mono text-[10px] leading-relaxed text-slate-300">
                    {DOCKER_MOCK_SNIPPET}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-xs text-amber-900">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="space-y-2.5 rounded-xl border border-emerald-200 bg-emerald-50/90 p-3.5 text-xs text-emerald-950">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span className="font-medium">{successMsg}</span>
              </div>
              {redirectTarget && (
                <a
                  href={redirectTarget}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
                >
                  Entrar a mi servidor ({redirectTarget})
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          )}

          {!successMsg && redirectTarget && (
            <a
              href={redirectTarget}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-300 bg-brand-50 px-4 py-2.5 text-xs font-semibold text-brand-800 transition-colors hover:bg-brand-100"
            >
              Abrir mi servidor directamente en nueva pestaña
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
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
            {loading
              ? "Conectando con el servidor..."
              : config.enabled
                ? config.mode === "redirect"
                  ? "Continuar al servidor de Sitecorp"
                  : "Autenticar con mi servidor"
                : "Iniciar sesión en Sitecorp"}
            {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>

          <div className="flex items-center justify-between pt-1 text-[11px] text-ink-muted">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
              Acceso protegido con cifrado empresarial
            </span>
            <button
              type="button"
              onClick={() => setShowConfig((v) => !v)}
              className="font-semibold text-brand-600 hover:underline"
            >
              {showConfig ? "Ocultar ajustes" : "Modo pruebas (Docker)"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

