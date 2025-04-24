
import React from 'react';
import { Section } from '@/components/ui/section';
import Reviews from '@/components/Reviews';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/ui/section-header';

interface TreatmentTestimonialsProps {
  background?: string;
  titleClassName?: string;
  className?: string;
}

const TreatmentTestimonials: React.FC<TreatmentTestimonialsProps> = ({
  background = "beige",
  titleClassName,
  className
}) => {
  const { t } = useLanguage();

  return (
    <Section 
      id="testimonials" 
      background={background} 
      spacing="lg" 
      className={className}
      containerClass="max-w-6xl mx-auto"
    >
      <SectionHeader
        title={t('testimonials')}
        subtitle={t('patientsExperiences')}
        titleClassName={titleClassName}
      />
      <Reviews />
    </Section>
  );
};

export default TreatmentTestimonials;
