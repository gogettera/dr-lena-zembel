
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Section } from '@/components/ui/section';
import OralRehabilitationHero from './OralRehabilitationHero';
import OralRehabilitationBenefits from './OralRehabilitationBenefits';
import OralRehabilitationProcess from './OralRehabilitationProcess';
import OralRehabilitationTreatments from './OralRehabilitationTreatments';
import FAQ from './FAQ';
import DoctorStory from './DoctorStory';
import { treatmentTypes } from '@/data/treatmentTypes';

const OralRehabilitationLanding = () => {
  const { t } = useLanguage();
  const treatmentType = 'oral-rehabilitation';
  const treatment = treatmentTypes[treatmentType];

  return (
    <>
      <OralRehabilitationHero
        treatment={treatment}
        treatmentNameKey="oralRehabilitation"
        treatmentDescKey="oralRehabilitationDesc"
      />
      <Section spacing="lg" background="gradient">
        <OralRehabilitationBenefits />
      </Section>
      <Section spacing="lg" background="white">
        <OralRehabilitationTreatments />
      </Section>
      <DoctorStory />
      <Section spacing="lg" background="beige">
        <OralRehabilitationProcess />
      </Section>
      <Section spacing="lg" background="white">
        <FAQ />
      </Section>
    </>
  );
};

export default OralRehabilitationLanding;
