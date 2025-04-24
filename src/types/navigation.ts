
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
