
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import { Link } from 'react-router-dom';
import { Shield, Phone, MapPin } from 'lucide-react';
import { Logo } from '@/components/Logo';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="w-full bg-white border-t border-gray-100 py-6">
      <Container size="lg">
        <div className="flex flex-col space-y-6">
          {/* Logo and Name */}
          <div className="flex items-center gap-3">
            <Logo className="w-12 h-12" />
            <span className="text-lg font-semibold text-dental-navy">
              {t('clinic.name')}
            </span>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-400" />
              <span>{t('contact.clinicAddress')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-gray-400" />
              <span>{t('contact.phone')}</span>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-gray-400" />
              <span>© {new Date().getFullYear()} {t('contact.allRightsReserved')}</span>
            </div>
            <span className="text-gray-300">•</span>
            <Link 
              to={`/${language}/privacy-policy`}
              className="hover:text-gray-900 transition-colors"
            >
              {t('navigation.legal.privacyPolicy')}
            </Link>
            <span className="text-gray-300">•</span>
            <Link 
              to={`/${language}/terms-of-service`}
              className="hover:text-gray-900 transition-colors"
            >
              {t('navigation.legal.termsOfService')}
            </Link>
            <span className="text-gray-300">•</span>
            <Link 
              to={`/${language}/accessibility-statement`}
              className="hover:text-gray-900 transition-colors"
            >
              {t('navigation.accessibility.statement')}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

