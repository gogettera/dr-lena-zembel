
import React from 'react';
import { TranslatedText } from '@/components/ui/translated-text';
import { getWhyChooseUsData } from '@/data/treatmentWhyChooseUs';
import StatisticsGrid from './components/StatisticsGrid';
import FeaturesGrid from './components/FeaturesGrid';
import TrustBadges from './components/TrustBadges';

interface TreatmentWhyChooseUsProps {
  treatmentType: string;
}

const TreatmentWhyChooseUs: React.FC<TreatmentWhyChooseUsProps> = ({ treatmentType }) => {
  const { stats, features } = getWhyChooseUsData(treatmentType);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-dental-beige/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
            <TranslatedText textKey="treatments.whyChooseUs.title" defaultText="למה לבחור בנו?" />
          </h2>
          <p className="text-lg text-dental-navy/70 max-w-2xl mx-auto">
            <TranslatedText 
              textKey="treatments.whyChooseUs.subtitle" 
              defaultText="המומחיות, הטכנולוגיה והניסיון שמבטיחים לכם את הטיפול הטוב ביותר"
            />
          </p>
        </div>

        <StatisticsGrid stats={stats} />
        <FeaturesGrid features={features} />
        <TrustBadges />
      </div>
    </section>
  );
};

export default TreatmentWhyChooseUs;
