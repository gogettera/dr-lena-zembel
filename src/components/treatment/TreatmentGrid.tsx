
import React from 'react';
import { TreatmentCard } from './TreatmentCard';
import { ErrorBoundary } from '@/components/ui/error-boundary';

interface Treatment {
  slug: string;
  nameKey: string;
  descKey: string;
  imageUrl?: string;
}

interface TreatmentGridProps {
  treatments: Treatment[];
  isLoading?: boolean;
  className?: string;
}

export const TreatmentGrid: React.FC<TreatmentGridProps> = ({
  treatments,
  isLoading = false,
  className = ''
}) => {
  return (
    <ErrorBoundary>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {isLoading ? (
          // Show loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <TreatmentCard 
              key={index}
              slug=""
              nameKey=""
              descKey=""
              isLoading={true}
            />
          ))
        ) : (
          treatments.map((treatment) => (
            <TreatmentCard
              key={treatment.slug}
              slug={treatment.slug}
              nameKey={treatment.nameKey}
              descKey={treatment.descKey}
              imageUrl={treatment.imageUrl}
            />
          ))
        )}
      </div>
    </ErrorBoundary>
  );
};
