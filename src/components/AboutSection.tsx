
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar } from '@/components/ui/avatar';
import { Languages } from 'lucide-react';
import DoctorPortrait from '@/components/shared/DoctorPortrait';
import { TranslatedText } from './ui/translated-text';

const AboutSection = () => {
  const { t, language, isRTL } = useLanguage();
  
  return (
    <section className="bg-gradient-to-br from-dental-beige via-white to-dental-pink py-16" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className={`md:w-1/3 ${isRTL ? 'md:order-last' : ''}`}>
            <div className="relative" style={{ width: '100%', maxWidth: '420px', margin: '0 auto' }}>
              <div className="absolute inset-0 bg-dental-orange rounded-xl blur-xl opacity-20 transform rotate-3"></div>
              <DoctorPortrait 
                style="main" 
                width={420} 
                height={500}
                priority={true}
                className="relative hover:scale-105 transition-transform duration-300 w-full object-cover"
              />
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Languages className="h-5 w-5 text-dental-navy" />
              <div className="flex gap-2">
                {['he', 'en', 'de', 'ru'].map(lang => (
                  <div key={lang} className="text-sm font-medium text-dental-navy uppercase">
                    {lang}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-2/3 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-6 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
              <TranslatedText textKey="about.aboutMe" defaultText="אודותיי" />
            </h2>
            <div className="space-y-4 leading-relaxed text-lg opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
              <p>
                <TranslatedText textKey="about.aboutMeIntro" defaultText="אני דוקטור לנה זמבל, רופאת שיניים מוסמכת עם מעל 15 שנות ניסיון בתחום. התמחיתי בטיפולי אסתטיקה, שתלים וטיפולי שורש מורכבים." />
              </p>
              <p>
                <TranslatedText textKey="about.aboutMeClinic" defaultText="המרפאה שלנו בצפון יפו מציעה סביבה נעימה וחדשנית, המצוידת בטכנולוגיה מתקדמת ביותר לתת לכם את הטיפול האיכותי ביותר." />
              </p>
              <p>
                <TranslatedText textKey="about.aboutMeLanguages" defaultText="אנו מדברים עברית, אנגלית, רוסית וגרמנית, ומקבלים מטופלים מכל רחבי תל אביב והסביבה." />
              </p>
              <p className="font-medium">
                <TranslatedText textKey="about.aboutMeInvite" defaultText="אשמח לראותכם במרפאה ולהעניק לכם חיוך בריא ויפה!" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
