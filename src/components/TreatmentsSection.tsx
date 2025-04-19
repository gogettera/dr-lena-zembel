
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Smile, Heart, Shield, Stethoscope, PieChart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { EnhancedCarousel, CarouselItem } from "@/components/ui/enhanced-carousel";
import { createLocalizedPath } from '@/utils/languageRoutes';

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
    <section id="treatments" className="py-24 bg-dental-beige/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            {t('ourTreatments')}
          </h2>
          <p className="text-lg text-dental-navy/80 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
            {t('wideRangeOfTreatments')}
          </p>
          <div className="w-24 h-1 bg-dental-orange mx-auto mt-6 rounded-full opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]"></div>
        </div>

        {isMobile ? (
          <div className="w-full relative pb-14">
            <EnhancedCarousel className="w-full">
              {treatments.map((treatment, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3">
                  <Card 
                    className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-xl overflow-hidden opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="bg-dental-pink/30 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <treatment.icon className="h-8 w-8 text-dental-orange" />
                      </div>
                      <h3 className="text-xl font-bold text-dental-navy mb-3 text-center">{treatment.title}</h3>
                      <p className="text-dental-navy/70 text-center mb-4">{treatment.description}</p>
                      <div className="text-center">
                        <Link to={createLocalizedPath(language, `/treatments/${treatment.slug}`)}>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="rounded-full border-dental-orange text-dental-orange hover:bg-dental-orange hover:text-white"
                          >
                            {t('learnMore')}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </EnhancedCarousel>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map((treatment, index) => (
              <Card 
                key={index} 
                className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-xl overflow-hidden opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="bg-dental-pink/30 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <treatment.icon className="h-8 w-8 text-dental-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-dental-navy mb-3 text-center">{treatment.title}</h3>
                  <p className="text-dental-navy/70 text-center mb-5">{treatment.description}</p>
                  <div className="text-center">
                    <Link to={createLocalizedPath(language, `/treatments/${treatment.slug}`)}>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="rounded-full border-dental-orange text-dental-orange hover:bg-dental-orange hover:text-white"
                      >
                        {t('learnMore')}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TreatmentsSection;
