
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DoctorProfileCard from './about/DoctorProfileCard';
import PracticeValues from './about/PracticeValues';
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';
  
  return (
    <section className="bg-gradient-to-br from-dental-beige via-white to-dental-pink py-16">
      <div className="container mx-auto px-4" dir={isRTL ? 'rtl' : 'ltr'}>
        <h2 className={`text-4xl font-bold text-dental-navy mb-12 ${isRTL ? 'text-end' : ''}`}>
          {t('aboutMe')}
        </h2>
        
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <DoctorProfileCard />
          </div>
          
          <div className="lg:col-span-8 space-y-8">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <p className={isRTL ? 'text-end' : ''}>
                    {t('doctorApproach')}
                  </p>
                  <p className={isRTL ? 'text-end' : ''}>
                    {t('doctorPhilosophy')}
                  </p>
                  <p className={`font-medium ${isRTL ? 'text-end' : ''}`}>
                    {t('doctorTreatments')}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <PracticeValues />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
