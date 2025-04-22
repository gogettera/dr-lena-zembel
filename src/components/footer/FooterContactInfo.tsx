
import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FooterContactInfo = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-2 text-sm text-dental-navy/90">
      {/* Address */}
      <div className="flex items-center gap-2">
        <MapPin size={16} className="text-dental-orange" />
        <span>{t('contact.clinicAddress')}</span>
      </div>
      {/* Phone */}
      <a
        href="tel:03-566-6915"
        className="flex items-center gap-2 underline hover:text-dental-orange transition-colors"
        dir="ltr"
      >
        <Phone size={16} className="text-dental-orange" />
        <span>03-566-6915</span>
      </a>
    </div>
  );
};

export default FooterContactInfo;
