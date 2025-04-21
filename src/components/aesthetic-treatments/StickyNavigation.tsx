
import React from "react";
import { BaseStickyNavigation } from "@/components/ui/base-sticky-navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Section } from "@/hooks/use-active-section";

const StickyNavigation: React.FC = () => {
  const { t } = useLanguage();

  // Define sections from translation keys
  const sections: Section[] = [
    { id: "hero", label: t('aestheticTreatments.nav.intro', 'מבוא') },
    { id: "treatments", label: t('aestheticTreatments.nav.types', 'סוגי טיפולים') },
    { id: "benefits", label: t('aestheticTreatments.nav.benefits', 'יתרונות') },
    { id: "process", label: t('aestheticTreatments.nav.process', 'תהליך הטיפול') },
    { id: "testimonials", label: t('aestheticTreatments.nav.testimonials', 'המלצות') },
    { id: "faq", label: t('aestheticTreatments.nav.faq', 'שאלות נפוצות') },
  ];

  return (
    <BaseStickyNavigation 
      sections={sections} 
      scrollOffset={300}
      showBackToTop={true}
    />
  );
};

export default StickyNavigation;
