import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CalendarRange,
  CheckCircle2,
  ChevronRight,
  Coins,
  Download,
  Layers,
  Network,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Container } from "./Layout";
import { AppFrame, InitialsAvatar } from "./mockups/AppFrame";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onRequestDemo: () => void;
}

const PILLARS = [
  { icon: Network, label: "Estructuras y Jerarquías" },
  { icon: Users, label: "Personas y Fichas" },
  { icon: Layers, label: "Plantillas y Plazas" },
  { icon: Briefcase, label: "Gestión Contractual" },
  { icon: Coins, label: "Escalas Salariales" },
];

export function Hero({ onRequestDemo }: HeroProps) {
  const [activeTab, setActiveTab] = useState<"resumen" | "organigrama" | "plantilla">("resumen");

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* Background decoration with refined brand colors */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-surface-mist" />
        <div className="absolute inset-x-0 top-0 h-[640px] bg-grid bg-grid-fade opacity-60" />
        <div className="absolute -left-28 top-16 h-96 w-96 rounded-full bg-teal-100/50 blur-3xl" />
        <div className="absolute -right-28 top-32 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/90 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-teal-800 shadow-sm backdrop-blur-sm animate-fade-up">
            <span className="h-2 w-2 rounded-full bg-accent-500 animate-pulse" />
            Software de Gestión Organizativa y Recursos Humanos
          </div>

          {/* Main Title */}
          <h1
            className="mt-6 max-w-4xl text-balance font-display text-[2.25rem] font-extrabold leading-[1.12] text-ink animate-fade-up sm:text-[3rem] lg:text-[3.65rem] tracking-tight"
            style={{ animationDelay: "100ms" }}
          >
            Toda tu organización.{" "}
            <span className="text-brand-500">Una sola plataforma.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted animate-fade-up sm:text-lg lg:text-xl"
            style={{ animationDelay: "180ms" }}
          >
            Organiza tu estructura empresarial, gestiona personas, planifica plantillas y centraliza
            los procesos de recursos humanos desde un único entorno.
          </p>

          {/* Action Buttons */}
          <div
            className="mt-9 flex w-full flex-col items-center justify-center gap-3.5 animate-fade-up sm:w-auto sm:flex-row"
            style={{ animationDelay: "260ms" }}
          >
            <Button
              onClick={onRequestDemo}
              className="group h-12 w-full rounded-xl bg-brand-500 px-7 text-base font-semibold text-white shadow-soft transition-all hover:bg-brand-600 hover:shadow-lift sm:w-auto"
            >
              Solicitar demostración
              <ArrowRight
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Button>
            <a
              href="#explorador"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-surface-line bg-white px-7 text-base font-semibold text-ink-soft shadow-sm transition-all hover:border-brand-300 hover:bg-surface-mist hover:text-brand-700 sm:w-auto"
            >
              Explorar la plataforma
            </a>
          </div>

          {/* Capability Pills */}
          <ul
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 animate-fade-up"
            style={{ animationDelay: "340ms" }}
          >
            {PILLARS.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 text-xs font-semibold text-ink-soft sm:text-sm"
              >
                <item.icon className="h-4 w-4 text-accent-500" aria-hidden />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Hero Interactive Showcase / Product Preview */}
        <div
          className="relative mt-12 animate-fade-up sm:mt-16 lg:mt-20"
          style={{ animationDelay: "420ms" }}
        >
          <div
            className="pointer-events-none absolute inset-x-8 -bottom-6 top-10 rounded-[2.5rem] bg-brand-500/10 blur-3xl"
            aria-hidden
          />

          <AppFrame url="app.sitecorp.com/panel-control" className="relative shadow-lift">
            <div className="bg-surface-mist">
              {/* Internal Mockup Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-line bg-white px-4 py-3 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 rounded-lg bg-surface-mist p-1 border border-surface-line">
                    <button
                      type="button"
                      onClick={() => setActiveTab("resumen")}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                        activeTab === "resumen"
                          ? "bg-brand-500 text-white shadow-sm"
                          : "text-ink-soft hover:bg-white"
                      }`}
                    >
                      Resumen Ejecutivo
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("organigrama")}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                        activeTab === "organigrama"
                          ? "bg-brand-500 text-white shadow-sm"
                          : "text-ink-soft hover:bg-white"
                      }`}
                    >
                      Estructura & UEBs
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("plantilla")}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                        activeTab === "plantilla"
                          ? "bg-brand-500 text-white shadow-sm"
                          : "text-ink-soft hover:bg-white"
                      }`}
                    >
                      Plazas & Vacantes
                    </button>
                  </div>
                </div>

                <div className="hidden items-center gap-2 sm:flex">
                  <div className="flex items-center gap-1.5 rounded-lg bg-surface-mist px-3 py-1.5 text-xs text-ink-muted border border-surface-line">
                    <Search className="h-3.5 w-3.5 text-ink-muted" />
                    <span>Buscar departamento o trabajador...</span>
                  </div>
                  <span className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800">
                    Entidad: Holding Corporativo
                  </span>
                </div>
              </div>

              {/* Dynamic Tab Body */}
              <div className="p-4 sm:p-6">
                {activeTab === "resumen" && (
                  <div className="space-y-4">
                    {/* Real Enterprise KPI Bar */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <div className="rounded-xl border border-surface-line bg-white p-3.5 shadow-sm">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                          Plantilla Activa
                        </span>
                        <p className="mt-1 font-display text-2xl font-extrabold text-ink">1.248</p>
                        <p className="mt-0.5 text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> 100% con contrato activo
                        </p>
                      </div>

                      <div className="rounded-xl border border-surface-line bg-white p-3.5 shadow-sm">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                          Plazas Presupuestadas
                        </span>
                        <p className="mt-1 font-display text-2xl font-extrabold text-brand-600">1.320</p>
                        <p className="mt-0.5 text-[11px] font-medium text-teal-700">
                          94.5% cobertura autorizada
                        </p>
                      </div>

                      <div className="rounded-xl border border-surface-line bg-white p-3.5 shadow-sm">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                          Plazas Vacantes
                        </span>
                        <p className="mt-1 font-display text-2xl font-extrabold text-accent-500">72</p>
                        <p className="mt-0.5 text-[11px] font-medium text-accent-700">
                          42 en proceso selectivo
                        </p>
                      </div>

                      <div className="rounded-xl border border-surface-line bg-white p-3.5 shadow-sm">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                          Entidades & UEBs
                        </span>
                        <p className="mt-1 font-display text-2xl font-extrabold text-ink">14</p>
                        <p className="mt-0.5 text-[11px] font-medium text-ink-soft">
                          Organigrama consolidado
                        </p>
                      </div>
                    </div>

                    {/* Split View: Mini Org Tree & Recent Movements */}
                    <div className="grid gap-4 lg:grid-cols-12">
                      <div className="rounded-xl border border-surface-line bg-white p-4 lg:col-span-7">
                        <div className="flex items-center justify-between border-b border-surface-line pb-2.5">
                          <p className="text-xs font-bold text-ink">Estructura Organizativa Consolidada</p>
                          <span className="text-[10px] text-brand-600 font-semibold">Ver organigrama completo →</span>
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between rounded-lg bg-surface-mist p-2.5 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-brand-500" />
                              <span className="font-bold text-ink">Dirección General & Presidencia</span>
                            </div>
                            <span className="font-mono text-[11px] text-ink-muted">6 plazas · 100%</span>
                          </div>
                          <div className="ml-4 flex items-center justify-between rounded-lg bg-surface-mist/70 p-2.5 text-xs border border-surface-line">
                            <div className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                              <span className="font-semibold text-ink">UEB Operaciones Industriales</span>
                            </div>
                            <span className="font-mono text-[11px] text-teal-700">462 / 480 plazas</span>
                          </div>
                          <div className="ml-4 flex items-center justify-between rounded-lg bg-surface-mist/70 p-2.5 text-xs border border-surface-line">
                            <div className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                              <span className="font-semibold text-ink">UEB Servicios Técnicos & Logística</span>
                            </div>
                            <span className="font-mono text-[11px] text-teal-700">362 / 390 plazas</span>
                          </div>
                          <div className="ml-4 flex items-center justify-between rounded-lg bg-surface-mist/70 p-2.5 text-xs border border-surface-line">
                            <div className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                              <span className="font-semibold text-ink">Dirección Central de Recursos Humanos</span>
                            </div>
                            <span className="font-mono text-[11px] text-teal-700">28 / 28 plazas</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl border border-surface-line bg-white p-4 lg:col-span-5">
                        <div className="flex items-center justify-between border-b border-surface-line pb-2.5">
                          <p className="text-xs font-bold text-ink">Movimientos y Altas Recientes</p>
                          <span className="text-[10px] text-teal-700 font-semibold">Trazabilidad OK</span>
                        </div>
                        <div className="mt-3 space-y-2.5 text-xs">
                          {[
                            { name: "Beatriz Carrillo", action: "Alta contractual (Indefinido)", unit: "UEB Logística", time: "Hoy" },
                            { name: "Marcos Del Valle", action: "Promoción a Jefe de Área", unit: "Operaciones", time: "Ayer" },
                            { name: "Elena Ramos", action: "Reubicación aprobada", unit: "Sistemas TI", time: "Hace 2d" },
                          ].map((mov, i) => (
                            <div key={i} className="flex items-center justify-between border-b border-surface-line/70 pb-2 last:border-0 last:pb-0">
                              <div className="flex items-center gap-2">
                                <InitialsAvatar name={mov.name} className="h-6 w-6 text-[10px]" />
                                <div>
                                  <p className="font-bold text-ink text-[11px]">{mov.name}</p>
                                  <p className="text-[10px] text-ink-muted">{mov.action}</p>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono text-ink-muted">{mov.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "organigrama" && (
                  <div className="rounded-xl border border-surface-line bg-white p-5 text-center">
                    <p className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                      Modelo Organizativo Dinámico
                    </p>
                    <h4 className="mt-1 font-display text-base font-bold text-ink">
                      Jerarquía Multi-Entidad con Dependencias Directas
                    </h4>
                    <p className="mt-1 text-xs text-ink-muted max-w-lg mx-auto">
                      Cada centro y departamento refleja su línea de mando, responsables asignados y
                      su cuota presupuestaria de personal.
                    </p>

                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                      <div className="rounded-xl border border-surface-line bg-surface-mist p-3">
                        <span className="text-[10px] font-bold text-brand-600">EMPRESA MATRIZ</span>
                        <p className="font-bold text-xs text-ink mt-1">SiteCorp Holding S.A.</p>
                        <p className="text-[10px] text-ink-muted">Responsable: Alejandro Valdés</p>
                        <span className="mt-2 inline-block rounded bg-teal-50 px-1.5 py-0.5 text-[9px] font-semibold text-teal-800">
                          18 dependencias directas
                        </span>
                      </div>
                      <div className="rounded-xl border border-surface-line bg-surface-mist p-3">
                        <span className="text-[10px] font-bold text-teal-700">UNIDAD EMPRESARIAL BASE</span>
                        <p className="font-bold text-xs text-ink mt-1">UEB Industrial Norte</p>
                        <p className="text-[10px] text-ink-muted">Responsable: Roberto Maza</p>
                        <span className="mt-2 inline-block rounded bg-teal-50 px-1.5 py-0.5 text-[9px] font-semibold text-teal-800">
                          462 trabajadores
                        </span>
                      </div>
                      <div className="rounded-xl border border-surface-line bg-surface-mist p-3">
                        <span className="text-[10px] font-bold text-teal-700">UNIDAD EMPRESARIAL BASE</span>
                        <p className="font-bold text-xs text-ink mt-1">UEB Logística & Transporte</p>
                        <p className="text-[10px] text-ink-muted">Responsable: Elena Cordero</p>
                        <span className="mt-2 inline-block rounded bg-teal-50 px-1.5 py-0.5 text-[9px] font-semibold text-teal-800">
                          362 trabajadores
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "plantilla" && (
                  <div className="rounded-xl border border-surface-line bg-white p-4">
                    <div className="flex items-center justify-between border-b border-surface-line pb-3">
                      <div>
                        <h4 className="text-xs font-bold text-ink">Control de Plazas y Vacantes por Nivel</h4>
                        <p className="text-[10px] text-ink-muted">Comparativa presupuestada vs real actualizada hoy</p>
                      </div>
                      <span className="rounded-md bg-brand-500 px-2.5 py-1 text-[10px] font-semibold text-white">
                        + Nueva plaza presupuestada
                      </span>
                    </div>

                    <div className="mt-3 divide-y divide-surface-line text-[11px]">
                      {[
                        { cargo: "Especialista Principal de RRHH", nivel: "Escala VII", pres: 14, cub: 14, vac: 0, estado: "Completo" },
                        { cargo: "Ingeniero de Operaciones de Planta", nivel: "Escala VI", pres: 28, cub: 24, vac: 4, estado: "4 en selección" },
                        { cargo: "Técnico Especialista en Mantenimiento", nivel: "Escala V", pres: 45, cub: 41, vac: 4, estado: "2 convocatorias" },
                        { cargo: "Analista de Control y Presupuesto", nivel: "Escala VI", pres: 8, cub: 7, vac: 1, estado: "1 vacante libre" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-2.5">
                          <div>
                            <p className="font-bold text-ink">{item.cargo}</p>
                            <p className="text-[10px] text-ink-muted">{item.nivel}</p>
                          </div>
                          <div className="flex items-center gap-4 text-right">
                            <span className="font-mono text-xs text-ink font-semibold">{item.cub} / {item.pres}</span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                              item.vac === 0 ? "bg-emerald-50 text-emerald-700" : "bg-accent-50 text-accent-700"
                            }`}>
                              {item.estado}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AppFrame>
        </div>
      </Container>

      <div className="h-16 sm:h-20" aria-hidden />
    </section>
  );
}