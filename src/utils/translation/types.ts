
export type NestedObject = Record<string, any>;

export type TranslationsType = Record<string, any>;

export interface TranslationOptions {
  namespace?: string;
  params?: Record<string, string>;
  fallback?: string;
  language?: string;
}
