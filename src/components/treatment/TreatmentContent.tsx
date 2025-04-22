
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TreatmentType } from '@/data/treatmentTypes';
import TreatmentTabs from './TreatmentTabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { getResponsiveClasses } from '@/utils/responsiveUtils';

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
  const responsive = getResponsiveClasses();

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <Section spacing="md" background="white" maxWidth="xl">
        <Card className="mb-6 md:mb-8 shadow-soft hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-4 sm:p-6">
            <h2 className={`${responsive.responsiveText.h3} mb-2 md:mb-3 text-dental-navy`}>
              {t(treatmentNameKey)}
            </h2>
            <p className={`${responsive.responsiveText.body} mb-3 md:mb-4 text-dental-textDark/80`}>
              {t(treatmentDescKey)}
            </p>
          </CardContent>
        </Card>
        
        <TreatmentTabs 
          treatmentType={treatmentType}
          treatmentNameKey={treatmentNameKey}
          treatmentDescKey={treatmentDescKey}
        />
        
        <div className="text-center mt-8 md:mt-10 animate-fade-in">
          <h3 className={`${responsive.responsiveText.h3} mb-4 text-dental-navy`}>{t('readyToStart')}</h3>
          <Button 
            variant="orange" 
            size="lg" 
            className="shadow-soft hover:shadow-md transition-all duration-300 rounded-full"
          >
            {t('bookVisit')}
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default TreatmentContent;
