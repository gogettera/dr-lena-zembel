
import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { TreatmentType } from '@/data/treatmentTypes';

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
  const { t, language } = useLanguage();

  return (
    <section className="relative bg-gradient-to-br from-dental-beige via-dental-pink to-dental-beige py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: `url(${treatment.imageUrl})` }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-dental-navy hover:text-dental-orange">
                {t('home')}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              {language === 'he' || language === 'ar' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/#treatments" className="text-dental-navy hover:text-dental-orange">
                {t('treatments')}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              {language === 'he' || language === 'ar' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="text-dental-orange font-medium">
                {t(treatmentNameKey)}
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dental-navy mb-6 leading-tight opacity-0 animate-[fade-in_0.8s_ease-out_forwards]">
            {t(treatmentNameKey)}
          </h1>
          
          <p className="text-xl md:text-2xl text-dental-navy mb-10 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
            {t(treatmentDescKey)}
          </p>
          
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse md:flex md:justify-center md:items-center opacity-0 animate-[fade-in_0.5s_ease-out_0.6s_forwards]">
            <Button 
              variant="orange" 
              size="lg" 
              className="rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-lg w-full md:w-auto"
            >
              {t('bookVisit')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentHero;
