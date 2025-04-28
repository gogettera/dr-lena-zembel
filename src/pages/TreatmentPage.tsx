
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import TreatmentHero from '@/components/treatment/TreatmentHero';
import TreatmentContent from '@/components/treatment/TreatmentContent';
import { treatmentTypes, getTreatmentNameKey, getTreatmentDescKey } from '@/data/treatmentTypes';
import AccessibleLayout from '@/components/layout/AccessibleLayout';

const TreatmentPage: React.FC = () => {
  const { treatmentType } = useParams<{ treatmentType: string }>();
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [treatmentType]);

  const treatment = treatmentType && treatmentTypes[treatmentType];
  
  if (!treatment) {
    return (
      <AccessibleLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-dental-navy">{t('treatmentNotFound')}</h1>
          <Link to="/">
            <Button className="mt-4">{t('backToHome')}</Button>
          </Link>
        </div>
      </AccessibleLayout>
    );
  }

  const treatmentNameKey = getTreatmentNameKey(treatmentType || '');
  const treatmentDescKey = getTreatmentDescKey(treatmentType || '');

  return (
    <AccessibleLayout>
      <main className="pt-20">
        <TreatmentHero 
          treatment={treatment}
          treatmentNameKey={treatmentNameKey}
          treatmentDescKey={treatmentDescKey}
        />
        <TreatmentContent 
          treatment={treatment}
          treatmentNameKey={treatmentNameKey}
          treatmentDescKey={treatmentDescKey}
          treatmentType={treatmentType || ''}
        />
      </main>
    </AccessibleLayout>
  );
};

export default TreatmentPage;
