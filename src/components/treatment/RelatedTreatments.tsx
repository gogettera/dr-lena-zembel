
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TranslatedText } from '@/components/ui/translated-text';
import { TreatmentGrid } from './TreatmentGrid';
import { getAllTreatments } from '@/data/treatmentRegistry';

interface RelatedTreatmentsProps {
  currentTreatment: string;
}

const RelatedTreatments: React.FC<RelatedTreatmentsProps> = ({ currentTreatment }) => {
  const allTreatments = getAllTreatments();
  
  // Filter out current treatment and limit to 3-6 related treatments
  const relatedTreatments = allTreatments
    .filter(treatment => treatment.slug !== currentTreatment)
    .slice(0, 6)
    .map(treatment => ({
      slug: treatment.slug,
      nameKey: treatment.nameKey,
      descKey: treatment.descKey,
      imageUrl: treatment.imageUrl
    }));

  return (
    <Card className="shadow-soft hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-dental-navy text-center">
          <TranslatedText textKey="treatments.related.title" defaultText="טיפולים קשורים" />
        </h3>
        
        <p className="text-dental-navy/70 text-center mb-8">
          <TranslatedText 
            textKey="treatments.related.description" 
            defaultText="טיפולים נוספים שעשויים לעניין אתכם"
          />
        </p>
        
        <TreatmentGrid 
          treatments={relatedTreatments}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        />
      </CardContent>
    </Card>
  );
};

export default RelatedTreatments;
