
import { Language } from '@/types/language';

// Page component types
type PageComponent = React.ComponentType<any>;
type DynamicImport = () => Promise<{ default: PageComponent }>;

// Route configuration types
export interface RouteConfig {
  component: PageComponent;
  exact?: boolean;
  layout?: 'default' | 'minimal' | 'landing';
  meta?: {
    title?: string;
    description?: string;
    titleKey?: string;
    descriptionKey?: string;
  };
}

export interface RoutesConfig {
  [path: string]: RouteConfig;
}

// Helper to generate language-specific routes
export const createLocalizedRoutes = (language: Language): RoutesConfig => ({
  '/': {
    component: require('@/pages/HomePage').default,
    exact: true,
    meta: {
      titleKey: 'home.meta.title',
      descriptionKey: 'home.meta.description'
    }
  },
  '/about': {
    component: require('@/pages/AboutPage').default,
    meta: {
      titleKey: 'about.meta.title',
      descriptionKey: 'about.meta.description'
    }
  },
  '/treatments': {
    component: require('@/pages/TreatmentsPage').default,
    meta: {
      titleKey: 'treatments.meta.title',
      descriptionKey: 'treatments.meta.description'
    }
  },
  '/aesthetic-treatments': {
    component: require('@/pages/AestheticTreatmentsPage').default,
    meta: {
      titleKey: 'aestheticTreatments.meta.title',
      descriptionKey: 'aestheticTreatments.meta.description'
    }
  },
  '/contact': {
    component: require('@/pages/ContactPage').default,
    meta: {
      titleKey: 'contact.meta.title',
      descriptionKey: 'contact.meta.description'
    }
  },
  '/accessibility-statement': {
    component: require('@/pages/AccessibilityStatementPage').default,
    meta: {
      titleKey: 'accessibility.meta.title',
      descriptionKey: 'accessibility.meta.description'
    }
  },
  '/privacy-policy': {
    component: require('@/pages/PrivacyPolicyPage').default,
    meta: {
      titleKey: 'legal.privacyPolicy.meta.title',
      descriptionKey: 'legal.privacyPolicy.meta.description'
    }
  },
  '/terms-of-service': {
    component: require('@/pages/TermsOfServicePage').default,
    meta: {
      titleKey: 'legal.termsOfService.meta.title',
      descriptionKey: 'legal.termsOfService.meta.description'
    }
  },
  '/info': {
    component: require('@/pages/InfoPage').default,
    meta: {
      titleKey: 'info.meta.title',
      descriptionKey: 'info.meta.description'
    }
  },
  '/children-dentistry': {
    component: require('@/pages/ChildrenDentistryLandingPage').default,
    layout: 'landing',
    meta: {
      titleKey: 'childrenDentistry.meta.title',
      descriptionKey: 'childrenDentistry.meta.description'
    }
  },
  '/oral-rehabilitation': {
    component: require('@/pages/OralRehabilitationPage').default,
    meta: {
      titleKey: 'oralRehabilitation.meta.title',
      descriptionKey: 'oralRehabilitation.meta.description'
    }
  },
  '/orthodontics': {
    component: require('@/pages/OrthodonticsPage').default,
    meta: {
      titleKey: 'orthodontics.meta.title',
      descriptionKey: 'orthodontics.meta.description'
    }
  },
  '/root-canal': {
    component: require('@/pages/RootCanalPage').default,
    meta: {
      titleKey: 'rootCanal.meta.title',
      descriptionKey: 'rootCanal.meta.description'
    }
  },
  '/botox-treatments': {
    component: require('@/pages/BotoxTreatmentsPage').default,
    meta: {
      titleKey: 'botoxTreatments.meta.title',
      descriptionKey: 'botoxTreatments.meta.description'
    }
  },
  '/clinic': {
    component: require('@/pages/ClinicPage').default,
    meta: {
      titleKey: 'clinic.meta.title',
      descriptionKey: 'clinic.meta.description'
    }
  },
  '/ad/children-dentistry': {
    component: require('@/pages/ChildrenDentistryAdLandingPage').default,
    layout: 'landing',
    meta: {
      titleKey: 'childrenAdLanding.meta.title',
      descriptionKey: 'childrenAdLanding.meta.description'
    }
  },
  '/treatments/children-dentistry': {
    component: require('@/pages/ChildrenDentistryLandingPage').default,
    layout: 'landing',
    meta: {
      titleKey: 'childrenDentistry.meta.title',
      descriptionKey: 'childrenDentistry.meta.description'
    }
  },
  '*': {
    component: require('@/pages/NotFound').default,
    meta: {
      title: '404 - Page Not Found',
      description: 'The page you are looking for does not exist.'
    }
  }
});

// Helper to create full localized path
export const createLocalizedPath = (language: Language, path: string): string => {
  return `/${language}${path.startsWith('/') ? path : `/${path}`}`;
};

// Helper to extract the path without the language prefix
export const extractPathWithoutLanguage = (fullPath: string): string => {
  const pathSegments = fullPath.split('/').filter(Boolean);
  return pathSegments.length > 1 ? `/${pathSegments.slice(1).join('/')}` : '/';
};
