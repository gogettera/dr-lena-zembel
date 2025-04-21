
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Crown, Smile, Shield, Activity } from 'lucide-react';

const OralRehabilitationTreatments = () => {
  const { t } = useLanguage();

  const treatments = [
    {
      icon: <Crown className="h-12 w-12 text-dental-orange" />,
      title: t('oralRehabilitation.treatments.crowns.title'),
      description: t('oralRehabilitation.treatments.crowns.description')
    },
    {
      icon: <Star className="h-12 w-12 text-dental-orange" />,
      title: t('oralRehabilitation.treatments.implants.title'),
      description: t('oralRehabilitation.treatments.implants.description')
    },
    {
      icon: <Smile className="h-12 w-12 text-dental-orange" />,
      title: t('oralRehabilitation.treatments.dentures.title'),
      description: t('oralRehabilitation.treatments.dentures.description')
    },
    {
      icon: <Shield className="h-12 w-12 text-dental-orange" />,
      title: t('oralRehabilitation.treatments.aestheticRestorations.title'),
      description: t('oralRehabilitation.treatments.aestheticRestorations.description')
    },
    {
      icon: <Activity className="h-12 w-12 text-dental-orange" />,
      title: t('oralRehabilitation.treatments.periodontal.title'),
      description: t('oralRehabilitation.treatments.periodontal.description')
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
          {t('ourTreatments')}
        </h2>
        <p className="text-lg text-dental-navy/70 max-w-2xl mx-auto">
          {t('wideRangeOfTreatments')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {treatments.map((treatment, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 mt-2">{treatment.icon}</div>
                <h3 className="text-xl font-semibold text-dental-navy mb-2">{treatment.title}</h3>
                <p className="text-dental-navy/70">{treatment.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OralRehabilitationTreatments;
