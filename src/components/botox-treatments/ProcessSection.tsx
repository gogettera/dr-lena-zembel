
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProcessStep {
  title: string;
  description: string;
}

const ProcessSection: React.FC = () => {
  const { t } = useLanguage();
  const processSteps = t('botoxTreatments.processSteps', { returnObjects: true }) as any as ProcessStep[];

  return (
    <Container>
      <SectionHeader 
        title={t('botoxTreatments.processTitle')}
        subtitle="הליך טיפול פשוט, מהיר ויעיל - בחמישה שלבים בלבד"
      />
      
      <div className="relative mt-16">
        {/* Timeline line */}
        <div className="absolute top-0 bottom-0 right-[22px] md:right-1/2 md:translate-x-1/2 w-1 bg-dental-beige z-0"></div>
        
        {/* Timeline items */}
        {processSteps.map((step, index) => (
          <div key={index} className="relative z-10 mb-12 last:mb-0">
            <div className="flex flex-col md:flex-row items-center">
              {/* Step number */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-dental-orange text-white text-xl font-bold mb-4 md:mb-0 shrink-0">
                {index + 1}
              </div>
              
              {/* Content - alternating sides on desktop */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:mr-8 md:text-right' : 'md:ml-8'} w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-dental-beige/20`}>
                <Card className="border-0 bg-transparent">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold text-dental-navy mb-3">
                      {step.title}
                    </h3>
                    <p className="text-dental-navy/70">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Empty div for alternating layout */}
              {index % 2 === 0 ? (
                <div className="hidden md:block md:w-1/2 ml-8"></div>
              ) : (
                <div className="hidden md:block md:w-1/2 mr-8"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Button className="bg-dental-orange hover:bg-dental-orange/90 text-white rounded-full px-8 py-3 text-lg">
          {t('bookNow')}
        </Button>
      </div>
    </Container>
  );
};

export default ProcessSection;
