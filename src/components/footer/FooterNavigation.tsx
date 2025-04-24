
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { createLocalizedNavigationConfig } from '@/config/navigation';
import NavItem from '@/components/ui/NavItem';

const FooterNavigation = () => {
  const { t, language } = useLanguage();
  const navigation = createLocalizedNavigationConfig(language);

  return (
    <>
      <div className="space-y-4">
        <h5 className="font-medium text-gray-900">{t('info')}</h5>
        <ul className="space-y-2">
          {navigation.footer.info.map(link => (
            <li key={link.key}>
              <NavItem
                to={link.path}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {t(link.labelKey)}
              </NavItem>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <h5 className="font-medium text-gray-900">{t('navigation.ourTreatments')}</h5>
        <ul className="space-y-2">
          {navigation.footer.treatments.map(link => (
            <li key={link.key}>
              <NavItem
                to={link.path}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
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
