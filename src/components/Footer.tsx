
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Grid } from '@/components/ui/grid';
import { MapPin, Phone, Clock, Facebook, Instagram, Mail } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { createLocalizedNavigationConfig } from '@/config/navigation';
import { cn } from '@/lib/utils';
import NavList from '@/components/ui/NavList';
import NavItem from '@/components/ui/NavItem';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import AccessibilityWidget from '@/components/AccessibilityWidget';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const navigation = createLocalizedNavigationConfig(language);

  return (
    <footer className="bg-dental-navy text-dental-beige relative" aria-label="Footer">
      <Section spacing="lg" background="navy" containerClass="px-4 md:px-6">
        <Container size="5xl">
          <Grid cols={1} mdCols={2} lgCols={4} gap={8} className="mb-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold mb-4" id="contact-info">{t('contact.contactInfo')}</h4>
              <div className="space-y-3">
                <a 
                  href="https://maps.app.goo.gl/qxrRjRQXFwKPuodw6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                  aria-labelledby="clinic-address"
                >
                  <MapPin className="h-4 w-4 shrink-0 group-hover:text-dental-orange" />
                  <span id="clinic-address">{t('contact.clinicAddress')}</span>
                </a>
                <a 
                  href="tel:03-566-6915"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                  aria-label={t('contact.callClinic', 'Call clinic')}
                >
                  <Phone className="h-4 w-4 shrink-0 group-hover:text-dental-orange" />
                  <span>03-566-6915</span>
                </a>
                <a 
                  href="mailto:info@drlena.co.il"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                  aria-label={t('contact.emailClinic', 'Email clinic')}
                >
                  <Mail className="h-4 w-4 shrink-0 group-hover:text-dental-orange" />
                  <span>info@drlena.co.il</span>
                </a>
                <div className="pt-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 shrink-0 text-dental-orange" />
                    <div>
                      <div className="font-semibold">{t('contact.openingHours')}</div>
                      <div>{t('contact.sundayToThursday')}</div>
                      <div>{t('contact.friday')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{t('navigation.sitemap')}</h4>
              <NavList vertical>
                {navigation.footer.info.map((link) => (
                  <NavItem 
                    key={link.key}
                    to={link.path}
                    as="a"
                    className="hover:text-white py-1.5 px-0"
                  >
                    {t(link.labelKey)}
                  </NavItem>
                ))}
              </NavList>
            </div>

            {/* Treatments */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{t('navigation.ourTreatments')}</h4>
              <NavList vertical>
                {navigation.footer.treatments.map((link) => (
                  <NavItem 
                    key={link.key}
                    to={link.path}
                    as="a"
                    className={cn(
                      "hover:text-white py-1.5 px-0",
                      link.path.includes('children-dentistry') && "text-dental-orange"
                    )}
                  >
                    {t(link.labelKey)}
                  </NavItem>
                ))}
              </NavList>
            </div>

            {/* Social & Contact */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{t('navigation.followUs', 'Follow Us')}</h4>
              <div className="flex gap-3">
                <a 
                  href="https://www.facebook.com/drlena.dental" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-dental-navy hover:bg-dental-beige/10 rounded-full transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-dental-beige hover:text-dental-orange transition-colors" />
                </a>
                <a 
                  href="https://www.instagram.com/dr.lena.dental" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-dental-navy hover:bg-dental-beige/10 rounded-full transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-dental-beige hover:text-dental-orange transition-colors" />
                </a>
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">{t('navigation.info')}</h4>
                <NavList vertical>
                  {navigation.footer.legal.map((link) => (
                    <NavItem 
                      key={link.key}
                      to={link.path}
                      as="a"
                      className="hover:text-white py-1.5 px-0"
                    >
                      {t(link.labelKey)}
                    </NavItem>
                  ))}
                </NavList>
              </div>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Bottom Footer */}
      <Section spacing="xs" background="navy" containerClass="px-4 md:px-6 border-t border-dental-beige/20">
        <Container size="5xl">
          <div className="flex flex-col md:flex-row items-center justify-between py-4">
            <p className="text-sm text-dental-beige/80">
              {t('info.copyright')}
            </p>
            <div className="mt-4 md:mt-0">
              <LanguageSwitcher />
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Floating Components */}
      <ScrollToTopButton />
      <AccessibilityWidget />
    </footer>
  );
};

export default Footer;
