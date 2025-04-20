
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TestimonialSection from '@/components/TestimonialSection';
import BrandSection from '@/components/BrandSection';
import TreatmentsSection from '@/components/TreatmentsSection';
import VideoSection from '@/components/VideoSection';
import SocialFeedSection from '@/components/SocialFeedSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AboutSection from '@/components/AboutSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupDirectionByLanguage } from '@/utils/direction';

const Index = () => {
  const { language } = useLanguage();

  useEffect(() => {
    setupDirectionByLanguage(language);
  }, [language]);

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <BrandSection />
        <TreatmentsSection />
        <VideoSection />
        <SocialFeedSection />
        <TestimonialSection />
        <FAQSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
