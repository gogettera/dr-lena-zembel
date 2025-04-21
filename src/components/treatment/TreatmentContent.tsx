
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TreatmentType } from '@/data/treatmentTypes';
import TreatmentTabs from './TreatmentTabs';
import { Button } from '@/components/ui/button';
import { Sparkles, Leaf, Star } from 'lucide-react';
import ChildrenDentistryCard from '../children-dentistry/ChildrenDentistryCard';

interface TreatmentContentProps {
  treatment: TreatmentType;
  treatmentNameKey: string;
  treatmentDescKey: string;
  treatmentType: string;
}

const TreatmentContent: React.FC<TreatmentContentProps> = ({
  treatment,
  treatmentNameKey,
  treatmentDescKey,
  treatmentType
}) => {
  const { t } = useLanguage();

  // Special case for children dentistry to include the card
  const showSpecialCard = treatmentType === 'children-dentistry';

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-dental-beige/20 via-dental-pink/10 to-dental-beige/20 pointer-events-none"></div>
      <div className="absolute top-20 left-10 animate-[spin_20s_linear_infinite] opacity-20">
        <Sparkles className="h-12 w-12 text-dental-orange" />
      </div>
      <div className="absolute bottom-20 right-10 animate-[spin_25s_linear_infinite] opacity-20">
        <Leaf className="h-16 w-16 text-dental-orange" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {showSpecialCard ? (
            <ChildrenDentistryCard />
          ) : (
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl mb-10 shadow-lg border border-dental-beige/50 relative overflow-hidden">
              {/* Decorative corner stars */}
              <div className="absolute top-4 right-4">
                <Star className="h-6 w-6 text-dental-orange/30" />
              </div>
              <div className="absolute bottom-4 left-4">
                <Star className="h-6 w-6 text-dental-orange/30" />
              </div>
              
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold text-dental-navy mb-4">
                  {t(treatmentNameKey)}
                </h2>
                <p className="text-lg text-dental-navy/80 mb-6">
                  {t(treatmentDescKey)}
                </p>
                <p className="text-lg text-dental-navy/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi. Vivamus vitae efficitur eros, nec finibus dui. Curabitur et odio vel orci scelerisque malesuada.
                </p>
              </div>
            </div>
          )}
          
          <TreatmentTabs 
            treatmentType={treatmentType}
            treatmentNameKey={treatmentNameKey}
            treatmentDescKey={treatmentDescKey}
          />
          
          <div className="text-center mt-16 relative">
            {/* Decorative sparkles around CTA */}
            <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 -translate-x-1/2">
              <Sparkles className="h-8 w-8 text-dental-orange/30 animate-pulse" />
            </div>
            <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 translate-x-1/2">
              <Sparkles className="h-8 w-8 text-dental-orange/30 animate-pulse" />
            </div>
            
            <h3 className="text-2xl font-bold text-dental-navy mb-6">
              {t('readyToStart')}
            </h3>
            <Button 
              variant="orange" 
              size="lg" 
              className="rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-lg relative group"
            >
              <span className="relative z-10">{t('bookVisit')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-dental-orange/80 to-dental-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentContent;
