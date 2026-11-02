import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Coins,
  Expand,
  Layers,
  Network,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { Container } from "./Layout";
import { AppFrame } from "./mockups/AppFrame";
import { Button } from "@/components/ui/button";
import { PRODUCT_SCREENSHOTS } from "@/lib/screenshots";

interface HeroProps {
  onRequestDemo: () => void;
}

const PILLARS = [
  { icon: Network, label: "Multi-Entidad (Grupo, Empresas y UEBs)" },
  { icon: Users, label: "Expedientes y Trabajadores" },
  { icon: Layers, label: "Plantillas y Anexo 14B" },
  { icon: Briefcase, label: "Contratación y Vacantes" },
  { icon: Coins, label: "Escalas Salariales (Grupos I–XXIV)" },
];

type HeroTabKey = "resumen" | "entidades" | "plantilla";

const HERO_TABS: {
  key: HeroTabKey;
  label: string;
  shortBadge: string;
}[] = [
  {
    key: "resumen",
    label: "Resumen Ejecutivo",
    shortBadge: "KPIs + Descendientes",
  },
  {
    key: "entidades",
    label: "Selector Multi-Entidad (UEBs)",
    shortBadge: "13 Entidades en Árbol",
  },
  {
    key: "plantilla",
    label: "Plantilla & Anexo 14B",
    shortBadge: "Plazas, Escalas y Vacantes",
  },
];

export function Hero({ onRequestDemo }: HeroProps) {
  const [activeTab, setActiveTab] = useState<HeroTabKey>("resumen");
  const [zoomedImage, setZoomedImage] = useState<{ src: string; title: string } | null>(null);

  const currentShot = PRODUCT_SCREENSHOTS[activeTab];

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
            Gobierna grupos empresariales, empresas y UEBs desde un único entorno: controla
            plantillas autorizadas (Anexo 14B), expedientes de trabajadores, cobertura de vacantes,
            escalas salariales y documentación oficial automatizada.
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
              Explorar módulos reales
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

        {/* Hero Interactive Showcase with Real Product Captures */}
        <div
          className="relative mt-12 animate-fade-up sm:mt-16 lg:mt-20"
          style={{ animationDelay: "420ms" }}
        >
          <div
            className="pointer-events-none absolute inset-x-8 -bottom-6 top-10 rounded-[2.5rem] bg-brand-500/10 blur-3xl"
            aria-hidden
          />

          <AppFrame url={currentShot.url} className="relative shadow-lift">
            <div className="bg-surface-mist">
              {/* Top Interactive Switcher Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-line bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-surface-mist p-1 border border-surface-line">
                  {HERO_TABS.map((tab) => {
                    const isActive = activeTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                          isActive
                            ? "bg-brand-500 text-white shadow-sm"
                            : "text-ink-soft hover:bg-white hover:text-brand-600"
                        }`}
                      >
                        <span>{tab.label}</span>
                        <span
                          className={`hidden rounded px-1.5 py-0.5 text-[10px] md:inline-block ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-teal-50 text-teal-700"
                          }`}
                        >
                          {tab.shortBadge}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden items-center gap-1.5 rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800 sm:inline-flex">
                    <Sparkles className="h-3.5 w-3.5 text-accent-500" />
                    Captura real del sistema SiteCorp
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setZoomedImage({ src: currentShot.src, title: currentShot.title })
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg border border-surface-line bg-white px-2.5 py-1 text-xs font-semibold text-ink-soft shadow-sm transition-colors hover:border-brand-300 hover:text-brand-600"
                  >
                    <Expand className="h-3.5 w-3.5" />
                    <span>Ampliar vista</span>
                  </button>
                </div>
              </div>

              {/* Real Screenshot Display */}
              <div className="p-3 sm:p-5">
                {activeTab === "entidades" ? (
                  <div className="grid gap-5 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-6 flex justify-center">
                      <div
                        onClick={() =>
                          setZoomedImage({ src: currentShot.src, title: currentShot.title })
                        }
                        className="group relative cursor-zoom-in overflow-hidden rounded-xl border border-surface-line bg-white shadow-card transition-all hover:border-brand-300"
                      >
                        <img
                          src={currentShot.src}
                          alt={currentShot.title}
                          className="max-h-[460px] w-auto object-contain mx-auto"
                        />
                        <div className="absolute bottom-3 right-3 rounded-lg bg-ink/80 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                          Clic para ampliar
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-6 space-y-4 text-left bg-white p-5 sm:p-6 rounded-xl border border-surface-line shadow-sm">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-700">
                        {currentShot.badge}
                      </span>
                      <h3 className="font-display text-xl font-bold text-ink">
                        {currentShot.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-ink-muted">
                        {currentShot.subtitle}
                      </p>
                      <ul className="space-y-2.5 pt-2">
                        {currentShot.highlights.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-soft">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div
                      onClick={() =>
                        setZoomedImage({ src: currentShot.src, title: currentShot.title })
                      }
                      className="group relative cursor-zoom-in overflow-hidden rounded-xl border border-surface-line bg-white shadow-sm transition-all hover:border-brand-300"
                    >
                      <img
                        src={currentShot.src}
                        alt={currentShot.title}
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute bottom-3 right-3 rounded-lg bg-ink/80 px-3 py-1.5 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 flex items-center gap-1.5">
                        <Expand className="h-3.5 w-3.5" />
                        Clic para ver en pantalla completa
                      </div>
                    </div>

                    {/* Caption Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-surface-line bg-white px-4 py-3 text-left">
                      <div>
                        <p className="text-xs font-bold text-ink">{currentShot.title}</p>
                        <p className="text-[11px] text-ink-muted">{currentShot.subtitle}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentShot.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 rounded-md bg-surface-mist px-2.5 py-1 text-[11px] font-medium text-ink-soft border border-surface-line"
                          >
                            <CheckCircle2 className="h-3 w-3 text-teal-600 shrink-0" />
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AppFrame>
        </div>
      </Container>

      {/* Lightbox Modal for Full-Resolution Inspection */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setZoomedImage(null)}
        >
          <div
            className="relative max-h-[92vh] max-w-6xl overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-surface-line bg-surface-mist px-4 py-3">
              <p className="text-xs font-bold text-ink sm:text-sm">{zoomedImage.title}</p>
              <button
                type="button"
                onClick={() => setZoomedImage(null)}
                className="rounded-lg p-1 text-ink-muted hover:bg-white hover:text-ink"
                aria-label="Cerrar vista ampliada"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[82vh] overflow-auto bg-surface-mist p-2 sm:p-4">
              <img
                src={zoomedImage.src}
                alt={zoomedImage.title}
                className="mx-auto h-auto max-w-full rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      )}

      <div className="h-16 sm:h-20" aria-hidden />
    </section>
  );
}