
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import { EnhancedImage } from '@/components/ui/enhanced-image';
import { Badge } from '@/components/ui/badge';
import { useDirectionalStyles } from '@/utils/direction';

const DoctorProfile: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const dir = useDirectionalStyles();

  // This content should probably come from translations, but keeping doctor name in Hebrew
  // as it's a proper name
  const doctorName = "ד״ר לנה זמבל";
  const doctorTitle = language === 'he' ? "רופאת שיניים מומחית" : "Specialist Dentist";
  const doctorEducation = language === 'he'
    ? "בוגרת הפקולטה לרפואת שיניים באוניברסיטת קלן, גרמניה"
    : "Graduate of the Faculty of Dentistry at the University of Cologne, Germany";

  const languages = [
    { code: 'he', name: 'עברית', nameEn: 'Hebrew' },
    { code: 'en', name: 'אנגלית', nameEn: 'English' },
    { code: 'ru', name: 'רוסית', nameEn: 'Russian' },
    { code: 'de', name: 'גרמנית', nameEn: 'German' }
  ];

  return (
    <Container>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
        {/* Doctor Image */}
        <div className={`${isRTL ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
              <EnhancedImage
                src="/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg"
                alt={doctorName}
                className="w-full h-full object-cover"
                rounded="2xl"
              />
            </div>
            
            {/* Experience badge */}
            <div className={`absolute -bottom-5 ${isRTL ? '-right-5' : '-left-5'} bg-dental-orange text-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg`}>
              <span className="text-2xl font-bold">10+</span>
              <span className="text-sm">{t('yearsExperience')}</span>
            </div>
            
            {/* Certifications */}
            <div className={`absolute -top-4 ${isRTL ? '-right-4' : '-left-4'} flex flex-col gap-2`}>
              <Badge className="bg-dental-navy text-white px-3 py-1 rounded-full">
                {doctorTitle}
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Doctor Info */}
        <div className={`${isRTL ? 'order-1 lg:order-2' : 'order-1 lg:order-1'} ${dir.textAlign}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
            {t('botoxTreatments.doctorTitle')}
          </h2>
          
          <h3 className="text-2xl font-bold text-dental-navy mb-6">
            {doctorName}
          </h3>
          
          <p className="text-lg text-dental-navy/80 mb-4">
            {doctorEducation}
          </p>
          
          <p className="text-lg text-dental-navy/80 mb-6">
            {language === 'he'
              ? "ד\"ר זמבל השתלמה באופן מיוחד בתחום הזרקות הבוטוקס והחומצה ההיאלורונית, ומשלבת את הידע והניסיון שלה בתחום רפואת השיניים יחד עם הבנה מעמיקה של אנטומיית הפנים."
              : "Dr. Zembel has specialized in Botox and hyaluronic acid injections, combining her knowledge and experience in dentistry with a deep understanding of facial anatomy."
            }
          </p>
          
          <div className={`bg-dental-beige/30 p-6 rounded-xl mb-6 ${dir.textAlign}`}>
            <h4 className="text-xl font-bold text-dental-navy mb-3">
              {language === 'he' ? "הגישה הטיפולית שלי" : "My Treatment Approach"}
            </h4>
            <p className="text-dental-navy/80 italic">
              {language === 'he'
                ? "\"אני מאמינה בשילוב של אסתטיקה וטבעיות. המטרה שלי היא לא לשנות את המראה שלך, אלא להדגיש ולשפר את התווים הטבעיים שלך, תוך שמירה על מראה אותנטי ורענן.\""
                : "\"I believe in combining aesthetics and naturalness. My goal is not to change your appearance, but to emphasize and improve your natural features while maintaining an authentic and fresh look.\""
              }
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {languages.map(lang => (
              <Badge 
                key={lang.code} 
                className="bg-dental-beige/20 text-dental-navy px-3 py-1 rounded-full text-md"
              >
                {language === 'he' ? lang.name : lang.nameEn}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DoctorProfile;
