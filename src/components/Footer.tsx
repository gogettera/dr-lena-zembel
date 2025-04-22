
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import FooterBrand from './footer/FooterBrand';
import FooterContactInfo from './footer/FooterContactInfo';
import FooterNavigation from './footer/FooterNavigation';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 bg-dental-navy text-dental-beige border-t border-dental-beige/10 pt-4">
      <Container size="5xl" className="pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Left: Logo, blurb, socials */}
          <div className="rounded-2xl bg-dental-beige/10 p-6 flex flex-col justify-between shadow-soft min-h-[260px]">
            <FooterBrand />
          </div>

          {/* Middle: Contact info */}
          <div className="rounded-2xl bg-dental-beige/10 p-6 flex flex-col shadow-soft min-h-[260px]">
            <FooterContactInfo />
          </div>

          {/* Right: Navigation */}
          <div className="rounded-2xl bg-dental-beige/10 p-6 flex flex-col shadow-soft min-h-[260px]">
            <FooterNavigation />
          </div>
        </div>
      </Container>
      <div className="bg-dental-navy border-t border-dental-beige/20 py-4 mt-8">
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
