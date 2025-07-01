
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TranslatedText } from '@/components/ui/translated-text';
import { getResponsiveClasses } from '@/utils/responsiveUtils';

interface TreatmentOverviewProps {
  treatmentNameKey: string;
  treatmentDescKey: string;
  benefits: string[];
}

export const TreatmentOverview: React.FC<TreatmentOverviewProps> = ({
  treatmentNameKey,
  treatmentDescKey,
  benefits
}) => {
  const [expanded, setExpanded] = useState(false);
  const responsive = getResponsiveClasses();

  return (
    <Card className="shadow-soft hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-dental-navy">
          <TranslatedText textKey={treatmentNameKey} defaultText="טיפול מתקדם" />
        </h3>
        
        <div className={`space-y-4 ${!expanded ? 'line-clamp-3' : ''}`}>
          <p className="text-dental-navy/80 leading-relaxed">
            <TranslatedText textKey={treatmentDescKey} defaultText="תיאור הטיפול" />
          </p>
          
          {expanded && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-t border-dental-beige/50 pt-4">
                <h4 className="font-semibold text-dental-navy mb-3">
                  <TranslatedText textKey="treatments.keyPoints" defaultText="נקודות מפתח:" />
                </h4>
                <ul className="space-y-2">
                  {benefits.slice(0, 4).map((benefit, index) =>
                    benefit ? (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-dental-orange rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-dental-navy/80">{benefit}</span>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-dental-orange hover:text-dental-orange/80 hover:bg-dental-orange/5"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              <TranslatedText textKey="common.showLess" defaultText="הצג פחות" />
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              <TranslatedText textKey="common.showMore" defaultText="הצג עוד" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
