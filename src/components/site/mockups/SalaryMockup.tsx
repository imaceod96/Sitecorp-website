import {
  Briefcase,
  CalendarRange,
  Coins,
  LayoutDashboard,
  Network,
  Plus,
  Search,
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

const SCALES = [
  {
    level: "Nivel 1 · Dirección",
    range: [58, 96],
    min: "68.000 €",
    max: "112.000 €",
    accent: true,
  },
  { level: "Nivel 2 · Mandos", range: [42, 78], min: "46.000 €", max: "74.000 €" },
  { level: "Nivel 3 · Senior", range: [28, 58], min: "32.000 €", max: "52.000 €" },
  { level: "Nivel 4 · Base", range: [12, 36], min: "22.000 €", max: "34.000 €" },
];

export function SalaryMockup() {
  return (
    <AppFrame url="app.sitecorp.com/escalas">
      <div className="flex bg-surface-mist">
        <MockSidebar items={NAV_ITEMS} activeIndex={5} />

        <div className="min-w-0 flex-1">
          <header className="flex items-center gap-3 border-b border-surface-line bg-white px-3 py-2.5 sm:px-4">
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-surface-mist px-2.5 py-1.5 text-[11px] text-ink-muted ring-1 ring-surface-line">
              <Search className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="truncate">Buscar escalas o categorías…</span>
            </div>
            <span className="hidden items-center gap-1 rounded-md bg-brand-500 px-2.5 py-1.5 text-[10px] font-semibold text-white sm:inline-flex">
              <Plus className="h-3 w-3" aria-hidden /> Nueva escala
            </span>
          </header>

          <div className="space-y-3 p-3 sm:p-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-500">
                Escalas salariales
              </p>
              <p className="font-display text-sm font-bold text-ink">
                Bandas por nivel y categoría
              </p>
            </div>

            <div className="rounded-xl border border-surface-line bg-white p-3 sm:p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-md bg-accent-50 px-2.5 py-1 text-[10px] font-semibold text-accent-700">
                                  Convenio general
                                </span>
                                <span className="font-mono text-[9px] font-medium text-ink-muted">
                                  Referencia: 100 %
                                </span>
              </div>

              <div className="space-y-3">
                {SCALES.map((scale) => (
                  <div key={scale.level}>
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <span className="truncate text-[10px] font-semibold text-ink">
                        {scale.level}
                      </span>
                      <span className="hidden font-mono text-[9px] font-medium text-ink-muted sm:block">
                                              {scale.min} – {scale.max}
                                            </span>
                    </div>
                    <div className="relative h-3 w-full rounded-full bg-surface-mist">
                      <div
                        className={`absolute inset-y-0 rounded-full ${
                          scale.accent ? "bg-brand-500" : "bg-brand-300"
                        }`}
                        style={{
                          left: `${scale.range[0]}%`,
                          width: `${scale.range[1] - scale.range[0]}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-surface-line bg-white">
              <div className="grid grid-cols-[1fr_auto] items-center gap-2 border-b border-surface-line bg-surface-mist px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-ink-muted">
                <span>Categoría</span>
                <span>Rango</span>
              </div>
              {[
                { cat: "Grupo A · Dirección", rng: "A1 – A3" },
                { cat: "Grupo B · Mandos", rng: "B1 – B4" },
                { cat: "Grupo C · Técnicos", rng: "C1 – C5" },
              ].map((row) => (
                <div
                  key={row.cat}
                  className="grid grid-cols-[1fr_auto] items-center gap-2 border-b border-surface-line px-3 py-2 text-[10px] last:border-b-0"
                >
                  <span className="truncate font-medium text-ink-soft">
                    {row.cat}
                  </span>
                  <span className="rounded-full bg-surface-mist px-2 py-0.5 font-semibold text-ink-muted">
                    {row.rng}
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