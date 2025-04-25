
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Smile, Heart, Shield, Stethoscope, PieChart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { EnhancedCarousel, CarouselItem } from "@/components/ui/enhanced-carousel";
import { createLocalizedPath } from '@/utils/languageRoutes';
import SectionHeader from '@/components/ui/section-header';
import HebrewText from './shared/HebrewText';

const TreatmentsSection = () => {
  const isMobile = useIsMobile();
  const { t, language } = useLanguage();

  const treatments = [
    {
      icon: Smile,
      title: t('childrenDentistry'),
      description: t('childrenDentistryDesc'),
      slug: 'children-dentistry'
    },
    {
      icon: Star,
      title: t('aestheticTreatments'),
      description: t('aestheticTreatmentsDesc'),
      slug: 'aesthetic-treatments'
    },
    {
      icon: Shield,
      title: t('preventiveMedicine'),
      description: t('preventiveMedicineDesc'),
      slug: 'preventive-medicine'
    },
    {
      icon: Stethoscope,
      title: t('rootCanal'),
      description: t('rootCanalDesc'),
      slug: 'root-canal'
    },
    {
      icon: PieChart,
      title: t('oralRehabilitation'),
      description: t('oralRehabilitationDesc'),
      slug: 'oral-rehabilitation'
    },
    {
      icon: Heart,
      title: t('orthodontics'),
      description: t('orthodonticsDesc'),
      slug: 'orthodontics'
    }
  ];

  return (
    <section id="treatments" className="py-24 bg-gradient-to-br from-dental-beige/30 via-white to-dental-pink/20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title={t('ourTreatments')}
          subtitle={t('wideRangeOfTreatments')}
        />

        {isMobile ? (
          <div className="w-full relative pb-14">
            <EnhancedCarousel className="w-full">
              {treatments.map((treatment, index) => (
                <CarouselItem key={index} className="pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3">
                  <TreatmentCard treatment={treatment} index={index} language={language} t={t} />
                </CarouselItem>
              ))}
            </EnhancedCarousel>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((treatment, index) => (
              <TreatmentCard key={index} treatment={treatment} index={index} language={language} t={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const TreatmentCard = ({ treatment, index, language, t }) => (
  <Card 
    className="group border-none shadow-lg hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
  >
    <CardContent className="p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dental-beige/0 to-dental-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="bg-dental-pink/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
          <treatment.icon className="h-8 w-8 text-dental-orange" />
        </div>
        
        <HebrewText tag="h3" className="text-xl font-bold text-dental-navy mb-4 text-center">
          {treatment.title}
        </HebrewText>
        
        <HebrewText tag="p" className="text-dental-navy/70 text-center mb-6 leading-relaxed">
          {treatment.description}
        </HebrewText>
        
        <div className="text-center transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
          <Link to={createLocalizedPath(language, `/treatments/${treatment.slug}`)}>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full border-2 border-dental-orange text-dental-orange hover:bg-dental-orange hover:text-white transition-all duration-300 group-hover:scale-105"
            >
              <HebrewText>
                {t('learnMore')}
              </HebrewText>
            </Button>
          </Link>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default TreatmentsSection;
