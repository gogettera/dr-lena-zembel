
import { Language } from '@/types/language';

export interface NavigationLink {
  href: string;
  labelKey: string;
  dropdown?: {
    general?: NavigationLink[];
    specialized?: NavigationLink[];
    aesthetic?: NavigationLink[];
  };
}

export interface NavigationConfig {
  isRTL: boolean;
  mainMenu: NavigationLink[];
  footerMenu: {
    main: NavigationLink[];
    treatments: NavigationLink[];
    legal: NavigationLink[];
    accessibility: NavigationLink[];
  };
  breadcrumb: {
    separator: string;
    homeKey: string;
  };
}
