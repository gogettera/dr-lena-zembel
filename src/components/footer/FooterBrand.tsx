
import React from 'react';
import Logo from '@/components/Logo';
import FooterSocial from './FooterSocial';
import { useLanguage } from '@/contexts/LanguageContext';

const FooterBrand: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Logo */}
      <Logo />
      {/* Tagline */}
      <div>
        <h3 className="text-base font-bold text-dental-navy mb-1">{t('dentistryWithLove', 'רפואת שיניים מקצועית')}</h3>
      </div>
      {/* Minimal Social */}
      <FooterSocial />
    </div>
  );
};

export default FooterBrand;
