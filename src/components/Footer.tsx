
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import FooterBrand from './footer/FooterBrand';
import FooterContactInfo from './footer/FooterContactInfo';
import FooterNavigation from './footer/FooterNavigation';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-white border-t border-dental-beige/60 text-dental-navy pt-12 pb-6">
      <Container size="lg" className="flex flex-col items-center gap-12">
        <FooterBrand />
        <FooterNavigation />
        <FooterContactInfo />
        <div className="pt-2 text-xs text-dental-navy/60 font-medium text-center">
          © {new Date().getFullYear()} {t('contact.allRightsReserved')}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
