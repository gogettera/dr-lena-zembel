
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
  // Get treatment content from the unified system
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

  // Fallback for treatments not yet migrated - this should rarely happen now
  return (
    <div className="min-h-screen flex items-center justify-center bg-dental-beige/10">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-dental-navy mb-6">טיפול בהכנה</h1>
        <p className="text-dental-navy/70 mb-8 text-lg">
          הטיפול "{treatmentNameKey}" נמצא כרגע בתהליך שדרוג לגרסה המתקדמת החדשה.
        </p>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-dental-navy font-medium mb-4">
            מעוניינים בטיפול זה?
          </p>
          <p className="text-dental-navy/80 text-sm mb-6">
            צרו קשר עכשיו לקבלת מידע מפורט וייעוץ מקצועי
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => window.location.href = 'tel:03-566-6915'}
              className="bg-dental-orange text-white py-3 px-6 rounded-lg font-medium hover:bg-dental-orange/90 transition-colors"
            >
              התקשרו עכשיו: 03-566-6915
            </button>
            <button 
              onClick={() => window.open('https://wa.me/972515666915', '_blank')}
              className="border border-dental-orange text-dental-orange py-3 px-6 rounded-lg font-medium hover:bg-dental-orange/10 transition-colors"
            >
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentHero;
