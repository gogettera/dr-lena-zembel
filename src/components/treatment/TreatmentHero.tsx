
import React from 'react';
import { TreatmentType } from '@/data/treatmentTypes';
import { ChildrenDentistryHero } from '@/components/children-dentistry/Hero';
import { getTreatmentContent } from '@/data/treatmentContent';
import EnhancedTreatmentHero from './professional/enhanced/EnhancedTreatmentHero';

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

  // Use enhanced hero for treatments with content data
  const content = getTreatmentContent(treatment?.slug || '');
  if (content) {
    return (
      <EnhancedTreatmentHero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        features={content.hero.features}
        imageUrl={content.hero.imageUrl}
        treatmentSlug={content.slug}
      />
    );
  }

  // Fallback - this shouldn't happen with the new system
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-dental-navy mb-4">טיפול לא נמצא</h1>
        <p className="text-dental-navy/70">הטיפול המבוקש אינו זמין כרגע</p>
      </div>
    </div>
  );
};

export default TreatmentHero;
