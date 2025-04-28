
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/templates/children-dentistry/components/Header';
import HeroSection from '@/templates/children-dentistry/components/HeroSection';
import TrustIndicators from '@/templates/children-dentistry/components/TrustIndicators';
import ProblemSolution from '@/templates/children-dentistry/components/ProblemSolution';
import JourneySteps from '@/templates/children-dentistry/components/JourneySteps';
import DoctorProfile from '@/templates/children-dentistry/components/DoctorProfile';
import FeaturesGrid from '@/templates/children-dentistry/components/FeaturesGrid';
import TestimonialsCarousel from '@/templates/children-dentistry/components/TestimonialsCarousel';
import FAQAccordion from '@/templates/children-dentistry/components/FAQAccordion';
import CtaSection from '@/templates/children-dentistry/components/CtaSection';
import Footer from '@/templates/children-dentistry/components/Footer';
import WhatsAppButton from '@/templates/children-dentistry/components/WhatsAppButton';
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button';
import { Toaster } from '@/components/ui/toaster';
import { Helmet } from 'react-helmet-async';

const ChildrenDentistryLandingPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Helmet>
        <title>{t('childrenDentistry.meta.title')}</title>
        <meta name="description" content={t('childrenDentistry.meta.description')} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "Dr. Lena Zembel - Children's Dentistry",
              "url": "https://dr-zembel.com/he/children-dentistry",
              "logo": "https://dr-zembel.com/lovable-uploads/f0d36601-8f51-4bd6-9ce4-071cd62aa140.png",
              "description": "Gentle dental care for children in a comfortable environment",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Tel Aviv",
                "addressRegion": "IL"
              },
              "telephone": "03-566-6915",
              "medicalSpecialty": "Pediatric Dentistry"
            }
          `}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <TrustIndicators />
        <ProblemSolution />
        <JourneySteps />
        <DoctorProfile />
        <FeaturesGrid />
        <TestimonialsCarousel />
        <FAQAccordion />
        <CtaSection />
      </main>
      
      <Footer />
      <WhatsAppButton />
      <ScrollToTopButton />
      <Toaster />
    </div>
  );
};

export default ChildrenDentistryLandingPage;
