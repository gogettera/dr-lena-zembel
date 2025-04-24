
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';

const Footer = () => {
  const { language } = useLanguage();
  
  return (
    <footer className="w-full py-4 bg-white border-t">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-dental-navy/70">
            © {new Date().getFullYear()} ד״ר לנה זמבל. כל הזכויות שמורות.
          </p>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Link 
              to={`/${language}/accessibility-statement`}
              className="text-sm text-dental-navy/70 hover:text-dental-orange transition-colors"
            >
              הצהרת נגישות
            </Link>
            <Link 
              to={`/${language}/terms-of-service`}
              className="text-sm text-dental-navy/70 hover:text-dental-orange transition-colors"
            >
              תנאי שימוש
            </Link>
            <Link 
              to={`/${language}/privacy-policy`}
              className="text-sm text-dental-navy/70 hover:text-dental-orange transition-colors"
            >
              מדיניות פרטיות
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
