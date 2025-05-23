
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';

// Define the interface for expertise items
interface ExpertiseItem {
  title: string;
  description: string;
}

const ClinicExpertise = () => {
  const { t } = useLanguage();
  const [expertiseItems, setExpertiseItems] = useState<ExpertiseItem[]>([]);
  
  useEffect(() => {
    // Ensure we use correct options format with returnObjects set to true
    const items = t('childrenDentistry.clinicExpertise.items', { returnObjects: true });
    if (Array.isArray(items)) {
      setExpertiseItems(items);
    } else {
      console.error('Expected childrenDentistry.clinicExpertise.items to be an array, got:', items);
      setExpertiseItems([]);
    }
  }, [t]);
  
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-dental-navy text-center mb-12">
          <TranslatedText textKey="childrenDentistry.clinicExpertise.title" />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expertiseItems.map((item, index) => (
            <div key={index} className="bg-dental-beige/20 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-dental-navy">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClinicExpertise;
