import {
  Briefcase,
  CalendarRange,
  Coins,
  LayoutDashboard,
  Network,
  Search,
  ShieldCheck,
  TrendingUp,
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

const CHIPS = ["Todas las unidades", "Operaciones", "Personas", "Tecnología"];

const PLAN = [
  { unit: "Operaciones", current: 62, future: 84 },
  { unit: "Personas", current: 40, future: 52 },
  { unit: "Tecnología", current: 74, future: 96 },
  { unit: "Logística", current: 48, future: 44 },
  { unit: "Comercial", current: 58, future: 70 },
];

export function PlanningMockup() {
  return (
    <AppFrame url="app.sitecorp.com/plantillas">
      <div className="flex bg-surface-mist">
        <MockSidebar items={NAV_ITEMS} activeIndex={4} />

        <div className="min-w-0 flex-1">
          <header className="flex items-center gap-3 border-b border-surface-line bg-white px-3 py-2.5 sm:px-4">
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-surface-mist px-2.5 py-1.5 text-[11px] text-ink-muted ring-1 ring-surface-line">
              <Search className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="truncate">Buscar unidades…</span>
            </div>
            <span className="hidden rounded-md bg-white px-2.5 py-1.5 text-[10px] font-semibold text-ink-soft ring-1 ring-surface-line sm:inline">
              Escenario 2026
            </span>
          </header>

          <div className="space-y-3 p-3 sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-500">
                  Plantilla
                </p>
                <p className="font-display text-sm font-bold text-ink">
                  Planificación por unidad
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-700">
                <TrendingUp className="h-3 w-3" aria-hidden /> +18 previstos
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {CHIPS.map((chip, index) => (
                <span
                  key={chip}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                    index === 0
                      ? "bg-brand-500 text-white"
                      : "bg-white text-ink-soft ring-1 ring-surface-line"
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="rounded-xl border border-surface-line bg-white p-3 sm:p-4">
              <div className="flex items-end justify-between gap-3">
                <div className="flex items-end gap-4">
                  <div>
                    <p className="text-[9px] font-medium uppercase tracking-wide text-ink-muted">
                      Plantilla actual
                    </p>
                    <p className="font-mono text-lg font-bold text-ink">282</p>
                                      </div>
                                      <div>
                                        <p className="text-[9px] font-medium uppercase tracking-wide text-ink-muted">
                                          Prevista
                                        </p>
                                        <p className="font-mono text-lg font-bold text-accent-600">
                                          346
                                        </p>
                  </div>
                </div>
                <div className="hidden gap-3 sm:flex">
                  <span className="flex items-center gap-1.5 text-[9px] font-medium text-ink-muted">
                    <span className="h-2 w-2 rounded-full bg-brand-200" /> Actual
                  </span>
                  <span className="flex items-center gap-1.5 text-[9px] font-medium text-ink-muted">
                                      <span className="h-2 w-2 rounded-full bg-accent-500" />{" "}
                                      Previsto
                                    </span>
                </div>
              </div>

              <div className="mt-4 flex h-36 items-end gap-3 border-b border-surface-line pb-0">
                {PLAN.map((item) => (
                  <div
                    key={item.unit}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-1"
                  >
                    <div className="flex h-full w-full items-end justify-center gap-1">
                      <div
                        className="w-3 rounded-t-md bg-brand-200 sm:w-4"
                        style={{ height: `${item.current}%` }}
                      />
                      <div
                                              className="w-3 rounded-t-md bg-accent-500 sm:w-4"
                                              style={{ height: `${item.future}%` }}
                                            />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 flex gap-3">
                {PLAN.map((item) => (
                  <span
                    key={item.unit}
                    className="flex-1 truncate text-center text-[9px] font-medium text-ink-muted"
                  >
                    {item.unit}
                  </span>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-surface-line bg-white">
              {[
                { label: "Altas previstas", value: "22", tone: "text-emerald-700" },
                { label: "Bajas previstas", value: "8", tone: "text-rose-600" },
                { label: "Vacantes abiertas", value: "5", tone: "text-brand-600" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between border-b border-surface-line px-3 py-2 last:border-b-0"
                >
                  <span className="text-[10px] font-medium text-ink-soft">
                    {row.label}
                  </span>
                  <span className={`text-[11px] font-bold ${row.tone}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}