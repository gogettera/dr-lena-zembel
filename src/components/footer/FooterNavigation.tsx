
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { createLocalizedNavigationConfig } from '@/config/navigation';
import NavItem from '@/components/ui/NavItem';
import { cn } from '@/lib/utils';

const FooterNavigation = () => {
  const { t, language } = useLanguage();
  const navigation = createLocalizedNavigationConfig(language);

  return (
    <nav className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto" aria-label={t('navigation.sitemap')}>
      <div>
        <h5 className="text-lg font-semibold text-dental-navy mb-3">{t('info')}</h5>
        <ul className="space-y-2">
          {navigation.footer.info.map(link => (
            <li key={link.key}>
              <NavItem
                to={link.path}
                className="text-sm text-dental-navy/80 hover:text-dental-orange transition-colors"
              >
                {t(link.labelKey)}
              </NavItem>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h5 className="text-lg font-semibold text-dental-navy mb-3">{t('navigation.ourTreatments')}</h5>
        <ul className="space-y-2">
          {navigation.footer.treatments.map(link => (
            <li key={link.key}>
              <NavItem
                to={link.path}
                className="text-sm text-dental-navy/80 hover:text-dental-orange transition-colors"
              >
                {t(link.labelKey)}
              </NavItem>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h5 className="text-lg font-semibold text-dental-navy mb-3">{t('legal.title', 'מידע משפטי')}</h5>
        <ul className="space-y-2">
          {navigation.footer.legal.map(link => (
            <li key={link.key}>
              <NavItem
                to={link.path}
                className="text-sm text-dental-navy/80 hover:text-dental-orange transition-colors"
              >
                {t(link.labelKey)}
              </NavItem>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default FooterNavigation;
