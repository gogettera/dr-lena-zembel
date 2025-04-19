
import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { TreatmentType } from '@/data/treatmentTypes';
import { createLocalizedPath } from '@/utils/languageRoutes';

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
      
      {/* Decorative floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-[10%] animate-[bounce_6s_ease-in-out_infinite]">
          <Star className="h-8 w-8 text-dental-orange/30" />
        </div>
        <div className="absolute top-1/3 right-[15%] animate-[bounce_8s_ease-in-out_infinite]">
          <Sparkles className="h-10 w-10 text-dental-orange/30" />
        </div>
        <div className="absolute bottom-1/4 left-[15%] animate-[bounce_7s_ease-in-out_infinite]">
          <Star className="h-6 w-6 text-dental-orange/30" />
        </div>
        <div className="absolute bottom-1/3 right-[10%] animate-[bounce_5s_ease-in-out_infinite]">
          <Sparkles className="h-8 w-8 text-dental-orange/30" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={createLocalizedPath(language, '/')} className="text-dental-navy hover:text-dental-orange transition-colors">
                  {t('home')}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              {language === 'he' || language === 'ar' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={createLocalizedPath(language, '/#treatments')} className="text-dental-navy hover:text-dental-orange transition-colors">
                  {t('treatments')}
                </Link>
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
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-dental-orange/10 rounded-full blur-3xl"></div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dental-navy mb-6 leading-tight relative">
            <span className="relative">
              {t(treatmentNameKey)}
              <div className="absolute -right-6 -top-6">
                <Sparkles className="h-5 w-5 text-dental-orange animate-pulse" />
              </div>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-dental-navy mb-10 relative z-10">
            {t(treatmentDescKey)}
          </p>
          
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse md:flex md:justify-center md:items-center">
            <Button 
              variant="orange" 
              size="lg" 
              className="rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-lg w-full md:w-auto relative group overflow-hidden"
            >
              <span className="relative z-10">{t('bookVisit')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-dental-orange/80 to-dental-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentHero;
