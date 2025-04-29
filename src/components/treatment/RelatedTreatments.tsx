
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, Smile, Heart, Shield, Stethoscope, PieChart } from 'lucide-react';
import { createLocalizedPath } from '@/utils/languageRoutes';
import { treatmentTypes } from '@/data/treatmentTypes';
import { TranslatedText } from '@/components/ui/translated-text';

interface RelatedTreatmentsProps {
  currentTreatment: string;
}

const RelatedTreatments: React.FC<RelatedTreatmentsProps> = ({ currentTreatment }) => {
  const { language } = useLanguage();
  
  // Map treatment types to their icons
  const treatmentIcons: Record<string, React.ElementType> = {
    'children-dentistry': Smile,
    'aesthetic-treatments': Star,
    'preventive-medicine': Shield,
    'root-canal': Stethoscope,
    'oral-rehabilitation': PieChart,
    'orthodontics': Heart
  };
  
  // Get all treatment types except the current one
  const relatedTreatmentTypes = Object.keys(treatmentTypes).filter(
    type => type !== currentTreatment
  );
  
  // Select 3 related treatments (or fewer if there aren't enough)
  const selectedRelated = relatedTreatmentTypes.slice(0, 3);

  return (
    <Card>
      <CardContent className="pt-6">
        <TranslatedText 
          textKey="treatments.otherTreatmentsYouMightLike"
          as="h3"
          className="text-2xl font-bold text-dental-navy mb-6"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {selectedRelated.map((treatmentType) => {
            const titleKey = `treatments.${treatmentType.replace('-', '')}`;
            const descKey = `treatments.${treatmentType.replace('-', '')}Desc`;
            const Icon = treatmentIcons[treatmentType] || Star;
            
            return (
              <Card 
                key={treatmentType} 
                className="border-dental-beige/50 hover:border-dental-orange/30 hover:shadow-md transition-all"
              >
                <CardContent className="p-6">
                  <div className="bg-dental-pink/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-dental-orange" />
                  </div>
                  <TranslatedText
                    textKey={titleKey}
                    as="h4"
                    className="text-lg font-semibold text-dental-navy mb-2"
                  />
                  <TranslatedText
                    textKey={descKey}
                    as="p"
                    className="text-dental-navy/70 mb-4 line-clamp-3"
                  />
                  <Link to={createLocalizedPath(language, `/treatments/${treatmentType}`)}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2 border-dental-orange text-dental-orange hover:bg-dental-orange hover:text-white"
                    >
                      <TranslatedText textKey="common.learnMore" defaultText="Learn More" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedTreatments;
