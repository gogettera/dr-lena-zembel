
import { NavigationConfig } from '@/types/navigation';
import { Language } from '@/types/language';

export const createLocalizedNavigationConfig = (language: Language): NavigationConfig => {
  const basePath = `/${language}`;
  
  return {
    main: [
      {
        key: 'home',
        labelKey: 'navigation.home',
        path: basePath
      },
      {
        key: 'about',
        labelKey: 'navigation.about',
        path: `${basePath}/about`
      },
      {
        key: 'treatments',
        labelKey: 'navigation.treatments',
        path: `${basePath}/treatments`,
        children: [
          {
            key: 'aesthetic-treatments',
            labelKey: 'navigation.aestheticTreatments',
            path: `${basePath}/treatments/aesthetic-treatments/landing`
          },
          {
            key: 'botox-treatments',
            labelKey: 'navigation.botoxTreatments',
            path: `${basePath}/treatments/botox-treatments`
          },
          {
            key: 'preventive-medicine',
            labelKey: 'navigation.preventiveMedicine',
            path: `${basePath}/treatments/preventive-medicine/landing`
          },
          {
            key: 'children-dentistry',
            labelKey: 'Children Dentistry',
            path: `${basePath}/treatments/children-dentistry/landing`
          },
          {
            key: 'orthodontics',
            labelKey: 'Orthodontics',
            path: `${basePath}/treatments/orthodontics/landing`
          },
          {
            key: 'root-canal',
            labelKey: 'Root Canal',
            path: `${basePath}/treatments/root-canal/landing`
          },
          {
            key: 'oral-rehabilitation',
            labelKey: 'Oral Rehabilitation',
            path: `${basePath}/treatments/oral-rehabilitation/landing`
          }
        ]
      },
      {
        key: 'contact',
        labelKey: 'navigation.contact',
        path: `${basePath}/contact`
      }
    ],
    footer: {
      info: [
        {
          key: 'about',
          labelKey: 'navigation.about',
          path: `${basePath}/about`
        },
        {
          key: 'contact',
          labelKey: 'navigation.contact',
          path: `${basePath}/contact`
        }
      ],
      treatments: [
        {
          key: 'aesthetic-treatments',
          labelKey: 'navigation.aestheticTreatments',
          path: `${basePath}/treatments/aesthetic-treatments/landing`
        },
        {
          key: 'botox-treatments',
          labelKey: 'navigation.botoxTreatments',
          path: `${basePath}/treatments/botox-treatments`
        },
        {
          key: 'preventive-medicine',
          labelKey: 'navigation.preventiveMedicine',
          path: `${basePath}/treatments/preventive-medicine/landing`
        }
      ],
      legal: [
        {
          key: 'privacy',
          labelKey: 'navigation.legal.privacy',
          path: `${basePath}/privacy-policy`
        },
        {
          key: 'terms',
          labelKey: 'navigation.legal.terms',
          path: `${basePath}/terms-of-service`
        },
        {
          key: 'accessibility',
          labelKey: 'navigation.accessibility.statement',
          path: `${basePath}/accessibility-statement`
        }
      ]
    },
    social: [
      {
        platform: 'facebook',
        url: 'https://facebook.com',
        icon: 'Facebook'
      },
      {
        platform: 'instagram',
        url: 'https://instagram.com',
        icon: 'Instagram'
      }
    ]
  };
};
