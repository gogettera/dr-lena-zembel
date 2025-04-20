
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { CalendarDays } from 'lucide-react';

const DoctorProfileCard = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-dental-orange rounded-xl blur-xl opacity-20 transform rotate-3"></div>
          <img
            src="/lovable-uploads/ee68f5b4-8d1b-4e34-9a10-4c4da455e913.png"
            alt={t('doctorProfile')}
            className="relative rounded-xl shadow-xl w-full object-cover"
          />
        </div>
        
        <div className="space-y-4">
          <h3 className={`text-2xl font-bold text-dental-navy ${isRTL ? 'text-end' : ''}`}>
            {t('doctorName')}
          </h3>
          <p className={`text-dental-navy/80 ${isRTL ? 'text-end' : ''}`}>
            {t('doctorEducation')}
          </p>
          
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex gap-2">
              {['RU', 'DE', 'EN', 'HE'].map((lang) => (
                <span key={lang} className="text-sm font-medium text-dental-navy bg-gray-50 px-2 py-1 rounded">
                  {lang}
                </span>
              ))}
            </div>
          </div>
          
          <Button className="w-full group" variant="orange">
            <CalendarDays className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            {t('bookVisit')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorProfileCard;
