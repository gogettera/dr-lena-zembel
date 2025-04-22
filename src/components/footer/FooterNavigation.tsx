
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { createLocalizedNavigationConfig } from '@/config/navigation';
import NavItem from '@/components/ui/NavItem';

const FooterNavigation = () => {
  const { t, language } = useLanguage();
  const navigation = createLocalizedNavigationConfig(language);

  return (
    <nav aria-label={t('navigation.sitemap', 'מפת האתר')}>
      <ul className="space-y-3">
        {navigation.footer.info.map(link => (
          <li key={link.key}>
            <NavItem
              to={link.path}
              className="text-sm underline hover:text-dental-orange transition-colors"
            >
              {t(link.labelKey)}
            </NavItem>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h5 className="text-lg font-semibold text-white mb-3">{t('navigation.ourTreatments', 'הטיפולים שלנו')}</h5>
        <ul className="space-y-2">
          {navigation.footer.treatments.map(link => (
            <li key={link.key}>
              <NavItem
                to={link.path}
                className="text-sm underline hover:text-dental-orange transition-colors"
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

