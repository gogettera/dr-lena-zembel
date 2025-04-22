
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import NavList from '@/components/ui/NavList';
import NavItem from '@/components/ui/NavItem';
import { createLocalizedNavigationConfig } from '@/config/navigation';

const FooterNavigation = () => {
  const { t, language } = useLanguage();
  const navigation = createLocalizedNavigationConfig(language);

  return (
    <>
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">
          {t('navigation.sitemap')}
        </h4>
        <NavList vertical className="space-y-2">
          {navigation.footer.info.map((link) => (
            <NavItem 
              key={link.key}
              to={link.path}
              className="text-dental-beige hover:text-white py-1 transition-colors duration-300"
            >
              {t(link.labelKey)}
            </NavItem>
          ))}
        </NavList>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">
          {t('navigation.ourTreatments')}
        </h4>
        <NavList vertical className="space-y-2">
          {navigation.footer.treatments.map((link) => (
            <NavItem 
              key={link.key}
              to={link.path}
              className="text-dental-beige hover:text-white py-1 transition-colors duration-300"
            >
              {t(link.labelKey)}
            </NavItem>
          ))}
        </NavList>
      </div>
    </>
  );
};

export default FooterNavigation;
