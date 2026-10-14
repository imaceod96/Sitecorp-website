import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { Solutions } from "@/components/site/Solutions";
import { ProductShowcase } from "@/components/site/ProductShowcase";
import { Benefits } from "@/components/site/Benefits";
import { Security } from "@/components/site/Security";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-brand-500 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Saltar al contenido
      </a>

      <Navbar />

      <main id="contenido">
        <Hero />
        <Features />
        <Solutions />
        <ProductShowcase />
        <Benefits />
        <Security />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </div>
  );
};

export default Index;