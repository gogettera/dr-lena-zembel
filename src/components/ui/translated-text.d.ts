
import { TranslationOptions } from '@/utils/translation';

export interface TranslatedTextProps {
  /** Translation key to look up */
  textKey: string;
  /** Default text to display if translation is missing */
  defaultText?: string;
  /** Additional CSS classes */
  className?: string;
  /** Element type to render as */
  as?: React.ElementType;
  /** Whether to include namespace in displayed key */
  withNamespace?: boolean;
  /** Child elements */
  children?: React.ReactNode;
  /** Whether to show debugging information */
  debug?: boolean;
  /** Parameters for interpolation */
  params?: Record<string, any>;
  /** Additional translation options */
  options?: TranslationOptions;
  /** Additional props */
  [key: string]: any;
}

/**
 * A component that safely displays translated text with fallback
 */
export declare const TranslatedText: React.FC<TranslatedTextProps>;
