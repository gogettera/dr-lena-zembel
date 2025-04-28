
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import FooterSocial from '@/components/footer/FooterSocial';

const Footer = () => {
  const { t, language } = useLanguage();
  
  return (
    <footer className="w-full py-4 bg-white border-t">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm text-dental-navy/70">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
            <FooterSocial />
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Link 
              to={`/${language}/accessibility-statement`}
              className="text-sm text-dental-navy/70 hover:text-dental-orange transition-colors"
            >
              {t('footer.accessibility')}
            </Link>
            <Link 
              to={`/${language}/terms-of-service`}
              className="text-sm text-dental-navy/70 hover:text-dental-orange transition-colors"
            >
              {t('footer.termsOfService')}
            </Link>
            <Link 
              to={`/${language}/privacy-policy`}
              className="text-sm text-dental-navy/70 hover:text-dental-orange transition-colors"
            >
              {t('footer.privacyPolicy')}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
