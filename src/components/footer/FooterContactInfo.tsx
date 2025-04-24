
import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FooterContactInfo = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-dental-navy/80">
      <div className="flex items-center gap-2">
        <MapPin size={16} className="text-dental-orange shrink-0" />
        <span>{t('contact.clinicAddress')}</span>
      </div>
      <div className="hidden sm:block text-dental-navy/40">|</div>
      <a
        href="tel:03-566-6915"
        className="flex items-center gap-2 hover:text-dental-orange transition-colors"
        dir="ltr"
      >
        <Phone size={16} className="text-dental-orange shrink-0" />
        <span>03-566-6915</span>
      </a>
    </div>
  );
};

export default FooterContactInfo;
