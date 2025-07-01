
import React from 'react';
import { TreatmentType } from '@/data/treatmentTypes';
import { ChildrenDentistryHero } from '@/components/children-dentistry/Hero';
import ProfessionalTreatmentHero from './ProfessionalTreatmentHero';

interface TreatmentHeroProps {
  treatment: TreatmentType;
  treatmentNameKey: string;
  treatmentDescKey: string;
}

const TreatmentHero: React.FC<TreatmentHeroProps> = ({ 
  treatment,
  treatmentNameKey,
  treatmentDescKey
}) => {
  // Special case for children dentistry with custom hero
  if (treatment?.slug === "children-dentistry") {
    return <ChildrenDentistryHero />;
  }

  // Use professional hero for all other treatments
  return (
    <ProfessionalTreatmentHero
      treatmentNameKey={treatmentNameKey}
      treatmentDescKey={treatmentDescKey}
      treatmentSlug={treatment?.slug || ''}
    />
  );
};

export default TreatmentHero;
