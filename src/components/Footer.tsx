
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import { Link } from 'react-router-dom';
import { Shield, Phone, MapPin } from 'lucide-react';
import Logo from '@/components/Logo';
import { useDirectionalStyles } from '@/utils/direction';
import { Button } from './ui/button';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const styles = useDirectionalStyles();

  const handleCallClick = () => {
    window.location.href = 'tel:03-566-6915';
  };

  const handleAddressClick = () => {
    window.open('https://maps.google.com/?q=דרך+בן+צבי+2+תל+אביב', '_blank');
  };

  return (
    <footer className="w-full bg-dental-navy text-white border-t border-gray-800">
      <Container size="lg">
        <div className="flex flex-col items-center py-10 space-y-8">
          {/* Logo and Name - Clickable */}
          <Link 
            to={`/${language}`}
            className={`flex items-center gap-4 hover:opacity-90 transition-opacity ${styles.flexDir}`}
          >
            <Logo className="w-16 h-16 text-white" />
            <span className="text-xl font-semibold text-white">
              {t('clinic.name')}
            </span>
          </Link>

          {/* Contact Info - Clickable */}
          <div className={`flex flex-col md:flex-row items-center gap-6 text-base ${styles.flexDir}`}>
            <Button 
              variant="ghost" 
              onClick={handleAddressClick}
              className={`flex items-center gap-3 text-white hover:text-white/90 ${styles.flexDir}`}
            >
              <MapPin size={20} className="text-white/80" />
              <span>{t('contact.clinicAddress')}</span>
            </Button>

            <Button 
              variant="ghost" 
              onClick={handleCallClick}
              className={`flex items-center gap-3 text-white hover:text-white/90 ${styles.flexDir}`}
            >
              <Phone size={20} className="text-white/80" />
              <span>{t('contact.phone')}</span>
            </Button>
          </div>

          {/* Legal Links */}
          <div className={`flex flex-wrap items-center justify-center gap-4 text-sm ${styles.flexDir}`}>
            <div className={`flex items-center gap-2 ${styles.flexDir}`}>
              <Shield size={16} className="text-white/70" />
              <span>© {new Date().getFullYear()} {t('contact.allRightsReserved')}</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <span className="text-white/30">•</span>
              <Link 
                to={`/${language}/privacy-policy`}
                className="hover:text-white/80 transition-colors hover:underline"
              >
                {t('navigation.legal.privacyPolicy')}
              </Link>
              <span className="text-white/30">•</span>
              <Link 
                to={`/${language}/terms-of-service`}
                className="hover:text-white/80 transition-colors hover:underline"
              >
                {t('navigation.legal.termsOfService')}
              </Link>
              <span className="text-white/30">•</span>
              <Link 
                to={`/${language}/accessibility-statement`}
                className="hover:text-white/80 transition-colors hover:underline"
              >
                {t('navigation.accessibility.statement')}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
