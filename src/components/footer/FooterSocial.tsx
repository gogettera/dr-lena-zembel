
import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const FooterSocial = () => {
  return (
    <div className="flex justify-center gap-6 mb-12">
      <a 
        href="https://www.facebook.com/drlena.dental" 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-3 rounded-full text-dental-beige hover:text-white hover:bg-dental-beige/10 transition-all duration-300"
        aria-label="Facebook"
      >
        <Facebook className="h-6 w-6" />
      </a>
      <a 
        href="https://www.instagram.com/dr.lena.dental" 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-3 rounded-full text-dental-beige hover:text-white hover:bg-dental-beige/10 transition-all duration-300"
        aria-label="Instagram"
      >
        <Instagram className="h-6 w-6" />
      </a>
    </div>
  );
};

export default FooterSocial;
