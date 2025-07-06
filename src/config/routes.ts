
import { lazy } from 'react';
import { Language } from '@/types/language';
import { NavigationLink } from '@/types/navigation';

// Page components (eagerly loaded)
import Index from '@/pages/Index';
import LanguageHome from '@/pages/LanguageHome';
import LanguageTreatmentPage from '@/pages/LanguageTreatmentPage';
import BotoxTreatmentsPage from '@/pages/BotoxTreatmentsPage';
import PreventiveMedicinePage from '@/pages/PreventiveMedicinePage';
import AccessibilityStatementPage from '@/pages/AccessibilityStatementPage';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import NotFound from '@/pages/NotFound';
import TreatmentPage from '@/pages/TreatmentPage';

// Lazily loaded components
const AdminPanel = lazy(() => import(/* webpackChunkName: "admin" */ '@/pages/AdminPanel'));
const LoginPage = lazy(() => import(/* webpackChunkName: "login" */ '@/pages/LoginPage'));

// Route configuration types
export interface RouteConfig {
  path: string;
  element: React.ComponentType<any>;
  children?: RouteConfig[];
  lazyLoaded?: boolean;
  label?: string;
  inNavigation?: boolean;
  requiredAuth?: boolean;
  icon?: React.ComponentType<any>;
}

// Root level routes (not language-specific)
export const rootRoutes: RouteConfig[] = [
  {
    path: '/',
    element: Index,
    label: 'Home'
  },
  {
    path: '/login',
    element: LoginPage,
    label: 'Login',
    lazyLoaded: true
  },
  {
    path: '/admin',
    element: AdminPanel,
    label: 'Admin',
    lazyLoaded: true,
    requiredAuth: true
  }
];

// Language-specific routes
export const languageRoutes: RouteConfig[] = [
  {
    path: '',
    element: LanguageHome,
    label: 'navigation.home',
    inNavigation: true
  },
  {
    path: 'treatments/botox-treatments',
    element: BotoxTreatmentsPage,
    label: 'navigation.botoxTreatments',
    inNavigation: true
  },
  {
    path: 'treatments/:treatmentType',
    element: LanguageTreatmentPage,
    label: 'navigation.treatments'
  },
  {
    path: 'preventive-medicine',
    element: PreventiveMedicinePage,
    label: 'navigation.preventiveMedicine',
    inNavigation: true
  },
  {
    path: 'accessibility-statement',
    element: AccessibilityStatementPage,
    label: 'navigation.accessibility.statement'
  },
  {
    path: 'privacy-policy',
    element: PrivacyPolicy,
    label: 'navigation.legal.privacy'
  },
  {
    path: 'terms-of-service',
    element: TermsOfService,
    label: 'navigation.legal.terms'
  }
];

// Get navigation items for the main menu
export const getMainNavigationItems = (): NavigationLink[] => {
  return languageRoutes
    .filter(route => route.inNavigation)
    .map(route => ({
      href: route.path.startsWith('/') ? route.path : `/${route.path}`,
      labelKey: route.label || ''
    }));
};
