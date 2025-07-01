
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TreatmentFeature } from '@/data/treatmentWhyChooseUs';

interface FeaturesGridProps {
  features: TreatmentFeature[];
}

const FeaturesGrid: React.FC<FeaturesGridProps> = ({ features }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {features.map((feature, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-dental-beige/30 bg-white">
          <CardContent className="p-0">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-dental-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                <feature.icon className="h-6 w-6 text-dental-orange" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-dental-navy mb-2">{feature.title}</h3>
                <p className="text-dental-navy/70 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeaturesGrid;
