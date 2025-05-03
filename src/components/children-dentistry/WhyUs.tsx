
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';

const WhyUs = () => {
  const { t } = useLanguage();
  
  // Ensure we use correct options format with returnObjects set to true
  const reasons = t('childrenDentistry.whyUs.reasons', { returnObjects: true }) || [];
  
  return (
    <section id="why-us" className="py-16 bg-gradient-to-b from-white to-dental-beige/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-dental-navy text-center mb-3">
          <TranslatedText textKey="childrenDentistry.whyUs.title" />
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          <TranslatedText textKey="childrenDentistry.whyUs.subtitle" />
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(reasons) && reasons.map((reason, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="text-dental-orange mb-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dental-navy text-center">
                {reason.title}
              </h3>
              <p className="text-gray-700 text-center">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
