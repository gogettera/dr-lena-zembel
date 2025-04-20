
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const PracticeValues = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';
  
  const values = [
    { key: 'transparency', icon: Check },
    { key: 'xrayPolicy', icon: Check },
    { key: 'treatmentOptions', icon: Check }
  ];

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <h3 className={`text-2xl font-bold text-dental-navy mb-6 ${isRTL ? 'text-end' : ''}`}>
          {t('ourValues')}
        </h3>
        <div className="space-y-4">
          {values.map((value) => (
            <div key={value.key} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="flex-shrink-0">
                <value.icon className="h-5 w-5 text-dental-orange" />
              </div>
              <p className="text-dental-navy/80">{t(value.key)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PracticeValues;
