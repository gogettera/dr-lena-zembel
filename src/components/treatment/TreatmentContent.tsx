
import React, { Suspense } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TreatmentType } from '@/data/treatmentTypes';
import { Section } from '@/components/ui/section';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import EnhancedTreatmentLanding from './professional/enhanced/EnhancedTreatmentLanding';

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
