
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Grid } from '@/components/ui/grid';
import { MapPin, Phone, Clock } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { createLocalizedNavigationConfig } from '@/config/navigation';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const navigation = createLocalizedNavigationConfig(language);

  return (
    <footer className="bg-dental-navy text-dental-beige" aria-label="Footer">
      <Section spacing="lg" background="navy" containerClass="px-4 md:px-6">
        <Container size="5xl">
          <Grid cols={1} mdCols={2} lgCols={4} gap={8} className="mb-8">
            {/* Contact Info */}
            <div>
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
                  aria-label="Call clinic"
                >
                  <Phone className="h-4 w-4 shrink-0 group-hover:text-dental-orange" />
                  <span>03-566-6915</span>
                </a>
                <div className="pt-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 shrink-0" />
                    <div>
                      <div className="font-semibold">{t('contact.openingHours')}</div>
                      <div>{t('contact.sundayToThursday')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{t('navigation.sitemap')}</h4>
              <nav aria-label="Footer navigation">
                <ul className="space-y-2">
                  {navigation.footer.info.map((link) => (
                    <li key={link.key}>
                      <Link 
                        to={link.path} 
                        className="hover:text-white transition-colors"
                      >
                        {t(link.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Treatments */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{t('navigation.ourTreatments')}</h4>
              <nav aria-label="Footer treatments">
                <ul className="space-y-2">
                  {navigation.footer.treatments.map((link) => (
                    <li key={link.key}>
                      <Link 
                        to={link.path}
                        className={cn(
                          "hover:text-white transition-colors",
                          link.path.includes('children-dentistry') && "text-dental-orange"
                        )}
                      >
                        {t(link.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Legal Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{t('navigation.info')}</h4>
              <nav aria-label="Footer legal information">
                <ul className="space-y-2">
                  {navigation.footer.legal.map((link) => (
                    <li key={link.key}>
                      <Link 
                        to={link.path}
                        className="hover:text-white transition-colors"
                      >
                        {t(link.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
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
              {t('info.copyright')}
            </p>
            <div className="mt-4 md:mt-0">
              <LanguageSwitcher />
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  );
};

export default Footer;
