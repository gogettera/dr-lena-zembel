
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, Tooth } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const OralRehabilitationHero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-gradient-to-br from-dental-beige via-dental-pink to-dental-beige py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 bg-dental-orange/10 text-dental-orange px-4 py-2 rounded-full">
              <Tooth className="h-5 w-5" />
              {t('treatments')}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dental-navy mb-6">
            {t('oralRehabilitationHeadline1')}
          </h1>
          
          <p className="text-xl md:text-2xl text-dental-navy/80 mb-8">
            {t('oralRehabilitationHeadline2')}
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <Card className="p-6 bg-white/80 backdrop-blur">
              <Sparkles className="h-8 w-8 text-dental-orange mb-4" />
              <p className="text-sm text-dental-navy/80">
                {t('oralRehabilitation.mobileFactoid')}
              </p>
            </Card>
            <Card className="p-6 bg-white/80 backdrop-blur">
              <Tooth className="h-8 w-8 text-dental-orange mb-4" />
              <p className="text-sm text-dental-navy/80">
                {t('oralRehabilitation.mobileTip')}
              </p>
            </Card>
          </div>

          <Button 
            variant="orange"
            size="lg"
            className="rounded-full text-lg hover:scale-105 transition-transform duration-300"
          >
            {t('bookVisit')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OralRehabilitationHero;
