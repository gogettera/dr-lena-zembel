
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
    <footer className="w-full bg-dental-beige/10 border-t border-dental-beige text-dental-navy">
      <Container size="lg">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            {/* Column 1: Brand and Description */}
            <div className="space-y-6">
              <FooterBrand />
              <p className="text-sm text-dental-navy/70 max-w-xs">
                {t('clinic.description')}
              </p>
            </div>

            {/* Columns 2-4: Navigation */}
            <FooterNavigation />
          </div>
        </div>

        <Separator className="bg-dental-beige/30" />
        
        {/* Bottom section */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <FooterContactInfo />
          <div className="text-sm text-dental-navy/60 font-medium text-center">
            © {new Date().getFullYear()} {t('contact.allRightsReserved')}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
