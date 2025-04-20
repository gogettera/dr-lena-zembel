
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { CalendarDays } from 'lucide-react';

const DoctorProfileCard = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';

  return (
    <div className="relative z-10">
      {/* Profile image with decorative elements */}
      <div className="relative mb-8 group">
        {/* Background decorative elements */}
        <div className="absolute -left-4 -top-4 w-full h-full bg-dental-ocean/10 rounded-2xl transform rotate-3 transition-all duration-300 group-hover:rotate-1"></div>
        <div className="absolute -right-4 -bottom-4 w-full h-full bg-dental-orange/20 rounded-2xl transform -rotate-3 transition-all duration-300 group-hover:rotate-1"></div>
        
        {/* Main image container */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <img
            src="/lovable-uploads/ee68f5b4-8d1b-4e34-9a10-4c4da455e913.png"
            alt={t('doctorProfile')}
            className="w-full h-[400px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-dental-navy/50 to-transparent opacity-60"></div>
          
          {/* Doctor's name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-3xl font-bold drop-shadow-lg">{t('doctorName')}</h3>
          </div>
        </div>
      </div>
      
      {/* Content card */}
      <div className="bg-white rounded-2xl shadow-soft p-6 border border-dental-navy/10">
        <div className="space-y-4">
          {/* Education */}
          <div className={isRTL ? 'text-end' : ''}>
            <p className="text-dental-navy/80 italic">
              {t('doctorEducation')}
            </p>
          </div>
          
          {/* Languages */}
          <div className="border-t border-gray-100 pt-4">
            <p className={`text-sm font-medium text-dental-navy/70 mb-2 ${isRTL ? 'text-end' : ''}`}>
              {t('aboutMeLanguages')}
            </p>
            <div className={`flex gap-2 ${isRTL ? 'justify-end' : ''}`}>
              {['RU', 'DE', 'EN', 'HE'].map((lang) => (
                <span 
                  key={lang} 
                  className="text-sm font-medium text-dental-navy bg-dental-beige/50 px-3 py-1.5 rounded-full transition-all hover:bg-dental-beige"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
          
          {/* Book button (mobile only) */}
          <div className="lg:hidden mt-4">
            <Button className="w-full group" variant="orange">
              <CalendarDays className={`h-4 w-4 transition-transform group-hover:scale-110 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('bookVisit')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileCard;
