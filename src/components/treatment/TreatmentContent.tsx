
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
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-dental-beige/20 p-8 rounded-xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-dental-navy mb-4">
              {t(treatmentNameKey)}
            </h2>
            <p className="text-lg text-dental-navy/80 mb-6">
              {t(treatmentDescKey)}
            </p>
            <p className="text-lg text-dental-navy/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi. Vivamus vitae efficitur eros, nec finibus dui. Curabitur et odio vel orci scelerisque malesuada.
            </p>
          </div>
          
          <TreatmentTabs 
            treatmentType={treatmentType}
            treatmentNameKey={treatmentNameKey}
            treatmentDescKey={treatmentDescKey}
          />
          
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-dental-navy mb-6">
              {t('readyToStart')}
            </h3>
            <Button 
              variant="orange" 
              size="lg" 
              className="rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              {t('bookVisit')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentContent;
