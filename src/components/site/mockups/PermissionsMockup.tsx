import {
  Briefcase,
  CalendarRange,
  Check,
  Coins,
  Eye,
  KeyRound,
  LayoutDashboard,
  Lock,
  Minus,
  Network,
  ShieldCheck,
  Users,
} from "lucide-react";
import { AppFrame, MockSidebar } from "./AppFrame";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Panel" },
  { icon: Network, label: "Estructura" },
  { icon: Users, label: "Trabajadores" },
  { icon: Briefcase, label: "Puestos" },
  { icon: CalendarRange, label: "Plantillas" },
  { icon: Coins, label: "Escalas" },
  { icon: ShieldCheck, label: "Permisos" },
];

const ROLES = [
  { name: "Dirección General", scope: "Toda la organización", active: true },
  { name: "Mando intermedio", scope: "Su unidad y dependientes", active: true },
  { name: "Responsable de RR. HH.", scope: "Toda la organización", active: true },
  { name: "Trabajador/a", scope: "Solo su propia ficha", active: false },
];

const MATRIX = [
  { label: "Datos personales", values: ["full", "partial", "full", "self"] },
  { label: "Estructura y puestos", values: ["full", "partial", "full", "none"] },
  { label: "Escalas salariales", values: ["full", "none", "full", "none"] },
  { label: "Plantilla y previsiones", values: ["full", "partial", "full", "none"] },
];

const COLUMNS = ["Dirección", "Mandos", "RR. HH.", "Personas"];

function MatrixCell({ value }: { value: string }) {
  if (value === "full") {
    return (
      <span className="mx-auto grid h-5 w-5 place-items-center rounded-full bg-emerald-50 text-emerald-600">
        <Check className="h-3 w-3" aria-hidden />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="mx-auto grid h-5 w-5 place-items-center rounded-full bg-brand-50 text-brand-600">
        <Eye className="h-3 w-3" aria-hidden />
      </span>
    );
  }
  if (value === "self") {
    return (
      <span className="mx-auto grid h-5 w-5 place-items-center rounded-full bg-brand-50 text-brand-600">
        <Lock className="h-3 w-3" aria-hidden />
      </span>
    );
  }
  return (
    <span className="mx-auto grid h-5 w-5 place-items-center rounded-full bg-surface-mist text-ink-muted">
      <Minus className="h-3 w-3" aria-hidden />
    </span>
  );
}

export function PermissionsMockup() {
  return (
    <AppFrame url="app.sitecorp.com/permisos">
      <div className="flex bg-[#FAFBFE]">
        <MockSidebar items={NAV_ITEMS} activeIndex={6} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 border-b border-surface-line bg-white px-3 py-2.5 sm:px-4">
            <KeyRound className="h-4 w-4 text-brand-500" aria-hidden />
            <span className="text-[11px] font-semibold text-ink">
              Control de acceso jerárquico
            </span>
          </div>

          <div className="space-y-3 p-3 sm:p-4">
            <div className="space-y-2">
              {ROLES.map((role) => (
                <div
                  key={role.name}
                  className="flex items-center gap-3 rounded-xl border border-surface-line bg-white px-3 py-2.5"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                    <ShieldCheck className="h-4 w-4" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-semibold text-ink">
                      {role.name}
                    </p>
                    <p className="truncate text-[10px] text-ink-muted">
                      {role.scope}
                    </p>
                  </div>
                  <span
                    className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                      role.active ? "bg-brand-500" : "bg-slate-200"
                    }`}
                    aria-hidden
                  >
                    <span
                      className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                        role.active ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </span>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-xl border border-surface-line bg-white">
              <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] items-center gap-1 border-b border-surface-line bg-surface-mist px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-ink-muted">
                <span>Ámbito</span>
                {COLUMNS.map((column) => (
                  <span key={column} className="text-center">
                    {column}
                  </span>
                ))}
              </div>
              {MATRIX.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[1.4fr_repeat(4,1fr)] items-center gap-1 border-b border-surface-line px-3 py-2.5 last:border-b-0"
                >
                  <span className="truncate text-[10px] font-medium text-ink-soft">
                    {row.label}
                  </span>
                  {row.values.map((value, index) => (
                    <MatrixCell key={index} value={value} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}