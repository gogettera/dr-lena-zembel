
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import { TranslatedText } from '@/components/ui/translated-text';

const Footer = () => {
  const { language, isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-4 bg-white border-t" dir={isRTL ? 'rtl' : 'ltr'}>
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-dental-navy/70">
            © {currentYear} <TranslatedText textKey="common.clinicName" defaultText="ד״ר לנה זמבל" />. <TranslatedText textKey="common.allRightsReserved" defaultText="כל הזכויות שמורות" />.
          </p>
          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <Link 
              to={`/${language}/accessibility-statement`}
              className="text-sm text-dental-navy/70 hover:text-dental-orange transition-colors"
            >
              <TranslatedText textKey="navigation.accessibility.statement" defaultText="הצהרת נגישות" />
            </Link>
            <Link 
              to={`/${language}/terms-of-service`}
              className="text-sm text-dental-navy/70 hover:text-dental-orange transition-colors"
            >
              <TranslatedText textKey="navigation.legal.terms" defaultText="תנאי שימוש" />
            </Link>
            <Link 
              to={`/${language}/privacy-policy`}
              className="text-sm text-dental-navy/70 hover:text-dental-orange transition-colors"
            >
              <TranslatedText textKey="navigation.legal.privacy" defaultText="מדיניות פרטיות" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
