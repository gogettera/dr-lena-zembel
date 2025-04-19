
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TestimonialSection from '@/components/TestimonialSection';
import BrandSection from '@/components/BrandSection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { setupHebrewRTL } from '@/utils/direction';

const Index = () => {
  React.useEffect(() => {
    setupHebrewRTL();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <TestimonialSection />
        <BrandSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
