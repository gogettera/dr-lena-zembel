
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { createLocalizedNavigationConfig } from '@/config/navigation';
import NavItem from '@/components/ui/NavItem';

const FooterNavigation = () => {
  const { t, language } = useLanguage();
  const navigation = createLocalizedNavigationConfig(language);

  return (
    <>
      {/* Info Links */}
      <div>
        <h5 className="text-lg font-semibold text-dental-navy mb-4">{t('info')}</h5>
        <ul className="space-y-2.5">
          {navigation.footer.info.map(link => (
            <li key={link.key}>
              <NavItem
                to={link.path}
                className="text-sm text-dental-navy/70 hover:text-dental-orange transition-colors"
              >
                {t(link.labelKey)}
              </NavItem>
            </li>
          ))}
        </ul>
      </div>

      {/* Treatments Links */}
      <div>
        <h5 className="text-lg font-semibold text-dental-navy mb-4">{t('navigation.ourTreatments')}</h5>
        <ul className="space-y-2.5">
          {navigation.footer.treatments.map(link => (
            <li key={link.key}>
              <NavItem
                to={link.path}
                className="text-sm text-dental-navy/70 hover:text-dental-orange transition-colors"
              >
                {t(link.labelKey)}
              </NavItem>
            </li>
          ))}
        </ul>
      </div>

      {/* Legal Links */}
      <div>
        <h5 className="text-lg font-semibold text-dental-navy mb-4">{t('legal.title')}</h5>
        <ul className="space-y-2.5">
          {navigation.footer.legal.map(link => (
            <li key={link.key}>
              <NavItem
                to={link.path}
                className="text-sm text-dental-navy/70 hover:text-dental-orange transition-colors"
              >
                {t(link.labelKey)}
              </NavItem>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FooterNavigation;
