import { useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { ValueProposition } from "@/components/site/ValueProposition";
import { PlatformExplorer } from "@/components/site/PlatformExplorer";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Features } from "@/components/site/Features";
import { Solutions } from "@/components/site/Solutions";
import { Security } from "@/components/site/Security";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";
import { DemoModal } from "@/components/site/DemoModal";

const Index = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | undefined>(undefined);

  const handleOpenDemo = (moduleName?: string) => {
    setSelectedModule(moduleName);
    setDemoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-brand-500 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Saltar al contenido
      </a>

      {/* Top sticky navigation */}
      <Navbar onRequestDemo={() => handleOpenDemo()} />

      <main id="contenido">
        {/* 1. Hero principal con KPIs y preview interactivo */}
        <Hero onRequestDemo={() => handleOpenDemo()} />

        {/* 2. Propuesta de valor: Centralización, Control, Eficiencia */}
        <ValueProposition />

        {/* 3. Explorador interactivo de la plataforma (Sección protagonista) */}
        <PlatformExplorer onRequestDemo={(mod) => handleOpenDemo(mod)} />

        {/* 4. Cómo funciona SiteCorp (recorrido de 3 pasos) */}
        <HowItWorks onRequestDemo={() => handleOpenDemo("Consultoría Inicial")} />

        {/* 5. Funcionalidades destacadas en galería modular */}
        <Features onRequestDemo={(mod) => handleOpenDemo(mod)} />

        {/* 6. Soluciones empresariales por modelo de gobierno */}
        <Solutions onRequestDemo={() => handleOpenDemo("Soluciones Organizativas")} />

        {/* 7. Seguridad, permisos jerárquicos y trazabilidad */}
        <Security />

        {/* 8. Preguntas frecuentes accesibles */}
        <Faq onRequestDemo={() => handleOpenDemo("Dudas y Evaluación")} />

        {/* 9. CTA final con formulario de contacto y demostración */}
        <FinalCta />
      </main>

      {/* Footer corporativo */}
      <Footer onRequestDemo={() => handleOpenDemo()} />

      {/* Modal interactivo de solicitud de demo */}
      <DemoModal
        open={demoModalOpen}
        onOpenChange={setDemoModalOpen}
        defaultModule={selectedModule}
      />
    </div>
  );
};

export default Index;