
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TreatmentType } from '@/data/treatmentTypes';
import TreatmentTabs from './TreatmentTabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { getResponsiveClasses } from '@/utils/responsiveUtils';
import { TranslatedText } from '@/components/ui/translated-text';

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
      <Section spacing="md" background="white" maxWidth="xl" containerClass="px-4 md:px-6">
        <Card className="mb-6 md:mb-8 shadow-soft hover:shadow-md transition-shadow duration-300 max-w-7xl mx-auto">
          <CardContent className="p-4 sm:p-6">
            <TranslatedText
              textKey={treatmentNameKey}
              as="h2"
              className={`${responsive.responsiveText.h3} mb-2 md:mb-3 text-dental-navy`}
            />
            <TranslatedText
              textKey={treatmentDescKey}
              as="p"
              className={`${responsive.responsiveText.body} mb-3 md:mb-4 text-dental-textDark/80`}
            />
          </CardContent>
        </Card>
        
        <div className="max-w-7xl mx-auto">
          <TreatmentTabs 
            treatmentType={treatmentType}
            treatmentNameKey={treatmentNameKey}
            treatmentDescKey={treatmentDescKey}
          />
          
          <div className="text-center mt-8 md:mt-10 animate-fade-in">
            <TranslatedText
              textKey="readyToStart"
              as="h3"
              className={`${responsive.responsiveText.h3} mb-4 text-dental-navy`}
            />
            <Button 
              variant="orange" 
              size="lg" 
              className="shadow-soft hover:shadow-md transition-all duration-300 rounded-full"
            >
              <TranslatedText textKey="bookVisit" />
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default TreatmentContent;
