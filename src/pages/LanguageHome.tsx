import React from 'react';
import HeroSection from '@/components/HeroSection';
import TestimonialSection from '@/components/TestimonialSection';
import BrandSection from '@/components/BrandSection';
import TreatmentsSection from '@/components/TreatmentsSection';
import VideoSection from '@/components/VideoSection';
import SocialFeedSection from '@/components/SocialFeedSection';
import FAQSection from '@/components/FAQSection';
import BackToTop from '@/components/BackToTop';
import AboutSection from '@/components/AboutSection';
import { Section } from '@/components/ui/section';
import PageContainer from '@/components/layout/PageContainer';
import EmergencyBanner from '@/components/EmergencyBanner';

const LanguageHome = () => {
  return (
    <PageContainer title="home.pageTitle" description="home.pageDescription" className="overflow-hidden">
      <EmergencyBanner />
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
      <BackToTop />
    </PageContainer>
  );
};

export default LanguageHome;
