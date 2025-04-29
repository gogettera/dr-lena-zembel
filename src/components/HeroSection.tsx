
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
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
    const phone = "97235666915";
    const message = encodeURIComponent(t('common.whatsappMessage'));
    return `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-dental-beige via-white to-dental-pink overflow-hidden">
      <div
        className="container mx-auto px-4 pt-28 pb-16 md:pt-32 md:pb-20 relative z-10"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className={`md:w-1/2 space-y-6 ${isMobile ? 'text-center' : isRTL ? 'md:order-1 text-right' : 'text-left'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-dental-navy leading-tight max-w-2xl opacity-0 animate-[fade-in_0.8s_ease-out_forwards]">
              <TranslatedText textKey="common.dentistryWithLove" defaultText="Professional Dentistry" />
            </h1>

            <p className="text-lg md:text-xl text-dental-navy/80 leading-relaxed opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards] max-w-2xl">
              <TranslatedText textKey="common.localDental" defaultText="Professional dental clinic in North Jaffa, providing comprehensive quality care for our patients." />
            </p>

            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fade-in_0.5s_ease-out_0.6s_forwards] justify-center md:justify-start">
              <Button 
                variant="orange" 
                size="lg" 
                className="rounded-full text-base md:text-lg hover:scale-105 transition-all duration-300 shadow-soft hover:shadow-glow group w-full sm:w-auto" 
                asChild
              >
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <Calendar className={`h-5 w-5 transition-transform group-hover:scale-110 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  <TranslatedText textKey="common.bookVisit" defaultText="Book an Appointment" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full text-base md:text-lg border-2 border-dental-navy text-dental-navy hover:bg-dental-navy hover:text-white transition-all duration-300 w-full sm:w-auto"
              >
                <TranslatedText textKey="common.moreDetails" defaultText="More Details" />
              </Button>
            </div>
          </div>

          <div className={`mt-8 md:mt-0 md:w-1/2 relative ${isMobile ? 'w-full max-w-md mx-auto px-4' : ''}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-dental-orange/20 to-dental-accent/20 rounded-[2rem] blur-3xl transform rotate-6 pointer-events-none"></div>
            
            <div className="relative">
              <AspectRatio ratio={4/3} className="overflow-visible">
                <NextGenImage 
                  alt={t('common.dentistryWithLove', 'Professional Dentistry')} 
                  src="/lovable-uploads/461f9da9-a7b8-4127-9111-c45b5742bdcf.png" 
                  width={800}
                  height={600}
                  priority={true}
                  className="w-full h-full object-cover rounded-2xl shadow-soft hover:scale-[1.02] transition-all duration-500 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]" 
                />
              </AspectRatio>

              <div 
                className={`absolute ${isMobile ? 'left-1/2 -translate-x-1/2 bottom-4' : isRTL ? '-left-4 bottom-4' : '-right-4 bottom-4'}
                  bg-white/90 backdrop-blur rounded-2xl p-4 md:p-6 shadow-soft max-w-[280px] w-[calc(100%-2rem)]
                  flex flex-col items-center transform hover:scale-105 transition-all duration-300`}
              >
                <p className="text-dental-navy font-bold text-base md:text-lg text-center">
                  <TranslatedText textKey="common.completelyHappy" defaultText="Thousands of Happy Patients" />
                </p>
                <div className="flex text-dental-orange mt-2 text-lg md:text-xl">
                  ★★★★★
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/3 left-4 w-16 h-16 md:w-24 md:h-24 bg-dental-accent/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-4 w-20 h-20 md:w-32 md:h-32 bg-dental-orange/10 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
