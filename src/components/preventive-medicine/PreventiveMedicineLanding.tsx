
import React from 'react';
import PreventiveMedicineHero from './PreventiveMedicineHero';
import PreventiveMedicineBenefits from './PreventiveMedicineBenefits';
import PreventiveMedicineProcess from './PreventiveMedicineProcess';
import { Section } from '@/components/ui/section';
import FAQ from './FAQ';
import { useLanguage } from '@/contexts/LanguageContext';
import DoctorStory from './DoctorStory';
import { treatmentTypes } from '@/data/treatmentTypes';

const PreventiveMedicineLanding = () => {
  const { t } = useLanguage();
  const treatmentType = 'preventive-medicine';
  const treatment = treatmentTypes[treatmentType];

  return (
    <>
      <PreventiveMedicineHero
        treatment={treatment}
        treatmentNameKey="preventiveMedicine"
        treatmentDescKey="preventiveMedicineDesc"
      />
      <Section spacing="lg" background="gradient" fullWidth={true} containerClass="px-4 md:px-6">
        <PreventiveMedicineBenefits />
      </Section>
      <DoctorStory />
      <Section fullWidth={true}>
        <PreventiveMedicineProcess />
      </Section>
      <Section fullWidth={true} containerClass="px-4 md:px-6">
        <FAQ />
      </Section>
    </>
  );
};

export default PreventiveMedicineLanding;
