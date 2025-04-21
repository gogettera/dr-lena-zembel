
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const DoctorStory = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-br from-dental-navy/5 to-dental-orange/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden h-96 md:h-auto relative bg-dental-beige/20">
            {/* Placeholder for doctor image */}
            <div className="absolute inset-0 flex items-center justify-center text-dental-navy/30 text-xl">
              Doctor Image
            </div>
          </div>
          
          <div>
            <span className="inline-block px-4 py-1 bg-dental-orange/10 text-dental-orange rounded-full text-sm font-medium mb-4">
              {t('experience')}
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
              {t('experiencedDoctors')}
            </h2>
            
            <p className="text-dental-navy/80 mb-6">
              המומחים שלנו בתחום שיקום הפה מביאים איתם שנים רבות של ניסיון וידע מקצועי. אנו מתמחים בטיפולים מורכבים ועובדים עם הטכנולוגיות המתקדמות ביותר בתחום כדי להבטיח את התוצאות המיטביות עבור המטופלים שלנו.
            </p>
            
            <p className="text-dental-navy/80 mb-6">
              אנו מאמינים בגישה אישית ומקיפה לכל מטופל, תוך הקשבה לצרכים הספציפיים שלו והתאמת תוכנית טיפול מדויקת שתשיג את התוצאות הטובות ביותר.
            </p>
            
            <Button variant="outline" className="mt-2">
              {t('moreDetails')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorStory;
