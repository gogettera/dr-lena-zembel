
import React from "react";
import { BaseStickyNavigation } from "@/components/ui/base-sticky-navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Section } from "@/hooks/use-active-section";

const StickyNavigation: React.FC = () => {
  const { t } = useLanguage();
  
  // Define sections from translation keys
  const sections: Section[] = [
    { id: "hero", label: t('childrenDentistry.nav.main', 'ראשי') },
    { id: "why-us", label: t('childrenDentistry.nav.whyUs', 'למה אנחנו') },
    { id: "visit-steps", label: t('childrenDentistry.nav.visitSteps', 'מהלך הביקור') },
    { id: "testimonials", label: t('childrenDentistry.nav.testimonials', 'עדויות') },
    { id: "faq", label: t('childrenDentistry.nav.faq', 'שאלות נפוצות') },
    { id: "contact", label: t('childrenDentistry.nav.contact', 'צור קשר') },
  ];

  // Define CTA button
  const ctaButton = {
    label: t('bookAppointment', 'קביעת תור'),
    onClick: () => {},
    href: "#book-appointment"
  };

  return (
    <BaseStickyNavigation 
      sections={sections} 
      ctaButton={ctaButton}
      scrollOffset={300}
      showBackToTop={false}
    />
  );
};

export default StickyNavigation;
