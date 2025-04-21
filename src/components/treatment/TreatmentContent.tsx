
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TreatmentType } from '@/data/treatmentTypes';
import TreatmentTabs from './TreatmentTabs';
import { Button } from '@/components/ui/button';

interface TreatmentContentProps {
  treatment: TreatmentType;
  treatmentNameKey: string;
  treatmentDescKey: string;
  treatmentType: string;
}

const TreatmentContent: React.FC<TreatmentContentProps> = ({
  treatment,
  treatmentNameKey,
  treatmentDescKey,
  treatmentType
}) => {
  const { t } = useLanguage();

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-white p-6 rounded-lg mb-8 border">
          <h2 className="text-2xl font-bold mb-3">
            {t(treatmentNameKey)}
          </h2>
          <p className="text-base mb-4">
            {t(treatmentDescKey)}
          </p>
        </div>
        <TreatmentTabs 
          treatmentType={treatmentType}
          treatmentNameKey={treatmentNameKey}
          treatmentDescKey={treatmentDescKey}
        />
        <div className="text-center mt-10">
          <h3 className="text-xl font-bold mb-4">{t('readyToStart')}</h3>
          <Button variant="orange" size="lg">
            {t('bookVisit')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TreatmentContent;
