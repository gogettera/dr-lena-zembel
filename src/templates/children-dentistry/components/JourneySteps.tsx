
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const JourneySteps: React.FC = () => {
  const { t } = useLanguage();
  
  const steps = [
    {
      icon: '🧸',
      title: t('childrenAdLanding.journey.step1.title'),
      description: t('childrenAdLanding.journey.step1.desc')
    },
    {
      icon: '👋',
      title: t('childrenAdLanding.journey.step2.title'),
      description: t('childrenAdLanding.journey.step2.desc')
    },
    {
      icon: '🦷',
      title: t('childrenAdLanding.journey.step3.title'),
      description: t('childrenAdLanding.journey.step3.desc')
    },
    {
      icon: '🎁',
      title: t('childrenAdLanding.journey.step4.title'),
      description: t('childrenAdLanding.journey.step4.desc')
    }
  ];

  return (
    <section id="journey" className="py-16 md:py-20 px-4 bg-white scroll-mt-24">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-dental-navy mb-3 text-center">
          {t('childrenAdLanding.journey.title')}
        </h2>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-soft text-center flex flex-col items-center relative group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full w-12 h-0.5 -translate-y-1/2 bg-dental-orange/30 z-0 -translate-x-4"></div>
              )}
              
              <div className="w-16 h-16 flex items-center justify-center text-3xl bg-gradient-to-br from-[#FFDEE2]/80 to-[#FDF4F0] rounded-full mb-4">
                {step.icon}
              </div>
              
              <h3 className="text-xl font-bold text-dental-navy mb-2">
                {step.title}
              </h3>
              
              <p className="text-dental-navy/70">
                {step.description}
              </p>
              
              <div className="mt-4 w-10 h-10 rounded-full bg-[#D3E4FD]/30 flex items-center justify-center">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySteps;
