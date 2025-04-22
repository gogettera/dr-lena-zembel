
import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const FooterSocial = () => {
  return (
    <div className="flex items-center gap-4">
      <a 
        href="https://www.facebook.com/drlena.dental" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-dental-beige hover:text-white transition-colors duration-300"
        aria-label="Facebook"
      >
        <Facebook className="h-5 w-5" />
      </a>
      <a 
        href="https://www.instagram.com/dr.lena.dental" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-dental-beige hover:text-white transition-colors duration-300"
        aria-label="Instagram"
      >
        <Instagram className="h-5 w-5" />
      </a>
    </div>
  );
};

export default FooterSocial;
