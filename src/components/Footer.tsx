
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import FooterBrand from './footer/FooterBrand';
import FooterContactInfo from './footer/FooterContactInfo';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-white border-t border-dental-beige/60 text-dental-navy pt-7 pb-3">
      <Container size="md" className="flex flex-col items-center gap-2">
        <FooterBrand />
        <FooterContactInfo />
        <div className="pt-2 text-xs text-dental-navy/60 font-medium text-center">
          © {new Date().getFullYear()} {t('contact.allRightsReserved')}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
