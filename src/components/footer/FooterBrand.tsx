
import React from 'react';
import Logo from '@/components/Logo';
import FooterSocial from './FooterSocial';
import { useLanguage } from '@/contexts/LanguageContext';

const FooterBrand: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center md:items-start gap-5">
      <Logo />
      <div className="mt-1 mb-2 text-center md:text-start">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{t('dentistryWithLove', 'רפואת שיניים מקצועית')}</h3>
        <p className="text-sm text-dental-beige/80 max-w-xs">{t('localDental', 'מרפאת שיניים מקצועית בצפון יפו, המעניקה טיפול איכותי ומקיף למטופלינו.')}</p>
      </div>
      <FooterSocial />
    </div>
  );
};

export default FooterBrand;
