
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import FooterContactInfo from './footer/FooterContactInfo';
import FooterNavigation from './footer/FooterNavigation';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-dental-navy text-dental-beige border-t border-dental-beige/10">
      <Container size="5xl" className="py-12 flex flex-col md:flex-row md:items-start md:justify-between gap-12">
        <FooterContactInfo />
        <FooterNavigation />
      </Container>
      <div className="bg-dental-navy border-t border-dental-beige/20 py-4">
        <Container size="5xl" className="text-center">
          <p className="text-sm text-dental-beige/70">
            © {new Date().getFullYear()} {t('contact.allRightsReserved')}
          </p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;

