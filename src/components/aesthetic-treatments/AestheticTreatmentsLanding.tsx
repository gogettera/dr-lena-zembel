
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
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <a href="#hero" className="sr-only focus:not-sr-only">
        {t('skipToContent') || "דלג לתוכן העיקרי"}
      </a>
      <StickyNavigation />
      <Hero />
      <div className="p-4">
        <TreatmentTypes />
        <Benefits />
        <Process />
        <Testimonials />
        <FAQ />
        <BookVisitAnchor />
      </div>
    </div>
  );
};

export default AestheticTreatmentsLanding;
