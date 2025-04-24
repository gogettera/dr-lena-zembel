
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Section } from '@/components/ui/section';
import BotoxTreatmentsHero from './BotoxTreatmentsHero';
import TreatmentTypes from './TreatmentTypes';
import BenefitsSection from './BenefitsSection';
import ProcessSection from './ProcessSection';
import BeforeAfterSection from './BeforeAfterSection';
import DoctorProfile from './DoctorProfile';
import SafetySection from './SafetySection';
import TreatmentComparison from './TreatmentComparison';
import FAQSection from './FAQSection';
import BookingSection from './BookingSection';
import TestimonialsSection from './TestimonialsSection';
import StickyNavigation from './StickyNavigation';

const BotoxTreatmentsLanding: React.FC = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      {/* Skip to content accessibility link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-dental-navy focus:rounded-md"
      >
        {t('accessibility.skipToContent')}
      </a>

      <StickyNavigation />

      <div id="main-content">
        <BotoxTreatmentsHero />
        
        <Section id="treatment-types" background="beige" spacing="lg">
          <TreatmentTypes />
        </Section>

        <Section id="benefits" background="white" spacing="lg">
          <BenefitsSection />
        </Section>

        <Section id="process" background="gradient" spacing="lg">
          <ProcessSection />
        </Section>

        <Section id="before-after" background="white" spacing="lg">
          <BeforeAfterSection />
        </Section>

        <Section id="doctor" background="beige" spacing="lg">
          <DoctorProfile />
        </Section>

        <Section id="safety" background="white" spacing="lg">
          <SafetySection />
        </Section>

        <Section id="comparison" background="beige" spacing="lg">
          <TreatmentComparison />
        </Section>

        <Section id="testimonials" background="white" spacing="lg">
          <TestimonialsSection />
        </Section>

        <Section id="faq" background="gradient" spacing="lg">
          <FAQSection />
        </Section>

        <Section id="booking" background="navy" spacing="lg">
          <BookingSection />
        </Section>
      </div>
    </div>
  );
};

export default BotoxTreatmentsLanding;
