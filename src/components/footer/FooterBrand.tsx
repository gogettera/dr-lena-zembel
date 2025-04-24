
import React from 'react';
import Logo from '@/components/Logo';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const FooterBrand: React.FC = () => {
  const { language, t } = useLanguage();
  
  return (
    <div className="flex flex-col gap-4">
      <Link to={`/${language}`}>
        <Logo className="h-12" />
      </Link>
      <p className="text-sm text-gray-500 max-w-xs">
        {t('clinic.description')}
      </p>
    </div>
  );
};

export default FooterBrand;
