
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle } from 'lucide-react';

const OralRehabilitationBenefits = () => {
  const { t } = useLanguage();
  
  const defaultBenefits = [
    'שיפור משמעותי ביכולת הלעיסה והדיבור',
    'שחזור מראה טבעי ואסתטי של השיניים',
    'פתרון ארוך טווח לבעיות שיניים מורכבות',
    'שיפור בביטחון העצמי ובאיכות החיים',
    'מניעת אובדן עצם והידרדרות נוספת'
  ];

  // Use the translation key with a fallback to default benefits
  const benefits = t('oralRehabilitation.benefits', { defaultValue: defaultBenefits });

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
          {t('benefits', 'יתרונות')}
        </h2>
        <p className="text-lg text-dental-navy/70 max-w-2xl mx-auto">
          {t('oralRehabilitationDesc', 'שיקום פה הוא טיפול מקיף המתוכנן להחזיר את תפקוד הפה והמראה האסתטי של השיניים')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {Array.isArray(benefits) ? benefits.map((benefit, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-xl shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            <CheckCircle className="h-6 w-6 text-dental-orange shrink-0 mt-1" />
            <p className="text-dental-navy">{benefit}</p>
          </div>
        )) : defaultBenefits.map((benefit, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-xl shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            <CheckCircle className="h-6 w-6 text-dental-orange shrink-0 mt-1" />
            <p className="text-dental-navy">{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OralRehabilitationBenefits;
