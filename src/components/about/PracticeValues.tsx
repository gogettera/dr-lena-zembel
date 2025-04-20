
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, Lightbulb, Users } from 'lucide-react';

const PracticeValues = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';
  
  const values = [
    { 
      key: 'transparency', 
      icon: Check, 
      color: 'bg-dental-ocean/10',
      iconColor: 'text-dental-ocean' 
    },
    { 
      key: 'xrayPolicy', 
      icon: Lightbulb,
      color: 'bg-dental-orange/10',
      iconColor: 'text-dental-orange'
    },
    { 
      key: 'treatmentOptions', 
      icon: Users,
      color: 'bg-dental-navy/10',
      iconColor: 'text-dental-navy'
    }
  ];

  return (
    <div>
      <h3 className={`text-2xl font-bold text-dental-navy mb-6 ${isRTL ? 'text-end' : ''}`}>
        {t('ourValues')}
      </h3>
      
      <div className="grid gap-4">
        {values.map((value, index) => (
          <div 
            key={value.key}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md border border-dental-navy/5 p-4 transition-all duration-300 hover:translate-y-[-2px]"
          >
            <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`${value.color} p-3 rounded-full`}>
                <value.icon className={`h-5 w-5 ${value.iconColor} transition-transform duration-300 group-hover:scale-110`} />
              </div>
              
              <div className={isRTL ? 'text-end' : ''}>
                <p className="text-dental-navy/90 font-medium">
                  {t(value.key)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Decorative element */}
      <div className={`h-1 w-16 bg-dental-pink mt-8 ${isRTL ? 'ml-auto' : ''} opacity-60`}></div>
    </div>
  );
};

export default PracticeValues;
