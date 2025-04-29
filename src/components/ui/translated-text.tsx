
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface TranslatedTextProps {
  textKey: string;
  defaultText?: string;
  className?: string;
  as?: React.ElementType;
  withNamespace?: boolean;
  children?: React.ReactNode;
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
  ...rest
}: TranslatedTextProps) => {
  const { t, language } = useLanguage();
  
  // Use the translation function with a fallback
  const translatedText = t(textKey, { defaultValue: defaultText || textKey });
  
  // If the translation is the same as the key and not the default text,
  // it likely means the translation is missing
  const isMissingTranslation = !defaultText && translatedText === textKey;
  
  // If debugging is enabled, highlight missing translations
  const debuggingEnabled = process.env.NODE_ENV === 'development';
  
  return (
    <Component 
      className={cn(
        className,
        debuggingEnabled && isMissingTranslation && 'border border-dashed border-red-300 bg-red-50 px-1'
      )}
      data-translation-key={textKey}
      dir={language === 'he' || language === 'ar' ? 'rtl' : 'ltr'}
      {...rest}
    >
      {translatedText}
      {debuggingEnabled && isMissingTranslation && (
        <span className="text-xs text-red-500 mx-1">[{language}:{textKey}]</span>
      )}
      {children}
    </Component>
  );
};

export default TranslatedText;
