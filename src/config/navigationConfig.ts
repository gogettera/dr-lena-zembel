
import { NavigationConfig } from '@/types/navigation';
import { Language } from '@/types/language';

export const createLocalizedNavigationConfig = (language: Language): NavigationConfig => {
  const isRTL = language === 'he';
  
  const treatmentsDropdown = {
    general: [
      { 
        href: `/${language}/treatments/preventive-medicine`, 
        labelKey: 'navigation.preventiveMedicine' 
      },
      { 
        href: `/${language}/treatments/root-canal`, 
        labelKey: 'navigation.rootCanal' 
      },
      { 
        href: `/${language}/treatments/oral-rehabilitation`, 
        labelKey: 'navigation.oralRehabilitation' 
      }
    ],
    specialized: [
      { 
        href: `/${language}/treatments/orthodontics`, 
        labelKey: 'navigation.orthodontics' 
      },
      { 
        href: `/${language}/treatments/children-dentistry`, 
        labelKey: 'navigation.childrenDentistry' 
      }
    ],
    aesthetic: [
      { 
        href: `/${language}/treatments/aesthetic-treatments`, 
        labelKey: 'navigation.aestheticTreatments' 
      },
      { 
        href: `/${language}/treatments/botox-treatments`, 
        labelKey: 'navigation.botoxTreatments' 
      }
    ]
  };

  return {
    isRTL,
    mainMenu: [
      { 
        href: `/${language}`, 
        labelKey: 'navigation.home' 
      },
      { 
        href: `/${language}/about`, 
        labelKey: 'navigation.about' 
      },
      {
        href: `/${language}/treatments`,
        labelKey: 'navigation.treatments',
        dropdown: treatmentsDropdown
      },
      { 
        href: `/${language}/contact`, 
        labelKey: 'navigation.contact' 
      }
    ],
    footerMenu: {
      main: [
        { 
          href: `/${language}`, 
          labelKey: 'navigation.home' 
        },
        { 
          href: `/${language}/about`, 
          labelKey: 'navigation.about' 
        },
        { 
          href: `/${language}/treatments`, 
          labelKey: 'navigation.treatments' 
        },
        { 
          href: `/${language}/contact`, 
          labelKey: 'navigation.contact' 
        }
      ],
      treatments: [
        { 
          href: `/${language}/treatments/preventive-medicine`, 
          labelKey: 'navigation.preventiveMedicine' 
        },
        { 
          href: `/${language}/treatments/orthodontics`, 
          labelKey: 'navigation.orthodontics' 
        },
        { 
          href: `/${language}/treatments/children-dentistry`, 
          labelKey: 'navigation.childrenDentistry' 
        },
        { 
          href: `/${language}/treatments/aesthetic-treatments`, 
          labelKey: 'navigation.aestheticTreatments' 
        },
        { 
          href: `/${language}/treatments/root-canal`, 
          labelKey: 'navigation.rootCanal' 
        },
        { 
          href: `/${language}/treatments/oral-rehabilitation`, 
          labelKey: 'navigation.oralRehabilitation' 
        },
        { 
          href: `/${language}/treatments/botox-treatments`, 
          labelKey: 'navigation.botoxTreatments' 
        }
      ],
      legal: [
        { 
          href: `/${language}/legal/privacy`, 
          labelKey: 'navigation.legal.privacy' 
        },
        { 
          href: `/${language}/legal/terms`, 
          labelKey: 'navigation.legal.terms' 
        }
      ],
      accessibility: [
        { 
          href: `/${language}/accessibility`, 
          labelKey: 'navigation.accessibility.statement' 
        }
      ]
    },
    breadcrumb: {
      separator: isRTL ? '←' : '→',
      homeKey: 'navigation.home'
    }
  };
};
