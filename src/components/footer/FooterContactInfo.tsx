
import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FooterContactInfo = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h4 className="text-xl font-semibold text-white mb-6">
        {t('contact.contactInfo')}
      </h4>
      <div className="space-y-6">
        <a 
          href="https://maps.app.goo.gl/qxrRjRQXFwKPuodw6" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-start gap-3 text-dental-beige hover:text-white transition-colors duration-300"
        >
          <MapPin className="h-5 w-5 shrink-0 mt-1" />
          <span className="text-sm leading-relaxed">{t('contact.clinicAddress')}</span>
        </a>
        
        <a 
          href="tel:03-566-6915"
          className="flex items-center gap-3 text-dental-beige hover:text-white transition-colors duration-300"
        >
          <Phone className="h-5 w-5 shrink-0" />
          <span className="text-sm">{t('contact.phone')}</span>
        </a>
        
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 shrink-0 mt-1" />
          <div className="space-y-1">
            <p className="text-sm text-white">{t('contact.openingHours')}</p>
            <p className="text-sm text-dental-beige">{t('contact.sundayToThursday')}</p>
            <p className="text-sm text-dental-beige">{t('contact.friday')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContactInfo;
