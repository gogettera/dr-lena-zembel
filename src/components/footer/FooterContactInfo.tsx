
import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FooterContactInfo = () => {
  const { t } = useLanguage();

  return (
    <div>
      <h4 className="text-xl font-bold text-white mb-4">
        {t('contact.contactInfo', 'פרטי התקשרות')}
      </h4>
      <ul className="space-y-3 text-dental-beige">
        <li className="flex items-center gap-2">
          <MapPin className="h-5 w-5 shrink-0" />
          <span className="text-sm">{t('contact.clinicAddress')}</span>
        </li>
        <li>
          <a
            href="tel:03-566-6915"
            className="flex items-center gap-2 underline hover:text-dental-orange transition-colors"
          >
            <Phone className="h-5 w-5 shrink-0" />
            <span className="text-sm" dir="ltr">03-566-6915</span>
          </a>
        </li>
        <li className="flex items-start gap-2">
          <Clock className="h-5 w-5 shrink-0 mt-0.5" />
          <span className="text-sm">{t('contact.openingHours')} – {t('contact.sundayToThursday')}</span>
        </li>
      </ul>
    </div>
  );
};

export default FooterContactInfo;

