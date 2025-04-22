
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import NavList from '@/components/ui/NavList';
import NavItem from '@/components/ui/NavItem';
import { createLocalizedNavigationConfig } from '@/config/navigation';

const FooterNavigation = () => {
  const { t, language } = useLanguage();
  const navigation = createLocalizedNavigationConfig(language);

  return (
    <div className="flex flex-col md:flex-row gap-10">
      <div>
        <h4 className="text-xl font-bold text-white mb-3">
          {t('navigation.sitemap', 'מפת האתר')}
        </h4>
        <NavList vertical className="space-y-2">
          {navigation.footer.info.map((link) => (
            <NavItem
              key={link.key}
              to={link.path}
              className="text-sm underline text-dental-beige hover:text-dental-orange transition-colors"
            >
              {t(link.labelKey)}
            </NavItem>
          ))}
        </NavList>
      </div>
      <div>
        <h4 className="text-xl font-bold text-white mb-3">
          {t('navigation.ourTreatments', 'הטיפולים שלנו')}
        </h4>
        <NavList vertical className="space-y-2">
          {navigation.footer.treatments.map((link) => (
            <NavItem
              key={link.key}
              to={link.path}
              className="text-sm underline text-dental-beige hover:text-dental-orange transition-colors"
            >
              {t(link.labelKey)}
            </NavItem>
          ))}
        </NavList>
      </div>
    </div>
  );
};

export default FooterNavigation;
