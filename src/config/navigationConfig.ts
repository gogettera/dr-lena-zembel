
import { NavigationConfig } from '@/types/navigation';

export const createLocalizedNavigationConfig = (): NavigationConfig => {
  const isRTL = true; // Hebrew is RTL
  
  const treatmentsDropdown = {
    general: [
      { 
        href: '/treatments/preventive-medicine', 
        labelKey: 'navigation.preventiveMedicine' 
      },
      { 
        href: '/treatments/root-canal', 
        labelKey: 'navigation.rootCanal' 
      },
      { 
        href: '/treatments/oral-rehabilitation', 
        labelKey: 'navigation.oralRehabilitation' 
      }
    ],
    specialized: [
      { 
        href: '/treatments/orthodontics', 
        labelKey: 'navigation.orthodontics' 
      },
      { 
        href: '/treatments/children-dentistry', 
        labelKey: 'navigation.childrenDentistry' 
      }
    ],
    aesthetic: [
      { 
        href: '/treatments/aesthetic-treatments', 
        labelKey: 'navigation.aestheticTreatments' 
      },
      { 
        href: '/treatments/botox-treatments', 
        labelKey: 'navigation.botoxTreatments' 
      }
    ]
  };

  return {
    isRTL,
    mainMenu: [
      { 
        href: '/', 
        labelKey: 'navigation.home' 
      },
      { 
        href: '/about', 
        labelKey: 'navigation.about' 
      },
      {
        href: '/treatments',
        labelKey: 'navigation.treatments',
        dropdown: treatmentsDropdown
      },
      { 
        href: '/contact', 
        labelKey: 'navigation.contact' 
      }
    ],
    footerMenu: {
      main: [
        { 
          href: '/', 
          labelKey: 'navigation.home' 
        },
        { 
          href: '/about', 
          labelKey: 'navigation.about' 
        },
        { 
          href: '/treatments', 
          labelKey: 'navigation.treatments' 
        },
        { 
          href: '/contact', 
          labelKey: 'navigation.contact' 
        }
      ],
      treatments: [
        { 
          href: '/treatments/preventive-medicine', 
          labelKey: 'navigation.preventiveMedicine' 
        },
        { 
          href: '/treatments/orthodontics', 
          labelKey: 'navigation.orthodontics' 
        },
        { 
          href: '/treatments/children-dentistry', 
          labelKey: 'navigation.childrenDentistry' 
        },
        { 
          href: '/treatments/aesthetic-treatments', 
          labelKey: 'navigation.aestheticTreatments' 
        },
        { 
          href: '/treatments/root-canal', 
          labelKey: 'navigation.rootCanal' 
        },
        { 
          href: '/treatments/oral-rehabilitation', 
          labelKey: 'navigation.oralRehabilitation' 
        },
        { 
          href: '/treatments/botox-treatments', 
          labelKey: 'navigation.botoxTreatments' 
        }
      ],
      legal: [
        { 
          href: '/legal/privacy', 
          labelKey: 'navigation.legal.privacy' 
        },
        { 
          href: '/legal/terms', 
          labelKey: 'navigation.legal.terms' 
        }
      ],
      accessibility: [
        { 
          href: '/accessibility', 
          labelKey: 'navigation.accessibility.statement' 
        }
      ]
    },
    breadcrumb: {
      separator: '←', // Hebrew RTL
      homeKey: 'navigation.home'
    }
  };
};
