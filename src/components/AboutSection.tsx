
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar } from '@/components/ui/avatar';
import { Language } from 'lucide-react';

const AboutSection = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';
  
  return (
    <section className="bg-gradient-to-br from-dental-beige via-white to-dental-pink py-16">
      <div className="container mx-auto px-4" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className={`md:w-1/3 ${isRTL ? 'md:order-last' : ''}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-dental-orange rounded-xl blur-xl opacity-20 transform rotate-3"></div>
              <img
                src="/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg"
                alt={t('doctorProfile')}
                className="relative rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 w-full max-w-md mx-auto"
              />
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Language className="h-5 w-5 text-dental-navy" />
              <div className="flex gap-2">
                {['he', 'en', 'de', 'ru'].map((lang) => (
                  <div
                    key={lang}
                    className="text-sm font-medium text-dental-navy uppercase"
                  >
                    {lang}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-2/3 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-6 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
              {t('aboutMe')}
            </h2>
            <div className="space-y-4 leading-relaxed text-lg opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
              <p>{t('aboutMeIntro')}</p>
              <p>{t('aboutMeClinic')}</p>
              <p>{t('aboutMeLanguages')}</p>
              <p className="font-medium">{t('aboutMeInvite')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
