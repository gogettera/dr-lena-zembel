
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDirectionalStyles } from '@/utils/direction';

interface ProcessStep {
  title: string;
  description: string;
}

const ProcessSection: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const dir = useDirectionalStyles();
  const processSteps = t('botoxTreatments.processSteps', { returnObjects: true }) as ProcessStep[];

  return (
    <Container>
      <SectionHeader 
        title={t('botoxTreatments.processTitle')}
        subtitle={t('botoxTreatments.processSubtitle')}
      />
      
      <div className="relative mt-16">
        {/* Timeline line */}
        <div className={`absolute top-0 bottom-0 ${isRTL ? 'right-[22px] md:right-1/2 md:translate-x-1/2' : 'left-[22px] md:left-1/2 md:-translate-x-1/2'} w-1 bg-dental-beige z-0`}></div>
        
        {/* Timeline items */}
        {processSteps.map((step, index) => (
          <div key={index} className="relative z-10 mb-12 last:mb-0">
            <div className={`flex flex-col md:flex-row ${isRTL ? 'md:flex-row-reverse' : ''} items-center`}>
              {/* Step number */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-dental-orange text-white text-xl font-bold mb-4 md:mb-0 shrink-0">
                {index + 1}
              </div>
              
              {/* Empty div for alternating layout - first position in RTL, second in LTR when index is odd */}
              {(isRTL ? index % 2 !== 0 : index % 2 !== 0) && (
                <div className="hidden md:block md:w-1/2"></div>
              )}
              
              {/* Content - alternating sides on desktop */}
              <div className={`md:w-1/2 ${(isRTL ? index % 2 !== 0 : index % 2 !== 0) ? 'md:mr-8' : 'md:ml-8'} w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-dental-beige/20`}>
                <Card className="border-0 bg-transparent">
                  <CardContent className="pt-6">
                    <h3 className={`text-xl font-bold text-dental-navy mb-3 ${dir.textAlign}`}>
                      {step.title}
                    </h3>
                    <p className={`text-dental-navy/70 ${dir.textAlign}`}>
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Empty div for alternating layout - second position in RTL, first in LTR when index is even */}
              {(isRTL ? index % 2 === 0 : index % 2 === 0) && (
                <div className="hidden md:block md:w-1/2"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Button className="bg-dental-orange hover:bg-dental-orange/90 text-white rounded-full px-8 py-3 text-lg">
          {t('botoxTreatments.bookingButtonText')}
        </Button>
      </div>
    </Container>
  );
};

export default ProcessSection;
