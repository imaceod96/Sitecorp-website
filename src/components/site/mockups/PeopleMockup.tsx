import {
  Briefcase,
  CalendarRange,
  Coins,
  Filter,
  LayoutDashboard,
  Mail,
  MapPin,
  Network,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { AppFrame, InitialsAvatar, MockSidebar } from "./AppFrame";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Panel" },
  { icon: Network, label: "Estructura" },
  { icon: Users, label: "Trabajadores" },
  { icon: Briefcase, label: "Puestos" },
  { icon: CalendarRange, label: "Plantillas" },
  { icon: Coins, label: "Escalas" },
  { icon: ShieldCheck, label: "Permisos" },
];

const ROWS = [
  { name: "Ana Ruiz", role: "Directora de Personas", unit: "Personas", level: "Nivel 2", status: "Activo" },
  { name: "Marc Soler", role: "Jefe de Operaciones", unit: "Operaciones", level: "Nivel 3", status: "Activo" },
  { name: "Nora Vidal", role: "Responsable IT", unit: "Tecnología", level: "Nivel 3", status: "Activo" },
  { name: "Lucía Prado", role: "Analista de Plantilla", unit: "Personas", level: "Nivel 4", status: "Alta pendiente" },
];

export function PeopleMockup() {
  return (
    <AppFrame url="app.sitecorp.com/trabajadores">
      <div className="flex bg-[#FAFBFE]">
        <MockSidebar items={NAV_ITEMS} activeIndex={2} />

        <div className="min-w-0 flex-1">
          <header className="flex items-center gap-3 border-b border-surface-line bg-white px-3 py-2.5 sm:px-4">
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-surface-mist px-2.5 py-1.5 text-[11px] text-ink-muted ring-1 ring-surface-line">
              <Search className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="truncate">Buscar trabajadores…</span>
            </div>
            <div className="hidden items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-[10px] font-semibold text-ink-soft ring-1 ring-surface-line sm:flex">
              <Filter className="h-3 w-3" aria-hidden /> Filtrar
            </div>
          </header>

          <div className="p-3 sm:p-4">
            <div className="mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-500">
                Personas
              </p>
              <p className="font-display text-sm font-bold text-ink">
                Directorio de trabajadores
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-surface-line bg-white">
              <div className="hidden grid-cols-[1.6fr_1.2fr_0.8fr] gap-2 border-b border-surface-line bg-surface-mist px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-ink-muted sm:grid">
                <span>Trabajador</span>
                <span>Unidad</span>
                <span>Nivel</span>
              </div>
              <div className="divide-y divide-surface-line">
                {ROWS.map((row) => (
                  <div
                    key={row.name}
                    className="grid grid-cols-1 items-center gap-2 px-3 py-2.5 sm:grid-cols-[1.6fr_1.2fr_0.8fr]"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <InitialsAvatar name={row.name} className="h-7 w-7" />
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold text-ink">
                          {row.name}
                        </p>
                        <p className="truncate text-[10px] text-ink-muted">
                          {row.role}
                        </p>
                      </div>
                    </div>
                    <div className="hidden items-center gap-1.5 text-[10px] text-ink-soft sm:flex">
                      <MapPin className="h-3 w-3 text-ink-muted" aria-hidden />
                      {row.unit}
                    </div>
                    <div className="flex items-center justify-between gap-2 sm:justify-start">
                      <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[9px] font-semibold text-brand-600">
                        {row.level}
                      </span>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
                        {row.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <div className="rounded-xl border border-surface-line bg-white p-3">
                <div className="flex items-center gap-2">
                  <InitialsAvatar name="Ana Ruiz" className="h-8 w-8" />
                  <div>
                    <p className="text-[11px] font-semibold text-ink">
                      Ana Ruiz
                    </p>
                    <p className="text-[10px] text-ink-muted">
                      Directora de Personas
                    </p>
                  </div>
                </div>
                <div className="mt-3 space-y-1.5">
                  <p className="flex items-center gap-1.5 text-[10px] text-ink-soft">
                    <Mail className="h-3 w-3 text-ink-muted" aria-hidden />
                    ana.ruiz@empresa.com
                  </p>
                  <p className="flex items-center gap-1.5 text-[10px] text-ink-soft">
                    <Network className="h-3 w-3 text-ink-muted" aria-hidden />
                    Reporta a Dirección General
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-surface-line bg-white p-3 sm:col-span-2">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                  Datos de la ficha
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {[
                    { label: "Puesto", value: "Dirección de Personas" },
                    { label: "Unidad", value: "Personas" },
                    { label: "Nivel", value: "2 · Escala B" },
                    { label: "Antigüedad", value: "6 años" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg border border-surface-line bg-surface-mist px-2.5 py-2"
                    >
                      <p className="text-[9px] font-medium uppercase tracking-wide text-ink-muted">
                        {item.label}
                      </p>
                      <p className="truncate text-[11px] font-semibold text-ink">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}