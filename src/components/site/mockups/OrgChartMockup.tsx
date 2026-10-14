import {
  Briefcase,
  CalendarRange,
  Coins,
  LayoutDashboard,
  Maximize2,
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

const UNITS = [
  [
    { name: "Ana Ruiz", role: "Dirección de Personas" },
    { name: "Marc Soler", role: "Operaciones" },
    { name: "Nora Vidal", role: "Tecnología" },
  ],
  [
    { name: "Lucía Prado", role: "Plantilla" },
    { name: "Iván Castro", role: "Logística" },
    { name: "Sara Molina", role: "Producto" },
  ],
];

function UnitCard({
  name,
  role,
  accent = false,
}: {
  name: string;
  role: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex w-[140px] shrink-0 items-center gap-2 rounded-xl border px-2.5 py-2 shadow-[0_1px_2px_rgba(16,27,51,0.04)] ${
        accent ? "border-brand-200 bg-brand-50" : "border-surface-line bg-white"
      }`}
    >
      <InitialsAvatar name={name} className="h-6 w-6" />
      <div className="min-w-0">
        <p className="truncate text-[10px] font-semibold text-ink">{name}</p>
        <p className="truncate text-[9px] text-ink-muted">{role}</p>
      </div>
    </div>
  );
}

export function OrgChartMockup() {
  return (
    <AppFrame url="app.sitecorp.com/estructura/organigrama">
      <div className="flex bg-[#FAFBFE]">
        <MockSidebar items={NAV_ITEMS} activeIndex={1} />

        <div className="min-w-0 flex-1">
          <header className="flex items-center gap-3 border-b border-surface-line bg-white px-3 py-2.5 sm:px-4">
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-surface-mist px-2.5 py-1.5 text-[11px] text-ink-muted ring-1 ring-surface-line">
              <Search className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="truncate">Estructura / Dirección General</span>
            </div>
            <Maximize2 className="h-4 w-4 text-ink-muted" aria-hidden />
          </header>

          <div className="p-3 sm:p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-md bg-brand-500 px-2.5 py-1 text-[10px] font-semibold text-white">
                Organigrama
              </span>
              <span className="rounded-md bg-white px-2.5 py-1 text-[10px] font-semibold text-ink-soft ring-1 ring-surface-line">
                Lista
              </span>
              <span className="ml-auto hidden text-[10px] font-medium text-ink-muted sm:block">
                12 unidades · 6 niveles
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-surface-line bg-white p-3 sm:p-5">
              <div className="flex flex-col items-center">
                <UnitCard
                  name="Dirección General"
                  role="Nivel 1"
                  accent
                />
                <div className="h-3 w-px bg-surface-line" />
                <div className="relative grid w-full grid-cols-3 gap-2 pt-3">
                  <div className="absolute left-[16.6%] right-[16.6%] top-0 h-px bg-surface-line" />
                  {["Operaciones", "Personas", "Tecnología"].map((unit) => (
                    <div
                      key={unit}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="h-3 w-px bg-surface-line" />
                      <div className="w-full rounded-lg border border-surface-line bg-white px-1.5 py-1.5 text-center shadow-[0_1px_2px_rgba(16,27,51,0.04)]">
                        <p className="truncate text-[10px] font-semibold text-ink">
                          {unit}
                        </p>
                        <p className="text-[9px] text-ink-muted">Nivel 2</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid w-full grid-cols-3 gap-2">
                  {UNITS.map((column, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <div className="h-4 w-px bg-surface-line" />
                      {column.map((person) => (
                        <div
                          key={person.name}
                          className="w-full rounded-lg border border-surface-line bg-surface-mist px-1.5 py-1.5 text-center"
                        >
                          <p className="truncate text-[9px] font-semibold text-ink-soft">
                            {person.name}
                          </p>
                          <p className="truncate text-[9px] text-ink-muted">
                            {person.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[
                { label: "Unidades", value: "12" },
                { label: "Profundidad", value: "6 niveles" },
                { label: "Sin asignar", value: "0" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-surface-line bg-white px-3 py-2"
                >
                  <p className="text-[9px] font-medium uppercase tracking-wide text-ink-muted">
                    {item.label}
                  </p>
                  <p className="font-display text-sm font-bold text-ink">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}