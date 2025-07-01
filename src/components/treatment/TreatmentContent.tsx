
import React, { Suspense } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TreatmentType } from '@/data/treatmentTypes';
import { Section } from '@/components/ui/section';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import EnhancedTreatmentLanding from './professional/enhanced/EnhancedTreatmentLanding';
import { getTreatmentContent } from '@/data/treatmentContent';

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

  if (!treatment) {
    return (
      <Section spacing="md" background="white">
        <ErrorBoundary>
          <div className="text-center py-8">
            <p className="text-gray-500">טיפול לא נמצא</p>
          </div>
        </ErrorBoundary>
      </Section>
    );
  }

  // Check if treatment has content in the new system
  const content = getTreatmentContent(treatmentType);
  
  if (!content) {
    return (
      <Section spacing="md" background="white">
        <ErrorBoundary>
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-dental-navy mb-4">טיפול בפיתוח</h2>
            <p className="text-dental-navy/70 mb-6">
              הטיפול "{treatmentNameKey}" נמצא כרגע בתהליך פיתוח ושדרוג.
            </p>
            <div className="bg-dental-orange/10 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-dental-navy font-medium mb-2">
                מעוניינים בטיפול זה?
              </p>
              <p className="text-dental-navy/80 text-sm mb-4">
                צרו קשר עכשיו לקבלת מידע מפורט וייעוץ מקצועי
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button 
                  onClick={() => window.location.href = 'tel:03-566-6915'}
                  className="bg-dental-orange text-white py-2 px-4 rounded-lg font-medium hover:bg-dental-orange/90 transition-colors"
                >
                  התקשרו עכשיו
                </button>
                <button 
                  onClick={() => window.open('https://wa.me/972515666915', '_blank')}
                  className="border border-dental-orange text-dental-orange py-2 px-4 rounded-lg font-medium hover:bg-dental-orange/10 transition-colors"
                >
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </ErrorBoundary>
      </Section>
    );
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-white">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSkeleton variant="card" lines={3} />}>
          <EnhancedTreatmentLanding treatmentType={treatmentType} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TreatmentContent;
