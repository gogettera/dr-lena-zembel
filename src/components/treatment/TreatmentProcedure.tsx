
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface TreatmentProcedureProps {
  treatmentType: string;
}

const TreatmentProcedure: React.FC<TreatmentProcedureProps> = ({ treatmentType }) => {
  const { t } = useLanguage();
  
  // These would come from a real data source in a complete implementation
  const procedures = [
    {
      id: 'step1',
      title: `${t('procedureStep1')}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi.'
    },
    {
      id: 'step2',
      title: `${t('procedureStep2')}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi.'
    },
    {
      id: 'step3',
      title: `${t('procedureStep3')}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi.'
    },
    {
      id: 'step4',
      title: `${t('procedureStep4')}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi.'
    }
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-2xl font-bold text-dental-navy mb-6">
          {t('procedureDetails')}
        </h3>
        
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-dental-beige/70" />
          
          <div className="space-y-8">
            {procedures.map((step, index) => (
              <div key={step.id} className="relative pl-12">
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-dental-pink/30 flex items-center justify-center border-2 border-white">
                  <span className="text-dental-navy font-bold">{index + 1}</span>
                </div>
                <h4 className="text-lg font-semibold text-dental-navy mb-2">{step.title}</h4>
                <p className="text-dental-navy/80">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-8 border-t border-dental-beige/50">
            <h4 className="text-lg font-semibold text-dental-navy mb-4">{t('afterProcedure')}</h4>
            <p className="text-dental-navy/80 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi. Vivamus vitae efficitur eros, nec finibus dui.
            </p>
            <p className="text-dental-navy/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis in odio finibus posuere. Nulla facilisi.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentProcedure;
