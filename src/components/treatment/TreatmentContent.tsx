
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TreatmentType } from '@/data/treatmentTypes';
import TreatmentTabs from './TreatmentTabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/ui/section';

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
  const { t, isRTL } = useLanguage();

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <Section spacing="md" background="white" maxWidth="xl">
        <Card className="mb-8 shadow-soft hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-3 text-dental-navy">
              {t(treatmentNameKey)}
            </h2>
            <p className="text-base mb-4 text-dental-textDark/80">
              {t(treatmentDescKey)}
            </p>
          </CardContent>
        </Card>
        
        <TreatmentTabs 
          treatmentType={treatmentType}
          treatmentNameKey={treatmentNameKey}
          treatmentDescKey={treatmentDescKey}
        />
        
        <div className="text-center mt-10 animate-fade-in">
          <h3 className="text-xl font-bold mb-4 text-dental-navy">{t('readyToStart')}</h3>
          <Button variant="orange" size="lg" className="shadow-soft hover:shadow-md transition-all duration-300">
            {t('bookVisit')}
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default TreatmentContent;
