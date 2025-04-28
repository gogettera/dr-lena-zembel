
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { EnhancedImage } from '@/components/ui/enhanced-image';
import { MessageCircle } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="pt-8 md:pt-12 lg:pt-16 pb-16 md:pb-20 px-4 bg-gradient-to-br from-[#FFDEE2]/40 via-[#D3E4FD]/20 to-[#F1F0FB]/50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-right order-2 lg:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dental-navy mb-4 opacity-0 animate-[fade-in_0.8s_ease-out_forwards]">
              {t('childrenAdLanding.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-dental-navy/80 mb-8 max-w-xl mx-auto lg:mr-0 lg:ml-auto opacity-0 animate-[fade-in_0.8s_ease-out_0.3s_forwards]">
              {t('childrenAdLanding.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-end gap-4 opacity-0 animate-[fade-in_0.8s_ease-out_0.6s_forwards]">
              <Button 
                variant="orange" 
                size="lg" 
                className="rounded-full px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => scrollToSection('booking')}
              >
                {t('childrenAdLanding.hero.cta')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-dental-navy/30 px-6 text-dental-navy flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                {t('childrenAdLanding.hero.secondaryCta')}
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-[45%] order-1 lg:order-2 opacity-0 animate-[fade-in_1s_ease-out_0.2s_forwards]">
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-dental-orange/10 z-0"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-dental-sky/10 z-0"></div>
              <EnhancedImage
                src="/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg"
                alt={t('childrenAdLanding.hero.imageAlt')}
                className="rounded-2xl md:rounded-3xl shadow-lg relative z-10"
                aspectRatio={4/3}
                objectFit="cover"
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
