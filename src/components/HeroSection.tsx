
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import OptimizedImage from '@/components/ui/optimized-image';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t, language } = useLanguage();
  
  const getWhatsAppLink = () => {
    const phone = "97235666915";
    const message = encodeURIComponent(t('whatsappMessage'));
    return `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-dental-beige via-white to-dental-pink overflow-hidden">
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-dental-navy leading-tight opacity-0 animate-[fade-in_0.8s_ease-out_forwards]">
              {t('dentistryWithLove')}
            </h1>
            
            <p className="text-xl md:text-2xl text-dental-muted leading-relaxed opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards] max-w-2xl">
              {t('localDental')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fade-in_0.5s_ease-out_0.6s_forwards]">
              <Button 
                variant="orange" 
                size="lg" 
                className="rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-soft hover:shadow-glow group"
                asChild
              >
                <a 
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  {t('bookVisit')}
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full text-lg border-2 border-dental-navy text-dental-navy hover:bg-dental-navy hover:text-white transition-all duration-300"
              >
                {t('moreDetails')}
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 opacity-0 animate-[slide-in_0.8s_ease-out_forwards]">
            <div className="relative aspect-square md:aspect-[4/3] w-full max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-dental-orange/20 to-dental-accent/20 rounded-[2.5rem] blur-3xl transform rotate-6"></div>
              <OptimizedImage 
                src="/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg"
                alt={t('dentistryWithLove')}
                className="relative w-full h-full rounded-[2rem] shadow-soft hover:scale-[1.02] transition-all duration-500 object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur rounded-2xl p-6 shadow-soft">
                <p className="text-dental-navy font-bold text-lg">{t('completelyHappy')}</p>
                <div className="flex text-dental-orange mt-2 text-xl">
                  ★★★★★
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/4 left-10 w-24 h-24 bg-dental-accent/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-dental-orange/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HeroSection;
