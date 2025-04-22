
import React from 'react';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { useLanguage } from '@/contexts/LanguageContext';

const AccessibilityStatement: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <Section background="white" spacing="lg">
      <Container size="4xl">
        <div className="space-y-6 py-6">
          <h1 className="text-3xl font-bold text-dental-navy mb-6">
            {t('accessibility.statementTitle', 'הצהרת נגישות')}
          </h1>
          
          <p className="text-dental-navy/80">
            {t('accessibility.introText', 'אנו במרפאת השיניים של ד״ר לנה זמבל מאמינים כי לכל אדם מגיעה הזכות לנגישות מלאה לשירותי רפואת שיניים ולמידע באתר. אנו פועלים להנגשת האתר והשירותים שאנו מספקים בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות תשנ"ח-1998 ולתקנות שהותקנו מכוחו.')}
          </p>
          
          <h2 className="text-xl font-semibold text-dental-navy mt-8 mb-4">
            {t('accessibility.featuresTitle', 'אמצעי הנגישות באתר')}
          </h2>
          
          <ul className="list-disc list-inside space-y-2 text-dental-navy/80">
            <li>{t('accessibility.feature1', 'האתר תומך בהגדלת הטקסט עד 200% מבלי לפגוע בתצוגה ובתפקוד')}</li>
            <li>{t('accessibility.feature2', 'האתר ניתן לניווט באמצעות המקלדת בלבד')}</li>
            <li>{t('accessibility.feature3', 'כל התמונות באתר כוללות תיאורי טקסט חלופיים')}</li>
            <li>{t('accessibility.feature4', 'האתר נתמך ע״י תוכנות הקראה')}</li>
            <li>{t('accessibility.feature5', 'האתר מאפשר התאמת ניגודיות צבעים לשיפור הקריאות')}</li>
            <li>{t('accessibility.feature6', 'תמיכה בתצוגה מותאמת למכשירים ניידים וטאבלטים')}</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-dental-navy mt-8 mb-4">
            {t('accessibility.standardsTitle', 'תקנים ותאימות')}
          </h2>
          
          <p className="text-dental-navy/80">
            {t('accessibility.standardsText', 'אתר זה תואם את דרישות תקנות הנגישות לשירות של מדינת ישראל בהתאם לת״י 5568 המבוסס על הנחיות WCAG 2.1 ברמה AA.')}
          </p>
          
          <h2 className="text-xl font-semibold text-dental-navy mt-8 mb-4">
            {t('accessibility.contactTitle', 'פניות בנושא נגישות')}
          </h2>
          
          <p className="text-dental-navy/80">
            {t('accessibility.contactText', 'אם נתקלתם בבעיית נגישות באתר או אם יש לכם שאלות או הצעות לשיפור הנגישות, אנא פנו אלינו:')}
          </p>
          
          <div className="bg-dental-beige/20 p-4 rounded-md mt-4">
            <p className="text-dental-navy font-medium">רכז הנגישות: ד״ר לנה זמבל</p>
            <p className="text-dental-navy">טלפון: 03-566-6915</p>
            <p className="text-dental-navy">דוא"ל: info@dental-clinic.co.il</p>
          </div>
          
          <p className="text-sm text-dental-navy/70 mt-8">
            {t('accessibility.lastUpdated', 'הצהרת נגישות זו עודכנה לאחרונה בתאריך')} 22.04.2025
          </p>
        </div>
      </Container>
    </Section>
  );
};

export default AccessibilityStatement;
