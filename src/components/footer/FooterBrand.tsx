
import React from 'react';
import Logo from '@/components/Logo';
import FooterSocial from './FooterSocial';

const FooterBrand: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Logo />
      <FooterSocial />
    </div>
  );
};

export default FooterBrand;
