
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Grid } from '@/components/ui/grid';
import { MapPin, Phone } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { createLocalizedNavigationConfig } from '@/config/navigation';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const navigation = createLocalizedNavigationConfig(language);

  return (
    <footer className="bg-dental-navy text-dental-beige">
      <Section spacing="lg" background="navy" containerClass="px-4 md:px-6">
        <Container size="5xl">
          <Grid cols={1} mdCols={2} lgCols={4} gap={8} className="mb-8">
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('contact')}</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <a 
                    href="https://maps.app.goo.gl/qxrRjRQXFwKPuodw6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {t('clinicInfo.address')}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <a 
                    href={`tel:${t('clinicInfo.phone')}`}
                    className="hover:text-white transition-colors"
                  >
                    {t('clinicInfo.phone')}
                  </a>
                </div>
                <div className="pt-2">
                  <div className="font-semibold">{t('openingHours')}</div>
                  <div>{t('clinicInfo.hours.weekdays')}</div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('sitemap')}</h4>
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
            </div>

            {/* Our Treatments */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('ourTreatments')}</h4>
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
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('info')}</h4>
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
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Bottom Footer */}
      <Section spacing="xs" background="navy" containerClass="px-4 md:px-6 border-t border-dental-beige/20">
        <Container size="5xl">
          <div className="flex flex-col md:flex-row items-center justify-between py-4">
            <p className="text-sm text-dental-beige/80">
              {t('copyright')}
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
