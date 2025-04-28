
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { PhoneOutgoing, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const { t, currentLanguage } = useLanguage();

  return (
    <footer className="bg-dental-navy text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="mb-6 md:mb-0">
            <Link to={`/${currentLanguage}`}>
              <img 
                src="/lovable-uploads/f0d36601-8f51-4bd6-9ce4-071cd62aa140.png" 
                alt={t('common.logoAlt')} 
                className="h-10 w-auto mb-4 brightness-0 invert"
              />
            </Link>
            <p className="text-white/80 max-w-xs">
              {t('common.clinicDescription')}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">{t('common.contactInfo')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <PhoneOutgoing className="w-5 h-5 text-dental-orange" />
                <a href="tel:03-566-6915" className="text-white/80 hover:text-white">03-566-6915</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-dental-orange" />
                <a href="mailto:info@dr-zembel.com" className="text-white/80 hover:text-white">info@dr-zembel.com</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-dental-orange" />
                <span className="text-white/80">Tel Aviv, Israel</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">{t('common.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to={`/${currentLanguage}/about`} className="text-white/80 hover:text-white">
                  {t('common.about')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLanguage}/treatments`} className="text-white/80 hover:text-white">
                  {t('common.treatments')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLanguage}/contact`} className="text-white/80 hover:text-white">
                  {t('common.contact')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLanguage}/privacy-policy`} className="text-white/80 hover:text-white">
                  {t('common.privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-5 border-t border-white/10 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} {t('common.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
