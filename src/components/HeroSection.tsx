
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Sparkles } from 'lucide-react';
import { NextGenImage } from '@/components/ui/next-gen-image';
import { useLanguage } from '@/contexts/LanguageContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useIsMobile } from '@/hooks/use-mobile';
import { TranslatedText } from '@/components/ui/translated-text';

const HeroSection = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';
  const isMobile = useIsMobile();

  const getWhatsAppLink = () => {
    const phone = "972515666915";
    const message = encodeURIComponent(t('common.whatsappMessage'));
    return `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
  };

  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Minimal background elements */}
      <div className="absolute top-1/4 left-8 w-32 h-32 rounded-full bg-gray-100 opacity-50 animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/3 right-12 w-24 h-24 rounded-full bg-red-50 opacity-60 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      <div
        className="responsive-container pt-32 pb-20 md:pt-40 md:pb-28 relative z-10"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Content */}
          <div className={`lg:w-1/2 space-y-8 ${isMobile ? 'text-center' : isRTL ? 'lg:order-1 text-right' : 'text-left'}`}>
            {/* Premium badge */}
            <div className="inline-flex items-center gap-3 bg-gray-50 rounded-full px-6 py-3 shadow-card animate-premium-fade-in">
              <Sparkles className="h-5 w-5 text-red-500" />
              <span className="text-gray-900 font-medium text-sm tracking-tight">
                Excellence • Innovation • Care
              </span>
            </div>

            {/* Main headline - premium typography */}
            <h1 className="text-premium-heading text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] animate-premium-delay-1">
              <span className="text-gradient-premium">
                {t("hero.heroTitle", "רפואת שיניים מתקדמת")}
              </span>
              <br />
              <span className="text-gray-700 text-4xl md:text-5xl lg:text-6xl font-semibold">
                ברמה עולמית
              </span>
            </h1>

            {/* Premium subtitle */}
            <p className="text-premium text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl animate-premium-delay-2">
              {t("hero.heroSubtitle", "מרפאה מתקדמת בצפון יפו, בה הטכנולוגיה הכי חדישה פוגשת יחס אישי מקצועי. כל חיוך מקבל כאן תשומת לב מושלמת.")}
            </p>

            {/* Premium CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-premium-delay-3">
              <Button 
                variant="default" 
                size="lg" 
                className="btn-premium gradient-coral text-white font-semibold text-lg shadow-card hover:shadow-hover group" 
                asChild
              >
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <Calendar className={`h-5 w-5 transition-transform group-hover:scale-110 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  {t("hero.bookAppointment", "לתיאום ייעוץ פרטי")}
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="btn-premium border-2 border-gray-200 text-gray-900 hover:bg-gray-50 font-medium text-lg"
                asChild
              >
                <a href="#why-premium">
                  {t("hero.learnMore", "גלו את החוויה המקצועית")}
                </a>
              </Button>
            </div>

            {/* Premium trust indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 animate-premium-delay-3">
              {[
                { number: "13+", label: "שנות מצוינות" },
                { number: "2000+", label: "חיוכים מושלמים" },
                { number: "98%", label: "שביעות רצון" },
                { number: "24/7", label: "זמינות מלאה" }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-red-500 transition-colors duration-200">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium image section */}
          <div className={`lg:w-1/2 flex justify-center ${isMobile ? 'mt-12' : ''}`}>
            <div className="relative animate-premium-slide">
              {/* Subtle image frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl blur-xl transform rotate-1 scale-105 pointer-events-none opacity-30"></div>
              
              <div className="relative">
                <AspectRatio ratio={4/3} className="overflow-visible">
                  <NextGenImage 
                    alt={t('common.dentistryWithLove', 'Professional Modern Dentistry')} 
                    src="/lovable-uploads/461f9da9-a7b8-4127-9111-c45b5742bdcf.png" 
                    width={600}
                    height={450}
                    priority={true}
                    className="w-full h-full object-cover rounded-2xl shadow-hover hover:shadow-premium transition-all duration-300 hover-premium card-premium border border-gray-100" 
                  />
                </AspectRatio>

                {/* Premium floating testimonial */}
                <div 
                  className={`absolute ${isMobile ? 'left-1/2 -translate-x-1/2 -bottom-6' : isRTL ? '-right-8 bottom-8' : '-left-8 bottom-8'}
                    card-premium backdrop-blur-sm p-6 max-w-[300px] hover-premium`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex text-red-500 text-lg">★★★★★</div>
                    <span className="text-gray-600 text-sm font-medium">Excellent</span>
                  </div>
                  <p className="text-gray-900 font-semibold text-base leading-relaxed">
                    <TranslatedText 
                      textKey="common.completelyHappy" 
                      defaultText="חוויה מקצועית ברמה עולמית - טכנולוגיה מתקדמת ויחס אישי מושלם" 
                    />
                  </p>
                  <div className="text-gray-500 text-sm mt-2 font-medium">
                    מאות לקוחות מרוצים
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
