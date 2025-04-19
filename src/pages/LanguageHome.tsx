
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TestimonialSection from '@/components/TestimonialSection';
import BrandSection from '@/components/BrandSection';
import TreatmentsSection from '@/components/TreatmentsSection';
import VideoSection from '@/components/VideoSection';
import SocialFeedSection from '@/components/SocialFeedSection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupDirectionByLanguage } from '@/utils/direction';

const LanguageHome = () => {
  const { language } = useLanguage();

  useEffect(() => {
    setupDirectionByLanguage(language);
    document.title = `Dental Love | ${language.toUpperCase()}`;
  }, [language]);

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <BrandSection />
        <TreatmentsSection />
        <VideoSection />
        <SocialFeedSection />
        <TestimonialSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default LanguageHome;
