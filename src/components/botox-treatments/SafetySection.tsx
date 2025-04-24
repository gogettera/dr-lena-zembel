
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { Card } from '@/components/ui/card';
import { Shield, AlertCircle, Syringe, Stethoscope, CheckCircle } from 'lucide-react';

const SafetySection: React.FC = () => {
  const { t } = useLanguage();
  const safetyPoints = t<string[]>('botoxTreatments.safetyConcerns', { returnObjects: true });

  const safetyIcons = [Shield, Stethoscope, Syringe, CheckCircle, AlertCircle];

  return (
    <Container>
      <SectionHeader 
        title={t('botoxTreatments.safetyTitle')}
        subtitle="בטיחות המטופלים שלנו היא בראש סדר העדיפויות"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {safetyPoints.map((point, index) => {
          const IconComponent = safetyIcons[index % safetyIcons.length];
          
          return (
            <Card 
              key={index}
              className="p-6 border-0 shadow-md rounded-xl bg-white hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4 text-right">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-dental-beige/30 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-dental-navy" />
                  </div>
                  <p className="text-dental-navy">{point}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-12 bg-dental-beige/30 rounded-xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="md:w-2/3 text-right">
            <h3 className="text-2xl font-bold text-dental-navy mb-4">מחויבות לבטיחות ואיכות</h3>
            <p className="text-dental-navy/80 mb-4">
              אנו משתמשים רק בחומרים מאושרים ומורשים, מהספקים המובילים בעולם. כל הטיפולים מבוצעים תחת הנחיות קפדניות של משרד הבריאות ותוך שמירה על סטנדרטים רפואיים מחמירים.
            </p>
            <p className="text-dental-navy/80">
              לפני כל טיפול, אנו מקיימים פגישת ייעוץ מקיפה כדי להבטיח שהטיפול מתאים לך ושאין התוויות נגד. בריאותך חשובה לנו מעל הכל.
            </p>
          </div>
          
          <div className="md:w-1/3 bg-white rounded-xl p-6 shadow-md">
            <h4 className="text-xl font-bold text-dental-navy mb-3 text-center">הסמכות ואישורים</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-right">
                <CheckCircle className="w-5 h-5 text-dental-orange flex-shrink-0" />
                <span className="text-dental-navy/80">מורשה ע"י משרד הבריאות</span>
              </li>
              <li className="flex items-center gap-2 text-right">
                <CheckCircle className="w-5 h-5 text-dental-orange flex-shrink-0" />
                <span className="text-dental-navy/80">חומרים באישור FDA</span>
              </li>
              <li className="flex items-center gap-2 text-right">
                <CheckCircle className="w-5 h-5 text-dental-orange flex-shrink-0" />
                <span className="text-dental-navy/80">הכשרה מתקדמת בטיפולים אסתטיים</span>
              </li>
              <li className="flex items-center gap-2 text-right">
                <CheckCircle className="w-5 h-5 text-dental-orange flex-shrink-0" />
                <span className="text-dental-navy/80">פרוטוקול טיפול סטרילי</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SafetySection;
