
import React from 'react';
import TreatmentWhyChooseUs from './TreatmentWhyChooseUs';
import TreatmentProcedure from '../TreatmentProcedure';
import TreatmentDoctorCredibility from './TreatmentDoctorCredibility';
import TreatmentTestimonials from '../TreatmentTestimonials';
import TreatmentFAQ from '../TreatmentFAQ';
import TreatmentProfessionalBooking from './TreatmentProfessionalBooking';

interface ProfessionalTreatmentLandingProps {
  treatmentType: string;
}

const ProfessionalTreatmentLanding: React.FC<ProfessionalTreatmentLandingProps> = ({ 
  treatmentType 
}) => {
  return (
    <div className="bg-white">
      <TreatmentWhyChooseUs treatmentType={treatmentType} />
      <TreatmentProcedure treatmentType={treatmentType} />
      <TreatmentDoctorCredibility />
      <TreatmentTestimonials treatmentType={treatmentType} />
      <TreatmentFAQ treatmentType={treatmentType} />
      <TreatmentProfessionalBooking />
    </div>
  );
};

export default ProfessionalTreatmentLanding;
