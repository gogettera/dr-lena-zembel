
import React from 'react';
import Logo from '@/components/Logo';
import FooterSocial from './FooterSocial';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const FooterBrand: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col items-start gap-4">
      <Link to={`/${language}`} className="block">
        <Logo className="h-12" />
      </Link>
      <FooterSocial />
    </div>
  );
};

export default FooterBrand;
