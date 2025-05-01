
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import BackToTop from '@/components/BackToTop';
import TreatmentContent from '@/components/treatment/TreatmentContent';
import { treatmentTypes, getTreatmentNameKey, getTreatmentDescKey } from '@/data/treatmentTypes';
import PreventiveMedicineHero from '@/components/preventive-medicine/PreventiveMedicineHero';
import { Section } from '@/components/ui/section';
import { TranslatedText } from '@/components/ui/translated-text';

const PreventiveMedicinePage: React.FC = () => {
  const { t } = useLanguage();

  const treatmentType = 'preventive-medicine';
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
            <h1 className="text-2xl font-bold text-dental-navy">
              <TranslatedText textKey="treatments.treatmentNotFound" defaultText="טיפול לא נמצא" />
            </h1>
            <Button className="mt-4" asChild>
              <a href="/">
                <TranslatedText textKey="navigation.backToHome" defaultText="חזרה לדף הבית" />
              </a>
            </Button>
          </div>
        </Section>
        <Footer />
      </div>
    );
  }

  const treatmentNameKey = getTreatmentNameKey(treatmentType);
  const treatmentDescKey = getTreatmentDescKey(treatmentType);
  // Also get the subtitle key for our enhanced hero
  const treatmentSubtitleKey = "treatments.preventiveMedicine.headline2";

  return (
    <div className="bg-white">
      <Navbar />
      <main className="pt-0">
        <Section background="none" spacing="none" containerClass="px-0">
          <PreventiveMedicineHero 
            treatment={treatment}
            treatmentNameKey={treatmentNameKey}
            treatmentSubtitleKey={treatmentSubtitleKey}
            treatmentDescKey={treatmentDescKey}
          />
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

export default PreventiveMedicinePage;
