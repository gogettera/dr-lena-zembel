
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import { EnhancedImage } from '@/components/ui/enhanced-image';
import { Badge } from '@/components/ui/badge';

const DoctorProfile: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Doctor Image */}
        <div className="order-2 lg:order-1">
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
              <EnhancedImage
                src="/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg"
                alt="ד״ר לנה זמבל"
                className="w-full h-full object-cover"
                rounded="2xl"
              />
            </div>
            
            {/* Experience badge */}
            <div className="absolute -bottom-5 -right-5 bg-dental-orange text-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg">
              <span className="text-2xl font-bold">10+</span>
              <span className="text-sm">שנות ניסיון</span>
            </div>
            
            {/* Certifications */}
            <div className="absolute -top-4 -right-4 flex flex-col gap-2">
              <Badge className="bg-dental-navy text-white px-3 py-1 rounded-full">
                רופאה מומחית
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Doctor Info */}
        <div className="order-1 lg:order-2 text-right">
          <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
            {t('botoxTreatments.doctorTitle')}
          </h2>
          
          <h3 className="text-2xl font-bold text-dental-navy mb-6">
            ד״ר לנה זמבל
          </h3>
          
          <p className="text-lg text-dental-navy/80 mb-4">
            בוגרת הפקולטה לרפואת שיניים באוניברסיטת קלן, גרמניה, עם התמחות מיוחדת בטיפולים אסתטיים מתקדמים.
          </p>
          
          <p className="text-lg text-dental-navy/80 mb-6">
            ד"ר זמבל השתלמה באופן מיוחד בתחום הזרקות הבוטוקס והחומצה ההיאלורונית, ומשלבת את הידע והניסיון שלה בתחום רפואת השיניים יחד עם הבנה מעמיקה של אנטומיית הפנים.
          </p>
          
          <div className="bg-dental-beige/30 p-6 rounded-xl mb-6">
            <h4 className="text-xl font-bold text-dental-navy mb-3">הגישה הטיפולית שלי</h4>
            <p className="text-dental-navy/80 italic">
              "אני מאמינה בשילוב של אסתטיקה וטבעיות. המטרה שלי היא לא לשנות את המראה שלך, אלא להדגיש ולשפר את התווים הטבעיים שלך, תוך שמירה על מראה אותנטי ורענן."
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-dental-beige/20 text-dental-navy px-3 py-1 rounded-full text-md">
              עברית
            </Badge>
            <Badge className="bg-dental-beige/20 text-dental-navy px-3 py-1 rounded-full text-md">
              אנגלית
            </Badge>
            <Badge className="bg-dental-beige/20 text-dental-navy px-3 py-1 rounded-full text-md">
              רוסית
            </Badge>
            <Badge className="bg-dental-beige/20 text-dental-navy px-3 py-1 rounded-full text-md">
              גרמנית
            </Badge>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DoctorProfile;
