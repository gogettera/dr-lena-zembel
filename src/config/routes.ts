
import { Language } from '@/types/language';
import React from 'react';

// Page component types
type PageComponent = React.ComponentType<any>;

// Route configuration types
export interface RouteConfig {
  component: () => Promise<{ default: PageComponent }>;
  exact?: boolean;
  layout?: 'default' | 'minimal' | 'landing';
  meta?: {
    title?: string;
    description?: string;
    titleKey?: string;
    descriptionKey?: string;
    jsonLd?: string;
  };
}

export interface RoutesConfig {
  [path: string]: RouteConfig;
}

// Helper to generate language-specific routes
export const createLocalizedRoutes = (language: Language): RoutesConfig => ({
  '/': {
    component: () => import('@/pages/HomePage'),
    exact: true,
    meta: {
      titleKey: 'home.meta.title',
      descriptionKey: 'home.meta.description'
    }
  },
  '/about': {
    component: () => import('@/pages/AboutPage'),
    meta: {
      titleKey: 'about.meta.title',
      descriptionKey: 'about.meta.description'
    }
  },
  '/treatments': {
    component: () => import('@/pages/TreatmentsPage'),
    meta: {
      titleKey: 'treatments.meta.title',
      descriptionKey: 'treatments.meta.description'
    }
  },
  '/aesthetic-treatments': {
    component: () => import('@/pages/AestheticTreatmentsPage'),
    meta: {
      titleKey: 'aestheticTreatments.meta.title',
      descriptionKey: 'aestheticTreatments.meta.description'
    }
  },
  '/contact': {
    component: () => import('@/pages/ContactPage'),
    meta: {
      titleKey: 'contact.meta.title',
      descriptionKey: 'contact.meta.description'
    }
  },
  '/accessibility-statement': {
    component: () => import('@/pages/AccessibilityStatementPage'),
    meta: {
      titleKey: 'accessibility.meta.title',
      descriptionKey: 'accessibility.meta.description'
    }
  },
  '/privacy-policy': {
    component: () => import('@/pages/PrivacyPolicyPage'),
    meta: {
      titleKey: 'legal.privacyPolicy.meta.title',
      descriptionKey: 'legal.privacyPolicy.meta.description'
    }
  },
  '/terms-of-service': {
    component: () => import('@/pages/TermsOfServicePage'),
    meta: {
      titleKey: 'legal.termsOfService.meta.title',
      descriptionKey: 'legal.termsOfService.meta.description'
    }
  },
  '/info': {
    component: () => import('@/pages/InfoPage'),
    meta: {
      titleKey: 'info.meta.title',
      descriptionKey: 'info.meta.description'
    }
  },
  '/children-dentistry': {
    component: () => import('@/pages/ChildrenDentistryLandingPage'),
    layout: 'landing',
    meta: {
      titleKey: 'childrenDentistry.meta.title',
      descriptionKey: 'childrenDentistry.meta.description'
    }
  },
  '/oral-rehabilitation': {
    component: () => import('@/pages/OralRehabilitationPage'),
    meta: {
      titleKey: 'oralRehabilitation.meta.title',
      descriptionKey: 'oralRehabilitation.meta.description'
    }
  },
  '/orthodontics': {
    component: () => import('@/pages/OrthodonticsPage'),
    meta: {
      titleKey: 'orthodontics.meta.title',
      descriptionKey: 'orthodontics.meta.description'
    }
  },
  '/root-canal': {
    component: () => import('@/pages/RootCanalPage'),
    meta: {
      titleKey: 'rootCanal.meta.title',
      descriptionKey: 'rootCanal.meta.description'
    }
  },
  '/botox-treatments': {
    component: () => import('@/pages/BotoxTreatmentsPage'),
    meta: {
      titleKey: 'botoxTreatments.meta.title',
      descriptionKey: 'botoxTreatments.meta.description'
    }
  },
  '/clinic': {
    component: () => import('@/pages/ClinicPage'),
    meta: {
      titleKey: 'clinic.meta.title',
      descriptionKey: 'clinic.meta.description'
    }
  },
  '/ad/children-dentistry': {
    component: () => import('@/pages/ChildrenDentistryAdLandingPage'),
    layout: 'landing',
    meta: {
      titleKey: 'childrenAdLanding.meta.title',
      descriptionKey: 'childrenAdLanding.meta.description'
    }
  },
  '/treatments/children-dentistry': {
    component: () => import('@/pages/ChildrenDentistryLandingPage'),
    layout: 'landing',
    meta: {
      titleKey: 'childrenDentistry.meta.title',
      descriptionKey: 'childrenDentistry.meta.description'
    }
  },
  '*': {
    component: () => import('@/pages/NotFound'),
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
