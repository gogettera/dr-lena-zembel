import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Grid } from '@/components/ui/grid';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { safelyStringifyIfObject } from '@/utils/navigation';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-dental-navy text-dental-beige">
      <Section spacing="lg" background="navy" containerClass="px-4 md:px-6">
        <Container size="5xl">
          <Grid cols={1} mdCols={2} lgCols={4} gap={8}>
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('contact')}</h4>
              <div className="flex items-center mb-2">
                <MapPin className="mr-2 h-4 w-4" />
                <a href="https://maps.app.goo.gl/SqdeJxuJjRzD984t6" target="_blank" rel="noopener noreferrer">
                  צפון יפו, רחוב יהודה מרגוזה 24
                </a>
              </div>
              <div className="flex items-center mb-2">
                <Phone className="mr-2 h-4 w-4" />
                <a href="tel:03-566-6915">03-566-6915</a>
              </div>
              <div className="flex items-center mb-2">
                <Mail className="mr-2 h-4 w-4" />
                <a href="mailto:info@dental-clinic.co.il">info@dental-clinic.co.il</a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('sitemap')}</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    {t('home')}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    {t('about')}
                  </Link>
                </li>
                <li>
                  <Link to="/treatments" className="hover:text-white transition-colors">
                    {t('treatments')}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    {t('contact')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Our Treatments */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('ourTreatments')}</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/treatments/aesthetic-treatments" className="hover:text-white transition-colors">
                    {safelyStringifyIfObject(t('aestheticTreatments.title'))}
                  </Link>
                </li>
                <li>
                  <Link to="/treatments/orthodontics" className="hover:text-white transition-colors">
                    {safelyStringifyIfObject(t('orthodontics.title'))}
                  </Link>
                </li>
                <li>
                  <Link to="/treatments/root-canal" className="hover:text-white transition-colors">
                    {safelyStringifyIfObject(t('rootCanal.title'))}
                  </Link>
                </li>
                <li>
                  <Link to="/treatments/children-dentistry" className="hover:text-white transition-colors">
                    {safelyStringifyIfObject(t('childrenDentistry.title'))}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h4 className="text-lg font-semibold mb-4">הרשמה לניוזלטר</h4>
              <p className="text-sm mb-4">הירשמו לניוזלטר שלנו וקבלו את העדכונים האחרונים.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="האימייל שלך"
                  className="bg-white text-dental-navy rounded-l-md py-2 px-4 focus:outline-none"
                />
                <Button variant="orange" className="rounded-l-none">
                  הרשמה
                </Button>
              </div>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Bottom Footer */}
      <Section spacing="xs" background="navy" containerClass="px-4 md:px-6">
        <Container size="5xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Dental Love. {t('allRightsReserved')}
            </p>
            <div className="mt-2">
              <Link 
                to="/accessibility-statement" 
                className="text-sm text-dental-beige hover:text-white transition-colors"
              >
                {t('accessibility.statement', 'הצהרת נגישות')}
              </Link>
            </div>
            <LanguageSwitcher />
          </div>
        </Container>
      </Section>
    </footer>
  );
};

export default Footer;
