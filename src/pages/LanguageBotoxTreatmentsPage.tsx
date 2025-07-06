
import React from 'react';
import BackToTop from '@/components/BackToTop';
import BotoxTreatmentsLanding from '@/components/botox-treatments/BotoxTreatmentsLanding';
import PageContainer from '@/components/layout/PageContainer';
import { treatmentTypes } from '@/data/treatmentTypes';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageBotoxTreatmentsPage: React.FC = () => {
  const { t } = useLanguage();

  const treatmentType = 'botox-treatments';
  const treatment = treatmentTypes[treatmentType];

  if (!treatment) {
    return (
      <PageContainer title="treatmentNotFound" className="min-h-screen">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-dental-navy">{t('treatmentNotFound')}</h1>
          <a href="/" className="mt-4 inline-block px-4 py-2 bg-dental-orange text-white rounded-full">
            {t('backToHome')}
          </a>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="botoxTreatments.headline1" description="botoxTreatments.headline2" className="bg-white">
      <main className="pt-0">
        <BotoxTreatmentsLanding />
      </main>
      <BackToTop />
    </PageContainer>
  );
};

export default LanguageBotoxTreatmentsPage;
