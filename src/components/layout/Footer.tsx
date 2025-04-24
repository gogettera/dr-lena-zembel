
import React from 'react';
import { Container } from '@/components/ui/container';
import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
import Logo from '@/components/Logo';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDirectionalStyles } from '@/utils/direction';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const { t, language, isRTL } = useLanguage();
  const styles = useDirectionalStyles();

  const handleCallClick = () => {
    window.location.href = 'tel:03-566-6915';
  };

  const handleAddressClick = () => {
    window.open('https://maps.google.com/?q=דרך+בן+צבי+2+תל+אביב', '_blank');
  };

  return (
    <footer className="w-full bg-dental-navy text-white py-8 md:py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Clinic Info Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link to={`/${language}`} className="hover:opacity-90 transition-opacity">
              <Logo className="w-16 h-16 text-white" />
            </Link>
            <h2 className="text-xl font-bold">{t('clinicInfo.name')}</h2>
            <div className="text-sm text-gray-300">
              {t('contact.openingHours')}
              <br />
              {t('contact.sundayToThursday')}
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-lg font-semibold">{t('contact.contactInfo')}</h3>
            <Button
              variant="ghost"
              onClick={handleCallClick}
              className={`flex items-center gap-2 text-white hover:text-white/90 ${styles.flexDir}`}
            >
              <Phone size={20} />
              <span>{t('contact.phone')}</span>
            </Button>
            <Button
              variant="ghost"
              onClick={handleAddressClick}
              className={`flex items-center gap-2 text-white hover:text-white/90 ${styles.flexDir}`}
            >
              <MapPin size={20} />
              <span>{t('contact.clinicAddress')}</span>
            </Button>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-lg font-semibold">{t('navigation.info')}</h3>
            <nav className="flex flex-col space-y-2">
              <Link 
                to={`/${language}/accessibility-statement`}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {t('navigation.accessibility.statement')}
              </Link>
              <Link 
                to={`/${language}/privacy-policy`}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {t('navigation.legal.privacyPolicy')}
              </Link>
              <Link 
                to={`/${language}/terms-of-service`}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {t('navigation.legal.termsOfService')}
              </Link>
            </nav>
          </div>
        </div>

        <Separator className="my-6 bg-white/20" />

        {/* Copyright */}
        <div className="text-center text-sm text-gray-300">
          <p>© {new Date().getFullYear()} {t('contact.allRightsReserved')}</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
