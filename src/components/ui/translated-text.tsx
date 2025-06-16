
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
  
  // Enhanced fallback logic
  const getFallbackText = (key: string): string => {
    // Common fallbacks for frequently used keys
    const commonFallbacks: Record<string, string> = {
      'treatments.tabs.overview': language === 'he' ? 'סקירה כללית' : 'Overview',
      'treatments.tabs.procedure': language === 'he' ? 'תהליך הטיפול' : 'Procedure',
      'treatments.tabs.benefits': language === 'he' ? 'יתרונות' : 'Benefits',
      'treatments.tabs.faq': language === 'he' ? 'שאלות נפוצות' : 'FAQ',
      'treatments.tabs.testimonials': language === 'he' ? 'המלצות' : 'Testimonials',
      'treatments.tabs.related': language === 'he' ? 'טיפולים קשורים' : 'Related',
      'treatments.keyPoints': language === 'he' ? 'נקודות מפתח:' : 'Key Points:',
      'treatments.idealFor': language === 'he' ? 'מתאים במיוחד עבור:' : 'Ideal for:',
      'treatments.fullExperience': language === 'he' ? 'החוויה המלאה' : 'Full Experience',
      'treatments.viewCompleteLandingPage': language === 'he' ? 'צפו בדף הנחיתה המלא עם כל הפרטים והמידע' : 'View complete landing page with all details',
      'treatments.viewFullPage': language === 'he' ? 'צפו בדף המלא' : 'View Full Page',
      'readyToStart': language === 'he' ? 'מוכנים להתחיל את הטיפול?' : 'Ready to start treatment?',
      'bookVisit': language === 'he' ? 'קביעת תור' : 'Book Visit',
      'common.bookNow': language === 'he' ? 'קבעו תור עכשיו' : 'Book Now',
      'common.learnMore': language === 'he' ? 'למידע נוסף' : 'Learn More'
    };

    return commonFallbacks[key] || defaultText || key;
  };
  
  // Merge options with props and enhanced fallback
  const translationOptions: TranslationOptions = {
    defaultValue: getFallbackText(textKey),
    showDebug: debug,
    ...options,
    ...(params ? { params } : {})
  };
  
  // Use the translation function with enhanced fallback
  const translatedText = t(textKey, translationOptions);
  
  // If the translation is the same as the key, use our fallback
  const finalText = translatedText === textKey ? getFallbackText(textKey) : translatedText;
  
  // Check if we're still showing a raw key (contains dots and brackets)
  const isRawKey = finalText.includes('[') && finalText.includes(':') && finalText.includes(']');
  
  return (
    <Component 
      className={cn(
        className,
        debug && isRawKey && 'border border-dashed border-red-300 bg-red-50/30 px-1'
      )}
      data-translation-key={textKey}
      dir={isRTL ? 'rtl' : 'ltr'}
      {...rest}
    >
      {finalText}
      {debug && isRawKey && (
        <span className="text-xs text-red-500 mx-1 inline-block opacity-70">[MISSING: {textKey}]</span>
      )}
      {children}
    </Component>
  );
};

export default TranslatedText;
