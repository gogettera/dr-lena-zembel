
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import FooterBrand from './footer/FooterBrand';
import FooterContactInfo from './footer/FooterContactInfo';
import FooterNavigation from './footer/FooterNavigation';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 overflow-hidden pt-8">
      {/* Gradient/blurred decorative background */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[110%] aspect-[1.6/1] max-h-[550px] blur-2xl bg-gradient-to-tl from-dental-beige/90 via-white/50 to-dental-pink/60 rounded-b-[80px] md:rounded-b-[140px] pointer-events-none -z-10"
        style={{ filter: 'blur(60px)', opacity: 0.90, zIndex: 1 }}
      />
      <Container size="5xl" className="relative pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-8">
          {/* Brand/logo card */}
          <div className="glass rounded-[2rem] bg-white/80 border border-white/40 shadow-soft min-h-[255px] flex flex-col justify-between px-8 py-10 text-center md:text-start items-center md:items-start backdrop-blur-2xl">
            <FooterBrand />
          </div>
          {/* Contact card */}
          <div className="glass rounded-[2rem] bg-dental-beige/80 border border-dental-orange/25 shadow-soft min-h-[255px] flex flex-col justify-between px-8 py-10">
            <FooterContactInfo />
          </div>
          {/* Navigation card */}
          <div className="glass rounded-[2rem] bg-dental-beige/70 border border-dental-orange/10 shadow-soft min-h-[255px] flex flex-col justify-between px-8 py-10">
            <FooterNavigation />
          </div>
        </div>
      </Container>
      <div className="bg-transparent border-t border-dental-beige/30 py-3 mt-8">
        <Container size="5xl" className="text-center">
          <p className="text-sm text-dental-navy/70 font-medium">
            © {new Date().getFullYear()} {t('contact.allRightsReserved')}
          </p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;

