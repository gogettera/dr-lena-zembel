
import React from 'react';
import { getTreatmentContent } from '@/data/treatmentContent';
import TreatmentLandingLayout from '../TreatmentLandingLayout';
import EnhancedTreatmentHero from './EnhancedTreatmentHero';
import TreatmentWhyChooseUs from '../TreatmentWhyChooseUs';
import EnhancedTreatmentProcess from './EnhancedTreatmentProcess';
import TreatmentDoctorCredibility from '../TreatmentDoctorCredibility';
import EnhancedTreatmentBenefits from './EnhancedTreatmentBenefits';
import TreatmentTestimonials from '../../TreatmentTestimonials';
import EnhancedTreatmentFAQ from './EnhancedTreatmentFAQ';
import EnhancedTreatmentBooking from './EnhancedTreatmentBooking';

interface EnhancedTreatmentLandingProps {
  treatmentType: string;
}

const EnhancedTreatmentLanding: React.FC<EnhancedTreatmentLandingProps> = ({ 
  treatmentType 
}) => {
  const content = getTreatmentContent(treatmentType);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-dental-navy mb-4">טיפול לא נמצא</h1>
          <p className="text-dental-navy/70">הטיפול המבוקש אינו זמין כרגע</p>
        </div>
      </div>
    );
  }

  return (
    <TreatmentLandingLayout>
      <EnhancedTreatmentHero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        features={content.hero.features}
        imageUrl={content.hero.imageUrl}
        treatmentSlug={content.slug}
      />
      
      <TreatmentWhyChooseUs treatmentType={treatmentType} />
      
      <EnhancedTreatmentProcess
        title={content.process.title}
        subtitle={content.process.subtitle}
        steps={content.process.steps}
      />
      
      <TreatmentDoctorCredibility />
      
      <EnhancedTreatmentBenefits
        title={content.benefits.title}
        health={content.benefits.health}
        aesthetic={content.benefits.aesthetic}
      />
      
      <TreatmentTestimonials treatmentType={treatmentType} />
      
      <EnhancedTreatmentFAQ
        title={content.faq.title}
        items={content.faq.items}
      />
      
      <EnhancedTreatmentBooking />
    </TreatmentLandingLayout>
  );
};

export default EnhancedTreatmentLanding;
