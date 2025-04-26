
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface TreatmentBenefitsProps {
  benefits: string[];
  showBooking?: boolean;
}

const TreatmentBenefits: React.FC<TreatmentBenefitsProps> = ({ 
  benefits = [], 
  showBooking = true 
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-dental-navy mb-4">
          {t('benefits')}
        </h3>
        <ul className="list-disc list-inside text-dental-navy/80 space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>
      
      {showBooking && (
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
      )}
    </div>
  );
};

export default TreatmentBenefits;
