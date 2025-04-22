
import React from "react";
import { BaseStickyNavigation } from "@/components/ui/base-sticky-navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Section } from "@/hooks/use-active-section";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const StickyNavigation: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const isMobile = useIsMobile();

  // Define sections from translation keys
  const sections: Section[] = [
    { id: "hero", label: t('aestheticTreatments.nav.intro', 'מבוא') },
    { id: "treatments", label: t('aestheticTreatments.nav.types', 'סוגי טיפולים') },
    { id: "benefits", label: t('aestheticTreatments.nav.benefits', 'יתרונות') },
    { id: "process", label: t('aestheticTreatments.nav.process', 'תהליך הטיפול') },
    { id: "testimonials", label: t('aestheticTreatments.nav.testimonials', 'המלצות') },
    { id: "faq", label: t('aestheticTreatments.nav.faq', 'שאלות נפוצות') },
  ];

  const ctaButton = {
    label: t('bookVisit', 'לקביעת ביקור'),
    onClick: () => {
      // Open WhatsApp or a booking modal
      window.open('https://wa.me/972035666915', '_blank');
    }
  };

  return (
    <BaseStickyNavigation 
      sections={sections}
      ctaButton={ctaButton}
      scrollOffset={isMobile ? 150 : 300}
      showBackToTop={true}
      className={`px-4 py-3 ${isRTL ? 'rtl' : 'ltr'} transition-all duration-300 backdrop-blur-md`}
    />
  );
};

export default StickyNavigation;
