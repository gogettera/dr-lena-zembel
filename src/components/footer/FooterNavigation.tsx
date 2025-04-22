
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import NavList from '@/components/ui/NavList';
import NavItem from '@/components/ui/NavItem';
import { createLocalizedNavigationConfig } from '@/config/navigation';
import { Grid } from '@/components/ui/grid';

const FooterNavigation = () => {
  const { t, language } = useLanguage();
  const navigation = createLocalizedNavigationConfig(language);

  return (
    <Grid cols={1} mdCols={2} gap={8} className="w-full">
      <div className="space-y-6">
        <h4 className="text-xl font-semibold text-white">
          {t('navigation.sitemap')}
        </h4>
        <NavList vertical className="space-y-3">
          {navigation.footer.info.map((link) => (
            <NavItem 
              key={link.key}
              to={link.path}
              className="text-sm text-dental-beige hover:text-white transition-colors duration-300"
            >
              {t(link.labelKey)}
            </NavItem>
          ))}
        </NavList>
      </div>

      <div className="space-y-6">
        <h4 className="text-xl font-semibold text-white">
          {t('navigation.ourTreatments')}
        </h4>
        <NavList vertical className="space-y-3">
          {navigation.footer.treatments.map((link) => (
            <NavItem 
              key={link.key}
              to={link.path}
              className="text-sm text-dental-beige hover:text-white transition-colors duration-300"
            >
              {t(link.labelKey)}
            </NavItem>
          ))}
        </NavList>
      </div>
    </Grid>
  );
};

export default FooterNavigation;
