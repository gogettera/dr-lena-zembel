
import { Language } from '@/types/language';

export type TranslationOptions = {
  returnObjects?: boolean;
  defaultValue?: string;
  context?: string;
  count?: number;
};

export type TranslationValue = string | Record<string, any> | string[];

export type TranslationFunction = (key: string, options?: string | TranslationOptions) => any;

export type TranslationModule = Record<string, any>;
export type TranslationModules = Record<string, TranslationModule>;

