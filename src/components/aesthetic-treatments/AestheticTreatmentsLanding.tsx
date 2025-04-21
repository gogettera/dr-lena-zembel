
import React, { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Hero from "./Hero";
import TreatmentTypes from "./TreatmentTypes";
import Benefits from "./Benefits";
import Process from "./Process";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import BookVisitAnchor from "./BookVisitAnchor";
import StickyNavigation from "./StickyNavigation";
import { Section } from "@/components/ui/section";

const AestheticTreatmentsLanding: React.FC = () => {
  const { t, isRTL } = useLanguage();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <a href="#hero" className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-4 focus:left-4 focus:bg-white focus:text-dental-navy focus:px-4 focus:py-2 focus:rounded-md">
        {t('skipToContent', "Skip to main content")}
      </a>
      <StickyNavigation />
      
      <Section id="hero" spacing="lg" background="none" fullWidth>
        <Hero />
      </Section>
      
      <Section id="treatments" spacing="lg" background="white" maxWidth="xl">
        <TreatmentTypes />
      </Section>
      
      <Section id="benefits" spacing="lg" background="beige" maxWidth="xl">
        <Benefits />
      </Section>
      
      <Section id="process" spacing="lg" background="white" fullWidth>
        <Process />
      </Section>
      
      <Section id="testimonials" spacing="lg" background="beige" maxWidth="xl">
        <Testimonials />
      </Section>
      
      <Section id="faq" spacing="lg" background="white" maxWidth="xl">
        <FAQ />
      </Section>
      
      <Section spacing="lg" background="gradient" maxWidth="xl">
        <BookVisitAnchor />
      </Section>
    </div>
  );
};

export default AestheticTreatmentsLanding;
