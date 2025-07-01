
import React, { Suspense } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TreatmentType } from '@/data/treatmentTypes';
import TreatmentTabs from './TreatmentTabs';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { getResponsiveClasses } from '@/utils/responsiveUtils';
import { TranslatedText } from '@/components/ui/translated-text';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { TreatmentQuickActions } from './TreatmentQuickActions';

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
  const { isRTL } = useLanguage();
  const responsive = getResponsiveClasses();

  if (!treatment) {
    return (
      <Section spacing="md" background="white">
        <ErrorBoundary />
      </Section>
    );
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-white">
      <Section spacing="md" background="white" maxWidth="xl" containerClass="px-4 md:px-6">
        {/* Enhanced intro card */}
        <Card className="mb-8 shadow-soft hover:shadow-md transition-all duration-300 border-dental-beige/50 bg-gradient-to-br from-white to-dental-beige/10">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-2 h-16 bg-gradient-to-b from-dental-orange to-dental-pink rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <TranslatedText
                  textKey={treatmentNameKey}
                  as="h2"
                  className={`${responsive.responsiveText.h3} mb-3 text-dental-navy font-bold leading-tight`}
                />
                <TranslatedText
                  textKey={treatmentDescKey}
                  as="p"
                  className={`${responsive.responsiveText.body} text-dental-navy/80 leading-relaxed`}
                />
              </div>
            </div>
            
            {/* Quick facts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-dental-beige/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-dental-orange">13+</div>
                <div className="text-sm text-dental-navy/70">שנות ניסיון</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-dental-orange">5000+</div>
                <div className="text-sm text-dental-navy/70">מטופלים מרוצים</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-dental-orange">4</div>
                <div className="text-sm text-dental-navy/70">שפות שירות</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Enhanced tabs with error boundary and loading */}
        <div className="max-w-7xl mx-auto space-y-8">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSkeleton variant="card" lines={3} />}>
              <TreatmentTabs 
                treatmentType={treatmentType}
                treatmentNameKey={treatmentNameKey}
                treatmentDescKey={treatmentDescKey}
              />
            </Suspense>
          </ErrorBoundary>
          
          {/* Enhanced booking CTA */}
          <div className="animate-fade-in">
            <TreatmentQuickActions />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default TreatmentContent;
