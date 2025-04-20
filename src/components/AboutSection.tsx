
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check } from 'lucide-react';

const AboutSection = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';
  
  return (
    <section className="bg-gradient-to-br from-dental-beige via-white to-dental-pink py-16">
      <div className="container mx-auto px-4" dir={isRTL ? 'rtl' : 'ltr'}>
        <h2 className="text-4xl font-bold text-dental-navy mb-8 text-end">
          {t('aboutMe')}
        </h2>
        
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <div className={`lg:w-1/3 ${isRTL ? 'lg:order-last' : ''}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-dental-orange rounded-xl blur-xl opacity-20 transform rotate-3"></div>
              <img
                src="/lovable-uploads/ee68f5b4-8d1b-4e34-9a10-4c4da455e913.png"
                alt={t('doctorProfile')}
                className="relative rounded-xl shadow-xl w-full"
              />
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="flex gap-2">
                {['RU', 'DE', 'EN', 'HE'].map((lang) => (
                  <div
                    key={lang}
                    className="text-sm font-medium text-dental-navy"
                  >
                    {lang}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 space-y-6">
            <div className="space-y-4 leading-relaxed text-lg">
              <h3 className="text-2xl font-bold text-dental-navy mb-4 text-end">
                {t('doctorName')}
              </h3>
              <p className="text-end">{t('doctorEducation')}</p>
              <p className="text-end">{t('doctorTreatments')}</p>
              <p className="text-end">{t('doctorApproach')}</p>
              <p className="text-end mb-8">{t('doctorPhilosophy')}</p>

              <div className="space-y-3 text-dental-navy">
                <div className="flex items-center gap-2 justify-end">
                  <span>{t('transparency')}</span>
                  <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span>{t('xrayPolicy')}</span>
                  <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span>{t('treatmentOptions')}</span>
                  <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
