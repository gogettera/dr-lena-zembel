
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { NextGenImage } from '@/components/ui/next-gen-image';
import { useLanguage } from '@/contexts/LanguageContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';
  const isMobile = useIsMobile();

  const getWhatsAppLink = () => {
    const phone = "97235666915";
    const message = encodeURIComponent(t('whatsappMessage'));
    return `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-dental-beige via-white to-dental-pink overflow-hidden">
      <div className="container mx-auto px-4 py-6 md:py-20 relative z-10" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Mobile-optimized text content */}
          <div className={`md:w-1/2 space-y-6 ${isMobile ? 'text-center' : isRTL ? 'md:order-1 text-right' : 'text-left'}`}>
            <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-dental-navy leading-tight opacity-0 animate-[fade-in_0.8s_ease-out_forwards]">
              {t('dentistryWithLove')}
            </h1>

            <p className="hero-subtitle text-lg md:text-2xl text-dental-navy/80 leading-relaxed opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards] max-w-2xl mx-auto md:mx-0">
              {t('localDental')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fade-in_0.5s_ease-out_0.6s_forwards] justify-center md:justify-start">
              <Button variant="orange" size={isMobile ? "default" : "lg"} className="rounded-full text-base md:text-lg hover:scale-105 transition-all duration-300 shadow-soft hover:shadow-glow group w-full sm:w-auto" asChild>
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <Calendar className={`h-5 w-5 transition-transform group-hover:scale-110 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t('bookVisit')}
                </a>
              </Button>
              <Button variant="outline" size={isMobile ? "default" : "lg"} className="rounded-full text-base md:text-lg border-2 border-dental-navy text-dental-navy hover:bg-dental-navy hover:text-white transition-all duration-300 w-full sm:w-auto">
                {t('moreDetails')}
              </Button>
            </div>
          </div>

          {/* Image section - optimized for mobile */}
          <div 
            className={`mt-4 md:mt-0 md:w-1/2 z-20 w-full max-w-md mx-auto relative
              ${isMobile ? 'pt-2 pb-7 px-2' : ''}
              opacity-0 animate-[slide-in_0.8s_ease-out_forwards] 
              ${isRTL ? 'md:order-0' : ''}`}
            style={isMobile ? { minWidth: 0, overflow: "visible" } : {}}
          >
            {/* Decorative background effect */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-dental-orange/20 to-dental-accent/20 rounded-[2rem] blur-3xl transform rotate-6 pointer-events-none z-0"
              aria-hidden="true"
            ></div>

            <div className="relative z-10">
              <AspectRatio ratio={4/3} className="overflow-visible rounded-2xl">
                <NextGenImage 
                  alt={t('dentistryWithLove')} 
                  src="/lovable-uploads/461f9da9-a7b8-4127-9111-c45b5742bdcf.png" 
                  width={800}
                  height={600}
                  priority={true}
                  className="w-full h-full shadow-soft hover:scale-[1.02] transition-all duration-500" 
                />
              </AspectRatio>

              {/* Mobile-optimized review card */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 ${isMobile ? 'bottom-1' : isRTL ? '-left-4 bottom-4' : '-right-4 bottom-4'} 
                  bg-white/90 backdrop-blur rounded-2xl p-4 md:p-6 shadow-soft
                  flex flex-col items-center`}
                style={{
                  maxWidth: isMobile ? '250px' : '290px',
                  width: isMobile ? 'calc(100% - 32px)' : '290px'
                }}
              >
                <p className="text-dental-navy font-bold text-base md:text-lg">{t('completelyHappy')}</p>
                <div className="flex text-dental-orange mt-2 text-lg md:text-xl">
                  ★★★★★
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements - optimized positioning for mobile */}
      <div 
        className="absolute top-1/3 left-4 w-16 h-16 md:w-24 md:h-24 bg-dental-accent/20 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true"
      ></div>
      <div 
        className="absolute bottom-1/3 right-4 w-20 h-20 md:w-32 md:h-32 bg-dental-orange/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true"
      ></div>
    </section>
  );
};

export default HeroSection;

