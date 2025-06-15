
import React from 'react';
import PreventiveMedicineHero from './PreventiveMedicineHero';
import PreventiveMedicineBenefits from './PreventiveMedicineBenefits';
import PreventiveMedicineProcess from './PreventiveMedicineProcess';
import { Section } from '@/components/ui/section';
import FAQ from './FAQ';
import { useLanguage } from '@/contexts/LanguageContext';
import DoctorStory from './DoctorStory';
import { treatmentTypes } from '@/data/treatmentTypes';

/** באנר חירום חדש */
const EmergencyBanner: React.FC = () => (
  <div className="w-full bg-gradient-to-l from-dental-orange/90 to-dental-orange/70 text-white py-2 px-4 text-center text-sm font-semibold flex flex-col sm:flex-row items-center justify-center gap-2 z-50">
    <span className="mr-2">
      כאב פתאומי? זמינים לכם 24/7&nbsp;
      <a href="tel:03-566-6915" className="underline font-bold text-white hover:text-dental-azure transition">03-566-6915</a>
    </span>
    <span className="hidden sm:inline-block">|</span>
    <a
      href="https://wa.me/972515666915"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 underline font-bold text-white hover:text-[#64d25a] transition"
    >
      לייעוץ דיסקרטי ב־WhatsApp
    </a>
  </div>
);

const PreventiveMedicineLanding = () => {
  const { t } = useLanguage();
  const treatmentType = 'preventive-medicine';
  const treatment = treatmentTypes[treatmentType];

  return (
    <>
      <EmergencyBanner />
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

