
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { TranslationOptions } from '@/utils/translation';

interface TranslatedTextProps {
  textKey: string;
  defaultText?: string;
  className?: string;
  as?: React.ElementType;
  withNamespace?: boolean;
  children?: React.ReactNode;
  debug?: boolean;
  params?: Record<string, any>;
  options?: TranslationOptions;
  [key: string]: any;
}

/**
 * A component that safely displays translated text
 * with fallback to prevent showing raw translation keys
 */
export const TranslatedText = ({
  textKey,
  defaultText,
  className,
  as: Component = 'span',
  withNamespace = false,
  children,
  debug = process.env.NODE_ENV === 'development',
  params,
  options = {},
  ...rest
}: TranslatedTextProps) => {
  const { t, language, isRTL } = useLanguage();
  
  // Merge options with props
  const translationOptions: TranslationOptions = {
    defaultValue: defaultText || textKey,
    showDebug: debug,
    ...options,
    ...(params ? { params } : {})
  };
  
  // Use the translation function with a fallback
  const translatedText = t(textKey, translationOptions);
  
  // If the translation is the same as the key and not the default text,
  // it likely means the translation is missing
  const isMissingTranslation = translatedText === textKey && !defaultText;
  
  return (
    <Component 
      className={cn(
        className,
        debug && isMissingTranslation && 'border border-dashed border-red-300 bg-red-50/30 px-1'
      )}
      data-translation-key={textKey}
      dir={isRTL ? 'rtl' : 'ltr'}
      {...rest}
    >
      {translatedText}
      {debug && isMissingTranslation && (
        <span className="text-xs text-red-500 mx-1 inline-block opacity-70">[{language}:{textKey}]</span>
      )}
      {children}
    </Component>
  );
};

export default TranslatedText;
