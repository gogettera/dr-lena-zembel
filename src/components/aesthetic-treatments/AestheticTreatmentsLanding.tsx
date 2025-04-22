
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

const AestheticTreatmentsLanding: React.FC = () => {
  const { isRTL } = useLanguage();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <a href="#hero" className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-4 focus:left-4 focus:bg-white focus:text-dental-navy focus:px-4 focus:py-2 focus:rounded-md">
        Skip to main content
      </a>
      <StickyNavigation />
      
      <Hero />
      <TreatmentTypes />
      <Benefits />
      <Process />
      <Testimonials />
      <FAQ />
      <BookVisitAnchor />
    </div>
  );
};

export default AestheticTreatmentsLanding;
