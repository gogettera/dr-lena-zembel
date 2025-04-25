
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useDirectionalStyles } from '@/utils/direction';

const BenefitsSection: React.FC = () => {
  const { t } = useLanguage();
  const dir = useDirectionalStyles();
  const benefits = t('botoxTreatments.benefits', { returnObjects: true }) as string[];

  return (
    <Container>
      <SectionHeader 
        title={t('botoxTreatments.benefitsTitle')}
        subtitle={t('botoxTreatments.benefitsSubtitle')}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {benefits.map((benefit, index) => (
          <Card 
            key={index}
            className={`p-6 border border-dental-beige/30 rounded-2xl hover:shadow-md transition-shadow ${dir.textAlign}`}
          >
            <div className={`flex ${dir.flexDir} items-start gap-4`}>
              <div className="flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-dental-orange mt-1" />
              </div>
              <div>
                <p className="text-lg font-medium text-dental-navy">{benefit}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Additional benefits showcase */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-dental-beige/20 rounded-2xl p-6 text-center">
          <div className="w-16 h-16 bg-dental-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-dental-orange">15+</span>
          </div>
          <h3 className="text-xl font-bold text-dental-navy mb-2">{t('botoxTreatments.treatmentSpeed')}</h3>
          <p className="text-dental-navy/70">{t('botoxTreatments.quickTreatments')}</p>
        </div>
        
        <div className="bg-dental-beige/20 rounded-2xl p-6 text-center">
          <div className="w-16 h-16 bg-dental-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-dental-orange">0</span>
          </div>
          <h3 className="text-xl font-bold text-dental-navy mb-2">{t('botoxTreatments.recoveryTime')}</h3>
          <p className="text-dental-navy/70">{t('botoxTreatments.noDowntime')}</p>
        </div>
        
        <div className="bg-dental-beige/20 rounded-2xl p-6 text-center">
          <div className="w-16 h-16 bg-dental-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-dental-orange">6+</span>
          </div>
          <h3 className="text-xl font-bold text-dental-navy mb-2">{t('botoxTreatments.monthsEffect')}</h3>
          <p className="text-dental-navy/70">{t('botoxTreatments.longLastingResults')}</p>
        </div>
      </div>
    </Container>
  );
};

export default BenefitsSection;
