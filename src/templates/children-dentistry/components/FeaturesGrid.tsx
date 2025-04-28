
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check } from 'lucide-react';

const FeaturesGrid: React.FC = () => {
  const { t } = useLanguage();
  
  // Safety features list
  const safetyFeatures = [
    t('childrenAdLanding.safety.item1'),
    t('childrenAdLanding.safety.item2'),
    t('childrenAdLanding.safety.item3'),
  ];

  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-dental-navy mb-8 text-center">
          {t('childrenAdLanding.safety.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {safetyFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-[#FFDEE2]/10 to-white p-6 rounded-xl shadow-sm border border-[#FFDEE2]/20 flex items-start"
            >
              <div className="rounded-full bg-dental-orange/10 p-2 mr-4 flex-shrink-0">
                <Check className="w-5 h-5 text-dental-orange" />
              </div>
              <p className="text-lg text-dental-navy">{feature}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-6 md:p-8 bg-[#D3E4FD]/20 rounded-2xl shadow-sm border border-[#D3E4FD]/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-dental-navy mb-2">חדר טיפולים ידידותי לילדים</h3>
              <p className="text-dental-navy/70 mb-4">חדר טיפולים מעוצב במיוחד עבור ילדים, עם אווירה מרגיעה וחמה.</p>
              <div className="mt-auto rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/0220ac9e-7ca5-472e-9bcc-e630090c6ff2.png" 
                  alt="חדר טיפולים ידידותי לילדים"
                  className="w-full h-40 object-cover"
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-dental-navy mb-2">אזור משחקים והמתנה</h3>
              <p className="text-dental-navy/70 mb-4">אזור המתנה נעים עם משחקים וספרים להפחתת החרדה לפני הטיפול.</p>
              <div className="mt-auto rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/11fa7c9b-39fc-4d60-b09b-13f0578ebffe.png" 
                  alt="אזור משחקים והמתנה"
                  className="w-full h-40 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
