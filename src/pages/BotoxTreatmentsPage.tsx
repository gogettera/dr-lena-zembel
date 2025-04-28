
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import TreatmentContent from '@/components/treatment/TreatmentContent';
import { treatmentTypes, getTreatmentNameKey, getTreatmentDescKey } from '@/data/treatmentTypes';
import BotoxTreatmentsHero from '@/components/botox-treatments/BotoxTreatmentsHero';
import { Section } from '@/components/ui/section';
import AccessibleLayout from '@/components/layout/AccessibleLayout';

const BotoxTreatmentsPage: React.FC = () => {
  const { t } = useLanguage();

  const treatmentType = 'botox-treatments';
  const treatment = treatmentTypes[treatmentType];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!treatment) {
    return (
      <AccessibleLayout>
        <Section spacing="lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-dental-navy">{t('treatmentNotFound')}</h1>
            <Button className="mt-4" asChild>
              <a href="/">{t('backToHome')}</a>
            </Button>
          </div>
        </Section>
      </AccessibleLayout>
    );
  }

  const treatmentNameKey = getTreatmentNameKey(treatmentType);
  const treatmentDescKey = getTreatmentDescKey(treatmentType);
  
  return (
    <AccessibleLayout>
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
    </AccessibleLayout>
  );
};

export default BotoxTreatmentsPage;
