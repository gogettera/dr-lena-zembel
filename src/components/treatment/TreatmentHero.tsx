
import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ChevronLeft, ChevronRight, Star, Sparkles, Calendar, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { TreatmentType } from '@/data/treatmentTypes';
import { createLocalizedPath } from '@/utils/languageRoutes';
import { ChildrenDentistryHero } from '@/components/children-dentistry/Hero';
import { getResponsiveClasses, getDirectionalClasses } from '@/utils/responsiveUtils';
import { TranslatedText } from '@/components/ui/translated-text';

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
  const { t, language, isRTL } = useLanguage();
  const responsive = getResponsiveClasses();
  const directional = getDirectionalClasses(isRTL);

  if (treatment?.slug === "children-dentistry") {
    return <ChildrenDentistryHero />;
  }

  const handleBooking = () => {
    const phone = "03-566-6915";
    const whatsapp = `https://wa.me/972515666915?text=${encodeURIComponent(t('whatsappMessage', 'שלום! אני מעוניין/ת לקבוע תור עם ד"ר לנה זמבל'))}`;
    
    if (window.innerWidth <= 768) {
      window.open(whatsapp, '_blank');
    } else {
      window.location.href = `tel:${phone}`;
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-dental-beige via-dental-pink to-white py-12 md:py-20 lg:py-28 overflow-hidden w-full">
      {/* Enhanced background with subtle pattern */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B6B' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      <div className="absolute inset-0 bg-cover bg-center opacity-5 mix-blend-overlay" style={{ backgroundImage: `url(${treatment.imageUrl})` }}></div>
      
      {/* Floating decorative elements with staggered animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[8%] animate-[bounce_6s_ease-in-out_infinite] opacity-30">
          <Star className="h-4 w-4 md:h-6 md:w-6 text-dental-orange" />
        </div>
        <div className="absolute top-1/3 right-[12%] animate-[bounce_8s_ease-in-out_infinite_0.5s] opacity-40">
          <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-dental-orange" />
        </div>
        <div className="absolute bottom-1/4 left-[12%] animate-[bounce_7s_ease-in-out_infinite_1s] opacity-35">
          <Award className="h-5 w-5 md:h-7 md:w-7 text-dental-orange" />
        </div>
        <div className="absolute bottom-1/3 right-[8%] animate-[bounce_5s_ease-in-out_infinite_1.5s] opacity-30">
          <Shield className="h-4 w-4 md:h-6 md:w-6 text-dental-orange" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced breadcrumb with better mobile handling */}
        <div className="mb-6 md:mb-8 overflow-x-auto scrollbar-hide">
          <Breadcrumb className="whitespace-nowrap min-w-fit">
            <BreadcrumbList className="flex items-center gap-1 md:gap-2">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link 
                    to={createLocalizedPath(language, '/')} 
                    className="text-dental-navy/70 hover:text-dental-orange transition-colors duration-300 text-sm md:text-base font-medium px-2 py-1 rounded-md hover:bg-white/20"
                  >
                    <TranslatedText textKey="home" defaultText="בית" />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-dental-navy/40">
                {isRTL ? <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" /> : <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />}
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link 
                    to={createLocalizedPath(language, '/#treatments')} 
                    className="text-dental-navy/70 hover:text-dental-orange transition-colors duration-300 text-sm md:text-base font-medium px-2 py-1 rounded-md hover:bg-white/20"
                  >
                    <TranslatedText textKey="treatments" defaultText="טיפולים" />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-dental-navy/40">
                {isRTL ? <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" /> : <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />}
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <span className="text-dental-orange font-semibold text-sm md:text-base px-2 py-1 bg-white/10 rounded-md">
                  <TranslatedText textKey={treatmentNameKey} defaultText="טיפול" />
                </span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Enhanced content with better spacing and animations */}
        <div className="max-w-5xl mx-auto text-center relative">
          {/* Glowing background effect */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-40 h-40 sm:w-56 sm:h-56 bg-gradient-to-r from-dental-orange/20 to-dental-pink/20 rounded-full blur-3xl animate-pulse"></div>
          
          <div className="relative z-10 space-y-6 md:space-y-8">
            <h1 className={`${responsive.responsiveText.h1} text-dental-navy leading-tight relative animate-fade-in`}>
              <span className="relative inline-block">
                <TranslatedText textKey={treatmentNameKey} defaultText="טיפול מתקדם" />
                <div className="absolute -right-4 -top-4 md:-right-6 md:-top-6">
                  <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-dental-orange animate-pulse" />
                </div>
              </span>
            </h1>
            
            <p className={`${responsive.responsiveText.body} text-dental-navy/80 max-w-3xl mx-auto leading-relaxed animate-fade-in [animation-delay:0.2s]`}>
              <TranslatedText textKey={treatmentDescKey} defaultText="טיפול מקצועי ואיכותי במרפאת ד״ר לנה זמבל" />
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 animate-fade-in [animation-delay:0.4s]">
              <div className="flex items-center gap-2 text-dental-navy/70 text-sm md:text-base">
                <Shield className="h-4 w-4 md:h-5 md:w-5 text-dental-orange" />
                <span className="font-medium">13 שנות ניסיון</span>
              </div>
              <div className="flex items-center gap-2 text-dental-navy/70 text-sm md:text-base">
                <Award className="h-4 w-4 md:h-5 md:w-5 text-dental-orange" />
                <span className="font-medium">אלפי מטופלים מרוצים</span>
              </div>
              <div className="flex items-center gap-2 text-dental-navy/70 text-sm md:text-base">
                <Star className="h-4 w-4 md:h-5 md:w-5 text-dental-orange" />
                <span className="font-medium">ציוד מתקדם</span>
              </div>
            </div>
            
            {/* Enhanced CTA section */}
            <div className="space-y-4 animate-fade-in [animation-delay:0.6s]">
              <Button 
                onClick={handleBooking}
                variant="orange" 
                size="lg" 
                className="rounded-full text-base md:text-lg px-8 md:px-12 py-3 md:py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Calendar className="h-4 w-4 md:h-5 md:w-5" />
                  <TranslatedText textKey="bookVisit" defaultText="קביעת תור" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-dental-orange to-dental-orange/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              
              <p className="text-xs md:text-sm text-dental-navy/60 font-medium">
                <TranslatedText 
                  textKey="treatments.hero.bookingNote" 
                  defaultText="ייעוץ ראשוני ללא התחייבות • זמינים 24/7"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentHero;
