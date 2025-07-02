
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Sparkles, ArrowRight } from 'lucide-react';
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
      {/* Subtle background elements - Apple style */}
      <div className="absolute top-1/4 left-12 w-40 h-40 rounded-full bg-gradient-to-br from-dental-primary/5 to-dental-coral/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-16 w-32 h-32 rounded-full bg-gradient-to-br from-dental-mint/10 to-dental-primary/5 blur-2xl pointer-events-none" />

      <div
        className="apple-container py-32 md:py-40 relative z-10"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-24">
          {/* Content */}
          <div className={`lg:w-1/2 space-y-10 ${isMobile ? 'text-center' : isRTL ? 'lg:order-1 text-right' : 'text-left'}`}>
            {/* Premium badge - Apple style */}
            <div className="inline-flex items-center gap-3 bg-gray-100 rounded-full px-6 py-3 animate-apple-spring">
              <Sparkles className="h-4 w-4 text-dental-primary" />
              <span className="text-gray-800 font-medium text-sm tracking-tight">
                Excellence • Innovation • Care
              </span>
            </div>

            {/* Main headline - Apple precision */}
            <div className="space-y-6 animate-delay-1">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[0.9] tracking-tight">
                <span className="apple-gradient-text block mb-2">
                  {t("hero.heroTitle", "רפואת שיניים מתקדמת")}
                </span>
                <span className="text-gray-700 text-4xl md:text-5xl lg:text-6xl font-semibold block">
                  ברמה עולמית
                </span>
              </h1>
            </div>

            {/* Premium subtitle - Apple clarity */}
            <p className="apple-text-large max-w-2xl animate-delay-2">
              {t("hero.heroSubtitle", "מרפאה מתקדמת בצפון יפו, בה הטכנולוגיה הכי חדישה פוגשת יחס אישי מקצועי. כל חיוך מקבל כאן תשומת לב מושלמת.")}
            </p>

            {/* Premium CTA buttons - Apple style */}
            <div className="flex flex-col sm:flex-row gap-4 animate-delay-3">
              <Button 
                className="apple-button apple-button-primary group text-lg px-8 py-4 h-auto" 
                asChild
              >
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <Calendar className={`h-5 w-5 transition-transform group-hover:scale-110 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  {t("hero.bookAppointment", "לתיאום ייעוץ פרטי")}
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                className="apple-button apple-button-secondary text-lg px-8 py-4 h-auto group"
                asChild
              >
                <a href="#why-premium">
                  {t("hero.learnMore", "גלו את החוויה המקצועית")}
                  <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                </a>
              </Button>
            </div>

            {/* Premium trust indicators - Apple precision */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 animate-delay-4">
              {[
                { number: "13+", label: "שנות מצוינות" },
                { number: "2000+", label: "חיוכים מושלמים" },
                { number: "98%", label: "שביעות רצון" },
                { number: "24/7", label: "זמינות מלאה" }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-dental-primary transition-colors duration-250">
                    {stat.number}
                  </div>
                  <div className="apple-text-small mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium image section - Apple elegance */}
          <div className={`lg:w-1/2 flex justify-center ${isMobile ? 'mt-12' : ''}`}>
            <div className="relative animate-apple-spring">
              {/* Subtle depth effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl blur-xl transform rotate-1 scale-105 pointer-events-none opacity-20"></div>
              
              <div className="relative apple-card border-0 shadow-card-hover">
                <AspectRatio ratio={4/3} className="overflow-hidden rounded-3xl">
                  <NextGenImage 
                    alt={t('common.dentistryWithLove', 'Professional Modern Dentistry')} 
                    src="/lovable-uploads/461f9da9-a7b8-4127-9111-c45b5742bdcf.png" 
                    width={600}
                    height={450}
                    priority={true}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                  />
                </AspectRatio>

                {/* Premium floating testimonial - Apple card style */}
                <div 
                  className={`absolute ${isMobile ? 'left-1/2 -translate-x-1/2 -bottom-8' : isRTL ? '-right-12 bottom-12' : '-left-12 bottom-12'}
                    apple-card backdrop-blur-sm p-8 max-w-[320px] border-0 shadow-card-hover`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex text-dental-gold text-lg">★★★★★</div>
                    <span className="apple-text-small font-semibold">Excellent</span>
                  </div>
                  <p className="text-gray-900 font-semibold text-base leading-relaxed mb-3">
                    <TranslatedText 
                      textKey="common.completelyHappy" 
                      defaultText="חוויה מקצועית ברמה עולמית - טכנולוגיה מתקדמת ויחס אישי מושלם" 
                    />
                  </p>
                  <div className="apple-text-small font-medium">
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

