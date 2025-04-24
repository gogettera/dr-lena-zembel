
import { NavigationConfig, NavigationLink } from '@/types/navigation';
import { Language } from '@/types/language';
import { createLocalizedNavigationConfig } from './navigationConfig';
import { isActiveLink } from '@/utils/navigationUtils';

// Re-export all necessary components
export type { NavigationConfig, NavigationLink };
export { createLocalizedNavigationConfig, isActiveLink };
