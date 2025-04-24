
import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FooterContactInfo = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500">
      <div className="flex items-center gap-2">
        <MapPin size={16} className="text-gray-400" />
        <span>{t('contact.clinicAddress')}</span>
      </div>
      <span className="hidden sm:block text-gray-300">|</span>
      <a
        href="tel:03-566-6915"
        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
        dir="ltr"
      >
        <Phone size={16} className="text-gray-400" />
        <span>03-566-6915</span>
      </a>
    </div>
  );
};

export default FooterContactInfo;
