
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import TreatmentBenefits from './TreatmentBenefits';
import TreatmentProcedure from './TreatmentProcedure';
import TreatmentFAQ from './TreatmentFAQ';
import TreatmentTestimonials from './TreatmentTestimonials';
import RelatedTreatments from './RelatedTreatments';

interface TreatmentTabContentProps {
  tabType: string;
  treatmentType: string;
  benefits?: string[];
}

export const TreatmentTabContent: React.FC<TreatmentTabContentProps> = ({
  tabType,
  treatmentType,
  benefits = []
}) => {
  const renderContent = () => {
    switch (tabType) {
      case 'procedure':
        return <TreatmentProcedure treatmentType={treatmentType} />;
      
      case 'benefits':
        return (
          <Card className="shadow-soft hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6 md:p-8">
              <TreatmentBenefits benefits={benefits} showBooking={false} />
            </CardContent>
          </Card>
        );
      
      case 'faq':
        return <TreatmentFAQ treatmentType={treatmentType} />;
      
      case 'testimonials':
        return <TreatmentTestimonials treatmentType={treatmentType} />;
      
      case 'related':
        return <RelatedTreatments currentTreatment={treatmentType} />;
      
      default:
        return (
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-dental-navy/70">
                תוכן זה יהיה זמין בקרוב
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return <div className="animate-fade-in">{renderContent()}</div>;
};
