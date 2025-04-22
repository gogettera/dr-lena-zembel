import { Language } from '@/types/language';

export interface NavigationLink {
  key: string;
  labelKey: string;
  path: string;
  children?: NavigationLink[];
  isExternal?: boolean;
  icon?: string;
}

export interface NavigationConfig {
  main: NavigationLink[];
  footer: {
    info: NavigationLink[];
    treatments: NavigationLink[];
    legal: NavigationLink[];
  };
  social: {
    platform: string;
    url: string;
    icon: string;
  }[];
}

export const createLocalizedNavigationConfig = (language: Language): NavigationConfig => {
  return {
    main: [
      {
        key: 'home',
        labelKey: 'home',
        path: `/${language}`
      },
      {
        key: 'about',
        labelKey: 'about',
        path: `/${language}#about`
      },
      {
        key: 'treatments',
        labelKey: 'treatments',
        path: `/${language}#treatments`,
        children: [
          {
            key: 'aesthetic-treatments',
            labelKey: 'aestheticTreatments',
            path: `/${language}/treatments/aesthetic-treatments`
          },
          {
            key: 'children-dentistry',
            labelKey: 'childrenDentistry',
            path: `/${language}/treatments/children-dentistry`
          },
          {
            key: 'preventive-medicine',
            labelKey: 'preventiveMedicine',
            path: `/${language}/treatments/preventive-medicine`
          },
          {
            key: 'root-canal',
            labelKey: 'rootCanal',
            path: `/${language}/treatments/root-canal`
          },
          {
            key: 'oral-rehabilitation',
            labelKey: 'oralRehabilitation',
            path: `/${language}/treatments/oral-rehabilitation`
          },
          {
            key: 'orthodontics',
            labelKey: 'orthodontics',
            path: `/${language}/treatments/orthodontics`
          }
        ]
      },
      {
        key: 'contact',
        labelKey: 'contact',
        path: `/${language}#contact`
      }
    ],
    footer: {
      info: [
        {
          key: 'home',
          labelKey: 'home',
          path: `/${language}`
        },
        {
          key: 'about',
          labelKey: 'about',
          path: `/${language}#about`
        },
        {
          key: 'practice',
          labelKey: 'practice',
          path: `/${language}#practice`
        },
        {
          key: 'team',
          labelKey: 'team',
          path: `/${language}#team`
        },
        {
          key: 'testimonials',
          labelKey: 'testimonials',
          path: `/${language}#testimonials`
        },
        {
          key: 'contact',
          labelKey: 'contact',
          path: `/${language}#contact`
        }
      ],
      treatments: [
        {
          key: 'aesthetic-treatments',
          labelKey: 'aestheticTreatments',
          path: `/${language}/treatments/aesthetic-treatments`
        },
        {
          key: 'children-dentistry',
          labelKey: 'childrenDentistry',
          path: `/${language}/treatments/children-dentistry`
        },
        {
          key: 'preventive-medicine',
          labelKey: 'preventiveMedicine',
          path: `/${language}/treatments/preventive-medicine`
        },
        {
          key: 'root-canal',
          labelKey: 'rootCanal',
          path: `/${language}/treatments/root-canal`
        },
        {
          key: 'oral-rehabilitation',
          labelKey: 'oralRehabilitation',
          path: `/${language}/treatments/oral-rehabilitation`
        },
        {
          key: 'orthodontics',
          labelKey: 'orthodontics',
          path: `/${language}/treatments/orthodontics`
        }
      ],
      legal: [
        {
          key: 'accessibility',
          labelKey: 'accessibility.statement',
          path: `/${language}/accessibility-statement`
        }
      ]
    },
    social: [
      {
        platform: 'facebook',
        url: 'https://facebook.com',
        icon: 'facebook'
      },
      {
        platform: 'instagram',
        url: 'https://instagram.com',
        icon: 'instagram'
      },
      {
        platform: 'whatsapp',
        url: 'https://wa.me/',
        icon: 'whatsapp'
      }
    ]
  };
};

export const isActiveLink = (currentPath: string, linkPath: string): boolean => {
  // Handle fragment links (e.g., /#contact)
  if (linkPath.includes('#')) {
    const basePath = linkPath.split('#')[0];
    return currentPath === basePath || currentPath === `${basePath}/`;
  }
  
  // Handle exact matches
  if (currentPath === linkPath || currentPath === `${linkPath}/`) {
    return true;
  }
  
  // Handle nested routes
  if (linkPath !== '/' && currentPath.startsWith(linkPath)) {
    return true;
  }
  
  return false;
};
