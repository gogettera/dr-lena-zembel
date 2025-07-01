
import React from 'react';
import TreatmentWhyChooseUs from './TreatmentWhyChooseUs';
import TreatmentProcedure from '../TreatmentProcedure';
import TreatmentDoctorCredibility from './TreatmentDoctorCredibility';
import TreatmentTestimonials from '../TreatmentTestimonials';
import TreatmentFAQ from '../TreatmentFAQ';
import TreatmentProfessionalBooking from './TreatmentProfessionalBooking';
import TreatmentLandingLayout from './TreatmentLandingLayout';

interface ProfessionalTreatmentLandingProps {
  treatmentType: string;
}

const ProfessionalTreatmentLanding: React.FC<ProfessionalTreatmentLandingProps> = ({ 
  treatmentType 
}) => {
  return (
    <TreatmentLandingLayout>
      <TreatmentWhyChooseUs treatmentType={treatmentType} />
      <TreatmentProcedure treatmentType={treatmentType} />
      <TreatmentDoctorCredibility />
      <TreatmentTestimonials treatmentType={treatmentType} />
      <TreatmentFAQ treatmentType={treatmentType} />
      <TreatmentProfessionalBooking />
    </TreatmentLandingLayout>
  );
};

export default ProfessionalTreatmentLanding;
