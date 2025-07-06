import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';

interface TranslationDebugProps {
  translationKey: string;
  value: string;
  className?: string;
}

/**
 * Debug component to show translation resolution in development
 * Only visible in development mode
 */
export const TranslationDebug: React.FC<TranslationDebugProps> = ({
  translationKey,
  value,
  className = ''
}) => {
  const { language } = useLanguage();
  
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  // Check if translation was resolved or is using fallback
  const isUsingFallback = value.includes('[') && value.includes(':');
  const isTranslated = !isUsingFallback && value !== translationKey;
  
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <Badge 
        variant={isTranslated ? "default" : "destructive"}
        className="text-xs"
      >
        {language.toUpperCase()}
      </Badge>
      {!isTranslated && (
        <Badge variant="outline" className="text-xs border-orange-300 text-orange-600">
          FALLBACK
        </Badge>
      )}
      <span className="text-xs text-gray-500 font-mono">
        {translationKey}
      </span>
    </div>
  );
};

/**
 * Enhanced TranslatedText with debug info
 */
export const DebugTranslatedText: React.FC<{
  textKey: string;
  defaultText?: string;
  className?: string;
  showDebug?: boolean;
}> = ({ textKey, defaultText, className, showDebug = true }) => {
  const { t } = useLanguage();
  const translatedValue = t(textKey, defaultText || textKey);
  
  return (
    <div className={className}>
      <span>{translatedValue}</span>
      {showDebug && process.env.NODE_ENV === 'development' && (
        <div className="mt-1">
          <TranslationDebug 
            translationKey={textKey}
            value={translatedValue}
          />
        </div>
      )}
    </div>
  );
};