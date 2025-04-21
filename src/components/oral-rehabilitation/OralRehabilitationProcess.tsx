
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CircleCheck, MagnifyingGlass, ClipboardList, Stethoscope, CalendarCheck } from 'lucide-react';

const OralRehabilitationProcess = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <MagnifyingGlass className="h-10 w-10 text-dental-orange" />,
      title: t('oralRehabilitation.process.steps.0.title'),
      description: t('oralRehabilitation.process.steps.0.description')
    },
    {
      icon: <ClipboardList className="h-10 w-10 text-dental-orange" />,
      title: t('oralRehabilitation.process.steps.1.title'),
      description: t('oralRehabilitation.process.steps.1.description')
    },
    {
      icon: <Stethoscope className="h-10 w-10 text-dental-orange" />,
      title: t('oralRehabilitation.process.steps.2.title'),
      description: t('oralRehabilitation.process.steps.2.description')
    },
    {
      icon: <CalendarCheck className="h-10 w-10 text-dental-orange" />,
      title: t('oralRehabilitation.process.steps.3.title'),
      description: t('oralRehabilitation.process.steps.3.description')
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
          {t('procedure')}
        </h2>
        <p className="text-lg text-dental-navy/70 max-w-2xl mx-auto">
          {t('procedureDetails')}
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line connecting the steps */}
        <div className="absolute left-[2.5rem] top-0 bottom-0 w-0.5 bg-dental-beige/50 hidden md:block"></div>
        
        {steps.map((step, index) => (
          <div key={index} className="mb-12 last:mb-0">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-white rounded-full p-4 shadow-md relative z-10">
                {step.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-dental-navy mb-2">{step.title}</h3>
                <p className="text-dental-navy/70">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OralRehabilitationProcess;
