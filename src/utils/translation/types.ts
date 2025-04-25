
import { Language } from '@/types/language';

/**
 * A context object containing variables to be interpolated in the translation
 */
export interface TranslationContext {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Options for translation function
 */
export interface TranslationOptions {
  /** Default value to return if translation is not found */
  defaultValue?: string;
  
  /** Whether to return the raw object for object translations */
  returnObjects?: boolean;
  
  /** Context variables for interpolation */
  context?: any;
  
  /** Count for pluralization */
  count?: number;
  
  /** Custom debug metadata */
  debug?: boolean;
}

/**
 * Possible types for translation values
 */
export type TranslationValue = string | Record<string, any> | string[];

/**
 * Structure for the translation module
 */
export interface TranslationModule {
  [key: string]: TranslationValue;
}

/**
 * Collection of translation modules
 */
export interface TranslationModules {
  [key: string]: TranslationModule | undefined;
}

/**
 * Translation function signature
 */
export type TranslationFunction = (key: string, options?: string | TranslationOptions) => any;

/**
 * Language state for the provider
 */
export interface LanguageState {
  language: Language;
  translations: Record<Language, Record<string, any>>;
  isRTL: boolean;
}
