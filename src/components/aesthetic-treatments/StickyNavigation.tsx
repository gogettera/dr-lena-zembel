
import React from "react";
import { BaseStickyNavigation } from "@/components/ui/base-sticky-navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Section } from "@/hooks/use-active-section";
import { useIsMobile } from "@/hooks/use-mobile";

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

  // For mobile, limit the menu items to fit the screen better
  const mobileSections = isMobile ? sections.slice(0, 4) : sections;

  return (
    <BaseStickyNavigation 
      sections={mobileSections} 
      scrollOffset={isMobile ? 150 : 300}
      showBackToTop={true}
      rtl={isRTL}
      className={`${isMobile ? 'px-2 py-2' : 'px-4 py-3'} ${isRTL ? 'rtl' : 'ltr'}`}
    />
  );
};

export default StickyNavigation;
