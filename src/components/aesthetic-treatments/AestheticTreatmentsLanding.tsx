
import React, { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Section } from "@/components/ui/section";
import Hero from "./Hero";
import TreatmentTypes from "./TreatmentTypes";
import Benefits from "./Benefits";
import Process from "./Process";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import BookVisitAnchor from "./BookVisitAnchor";
import StickyNavigation from "./StickyNavigation";
import EmergencyBanner from "@/components/EmergencyBanner";

const AestheticTreatmentsLanding: React.FC = () => {
  const { isRTL, t } = useLanguage();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="overflow-x-hidden">
      {/* Emergency Banner */}
      <EmergencyBanner />

      <a 
        href="#hero" 
        className="skip-to-content"
      >
        {t("accessibility.skipToContent", "דלג לתוכן הראשי")}
      </a>
      <StickyNavigation />
      
      <Section background="none" spacing="none" containerClass="px-0" className="bg-white">
        <Hero />
      </Section>
      
      <Section background="none" spacing="none" containerClass="px-0" className="bg-white">
        <TreatmentTypes />
      </Section>
      
      <Section background="none" spacing="none" containerClass="px-0" className="bg-white">
        <Benefits />
      </Section>
      
      <Section background="none" spacing="none" containerClass="px-0" className="bg-white">
        <Process />
      </Section>
      
      <Section background="none" spacing="none" containerClass="px-0" className="bg-white">
        <Testimonials />
      </Section>
      
      <Section background="none" spacing="none" containerClass="px-0" className="bg-white">
        <FAQ />
      </Section>
      
      <Section background="none" spacing="none" containerClass="px-0" className="bg-white">
        <BookVisitAnchor />
      </Section>
    </div>
  );
};

export default AestheticTreatmentsLanding;

