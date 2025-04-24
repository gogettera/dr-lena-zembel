
import React from 'react';
import { Container } from '@/components/ui/container';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock } from 'lucide-react';
import Logo from '@/components/Logo';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDirectionalStyles } from '@/utils/direction';
import NavList from '@/components/ui/NavList';
import NavItem from '@/components/ui/NavItem';
import { Grid } from '@/components/ui/grid';
import FooterSocial from '@/components/footer/FooterSocial';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const { t, language } = useLanguage();
  const styles = useDirectionalStyles();

  const handleCallClick = () => {
    window.location.href = 'tel:03-566-6915';
  };

  const handleAddressClick = () => {
    window.open('https://maps.google.com/?q=דרך+בן+צבי+2+תל+אביב', '_blank');
  };

  return (
    <footer className="w-full bg-white py-12 border-t">
      <Container>
        {/* Main Footer Content */}
        <Grid cols={1} mdCols={3} lgCols={5} className="gap-8 lg:gap-12">
          {/* Column 1: About */}
          <div className="flex flex-col space-y-4">
            <Link to={`/${language}`} className="mb-4">
              <Logo className="w-16 h-16 text-dental-navy" />
            </Link>
            <p className="text-sm text-dental-navy/70 max-w-xs">
              {t('clinicInfo.description')}
            </p>
          </div>

          {/* Column 2: Main Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-dental-navy">{t('navigation.mainLinks')}</h3>
            <NavList vertical>
              <NavItem to={`/${language}`}>{t('navigation.home')}</NavItem>
              <NavItem to={`/${language}#about`}>{t('navigation.about')}</NavItem>
              <NavItem to={`/${language}#treatments`}>{t('navigation.treatments')}</NavItem>
              <NavItem to={`/${language}#contact`}>{t('navigation.contact')}</NavItem>
            </NavList>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-dental-navy">{t('contact.contactInfo')}</h3>
            <div className="space-y-3">
              <button
                onClick={handleCallClick}
                className={`flex items-center text-sm text-dental-navy/70 hover:text-dental-orange transition-colors ${styles.flexDir}`}
              >
                <Phone size={16} className="mr-2" />
                <span>{t('contact.phone')}</span>
              </button>
              <button
                onClick={handleAddressClick}
                className={`flex items-center text-sm text-dental-navy/70 hover:text-dental-orange transition-colors ${styles.flexDir}`}
              >
                <MapPin size={16} className="mr-2" />
                <span>{t('contact.clinicAddress')}</span>
              </button>
              <div className={`flex items-center text-sm text-dental-navy/70 ${styles.flexDir}`}>
                <Clock size={16} className="mr-2" />
                <span>{t('contact.openingHours')}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Insurance */}
          <div className="space-y-4">
            <h3 className="font-semibold text-dental-navy">{t('insurance.topInsurances')}</h3>
            <NavList vertical>
              <NavItem as="div">מכבי</NavItem>
              <NavItem as="div">כללית</NavItem>
              <NavItem as="div">מאוחדת</NavItem>
              <NavItem as="div">לאומית</NavItem>
            </NavList>
          </div>

          {/* Column 5: Follow Us */}
          <div className="space-y-4">
            <h3 className="font-semibold text-dental-navy">{t('navigation.followUs')}</h3>
            <FooterSocial />
          </div>
        </Grid>

        {/* Bottom Section */}
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-dental-navy/70">
            © {new Date().getFullYear()} {t('contact.allRightsReserved')}
          </p>
          <div className="flex space-x-4 rtl:space-x-reverse">
            <Link 
              to={`/${language}/privacy-policy`}
              className="text-sm text-dental-navy/70 hover:text-dental-orange transition-colors"
            >
              {t('navigation.legal.privacyPolicy')}
            </Link>
            <Link 
              to={`/${language}/terms-of-service`}
              className="text-sm text-dental-navy/70 hover:text-dental-orange transition-colors"
            >
              {t('navigation.legal.termsOfService')}
            </Link>
            <Link 
              to={`/${language}/accessibility-statement`}
              className="text-sm text-dental-navy/70 hover:text-dental-orange transition-colors"
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
