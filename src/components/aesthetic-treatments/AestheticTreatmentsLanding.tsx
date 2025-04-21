
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
    <div className="bg-gradient-to-br from-[#FFDEE2]/40 via-[#F1F0FB]/20 to-[#FDF4F0]/50 overflow-x-hidden">
      {/* Skip to content link for accessibility */}
      <a href="#hero" className="skip-to-content">דלג לתוכן העיקרי</a>

      {/* Sticky Navigation */}
      <StickyNavigation />

      {/* HERO at very top as page opener */}
      <Hero />

      {/* Treatment Types */}
      <TreatmentTypes />
      
      {/* Benefits */}
      <Benefits />
      
      {/* Treatment Process */}
      <Process />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* FAQ */}
      <FAQ />

      {/* Book Visit Button */}
      <BookVisitAnchor />
    </div>
  );
};

export default AestheticTreatmentsLanding;
