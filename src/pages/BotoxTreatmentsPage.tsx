
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import BackToTop from '@/components/BackToTop';
import TreatmentContent from '@/components/treatment/TreatmentContent';
import { treatmentTypes, getTreatmentNameKey, getTreatmentDescKey } from '@/data/treatmentTypes';
import BotoxTreatmentsHero from '@/components/botox-treatments/BotoxTreatmentsHero';
import PageContainer from '@/components/layout/PageContainer';
import BotoxTreatmentsLanding from '@/components/botox-treatments/BotoxTreatmentsLanding';

const BotoxTreatmentsPage: React.FC = () => {
  const { t } = useLanguage();

  const treatmentType = 'botox-treatments';
  const treatment = treatmentTypes[treatmentType];

  if (!treatment) {
    return (
      <PageContainer title="treatmentNotFound" className="min-h-screen">
        <Section spacing="lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-dental-navy">{t('treatmentNotFound')}</h1>
            <Button className="mt-4" asChild>
              <a href="/">{t('backToHome')}</a>
            </Button>
          </div>
        </Section>
      </PageContainer>
    );
  }

  const treatmentNameKey = getTreatmentNameKey(treatmentType);
  const treatmentDescKey = getTreatmentDescKey(treatmentType);
  
  return (
    <PageContainer title={treatmentNameKey} description={treatmentDescKey} className="bg-white">
      <main className="pt-0">
        <BotoxTreatmentsLanding />
      </main>
      <BackToTop />
    </PageContainer>
  );
};

export default BotoxTreatmentsPage;
