
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { EnhancedImage } from '@/components/ui/enhanced-image';
import { Badge } from '@/components/ui/badge';
import { Syringe } from 'lucide-react';

const BotoxTreatmentsHero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Section 
      background="gradient" 
      spacing="xl"
      className="pt-10 md:pt-16 lg:pt-20"
    >
      <div className="flex flex-col lg:flex-row items-center">
        {/* Text content */}
        <div className="w-full lg:w-1/2 text-right lg:pr-10 mb-8 lg:mb-0">
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge className="bg-dental-orange text-white rounded-full px-3 py-1 font-medium">
              <Syringe className="w-4 h-4 mr-1" />
              חדש במרפאה
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dental-navy mb-4 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
            {t('botoxTreatments.headline1')}
          </h1>
          
          <h2 className="text-xl md:text-2xl font-medium text-dental-navy/80 mb-6 opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]">
            {t('botoxTreatments.headline2')}
          </h2>
          
          <p className="text-lg text-dental-navy/70 mb-8 opacity-0 animate-[fade-in_0.5s_ease-out_0.7s_forwards]">
            {t('botoxTreatmentsDesc')}
          </p>

          <div className="flex flex-wrap gap-4 justify-start md:justify-end opacity-0 animate-[fade-in_0.5s_ease-out_0.9s_forwards]">
            <Button size="lg" className="bg-dental-orange hover:bg-dental-orange/90 text-white rounded-full">
              {t('botoxTreatments.bookingButtonText')}
            </Button>
            <Button size="lg" variant="outline" className="border-dental-navy text-dental-navy hover:bg-dental-navy/5 rounded-full">
              {t('moreDetails')}
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 justify-center md:justify-end">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-dental-navy/10 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-dental-navy">10+</span>
              </div>
              <span className="mr-3 text-dental-navy/70">{t('years')}</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-dental-navy/10 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-dental-navy">1K+</span>
              </div>
              <span className="mr-3 text-dental-navy/70">{t('patientsServed')}</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-dental-orange/20 rounded-full flex items-center justify-center">
                <Syringe className="w-6 h-6 text-dental-orange" />
              </div>
              <span className="mr-3 text-dental-navy/70">
                Botox & <br />Hyaluronic
              </span>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="w-full lg:w-1/2 relative">
          <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-lg z-10">
            <EnhancedImage
              src="/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg"
              alt={t('botoxTreatments.headline1')}
              className="w-full h-full object-cover"
              rounded="xl"
              hover="brighten"
              priority
            />
            
            {/* Mobile callout */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md max-w-[80%] text-right lg:hidden">
              <p className="font-medium text-dental-navy">{t('botoxTreatments.mobileFactoid')}</p>
              <p className="text-sm text-dental-navy/70 mt-1">{t('botoxTreatments.mobileTip')}</p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="hidden lg:block absolute -bottom-6 -right-6 w-32 h-32 bg-dental-beige/30 rounded-full z-0" />
          <div className="hidden lg:block absolute -top-6 -left-6 w-24 h-24 bg-dental-orange/20 rounded-full z-0" />
        </div>
      </div>
    </Section>
  );
};

export default BotoxTreatmentsHero;
