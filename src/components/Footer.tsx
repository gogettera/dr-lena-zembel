
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Grid } from '@/components/ui/grid';
import { cn } from '@/lib/utils';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import AccessibilityWidget from '@/components/AccessibilityWidget';
import FooterContactInfo from './footer/FooterContactInfo';
import FooterSocial from './footer/FooterSocial';
import FooterNavigation from './footer/FooterNavigation';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-dental-navy text-dental-beige relative" aria-label="Footer">
      <Section spacing="lg" background="navy" containerClass="px-4 md:px-6">
        <Container size="5xl">
          <FooterSocial />

          <Grid cols={1} mdCols={2} lgCols={4} gap={6} className="mb-8">
            <FooterContactInfo />
            <FooterNavigation />

            {/* Legal Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">
                {t('navigation.info')}
              </h4>
              <nav className="flex flex-col space-y-2">
                <Link 
                  to={`/${language}/privacy`} 
                  className="text-dental-beige hover:text-white transition-colors duration-300"
                >
                  {t('privacy')}
                </Link>
                <Link 
                  to={`/${language}/terms`} 
                  className="text-dental-beige hover:text-white transition-colors duration-300"
                >
                  {t('terms')}
                </Link>
                <Link 
                  to={`/${language}/accessibility-statement`} 
                  className="text-dental-beige hover:text-white transition-colors duration-300"
                >
                  {t('accessibility.statement')}
                </Link>
              </nav>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Bottom Footer */}
      <Section spacing="xs" background="navy" containerClass="px-4 md:px-6 border-t border-dental-beige/20">
        <Container size="5xl">
          <div className="flex flex-col md:flex-row items-center justify-between py-4">
            <p className="text-sm text-dental-beige/80">
              {t('contact.allRightsReserved')}
            </p>
            <div className="mt-4 md:mt-0">
              <LanguageSwitcher />
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Floating Elements */}
      <ScrollToTopButton 
        position="bottom-right" 
        className="z-50"
        buttonClassName="bg-dental-orange hover:bg-dental-orange/90"
      />
      <AccessibilityWidget />
    </footer>
  );
};

export default Footer;
