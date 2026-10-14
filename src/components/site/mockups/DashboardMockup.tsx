import {
  Bell,
  Briefcase,
  CalendarRange,
  Coins,
  Download,
  LayoutDashboard,
  Network,
  Plus,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { AppFrame, InitialsAvatar, MockSidebar, StatTile } from "./AppFrame";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Panel" },
  { icon: Network, label: "Estructura" },
  { icon: Users, label: "Trabajadores" },
  { icon: Briefcase, label: "Puestos" },
  { icon: CalendarRange, label: "Plantillas" },
  { icon: Coins, label: "Escalas" },
  { icon: ShieldCheck, label: "Permisos" },
];

const STATS = [
  { label: "Unidades", value: "12", accent: false },
  { label: "Trabajadores", value: "348", accent: true },
  { label: "Puestos", value: "26", accent: false },
  { label: "Niveles", value: "6", accent: false },
];

const BRANCHES = [
  { title: "Operaciones", subtitle: "4 unidades" },
  { title: "Personas", subtitle: "3 unidades" },
  { title: "Tecnología", subtitle: "2 unidades" },
];

const PEOPLE = [
  { name: "Ana Ruiz", role: "Directora de Personas", meta: "Nivel 2" },
  { name: "Marc Soler", role: "Jefe de Operaciones", meta: "Nivel 3" },
  { name: "Lucía Prado", role: "Analista de Plantilla", meta: "Nivel 4" },
];

function OrgNode({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="w-full rounded-lg border border-surface-line bg-white px-2 py-1.5 text-center shadow-[0_1px_2px_rgba(16,27,51,0.04)]">
      <p className="truncate text-[10px] font-semibold text-ink">{title}</p>
      <p className="truncate text-[9px] text-ink-muted">{subtitle}</p>
    </div>
  );
}

export function DashboardMockup() {
  return (
    <AppFrame url="app.sitecorp.com/estructura">
      <div className="flex bg-[#FAFBFE]">
        <MockSidebar items={NAV_ITEMS} activeIndex={1} />

        <div className="min-w-0 flex-1">
          <header className="flex items-center gap-3 border-b border-surface-line bg-white px-3 py-2.5 sm:px-4">
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-surface-mist px-2.5 py-1.5 text-[11px] text-ink-muted ring-1 ring-surface-line">
              <Search className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="truncate">
                Buscar personas, puestos o unidades…
              </span>
            </div>
            <Bell className="hidden h-4 w-4 text-ink-muted sm:block" aria-hidden />
            <div className="flex items-center gap-2">
              <InitialsAvatar name="Ana Ruiz" className="h-6 w-6" />
              <span className="hidden text-[11px] font-semibold text-ink-soft sm:block">
                Ana Ruiz
              </span>
            </div>
          </header>

          <div className="space-y-3 p-3 sm:space-y-4 sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-500">
                  Estructura
                </p>
                <p className="truncate font-display text-sm font-bold text-ink">
                  Organigrama general
                </p>
              </div>
              <div className="hidden items-center gap-1.5 sm:flex">
                <span className="inline-flex items-center gap-1 rounded-md bg-brand-500 px-2.5 py-1.5 text-[10px] font-semibold text-white">
                  <Plus className="h-3 w-3" aria-hidden /> Añadir unidad
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1.5 text-[10px] font-semibold text-ink-soft ring-1 ring-surface-line">
                  <Download className="h-3 w-3" aria-hidden /> Exportar
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {STATS.map((stat) => (
                <StatTile key={stat.label} {...stat} />
              ))}
            </div>

            <div className="rounded-xl border border-surface-line bg-white p-3">
              <div className="flex flex-col items-center">
                <div className="w-40 max-w-[60%]">
                  <OrgNode title="Dirección General" subtitle="Nivel 1" />
                </div>
                <div className="h-3 w-px bg-surface-line" />
                <div className="relative grid w-full grid-cols-3 gap-2 pt-3">
                  <div className="absolute left-[16.6%] right-[16.6%] top-0 h-px bg-surface-line" />
                  {BRANCHES.map((branch) => (
                    <div
                      key={branch.title}
                      className="flex flex-col items-center"
                    >
                      <div className="h-3 w-px bg-surface-line" />
                      <OrgNode {...branch} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-surface-line bg-white">
              <div className="flex items-center justify-between border-b border-surface-line px-3 py-2">
                <p className="text-[11px] font-semibold text-ink">
                  Trabajadores recientes
                </p>
                <span className="text-[10px] font-medium text-brand-600">
                  Ver todos
                </span>
              </div>
              <div className="divide-y divide-surface-line">
                {PEOPLE.map((person) => (
                  <div
                    key={person.name}
                    className="flex items-center gap-3 px-3 py-2"
                  >
                    <InitialsAvatar name={person.name} className="h-6 w-6" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-semibold text-ink">
                        {person.name}
                      </p>
                      <p className="truncate text-[10px] text-ink-muted">
                        {person.role}
                      </p>
                    </div>
                    <span className="hidden rounded-full bg-brand-50 px-2 py-0.5 text-[9px] font-semibold text-brand-600 sm:inline">
                      {person.meta}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}