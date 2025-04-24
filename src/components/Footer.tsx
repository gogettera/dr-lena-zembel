
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import FooterBrand from './footer/FooterBrand';
import FooterContactInfo from './footer/FooterContactInfo';
import FooterNavigation from './footer/FooterNavigation';
import { Separator } from './ui/separator';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-white border-t border-gray-100">
      <Container size="lg">
        <div className="py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FooterBrand />
            <FooterNavigation />
          </div>
        </div>
        
        <Separator className="bg-gray-100" />
        
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <FooterContactInfo />
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} {t('contact.allRightsReserved')}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
