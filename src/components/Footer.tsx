
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import { Grid } from '@/components/ui/grid';
import FooterContactInfo from './footer/FooterContactInfo';
import FooterNavigation from './footer/FooterNavigation';
import ScrollToTopButton from './ScrollToTopButton';
import AccessibilityWidget from './AccessibilityWidget';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer 
      className="bg-dental-navy pt-16 pb-8 relative" 
      aria-label={t('navigation.footer')}
    >
      <Container size="5xl">
        <Grid cols={1} mdCols={3} gap={8} className="mb-16">
          <div className="order-1 md:order-1">
            <FooterContactInfo />
          </div>
          <div className="order-2 md:col-span-2">
            <FooterNavigation />
          </div>
        </Grid>
        
        <div className="border-t border-dental-beige/20 pt-8">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 text-dental-beige/70">
            <p className="text-sm">
              © {new Date().getFullYear()} {t('contact.allRightsReserved')}
            </p>
          </div>
        </div>
      </Container>

      <ScrollToTopButton />
      <AccessibilityWidget />
    </footer>
  );
};

export default Footer;
