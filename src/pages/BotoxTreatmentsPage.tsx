
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import BackToTop from '@/components/BackToTop';
import TreatmentContent from '@/components/treatment/TreatmentContent';
import { treatmentTypes, getTreatmentNameKey, getTreatmentDescKey } from '@/data/treatmentTypes';
import BotoxTreatmentsHero from '@/components/botox-treatments/BotoxTreatmentsHero';
import { Section } from '@/components/ui/section';

const BotoxTreatmentsPage: React.FC = () => {
  const { t } = useLanguage();

  const treatmentType = 'botox-treatments';
  const treatment = treatmentTypes[treatmentType];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!treatment) {
    return (
      <div>
        <Navbar />
        <Section spacing="lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-dental-navy">{t('treatmentNotFound')}</h1>
            <Button className="mt-4" asChild>
              <a href="/">{t('backToHome')}</a>
            </Button>
          </div>
        </Section>
        <Footer />
      </div>
    );
  }

  const treatmentNameKey = getTreatmentNameKey(treatmentType);
  const treatmentDescKey = getTreatmentDescKey(treatmentType);
  
  return (
    <div className="bg-white">
      <Navbar />
      <main className="pt-0">
        <Section background="none" spacing="none" containerClass="px-0">
          <BotoxTreatmentsHero />
        </Section>
        
        <TreatmentContent 
          treatment={treatment}
          treatmentNameKey={treatmentNameKey}
          treatmentDescKey={treatmentDescKey}
          treatmentType={treatmentType}
        />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default BotoxTreatmentsPage;
