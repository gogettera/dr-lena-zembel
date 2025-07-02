
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
    <section className="relative min-h-screen flex items-center section-elegant overflow-hidden">
      {/* Elegant background elements */}
      <div className="absolute top-1/4 left-8 w-32 h-32 rounded-full bg-dental-champagne/20 animate-sophisticated-float pointer-events-none" />
      <div className="absolute bottom-1/3 right-12 w-24 h-24 rounded-full bg-dental-lavender/25 animate-sophisticated-float pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-dental-sage/10 to-dental-champagne/10 blur-3xl pointer-events-none" />

      <div
        className="responsive-container pt-32 pb-20 md:pt-40 md:pb-28 relative z-10"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Content */}
          <div className={`lg:w-1/2 space-y-8 ${isMobile ? 'text-center' : isRTL ? 'lg:order-1 text-right' : 'text-left'}`}>
            {/* Elegant badge */}
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-elegant animate-elegant-fade-in">
              <Sparkles className="h-5 w-5 text-dental-orange" />
              <span className="text-dental-navy font-medium text-sm tracking-wide">
                Excellence • Élégance • Innovation
              </span>
            </div>

            {/* Main headline with French typography */}
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-dental-navy leading-[1.1] animate-elegant-delay-1">
              <span className="text-gradient-elegant">
                {t("hero.heroTitle", "רפואת שיניים מתקדמת")}
              </span>
              <br />
              <span className="text-dental-navy/80 text-4xl md:text-5xl lg:text-6xl font-medium">
                בסטנדרט צרפתי
              </span>
            </h1>

            {/* Elegant subtitle */}
            <p className="text-sophisticated text-xl md:text-2xl text-dental-navy/70 leading-relaxed max-w-2xl animate-elegant-delay-2">
              {t("hero.heroSubtitle", "מרפאה יוקרתית בצפון יפו, בה המומחיות פוגשת יחס אישי ואלגנטיות צרפתית. כל חיוך מקבל כאן תשומת לב מיוחדת.")}
            </p>

            {/* Sophisticated CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-6 animate-elegant-delay-3">
              <Button 
                variant="default" 
                size="lg" 
                className="btn-elegant gradient-warm text-white font-semibold text-lg shadow-premium hover:shadow-french group" 
                asChild
              >
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <Calendar className={`h-5 w-5 transition-transform group-hover:scale-110 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  {t("hero.bookAppointment", "לתיאום ייעוץ דיסקרטי")}
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="btn-elegant border-2 border-dental-navy/20 text-dental-navy hover:bg-dental-navy hover:text-white font-medium text-lg backdrop-blur-sm bg-white/40"
                asChild
              >
                <a href="#why-premium">
                  {t("hero.learnMore", "גלו את החוויה הצרפתית")}
                </a>
              </Button>
            </div>

            {/* Elegant trust indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 animate-elegant-delay-3">
              {[
                { number: "13+", label: "שנות מצוינות" },
                { number: "2000+", label: "חיוכים מושלמים" },
                { number: "98%", label: "שביעות רצון" },
                { number: "24/7", label: "זמינות מלאה" }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-2xl md:text-3xl font-bold text-dental-navy group-hover:text-dental-orange transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-dental-navy/60 font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Elegant image section */}
          <div className={`lg:w-1/2 flex justify-center ${isMobile ? 'mt-12' : ''}`}>
            <div className="relative animate-french-slide">
              {/* Sophisticated image frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-dental-champagne/30 to-dental-lavender/20 rounded-3xl blur-2xl transform rotate-3 scale-105 pointer-events-none"></div>
              
              <div className="relative">
                <AspectRatio ratio={4/3} className="overflow-visible">
                  <NextGenImage 
                    alt={t('common.dentistryWithLove', 'Professional French-Style Dentistry')} 
                    src="/lovable-uploads/461f9da9-a7b8-4127-9111-c45b5742bdcf.png" 
                    width={600}
                    height={450}
                    priority={true}
                    className="w-full h-full object-cover rounded-3xl shadow-premium hover:shadow-french transition-all duration-500 hover-elegant card-elegant border-4 border-white/50" 
                  />
                </AspectRatio>

                {/* Floating elegant testimonial */}
                <div 
                  className={`absolute ${isMobile ? 'left-1/2 -translate-x-1/2 -bottom-6' : isRTL ? '-right-8 bottom-8' : '-left-8 bottom-8'}
                    card-elegant backdrop-blur-lg p-6 max-w-[300px] hover-elegant`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex text-dental-orange text-lg">★★★★★</div>
                    <span className="text-dental-navy/60 text-sm font-medium">Excellent</span>
                  </div>
                  <p className="text-dental-navy font-semibold text-base leading-relaxed">
                    <TranslatedText 
                      textKey="common.completelyHappy" 
                      defaultText="חוויה יוקרתית ברמה עולמית - כמו במרפאות פאריז הטובות ביותר" 
                    />
                  </p>
                  <div className="text-dental-navy/50 text-sm mt-2 font-medium">
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
