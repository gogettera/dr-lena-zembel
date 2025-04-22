
import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const FooterSocial = () => {
  return (
    <div className="flex gap-4 mt-1">
      <a 
        href="https://www.facebook.com/drlena.dental" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-dental-navy hover:text-dental-orange transition-colors"
        aria-label="Facebook"
      >
        <Facebook size={20} />
      </a>
      <a 
        href="https://www.instagram.com/dr.lena.dental" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-dental-navy hover:text-dental-orange transition-colors"
        aria-label="Instagram"
      >
        <Instagram size={20} />
      </a>
    </div>
  );
};

export default FooterSocial;
