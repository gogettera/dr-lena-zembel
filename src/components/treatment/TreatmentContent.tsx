
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TreatmentType } from '@/data/treatmentTypes';
import TreatmentBenefits from './TreatmentBenefits';

interface TreatmentContentProps {
  treatment: TreatmentType;
  treatmentNameKey: string;
  treatmentDescKey: string;
}

const TreatmentContent: React.FC<TreatmentContentProps> = ({
  treatment,
  treatmentNameKey,
  treatmentDescKey
}) => {
  const { t } = useLanguage();
  
  const defaultBenefits = [
    t('benefit1'),
    t('benefit2'),
    t('benefit3'),
    t('benefit4')
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src={treatment.imageUrl} 
                alt={t(treatmentNameKey)} 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-dental-navy mb-4">
                {t('ourApproach')}
              </h3>
              <p className="text-dental-navy/80 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi. Vivamus vitae efficitur eros.
              </p>
              <TreatmentBenefits benefits={defaultBenefits} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentContent;
