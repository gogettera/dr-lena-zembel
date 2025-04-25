
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { Card } from '@/components/ui/card';
import { Shield, AlertCircle, Syringe, Stethoscope, CheckCircle } from 'lucide-react';
import { useDirectionalStyles } from '@/utils/direction';

const SafetySection: React.FC = () => {
  const { t, language } = useLanguage();
  const dir = useDirectionalStyles();
  const safetyPoints = t('botoxTreatments.safetyConcerns', { returnObjects: true }) as string[];

  const safetyIcons = [Shield, Stethoscope, Syringe, CheckCircle, AlertCircle];

  return (
    <Container>
      <SectionHeader 
        title={t('botoxTreatments.safetyTitle')}
        subtitle={t('botoxTreatments.safetySubtitle')}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {safetyPoints.map((point, index) => {
          const IconComponent = safetyIcons[index % safetyIcons.length];
          
          return (
            <Card 
              key={index}
              className="p-6 border-0 shadow-md rounded-xl bg-white hover:shadow-lg transition-shadow"
            >
              <div className={`flex ${dir.flexDir} items-start gap-4 ${dir.textAlign}`}>
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
        <div className={`flex flex-col md:flex-row gap-6 items-start`}>
          <div className={`md:w-2/3 ${dir.textAlign}`}>
            <h3 className="text-2xl font-bold text-dental-navy mb-4">
              {language === 'he' ? "מחויבות לבטיחות ואיכות" : 
              language === 'ar' ? "الالتزام بالسلامة والجودة" : 
              "Commitment to Safety and Quality"}
            </h3>
            <p className="text-dental-navy/80 mb-4">
              {language === 'he' ? 
                "אנו משתמשים רק בחומרים מאושרים ומורשים, מהספקים המובילים בעולם. כל הטיפולים מבוצעים תחת הנחיות קפדניות של משרד הבריאות ותוך שמירה על סטנדרטים רפואיים מחמירים." : 
                "We use only approved and licensed materials from the world's leading suppliers. All treatments are performed under strict Ministry of Health guidelines and maintaining rigorous medical standards."}
            </p>
            <p className="text-dental-navy/80">
              {language === 'he' ? 
                "לפני כל טיפול, אנו מקיימים פגישת ייעוץ מקיפה כדי להבטיח שהטיפול מתאים לך ושאין התוויות נגד. בריאותך חשובה לנו מעל הכל." : 
                "Before each treatment, we conduct a comprehensive consultation to ensure the treatment is suitable for you and that there are no contraindications. Your health is important to us above all."}
            </p>
          </div>
          
          <div className={`md:w-1/3 bg-white rounded-xl p-6 shadow-md ${dir.textAlign}`}>
            <h4 className="text-xl font-bold text-dental-navy mb-3 text-center">
              {t('botoxTreatments.certifications')}
            </h4>
            <ul className="space-y-3">
              <li className={`flex ${dir.flexDir} items-center gap-2`}>
                <CheckCircle className="w-5 h-5 text-dental-orange flex-shrink-0" />
                <span className="text-dental-navy/80">
                  {language === 'he' ? "מורשה ע\"י משרד הבריאות" : 
                   language === 'ar' ? "مرخص من وزارة الصحة" : 
                   "Licensed by the Ministry of Health"}
                </span>
              </li>
              <li className={`flex ${dir.flexDir} items-center gap-2`}>
                <CheckCircle className="w-5 h-5 text-dental-orange flex-shrink-0" />
                <span className="text-dental-navy/80">
                  {language === 'he' ? "חומרים באישור FDA" : 
                   language === 'ar' ? "مواد معتمدة من FDA" : 
                   "FDA approved materials"}
                </span>
              </li>
              <li className={`flex ${dir.flexDir} items-center gap-2`}>
                <CheckCircle className="w-5 h-5 text-dental-orange flex-shrink-0" />
                <span className="text-dental-navy/80">
                  {language === 'he' ? "הכשרה מתקדמת בטיפולים אסתטיים" : 
                   language === 'ar' ? "تدريب متقدم في العلاجات التجميلية" : 
                   "Advanced training in aesthetic treatments"}
                </span>
              </li>
              <li className={`flex ${dir.flexDir} items-center gap-2`}>
                <CheckCircle className="w-5 h-5 text-dental-orange flex-shrink-0" />
                <span className="text-dental-navy/80">
                  {language === 'he' ? "פרוטוקול טיפול סטרילי" : 
                   language === 'ar' ? "بروتوكول علاج معقم" : 
                   "Sterile treatment protocol"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SafetySection;
