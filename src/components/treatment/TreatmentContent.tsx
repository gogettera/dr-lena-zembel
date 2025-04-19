
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TreatmentType } from '@/data/treatmentTypes';

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
              <h3 className="text-xl font-bold text-dental-navy mb-4 mt-6">
                {t('benefits')}
              </h3>
              <ul className="list-disc list-inside text-dental-navy/80 space-y-2">
                <li>Benefit 1</li>
                <li>Benefit 2</li>
                <li>Benefit 3</li>
                <li>Benefit 4</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 text-center">
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
