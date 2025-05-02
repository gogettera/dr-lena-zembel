
import { NavigationConfig, NavigationLink } from '@/types/navigation';
import { Language } from '@/types/language';

export const createLocalizedNavigationConfig = (language: Language): NavigationConfig => {
  return {
    main: [
      {
        key: 'home',
        labelKey: 'navigation.home',
        path: `/${language}`
      },
      {
        key: 'about',
        labelKey: 'navigation.about',
        path: `/${language}#about`
      },
      {
        key: 'treatments',
        labelKey: 'navigation.treatments',
        path: `/${language}#treatments`,
        children: [
          {
            key: 'aesthetic-treatments',
            labelKey: 'navigation.aestheticTreatments',
            path: `/${language}/treatments/aesthetic-treatments`
          },
          {
            key: 'botox-treatments',
            labelKey: 'navigation.botoxTreatments',
            path: `/${language}/treatments/botox-treatments`
          },
          {
            key: 'children-dentistry',
            labelKey: 'navigation.childrenDentistry',
            path: `/${language}/treatments/children-dentistry`
          },
          {
            key: 'preventive-medicine',
            labelKey: 'navigation.preventiveMedicine',
            path: `/${language}/treatments/preventive-medicine`
          },
          {
            key: 'root-canal',
            labelKey: 'navigation.rootCanal',
            path: `/${language}/treatments/root-canal`
          },
          {
            key: 'oral-rehabilitation',
            labelKey: 'navigation.oralRehabilitation',
            path: `/${language}/treatments/oral-rehabilitation`
          },
          {
            key: 'orthodontics',
            labelKey: 'navigation.orthodontics',
            path: `/${language}/treatments/orthodontics`
          }
        ]
      },
      {
        key: 'contact',
        labelKey: 'navigation.contact',
        path: `/${language}#contact`
      }
    ],
    footer: {
      info: [
        {
          key: 'home',
          labelKey: 'navigation.home',
          path: `/${language}`
        },
        {
          key: 'about',
          labelKey: 'navigation.about',
          path: `/${language}#about`
        },
        {
          key: 'practice',
          labelKey: 'navigation.practice',
          path: `/${language}#practice`
        },
        {
          key: 'team',
          labelKey: 'navigation.team',
          path: `/${language}#team`
        },
        {
          key: 'testimonials',
          labelKey: 'navigation.testimonials',
          path: `/${language}#testimonials`
        },
        {
          key: 'contact',
          labelKey: 'navigation.contact',
          path: `/${language}#contact`
        }
      ],
      treatments: [
        {
          key: 'aesthetic-treatments',
          labelKey: 'navigation.aestheticTreatments',
          path: `/${language}/treatments/aesthetic-treatments`
        },
        {
          key: 'botox-treatments',
          labelKey: 'navigation.botoxTreatments',
          path: `/${language}/treatments/botox-treatments`
        },
        {
          key: 'children-dentistry',
          labelKey: 'navigation.childrenDentistry',
          path: `/${language}/treatments/children-dentistry`
        },
        {
          key: 'preventive-medicine',
          labelKey: 'navigation.preventiveMedicine',
          path: `/${language}/treatments/preventive-medicine`
        },
        {
          key: 'root-canal',
          labelKey: 'navigation.rootCanal',
          path: `/${language}/treatments/root-canal`
        },
        {
          key: 'oral-rehabilitation',
          labelKey: 'navigation.oralRehabilitation',
          path: `/${language}/treatments/oral-rehabilitation`
        },
        {
          key: 'orthodontics',
          labelKey: 'navigation.orthodontics',
          path: `/${language}/treatments/orthodontics`
        }
      ],
      legal: [
        {
          key: 'accessibility',
          labelKey: 'navigation.accessibility.statement',
          path: `/${language}/accessibility-statement`
        },
        {
          key: 'privacyPolicy',
          labelKey: 'navigation.legal.privacyPolicy',
          path: `/${language}/privacy-policy`
        },
        {
          key: 'termsOfService',
          labelKey: 'navigation.legal.termsOfService',
          path: `/${language}/terms-of-service`
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
