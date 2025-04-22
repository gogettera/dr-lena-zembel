
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import FooterContactInfo from './footer/FooterContactInfo';
import FooterNavigation from './footer/FooterNavigation';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-dental-navy text-dental-beige border-t border-dental-beige/10 pt-12 pb-6" aria-label={t('navigation.footer', 'Footer')}>
      <Container size="5xl" className="flex flex-col md:flex-row md:justify-between md:items-start gap-12">
        <div className="mb-8 md:mb-0 flex-shrink-0">
          <FooterContactInfo />
        </div>
        <div className="w-full md:w-auto">
          <FooterNavigation />
        </div>
      </Container>
      <div className="mt-10 pt-6 border-t border-dental-beige/20 text-center">
        <p className="text-xs text-dental-beige/70">
          © {new Date().getFullYear()} {t('contact.allRightsReserved')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
