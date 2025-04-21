
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import BackToTop from '@/components/BackToTop';
import TreatmentContent from '@/components/treatment/TreatmentContent';
import { treatmentTypes, getTreatmentNameKey, getTreatmentDescKey } from '@/data/treatmentTypes';
import PreventiveMedicineHero from '@/components/preventive-medicine/PreventiveMedicineHero';

const PreventiveMedicinePage: React.FC = () => {
  const { t } = useLanguage();

  const treatmentType = 'preventive-medicine';
  const treatment = treatmentTypes[treatmentType];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!treatment) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-dental-navy">{t('treatmentNotFound')}</h1>
          <Button className="mt-4" asChild>
            <a href="/">{t('backToHome')}</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const treatmentNameKey = getTreatmentNameKey(treatmentType);
  const treatmentDescKey = getTreatmentDescKey(treatmentType);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-0">
        <PreventiveMedicineHero 
          treatment={treatment}
          treatmentNameKey={treatmentNameKey}
          treatmentDescKey={treatmentDescKey}
        />
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

export default PreventiveMedicinePage;
