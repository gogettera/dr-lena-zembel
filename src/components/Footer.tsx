
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import { Grid } from '@/components/ui/grid';
import { cn } from '@/lib/utils';
import FooterContactInfo from './footer/FooterContactInfo';
import FooterNavigation from './footer/FooterNavigation';
import FooterSocial from './footer/FooterSocial';
import ScrollToTopButton from './ScrollToTopButton';
import AccessibilityWidget from './AccessibilityWidget';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-dental-navy pt-16 pb-8 relative" aria-label="Footer">
      <Container size="5xl">
        <Grid cols={1} mdCols={2} lgCols={4} gap={8} className="mb-16">
          <div className="order-1 md:col-span-2 lg:col-span-1">
            <FooterContactInfo />
          </div>
          <FooterNavigation />
        </Grid>
        
        <div className="border-t border-dental-beige/20 pt-8">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-dental-beige/70">
              {t('contact.allRightsReserved')}
            </p>
            <FooterSocial />
          </div>
        </div>
      </Container>

      <ScrollToTopButton />
      <AccessibilityWidget />
    </footer>
  );
};

export default Footer;
