
import React, { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Section } from "@/components/ui/section";
import EnhancedHero from "./EnhancedHero";
import EnhancedTreatmentTypes from "./EnhancedTreatmentTypes";
import Benefits from "./Benefits";
import Process from "./Process";
import EnhancedTestimonials from "./EnhancedTestimonials";
import FAQ from "./FAQ";
import BookVisitAnchor from "./BookVisitAnchor";
import StickyNavigation from "./StickyNavigation";
import EmergencyBanner from "@/components/EmergencyBanner";

const AestheticTreatmentsLanding: React.FC = () => {
  const { isRTL, t } = useLanguage();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title and meta description
    document.title = "טיפולים אסתטיים - החיוך המושלם | ד״ר לנה זמבל";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'טיפולים אסתטיים מתקדמים: הלבנת שיניים, ציפויי חרסינה, עיצוב חיוך ועוד. 13+ שנות ניסיון, 1500+ מטופלים מרוצים. התייעצות חינם!');
    }
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
        <EnhancedHero />
      </Section>
      
      <Section background="none" spacing="none" containerClass="px-0" className="bg-white">
        <EnhancedTreatmentTypes />
      </Section>
      
      <Section background="none" spacing="none" containerClass="px-0" className="bg-white">
        <Benefits />
      </Section>
      
      <Section background="none" spacing="none" containerClass="px-0" className="bg-white">
        <Process />
      </Section>
      
      <Section background="none" spacing="none" containerClass="px-0" className="bg-white">
        <EnhancedTestimonials />
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
