
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TestimonialSection from '@/components/TestimonialSection';
import BrandSection from '@/components/BrandSection';
import TreatmentsSection from '@/components/TreatmentsSection';
import VideoSection from '@/components/VideoSection';
import SocialFeedSection from '@/components/SocialFeedSection';
import FAQSection from '@/components/FAQSection';
import AboutSection from '@/components/AboutSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupDirectionByLanguage } from '@/utils/direction';
import { Section } from '@/components/ui/section';
import AccessibleLayout from '@/components/layout/AccessibleLayout';

const LanguageHome = () => {
  const { language } = useLanguage();

  useEffect(() => {
    setupDirectionByLanguage(language);
    document.title = `Dental Love | ${language.toUpperCase()}`;
  }, [language]);

  return (
    <AccessibleLayout>
      <main>
        <Section background="none" spacing="none" containerClass="px-0">
          <HeroSection />
        </Section>
        
        <Section background="none" spacing="none" containerClass="px-0">
          <AboutSection />
        </Section>
        
        <Section background="none" spacing="none" containerClass="px-0">
          <BrandSection />
        </Section>
        
        <Section background="none" spacing="none" containerClass="px-0">
          <TreatmentsSection />
        </Section>
        
        <Section background="none" spacing="none" containerClass="px-0">
          <VideoSection />
        </Section>
        
        <Section background="none" spacing="none" containerClass="px-0">
          <SocialFeedSection />
        </Section>
        
        <Section background="none" spacing="none" containerClass="px-0">
          <TestimonialSection />
        </Section>
        
        <Section background="none" spacing="none" containerClass="px-0">
          <FAQSection />
        </Section>
      </main>
    </AccessibleLayout>
  );
};

export default LanguageHome;
