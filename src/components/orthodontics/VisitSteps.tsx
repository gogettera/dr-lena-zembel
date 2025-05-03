
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';

const VisitSteps = () => {
  const { t } = useLanguage();
  
  // Ensure we use correct options format with returnObjects set to true
  const steps = t('orthodontics.visitSteps.steps', { returnObjects: true }) || [];
  
  return (
    <section id="visit-steps" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-dental-navy text-center mb-3">
          <TranslatedText textKey="orthodontics.visitSteps.title" />
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          <TranslatedText textKey="orthodontics.visitSteps.subtitle" />
        </p>
        
        <div className="flex flex-col space-y-6">
          {Array.isArray(steps) && steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-start bg-dental-beige/10 rounded-lg p-6">
              <div className="bg-dental-navy text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4 md:mb-0 md:mr-6 shrink-0">
                {index + 1}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-dental-navy mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisitSteps;
