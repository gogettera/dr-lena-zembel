
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import { Link } from 'react-router-dom';
import { Shield, Phone, MapPin } from 'lucide-react';
import Logo from '@/components/Logo';
import { useDirectionalStyles } from '@/utils/direction';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const styles = useDirectionalStyles();

  return (
    <footer className="w-full bg-dental-navy text-white border-t border-gray-800">
      <Container size="lg">
        <div className={`flex flex-col space-y-6 py-6 ${styles.textAlign}`}>
          {/* Logo and Name */}
          <div className={`flex items-center gap-3 ${styles.flexDir}`}>
            <Logo className="w-12 h-12 text-white" />
            <span className="text-lg font-semibold text-white">
              {t('clinic.name')}
            </span>
          </div>

          {/* Contact Info */}
          <div className={`flex flex-col md:flex-row gap-4 text-sm ${styles.flexDir}`}>
            <div className={`flex items-center gap-2 text-white ${styles.flexDir}`}>
              <MapPin size={16} className="text-white/70" />
              <span>{t('contact.clinicAddress')}</span>
            </div>
            <div className={`flex items-center gap-2 text-white ${styles.flexDir}`}>
              <Phone size={16} className="text-white/70" />
              <span>{t('contact.phone')}</span>
            </div>
          </div>

          {/* Legal Links */}
          <div className={`flex flex-wrap items-center gap-4 text-sm text-white ${styles.flexDir}`}>
            <div className={`flex items-center gap-2 ${styles.flexDir}`}>
              <Shield size={16} className="text-white/70" />
              <span>© {new Date().getFullYear()} {t('contact.allRightsReserved')}</span>
            </div>
            <span className="text-white/50">•</span>
            <Link 
              to={`/${language}/privacy-policy`}
              className="hover:text-white/80 transition-colors"
            >
              {t('navigation.legal.privacyPolicy')}
            </Link>
            <span className="text-white/50">•</span>
            <Link 
              to={`/${language}/terms-of-service`}
              className="hover:text-white/80 transition-colors"
            >
              {t('navigation.legal.termsOfService')}
            </Link>
            <span className="text-white/50">•</span>
            <Link 
              to={`/${language}/accessibility-statement`}
              className="hover:text-white/80 transition-colors"
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
